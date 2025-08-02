---
title: Maplibre
description: Default map entry point.
---

Solidjs component that wraps maplibre-gl's [Map](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/) class.

```tsx
import type { Component } from "solid-js";
import {
  Maplibre,
  NavigationControl,
  ScaleControl,
  GlobeControl,
} from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Plainmap: Component = (props) => {
  return (
    <Maplibre
      style={{
        width: "100%",
        height: "400px",
      }}
      options={{
        zoom: 3.5,
        center: [12.86271398748148, 48.067124540317785],
      }}
    >
      <NavigationControl />
      <ScaleControl />
      <GlobeControl />
    </Maplibre>
  );
};

export default Plainmap;
```

## Properties

Aside from the props listed below, the `Map` component supports all [options](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/) of the `Map` class constructor. Beware that this is not an exhaustive list of all props. Different base map libraries may offer different options and default values. When in doubt, refer to your base map library's documentation.

### Layout options

---

###### `id`: string

Map container id.

###### `style`: JSX.CSSProperties

Default: `{position: 'relative', width: '100%', height: '100%'}`

Map container CSS.

###### `cursor`: string

Default: `'auto'`

The current cursor [type](https://developer.mozilla.org/en-US/docs/Web/CSS/cursor).

### Styling options

---

###### `style`: string | Immutable

Default: (empty style)

The map's Maplibre style. This must be an a JSON object conforming to the schema described in the [MapLibre Style Specification](https://maplibre.org/maplibre-style-spec/), or a URL to such JSON.

###### `renderWorldCopies`: boolean

Default: `true`

If `true`, multiple copies of the world will be rendered, when zoomed out.

### Camera options

---

###### `center`: LngLatLike

The longitude & latitude of the map center.

###### `zoom`: number

The [zoom level](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/#zoom) of the map.

###### `pitch`: number

The initial [pitch](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/#pitch) (tilt) of the map, measured in degrees away from the plane of the screen (0-85).

###### `bearing`: number

The initial [bearing](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MapOptions/#bearing) (rotation) of the map, measured in degrees counter-clockwise from north.

#### `minZoom`: number

Default: `0`

The minimum zoom level of the map (0-24).

#### `maxZoom`: number

Default: `22`

The maximum zoom level of the map (0-24).

#### `minPitch`: number

Default: `0`

The minimum pitch of the map (0-85).

#### `maxPitch`: number

Default: `60`

The maximum pitch of the map (0-85).

### Input handler options

---

#### `boxZoom`: boolean

Default: `true`

If `true`, the "box zoom" interaction is enabled. See [BoxZoomHandler](https://maplibre.org/maplibre-gl-js/docs/API/classes/BoxZoomHandler/).

#### `doubleClickZoom`: boolean

Default: `true`

If `true`, the "double click to zoom" interaction is enabled. See [DoubleClickZoomHandler](https://maplibre.org/maplibre-gl-js/docs/API/classes/DoubleClickZoomHandler/).

#### `dragRotate`: boolean

Default: `true`

If `true`, the "drag to rotate" interaction is enabled. See [DragRotateHandler](https://maplibre.org/maplibre-gl-js/docs/API/classes/DragRotateHandler/).

#### `dragPan`: boolean | Object

Default: `true`

If `true`, the "drag to pan" interaction is enabled. Optionally accept an object value that is the options to [DragPanHandler](https://maplibre.org/maplibre-gl-js/docs/API/classes/DragPanHandler/).

#### `keyboard`: boolean

Default: `true`

If `true`, keyboard shortcuts are enabled. See [KeyboardHandler](https://maplibre.org/maplibre-gl-js/docs/API/classes/KeyboardHandler/).

#### `scrollZoom`: boolean | Object

Default: `true`

If `true`, the "scroll to zoom" interaction is enabled. Optionally accept an object value that is the options to [ScrollZoomHandler](https://maplibre.org/maplibre-gl-js/docs/API/classes/ScrollZoomHandler/).

#### `touchPitch`: boolean | Object

Default: `true`

If `true`, the "drag to pitch" interaction is enabled. Optionally accept an object value that is the options to [TwoFingersTouchPitchHandler](https://maplibre.org/maplibre-gl-js/docs/API/classes/TwoFingersTouchPitchHandler/).

#### `touchZoomRotate`: boolean | Object

Default: `true`

If `true`, the "pinch to rotate and zoom" interaction is enabled. Optionally accept an object value that is the options to [TwoFingersTouchZoomRotateHandler](https://maplibre.org/maplibre-gl-js/docs/API/classes/TwoFingersTouchZoomRotateHandler/).

### Callbacks

---

###### `onresize`: (event: MapEvent) => void

Called when the map has been resized.

###### `onload`: (event: MapEvent) => void

Called after all necessary resources have been downloaded and the first visually complete rendering of the map has occurred.

###### `onrender`: (event: MapEvent) => void

Called whenever the map is drawn to the screen.

###### `onidle`: (event: MapEvent) => void

Called after the last frame rendered before the map enters an "idle" state:

- No camera transitions are in progress
- All currently requested tiles have loaded
- All fade/transition animations have completed

###### `onremove`: (event: MapEvent) => void

Called when the map has been removed.

###### `onerror`: (event: ErrorEvent) => void

Default: `evt => console.error(evt.error)`

Called when an error occurs.

###### `onmousedown`: (event: MapLayerMouseEvent) => void

Called when a pointing device (usually a mouse) is pressed within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `onmouseup`: (event: MapLayerMouseEvent) => void

Called when a pointing device (usually a mouse) is released within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `onmouseover`: (event: MapLayerMouseEvent) => void

Called when a pointing device (usually a mouse) is moved within the map. As you move the cursor across a web page containing a map, the event will fire each time it enters the map or any child elements.

###### `onmouseenter`: (event: MapLayerMouseEvent) => void

Called when a pointing device (usually a mouse) enters a visible portion of the layer(s) specified by `interactiveLayerIds` from outside that layer or outside the map canvas.

###### `onmousemove`: (event: MapLayerMouseEvent) => void

Called when a pointing device (usually a mouse) is moved while the cursor is inside the map. As you move the cursor across the map, the event will fire every time the cursor changes position within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `onmouseleave`: (event: MapLayerMouseEvent) => void

Called when a pointing device (usually a mouse) leaves a visible portion of the layer(s) specified by `interactiveLayerIds` or moves from the layer to outside the map canvas.

###### `onmouseout`: (event: MapLayerMouseEvent) => void

Called when a point device (usually a mouse) leaves the map's canvas.

###### `onclick`: (event: MapLayerMouseEvent) => void

Called when a pointing device (usually a mouse) is pressed and released at the same point on the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `ondblclick`: (event: MapLayerMouseEvent) => void

Called when a pointing device (usually a mouse) is pressed and released twice at the same point on the map in rapid succession.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `oncontextmenu`: (event: MapLayerMouseEvent) => void

Called when the right button of the mouse is clicked or the context menu key is pressed within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `onwheel`: (event: MapWheelEvent) => void

Called when a wheel event occurs within the map.

###### `ontouchstart`: (event: MapLayerTouchEvent) => void

Called when a `touchstart` event occurs within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `ontouchend`: (event: MapLayerTouchEvent) => void

Called when a `touchend` event occurs within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `ontouchmove`: (event: MapLayerTouchEvent) => void

Called when a `touchmove` event occurs within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `ontouchcancel`: (event: MapLayerTouchEvent) => void

Called when a `touchcancel` event occurs within the map.

If `interactiveLayerIds` is specified, the event will contain an additional `features` field that contains features under the cursor from the specified layer.

###### `onmovestart`: (event: ViewStateChangeEvent) => void

Called just before the map begins a transition from one view to another.

###### `onmove`: (event: ViewStateChangeEvent) => void

Called repeatedly during an animated transition from one view to another.

## Source

[map.tsx](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/map.tsx)

## Further Reading

---

[Maplibre class constructor](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/)
