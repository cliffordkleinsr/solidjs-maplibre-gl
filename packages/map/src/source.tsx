import * as maplibre from "maplibre-gl";
import {
	createContext,
	JSX,
	onCleanup,
	useContext,
	createUniqueId,
	createMemo,
} from "solid-js";
import { useMapEffect, useMap } from "./map.jsx";

export interface SourceProps {
	id?: string;
	source: maplibre.SourceSpecification;
	children?: JSX.Element;
}

export const SourceIdContext = createContext<string | undefined>();

export const useSource = () => useContext(SourceIdContext);

/**
 * Source component for MapLibre GL JS
 * Creates and manages a map source in MapLibre GL JS
 *
 * @component
 * @example
 * ```tsx
 * <Source
 *   id="my-source"
 *   source={{ type: 'geojson', data: {...} }}
 * >
 *   <Layer {...layerProps} />
 * </Source>
 * ```
 *
 * @param props - The properties for the Source component
 * @param props.id - Optional unique identifier for the source. If not provided, one will be generated
 * @param props.source - MapLibre source specification object that defines the source data
 * @param props.children - Optional child elements (typically Layer components) that will use this source
 *
 * @remarks
 * The Source component creates a context that provides the source ID to child components.
 * It automatically handles the addition and removal of the source from the map.
 * When the component unmounts, it will clean up by removing the source from the map.
 *
 * @see {@link https://maplibre.org/maplibre-gl-js-docs/api/sources/ MapLibre GL JS Sources}
 */
export function Source(props: SourceProps) {
	const id = createMemo(() => props.id ?? createUniqueId());

	useMapEffect((map) => {
		if (!map.getSource(id())) {
			map.addSource(id(), props.source);
		}

		const source = map.getSource(id());
		switch (props.source.type) {
			case "image": {
				const img = source as maplibre.ImageSource;
				img.updateImage({
					url: props.source.url,
					coordinates: props.source.coordinates,
				});
				break;
			}

			case "raster":
			case "vector":
			case "raster-dem": {
				const src = source as maplibre.Source;
				if ("setTiles" in src && props.source.tiles) {
					(source as any).setTiles(props.source.tiles);
				}
				if ("setUrl" in src && props.source.url) {
					(source as any).setUrl(props.source.url);
				}
				break;
			}

			case "video": {
				const video = source as maplibre.VideoSource;
				if (props.source.coordinates) {
					video.setCoordinates?.(props.source.coordinates);
				}
				break;
			}
		}
		// if (source && props.source.type === 'image') {
		//   // Use updateImage for image sources
		//   //@ts-expect-error
		//   source.updateImage({
		//     url: props.source.url,
		//     coordinates: props.source.coordinates
		//   });
		// }
	});

	onCleanup(
		() => useMap()?.()?.getSource(id()) && useMap()?.()?.removeSource(id()),
	);

	return (
		<SourceIdContext.Provider value={id()}>
			{props.children}
		</SourceIdContext.Provider>
	);
}
