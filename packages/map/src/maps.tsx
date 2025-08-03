import * as maplibre from "maplibre-gl";
import {
	createSignal,
	createContext,
	useContext,
	JSX,
	Accessor,
} from "solid-js";

export interface MapsContextValue {
	maps: Accessor<Map<string, maplibre.Map>>;
	onMapMount: (map: maplibre.Map, id: string) => void;
	onMapUnmount: (id: string) => void;
}

export const MapsContext = createContext<MapsContextValue>();

export interface MapsProviderProps {
	children?: JSX.Element;
}

/**
 * Custom hook to access the Maps context.
 * /**
 * Interface defining the shape of the Maps context value.
 * @interface MapsContextValue
 * @property {Accessor<Map<string, maplibre.Map>>} maps - Signal containing a Map of maplibre.Map instances
 * @property {(map: maplibre.Map, id: string) => void} onMapMount - Callback function to add a map instance to the context
 * @property {(id: string) => void} onMapUnmount - Callback function to remove a map instance from the context
 */

/**
 * Context object for sharing map instances across components.
 */

/**
 * Props interface for the MapsProvider component.
 * @interface MapsProviderProps
 * @property {JSX.Element} [children] - Optional child elements to be wrapped by the provider
 */

/**
 * Provider component that manages a collection of MapLibre GL JS map instances.
 * Allows child components to access and manipulate map instances through context.
 *
 * @component
 * @param {MapsProviderProps} props - Component props
 * @returns {JSX.Element} Provider component wrapping children with map context
 *
 * @example
 * ```tsx
 * <MapsProvider>
 *   <MapComponent id="map1" />
 *   <MapComponent id="map2" />
 * </MapsProvider>
 * ```
 * @returns {MapsContextValue} The Maps context value
 * @throws {Error} When used outside of MapsProvider
 */
export function MapsProvider(props: MapsProviderProps) {
	const [maps, setMaps] = createSignal<Map<string, maplibre.Map>>(
		new Map<string, maplibre.Map>(),
		{
			equals: false,
		},
	);
	const onMapMount = (map: maplibre.Map, id: string) => {
		setMaps((maps) => maps.set(id, map));
	};
	const onMapUnmount = (id: string) =>
		setMaps((maps) => {
			maps.delete(id);
			return maps;
		});
	return (
		<MapsContext.Provider
			value={{
				maps,
				onMapMount,
				onMapUnmount,
			}}
		>
			{props.children}
		</MapsContext.Provider>
	);
}

export const useMaps = () => useContext(MapsContext);
