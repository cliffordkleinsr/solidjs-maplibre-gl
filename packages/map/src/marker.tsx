import { useMapEffect } from "./map.jsx";
import * as maplibre from "maplibre-gl";
import {
  createEffect,
  createSignal,
  onCleanup,
  onMount,
  Show,
  splitProps,
} from "solid-js";
import type { JSX } from "solid-js";
import { addEventListeners, type MapEvents } from "./util.js";
import { Portal } from "solid-js/web";
import { children as resolveChildren } from "solid-js";
type MarkerEvents = Pick<
  MapEvents<maplibre.Marker>,
  "onclick" | "ondrag" | "ondragstart" | "ondragend"
>;

export type MarkerProps = Partial<maplibre.MarkerOptions> & {
  lnglat: maplibre.LngLatLike;
  children?: JSX.Element;
  popup?: maplibre.Popup;
} & MarkerEvents;

/**
 * A component that renders a marker on a MapLibre map.
 *
 * @component
 * @example
 * Basic usage:
 * ```tsx
 * <Marker lnglat={[longitude, latitude]}>
 *   <div class="custom-marker">📍</div>
 * </Marker>
 * ```
 *
 * With popup instance:
 * ```tsx
 * <Marker
 *   lnglat={[longitude, latitude]}
 *   popup={new maplibre.Popup().setHTML("<h1>Hello World!</h1>")}
 * />
 * ```
 *
 * With popup component:
 * ```tsx
 * const App = () => {
 *	const [popupInstance, setPopupInstance] = createSignal<maplibregl.Popup>();
 * return(
 *	<>
 * <Marker
 *		draggable={true}
 *		lnglat={[141.692222, 42.775]}
 *		popup={popupInstance()}
 *	/>
 *	<Popup anchor="top" content="you are here" ref={setPopupInstance} />
 * </>
 *)}
 *```
 * With events:
 * ```tsx
 * <Marker
 *   lnglat={[longitude, latitude]}
 *   onclick={(e) => console.log('Marker clicked!', e)}
 *   ondragend={(e) => console.log('New position:', e.target.getLngLat())}
 *   draggable={true}
 * />
 * ```
 *
 * @param {MarkerProps} props - The component props
 * @param {maplibre.LngLatLike} props.lnglat - Geographical location of the marker [longitude, latitude]
 * @param {JSX.Element} [props.children] - Custom HTML content for the marker
 * @param {maplibre.Popup} [props.popup] - Popup to be attached to the marker
 * @param {Function} [props.onclick] - Handler for click events
 * @param {Function} [props.ondrag] - Handler for drag events
 * @param {Function} [props.ondragstart] - Handler for drag start events
 * @param {Function} [props.ondragend] - Handler for drag end events
 * @param {maplibre.MarkerOptions} [props...] - Additional MapLibre marker options
 *
 * @returns {JSX.Element} A div containing the marker element
 */
export function Marker(initial: MarkerProps) {
  const [props, rest] = splitProps(initial, ["lnglat", "children", "popup"]);
  const [events, options] = splitProps(rest, [
    "onclick",
    "ondrag",
    "ondragstart",
    "ondragend",
  ]);
  const [marker, setMarker] = createSignal<maplibre.Marker>();
  let el: HTMLDivElement | undefined;

  const resolved = resolveChildren(() => props.children);

  const hasChildren = () => {
    const c = resolved();
    return Array.isArray(c) ? c.some(Boolean) : Boolean(c);
  };
  onMount(() => {
    if (!el) return;
    setMarker(
      new maplibre.Marker({
        ...options,
        element: hasChildren() ? el : undefined, //hasValidChildren(props.children) ? el : undefined,
      }),
    );
  });

  createEffect(() => {
    const m = marker();
    if (!m) return;

    addEventListeners(m, events);

    m.setLngLat(props.lnglat);

    m.setDraggable(options.draggable);
    m.setOffset(options.offset ?? [0, 0]);
    m.setOpacity(options.opacity, options.opacityWhenCovered);
    m.setPitchAlignment(options.pitchAlignment);
    m.setRotation(options.rotation);
    m.setRotationAlignment(options.rotationAlignment);
    m.setSubpixelPositioning(options.subpixelPositioning ?? false);

    if (props.popup) {
      m.setPopup(props.popup); // <-- Attach popup to marker
    }
  });

  useMapEffect((map) => {
    marker()?.addTo(map);
  });

  onCleanup(() => {
    marker()?.remove();
  });

  return (
    <div ref={el}>
      <Show when={marker()?.getElement()}>
        <Portal mount={marker()?.getElement()}>{resolved()}</Portal>
      </Show>
    </div>
  );
}
