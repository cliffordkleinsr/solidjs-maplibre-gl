import * as maplibre from "maplibre-gl";
import { JSX, onCleanup, splitProps } from "solid-js";
import { useMapEffect, useMap } from "./map.jsx";

/**
 * Creates a control component factory for MapLibre GL JS controls.
 *
 * @template Control - The type of MapLibre control to create
 * @template Options - The configuration options type for the control
 *
 * @param construct - The constructor function for the MapLibre control
 *
 * @returns A SolidJS component factory that renders the specified MapLibre control
 *
 * @example
 * ```tsx
 * // Create a navigation control component
 * const NavigationControl = createControl(maplibre.NavigationControl);
 *
 * // Use the control in a component
 * <NavigationControl position="top-right" options={{ showCompass: true }} />
 * ```
 *
 * The returned component accepts the following props:
 * @property {Options} [options] - Configuration options passed to the control constructor
 * @property {maplibre.ControlPosition} [position] - The position on the map where the control should be placed
 */
export const createControl =
	<Control extends maplibre.IControl, Options>(
		construct: new (options: Options) => Control,
	) =>
	(props: {
		options?: Options;
		position?: maplibre.ControlPosition;
	}): JSX.Element => {
		const [own, options] = splitProps(props, ["position"]);
		let control: maplibre.IControl | undefined;

		useMapEffect((map) => {
			if (!control) {
				control = new construct(
					options.options ?? ({} as Options),
				) as maplibre.IControl;
				map.addControl(control, own.position);
			}
		});

		onCleanup(() => {
			const m = useMap()?.();
			if (control && m && m.hasControl(control)) m.removeControl(control);
		});

		return <></>;
	};

export const NavigationControl = createControl(maplibre.NavigationControl);

export const ScaleControl = createControl(maplibre.ScaleControl);

export const AttributionControl = createControl(maplibre.AttributionControl);

export const FullScreenControl = createControl(maplibre.FullscreenControl);

export const GeolocateControl = createControl(maplibre.GeolocateControl);

export const LogoControl = createControl(maplibre.LogoControl);

export const TerrainControl = createControl(maplibre.TerrainControl);
