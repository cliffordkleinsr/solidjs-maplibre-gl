import { useMapEffect } from "./map.jsx";
import * as maplibre from "maplibre-gl";
import { onCleanup, splitProps } from "solid-js";

export type PopUpProps = Partial<maplibre.PopupOptions> & {
	position?: maplibre.LngLatLike;
	content?: string;
	ref?: (popup: maplibre.Popup) => void;
	onClose?: () => void;
};

/**
 * A component that renders a MapLibre popup on the map.
 *
 * @component
 * @example
 * // Standalone popup with position
 * <Popup
 *   position={[longitude, latitude]}
 *   content="<h1>Hello World!</h1>"
 *   closeButton={false}
 *   closeOnClick={true}
 * />
 *
 * @example
 * // Popup with custom close handler
 * <Popup
 *   position={[-122.4, 37.8]}
 *   content="<div>Custom popup content</div>"
 *   onClose={() => console.log('Popup closed')}
 *   className="custom-popup"
 * />
 *
 * @example
 * // Popup with ref for programmatic control see `Marker.tsx` for more information
 *
 * @param {PopUpProps} props - The props for the Popup component
 * @param {LngLatLike} [props.position] - Geographic location of the popup. Required for standalone popups
 * @param {string} [props.content] - HTML content to be displayed in the popup
 * @param {Function} [props.ref] - Callback function that receives the Popup instance
 * @param {Function} [props.onClose] - Event handler called when the popup is closed
 * @param {Partial<maplibre.PopupOptions>} [props] - Additional MapLibre popup options
 *
 * @returns {JSX.Element} An empty fragment as the popup is handled by MapLibre
 */

export type PopupInstance = maplibre.Popup
export function Popup(initial: PopUpProps) {
	const [props, options] = splitProps(initial, [
		"position",
		"content",
		"onClose",
		"ref",
	]);

	let popup: maplibre.Popup | undefined;

	useMapEffect((map) => {
		if (!map || !props.content) return;

		requestAnimationFrame(() => {
			popup = new maplibre.Popup(options);

			if (props.position) {
				popup.setLngLat(props.position).addTo(map); // Standalone popup
			} else {
				popup.setHTML(props.content!); // Marker will handle addTo + position
			}

			if (props.onClose) popup.on("close", props.onClose);
			if (props.ref) props.ref(popup);
		});
	});

	onCleanup(() => popup?.remove());

	return <></>;
}
