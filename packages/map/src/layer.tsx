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
  layer: Omit<T, "id" | "source">;
} & LayerEvents;

export function createLayerComponent<T extends maplibre.LayerSpecification>() {
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
  createLayerComponent<maplibre.CircleLayerSpecification>();
export const LineLayer =
  createLayerComponent<maplibre.LineLayerSpecification>();
export const SymbolLayer =
  createLayerComponent<maplibre.SymbolLayerSpecification>();
export const HillshadeLayer =
  createLayerComponent<maplibre.HillshadeLayerSpecification>();
export const FillLayer =
  createLayerComponent<maplibre.FillLayerSpecification>();
export const FillExtrusionLayer =
  createLayerComponent<maplibre.FillExtrusionLayerSpecification>();
export const RasterLayer =
  createLayerComponent<maplibre.RasterLayerSpecification>();
export const HeatmapLayer =
  createLayerComponent<maplibre.HeatmapLayerSpecification>();
export const BackgroundLayer =
  createLayerComponent<maplibre.BackgroundLayerSpecification>();
export const ColorReliefLayer =
  createLayerComponent<maplibre.ColorReliefLayerSpecification>();
