---
title: Sky
description: SolidJS component that sets the sky style of a MapLibre map.
sidebar:
  order: 8
---

SolidJS component that sets the [sky layer](https://maplibre.org/maplibre-style-spec/layers/#sky) of a MapLibre map using the [setSky](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setsky) API.

This is useful for adding atmospheric or sky effects in globe-style or tilted perspective maps.

```tsx
import type { Component } from "solid-js";
import { Maplibre, Sky } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const App: Component = () => {
  return (
    <Maplibre
      style={{ width: "100%", height: "100vh" }}
      options={{
        zoom: 3,
        center: [0, 0],
        pitch: 75,
        bearing: 0,
      }}
    >
      <Sky
        sky-color="rgba(135, 206, 235, 1)"
        sky-horizon-blend={0.1}
        atmosphere-blend="screen"
      />
    </Maplibre>
  );
};
```

## Properties

---

- The component sets the sky style when mounted.

- It automatically updates when props change.

- On unmount, it resets the map’s sky style to the previous one, if available.

- Requires the map's style to support a sky definition.

### Reactive Properties

---

###### `sky-color`: ColorSpecification

Optional color. Defaults to "#88C6FC". Supports interpolate expressions. Transitionable.

The base color for the sky.

###### `horizon-color`: ColorSpecification

Optional color. Defaults to "#ffffff". Supports interpolate expressions. Transitionable.

The base color at the horizon.

###### `fog-color`: ColorSpecification

Optional color. Defaults to "#ffffff". Supports interpolate expressions. Transitionable.

The base color for the fog. Requires 3D terrain.

###### `fog-ground-blend`: number

Optional number in range [0, 1]. Defaults to 0.5. Supports interpolate expressions. Transitionable.

How to blend the fog over the 3D terrain. Where 0 is the map center and 1 is the horizon.

###### `horizon-fog-blend`: number

Optional number in range [0, 1]. Defaults to 0.8. Supports interpolate expressions. Transitionable.

How to blend the fog color and the horizon color. Where 0 is using the horizon color only and 1 is using the fog color only.

###### `sky-horizon-blend`: number

Optional number in range [0, 1]. Defaults to 0.8. Supports interpolate expressions. Transitionable.

How to blend the sky color and the horizon color. Where 1 is blending the color at the middle of the sky and 0 is not blending at all and using the sky color only.

###### `atmosphere-blend`: "none" | "screen"

Optional number in range [0, 1]. Defaults to 0.8. Supports interpolate expressions. Transitionable.

How to blend the atmosphere. Where 1 is visible atmosphere and 0 is hidden. It is best to interpolate this expression when using globe projection.

## Source

---

[sky.tsx](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/sky.tsx)

## Examples

---

[3D Terrain and sky](../../guides/examples/3d-terrain)

## Further Reading

---

[Sky Layer Specification](https://maplibre.org/maplibre-style-spec/layers/#sky)

[Map#setSky](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setsky)
