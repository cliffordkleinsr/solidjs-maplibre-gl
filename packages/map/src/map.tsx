import * as maplibre from "maplibre-gl";
import {
	createContext,
	createSignal,
	JSX,
	onCleanup,
	onMount,
	useContext,
	Accessor,
	createEffect,
	splitProps,
	createMemo,
	createUniqueId,
} from "solid-js";
import { useMaps } from "./maps.jsx";
import { addEventListeners, type MapEvents } from "./util.js";

export const MapContext = createContext<Accessor<maplibre.Map | undefined>>();

export const useMap = () => useContext(MapContext);

/**
 * A custom effect hook that executes a callback function when a map instance is available
 *
 * @param f - A callback function that takes a maplibre.Map instance as parameter and performs operations on it
 * @example
 * ```tsx
 * useMapEffect((map) => {
 *   map.setZoom(12);
 * });
 * ```
 */
export const useMapEffect = (f: (map: maplibre.Map) => void) =>
	createEffect(() => {
		const map = useMap()?.();
		if (map) {
			f(map);
		}
	});

export type MapProps = {
	id?: string;
	style?: JSX.CSSProperties;
	class?: string;
	classList?: Record<string, boolean | undefined>;
	cursor?: string;
	options?: Partial<Omit<maplibre.MapOptions, "container">>;
	children?: JSX.Element;
} & MapEvents;

/**
 * A Solid.js component that renders a MapLibre GL JS map.
 *
 *
 * @example
 * Basic usage:
 * ```tsx
 * <Maplibre
 *   options={{
 *     center: [-74.5, 40],
 *     zoom: 9
 *   }}
 * />
 * ```
 *
 * @example
 * With custom styling and events:
 * ```tsx
 * <Maplibre
 *   style={{ height: "500px" }}
 *   class="my-map"
 *   cursor="pointer"
 *   options={{
 *     style: "https://my-custom-style.json",
 *     zoom: 12
 *   }}
 *   onClick={(evt) => console.log("Clicked at:", evt.lngLat)}
 * >
 *   <CustomMapOverlay />
 * </Maplibre>
 * ```
 *
 * @example
 * With conditional classes:
 * ```tsx
 * <Maplibre
 *   classList={{
 *     'map-dark': isDarkMode(),
 *     'map-satellite': isSatelliteView()
 *   }}
 *   options={{
 *     interactive: true,
 *     maxBounds: [[-180, -85], [180, 85]]
 *   }}
 * />
 * ```
 * @component
 * @param {MapProps} props - The props for the Maplibre component
 * @param {string} [props.id] - Optional unique identifier for the map container
 * @param {JSX.CSSProperties} [props.style] - Optional CSS styles for the map container
 * @param {string} [props.class] - Optional CSS class name for the map container
 * @param {Record<string, boolean | undefined>} [props.classList] - Optional CSS classes with conditional rendering
 * @param {string} [props.cursor] - Optional cursor style for the map
 * @param {Partial<Omit<maplibre.MapOptions, "container">>} [props.options] - Optional MapLibre GL JS map initialization options
 * @param {JSX.Element} [props.children] - Optional child elements to render within the map context
 * @returns {JSX.Element} A div container with the MapLibre GL JS map instance
 */
export function Maplibre(initial: MapProps) {
	const [props, events] = splitProps(initial, [
		"id",
		"style",
		"class",
		"classList",
		"cursor",
		"options",
		"children",
	]);
	const id = createMemo(() => props.id ?? createUniqueId());
	const defaultStyle = createMemo<JSX.CSSProperties | undefined>(() =>
		!props.style && !props.class && !props.classList
			? { position: "relative", width: "100%", "aspect-ratio": "calc(16/9)" }
			: undefined,
	);
	const container = (
		<div
			id={id()}
			class={props.class}
			classList={props.classList}
			style={props.style ?? defaultStyle()}
		/>
	) as HTMLDivElement;
	const [map, setMap] = createSignal<maplibre.Map>();
	const mapsContext = useMaps();

	onMount(() => {
		const map = new maplibre.Map({
			style: "https://demotiles.maplibre.org/style.json",
			...props.options,
			container,
		});
		mapsContext?.onMapMount(map, id());

		void map.once("load", () => setMap(map));
	});

	const interactive = createMemo(
		() =>
			typeof props.options?.interactive === "undefined" ||
			props.options.interactive,
	);
	createEffect(() => {
		const canvas = map()?.getCanvas();
		if (canvas && interactive()) {
			canvas.style.cursor = props.cursor ?? "unset";
		}
	});

	createEffect(() => {
		const m = map();
		if (m) {
			addEventListeners(m, events);
		}
	});

	onCleanup(() => {
		map()?.remove();
		mapsContext?.onMapUnmount(id());
	});

	return (
		<MapContext.Provider value={map}>
			{container}
			{props.children}
		</MapContext.Provider>
	);
}
