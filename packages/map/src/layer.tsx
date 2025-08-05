import * as maplibre from "maplibre-gl";
import {
  onCleanup,
  createUniqueId,
  splitProps,
  createMemo,
  JSX,
} from "solid-js";
import { useMapEffect, useMap } from "./map.jsx";
import { useSource } from "./source.jsx";
import { deepEqual } from "./util.js";

type LayerEvents = Partial<{
  [P in keyof maplibre.MapLayerEventType as `on${P}`]: (
    e: maplibre.MapLayerEventType[P],
  ) => void;
}>;

type BaseLayerProps<T extends maplibre.LayerSpecification> = {
  id?: string;
  layer: Omit<T, "id" | "source" | "type">;
} & LayerEvents;

/**
 * Factory function to create strongly-typed Solid components for adding MapLibre GL layers.
 *
 * This abstracts repetitive boilerplate when working with different layer types like "circle", "fill", "line", etc.
 * The layer `type` is automatically injected based on the factory call, so you don't need to specify it manually in props.
 *
 * @template T The specific `LayerSpecification` type from `maplibre-gl` (e.g. `CircleLayerSpecification`).
 * @param type The literal layer type (e.g. `"circle"`, `"line"`, etc.) as defined by MapLibre.
 * @returns A SolidJS component that can be used to declaratively add a layer to the map.
 *
 * @example
 * ```tsx
 * export const CircleLayer = createLayerComponent<maplibre.CircleLayerSpecification>("circle");
 *
 * <CircleLayer
 *   layer={{
 *     filter: ["has", "point_count"],
 *     paint: {
 *       "circle-color": [
 *         "step",
 *         ["get", "point_count"],
 *         "#51bbd6",
 *         50,
 *         "#f1f075",
 *         150,
 *         "#f28cb1",
 *       ],
 *       "circle-radius": ["+", 10, ["sqrt", ["get", "point_count"]]],
 *       "circle-opacity": 0.8,
 *     },
 *   }}
 * />
 * ```
 *
 * @remarks
 * - The component automatically manages lifecycle (add/remove), updates paint/filter properties, and binds event listeners.
 * - `source` is pulled from the nearest `<Source>` context via `useSource()`.
 * - You **do not** need to pass `type`, `id`, or `source` in the `layer` prop — they are auto-injected.
 */
export function createLayerComponent<T extends maplibre.LayerSpecification>(
  type: T["type"],
) {
  return function LayerComponent(initialProps: BaseLayerProps<T>): JSX.Element {
    const [props, events] = splitProps(initialProps, ["id", "layer"]);
    const id = createMemo(() => props.id ?? createUniqueId());
    const sourceId = useSource();

    useMapEffect((map) => {
      if (!sourceId || map.getLayer(id())) return;

      map.addLayer({
        ...props.layer,
        id: id(),
        source: sourceId,
        type,
      } as T);
    });

    useMapEffect((map) => {
      if (!map.getLayer(id())) return;

      for (const [k, v] of Object.entries(props.layer.paint ?? {})) {
        const old = map.getPaintProperty(id(), k);
        if (!deepEqual(old, v)) {
          map.setPaintProperty(id(), k, v);
        }
      }

      const oldFilter = map.getFilter(id()); //@ts-expect-error
      if (!deepEqual(oldFilter, props.layer.filter)) {
        //@ts-expect-error
        map.setFilter(id(), props.layer.filter);
      }
    });

    useMapEffect((map) => {
      for (const [key, handler] of Object.entries(events)) {
        if (!key.startsWith("on")) continue;
        const name = key.slice(2).toLowerCase();
        map.on(name as never, id(), handler as never);
        onCleanup(() => map.off(name as never, id(), handler));
      }
    });

    onCleanup(() => {
      const map = useMap()?.();
      if (map?.getLayer(id())) {
        map.removeLayer(id());
      }
    });

    return <></>;
  };
}

export const CircleLayer =
  createLayerComponent<maplibre.CircleLayerSpecification>("circle");
export const LineLayer =
  createLayerComponent<maplibre.LineLayerSpecification>("line");
export const SymbolLayer =
  createLayerComponent<maplibre.SymbolLayerSpecification>("symbol");
export const HillshadeLayer =
  createLayerComponent<maplibre.HillshadeLayerSpecification>("hillshade");
export const FillLayer =
  createLayerComponent<maplibre.FillLayerSpecification>("fill");
export const FillExtrusionLayer =
  createLayerComponent<maplibre.FillExtrusionLayerSpecification>(
    "fill-extrusion",
  );
export const RasterLayer =
  createLayerComponent<maplibre.RasterLayerSpecification>("raster");
export const HeatmapLayer =
  createLayerComponent<maplibre.HeatmapLayerSpecification>("heatmap");
export const BackgroundLayer =
  createLayerComponent<maplibre.BackgroundLayerSpecification>("background");
export const ColorReliefLayer =
  createLayerComponent<maplibre.ColorReliefLayerSpecification>("color-relief");
