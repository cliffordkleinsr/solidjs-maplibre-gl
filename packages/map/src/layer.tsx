import * as maplibre from "maplibre-gl";
import { onCleanup, createUniqueId, splitProps, createMemo } from "solid-js";
import { useMapEffect, useMap } from "./map.jsx";
import { useSource } from "./source.jsx";
import { deepEqual } from "./util.js";

export type LayerProps = {
	id?: string;
	layer: Omit<maplibre.LayerSpecification, "id" | "source">;
} & LayerEvents;

type LayerEvents = Partial<{
	[P in keyof maplibre.MapLayerEventType as `on${P}`]: (
		e: maplibre.MapLayerEventType[P],
	) => void;
}>;

/**
 * A component that adds a layer to a maplibre map.
 *
 * @component
 * @param {LayerProps} initial - The initial properties for the layer
 * @param {string} [initial.id] - Optional unique identifier for the layer. If not provided, a unique ID will be generated
 * @param {Omit<maplibre.LayerSpecification, "id" | "source">} initial.layer - The layer specification without id and source properties
 * @param {LayerEvents} [initial.events] - Optional event handlers for the layer. Events should be prefixed with "on"
 *
 * @example
 * ```tsx
 * <Layer
 *   id="my-layer"
 *   layer={{
 *     type: "fill",
 *     paint: {
 *       "fill-color": "#ff0000"
 *     }
 *   }}
 *   onClick={(e) => console.log("Layer clicked", e)}
 * />
 * ```
 *
 * @remarks
 * - The layer must be used within a Source component context
 * - Layer properties can be updated dynamically
 * - The layer will be automatically removed when the component unmounts
 * - Supports all maplibre layer events through onEventName props
 *
 * @returns An empty fragment
 */
export function Layer(initial: LayerProps) {
	const [props, events] = splitProps(initial, ["id", "layer"]);
	const id = createMemo(() => props.id ?? createUniqueId());
	const sourceId = useSource();

	useMapEffect((map) => {
		if (!sourceId || map.getLayer(id())) return;

		const layer = {
			...props.layer,
			id: id(),
			source: sourceId,
		} as any;

		map.addLayer(layer);
	});

	// Safely update filter if layer supports it
	useMapEffect((map) => {
		if (!map.getLayer(id())) return;

		if (props.layer.paint) {
			for (const [k, v] of Object.entries(props.layer.paint)) {
				const old = map.getPaintProperty(id(), k);
				if (!deepEqual(old, v)) {
					map.setPaintProperty(id(), k, v);
				}
			}
		}

		if (
			"filter" in props.layer &&
			props.layer.filter !== undefined &&
			!deepEqual(map.getFilter(id()), props.layer.filter)
		) {
			map.setFilter(id(), props.layer.filter as maplibre.FilterSpecification);
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

	onCleanup(
		() => useMap()?.()?.getLayer(id()) && useMap()?.()?.removeLayer(id()),
	);

	return <></>;
}
