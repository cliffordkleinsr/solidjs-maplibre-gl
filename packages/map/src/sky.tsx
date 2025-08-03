import { onCleanup, splitProps, type Component } from "solid-js";
import { useMapEffect } from "./map"; // or your MapsProvider context
import type { SkySpecification } from "maplibre-gl";

type SkyProps = SkySpecification;

/**
 * A component that sets the sky style of the current MapLibre map.
 * Automatically updates on prop changes and resets on unmount.
 */
export const Sky: Component<SkyProps> = (initialProps) => {
	const [props] = splitProps(initialProps, [
		"sky-color",
		"horizon-color",
		"fog-color",
		"sky-horizon-blend",
		"horizon-fog-blend",
		"fog-ground-blend",
		"atmosphere-blend",
	]);

	let previousSky: SkySpecification | undefined;

	useMapEffect((map) => {
		// Snapshot current sky for later cleanup
		previousSky = map.getStyle().sky as SkySpecification;

		// Set new sky
		map.setSky(props);

		onCleanup(() => {
			if (map.isStyleLoaded() && previousSky) {
				map.setSky(previousSky);
			}
		});
	});

	return <></>;
};
