---
title: Popup
description: Solidjs  component that wraps maplibre-gl's Popup class.
---

Solidjs component that wraps maplibre-gl's [Popup](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/) class.

```tsx
import type { Component } from "solid-js";
import {
  Maplibre,
  NavigationControl,
  ScaleControl,
  GlobeControl,
} from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const App: Component = (props) => {
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
        <Popup
            position{[12.86, 48.06]}
            anchor="bottom"
            content="You are here"
        />
    </Maplibre>
  );
};
```

## Properties

### Reactive Properties

---

###### `anchor`:

'center' | 'left' | 'right' | 'top' | 'bottom' | 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | undefined

A string indicating the part of the popup that should be positioned closest to the coordinate, set via `longitude` and `latitude`.
If unset, the anchor will be dynamically set to ensure the popup falls within the map container with a preference for `'bottom'`.

###### `className`: string

Space-separated CSS class names to add to popup container.

###### `offset`: number | [PointLike](./types.md#pointlike) | Record\<string, [PointLike](./types.md#pointlike)\>

Default: `null`

A pixel offset applied to the popup's location specified as:

- a single number specifying a distance from the popup's location
- a PointLike specifying a constant offset
- an object of Points specifing an offset for each anchor position.

Negative offsets indicate left and up.

###### `maxWidth`: string

Default: `240px`

A string that sets the CSS property of the popup's maximum width.

###### `style`: JSX.CSSProperties

CSS style override that applies to the popup's container.

###### `ref`: Setter<Popup>

Signal setter that links to a popup instance

### Callbacks

---

###### `onClose`: (evt: [PopupEvent](./types.md#popupevent)) => void {#onclose}

Called when the popup is closed by the user clicking on the close button or outside (if `closeOnClick: true`).

### Other Properties

---

The properties in this section are not reactive. They are only used when the component first mounts.

Any [options](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/PopupOptions/) supported by the `Popup` class, such as

- `closeButton`
- `closeOnClick`
- `closeOnMove`
- `focusAfterOpen`

## Source

---

[popup.tsx](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/popup.tsx)

## Further Reading

---

[Popup class constructor](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/)
