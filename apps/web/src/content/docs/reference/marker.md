---
title: Marker
description: Solidjs component that wraps maplibre-gl's Marker class.
---

Solidjs component that wraps maplibre-gl's [Marker](https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/) class.

```tsx
import { createSignal, createEffect, type Component } from "solid-js";
import { Maplibre, Marker } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { LngLatLike } from "maplibre-gl";

const App: Component = (props) => {
  const [lnglat, setLngLat] = createSignal<LngLatLike>([12.88, 48.1]);
  createEffect(() => console.log(lnglat()));
  return (
    <Maplibre
      style={{
        height: "400px",
        width: "100%",
      }}
      options={{
        style: "https://tiles.openfreemap.org/styles/positron",
        zoom: 10,
        center: [12.86, 48.07],
      }}
    >
      <Marker
        lnglat={lnglat()}
        draggable
        ondrag={(e) => {
          const coords = e.target
            .getLngLat()
            .toArray()
            .map((v) => +v.toFixed(3));
          setLngLat(coords as [number, number]);
        }}
        ondragend={(e) => {
          const coords = e.target
            .getLngLat()
            .toArray()
            .map((v) => +v.toFixed(3));
          setLngLat(coords as [number, number]);
        }}
      />
    </Maplibre>
  );
};
```

If `Marker` is mounted with child components, then its content will be rendered to the specified location. If it is mounted with no content, then a default marker will be used.

## Properties

---

Aside from the props listed below, the `Marker`` component supports all [options](https://maplibre.org/maplibre-gl-js/docs/API/type-aliases/MarkerOptions/) of the Map class constructor. Beware that this is not an exhaustive list of all props. Different base map libraries may offer different options and default values. When in doubt, refer to your base map library’s documentation.

### Reactive Properties

---

###### `draggable`: boolean

Default: `false`

If `true`, the marker is able to be dragged to a new position on the map.

###### `lnglat`: LngLatLike

Required. The longitude & latitude of the anchor location.

###### `offset`: [PointLike](./types.md#pointlike)

Default: `null`

The offset in pixels as a [PointLike](./types.md#pointlike) object to apply relative to the element's center. Negatives indicate left and up.

###### `popup`: Popup | undefined | JSX.Element {ref}

An instance of the [Popup](https://maplibre.org/maplibre-gl-js/docs/API/classes/Popup/) class to attach to this marker. If undefined or null, any popup set on this Marker instance is unset.

###### `style`: JSX.CSSProperties | undefined

CSS style override that applies to the marker's container.

### Callbacks

---

###### `onclick`: (evt: [MapEvent](./types.md#mapevent)) => void

Called when the marker is clicked on.

###### `ondrag`: (evt: [MarkerDragEvent](./types.md#markerdragevent)) => void

Called while dragging, if `draggable` is `true`.

###### `ondragend`: (evt: [MarkerDragEvent](./types.md#markerdragevent)) => void

Called when dragging ends, if `draggable` is `true`.

## Source

---

[marker.tsx](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/marker.tsx)

## Further Reading

---

[Marker class constructor](https://maplibre.org/maplibre-gl-js/docs/API/classes/Marker/)
