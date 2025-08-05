---
title: MapsProvider
description: Context provider and hook to manage multiple MapLibre GL map instances.
sidebar:
  order: 7
---

SolidJS component and hook for managing and accessing multiple [MapLibre](../maplibre) instances via context.  
`MapsProvider` wraps your app and manages map registration through `useMaps()` context.

```tsx
import type { Component } from "solid-js";
import { MapsProvider, useMaps, Maplibre } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const App: Component = () => {
  return (
    <MapsProvider>
      <MapsProbe />
      <Maplibre id="map-1" />
      <Maplibre id="map-2" />
    </MapsProvider>
  );
};
const MapsProbe = () => {
  const keys = createMemo(() =>
    [...(useMaps()?.maps().keys() ?? [])].join(", "),
  );
  return <p>Mounted maps: {keys()}</p>;
};
```

## Properties

---

- All map instances are registered/unregistered automatically through <Maplibre> or custom integration.

- Useful for managing multiple maps or dynamically accessing them from external components (e.g. controls, overlays).

- Internally uses a reactive Map<string, maplibre.Map> via Solid's createSignal().

### Reactive Properties

---

###### `maps`: Accessor<Map<string, maplibre.Map>>

A signal containing all registered maplibre.Map instances keyed by their string id.

###### `useMaps()`: MapsContextValue | undefined

Access the map context from any child component.

```tsx
const { maps, onMapMount, onMapUnmount } = useMaps();

const map = maps().get("map-1");
map?.flyTo({ center: [0, 0], zoom: 3 });
```

###### `children`: JSX.Element

Optional children to render within the context provider.

### Callbacks

---

###### `onMapMount(map, id)`: (map: maplibre.Map, id: string) => void

Registers a map instance in the context under the given id.
Used internally by [`<Maplibre>`](../maplibre) when it mounts.

###### `onMapUnmount(id)`: (id: string) => void

Removes the map instance from the context when the map unmounts.

## Source

[maps](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/maps.tsx)

## Examples

---

[Map Provider](../../guides/examples/map-provider)

## Further Reading

[Solidjs Context API](https://docs.solidjs.com/concepts/context)

[Context for layout animations](https://github.com/Blankeos/solid-layout-motion/blob/main/pages/motion-span.tsx)

[Example](https://solid-layout-motion.pages.dev/3)
