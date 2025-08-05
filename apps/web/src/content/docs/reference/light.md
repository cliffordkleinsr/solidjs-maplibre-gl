---
title: Light
description: SolidJS component to control MapLibre GL's global lighting settings.
sidebar:
  order: 9
---

SolidJS component that sets the [global lighting](https://maplibre.org/maplibre-style-spec/light/) of a MapLibre map using the [`map.setLight`](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setlight) API.

Lighting affects how 3D layers (like extrusions or terrain) are rendered with depth and shading.

```tsx
import type { Component } from "solid-js";
import { Maplibre, Light } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const App: Component = () => {
  return (
    <Maplibre
      style={{ width: "100%", height: "100vh" }}
      options={{
        zoom: 14,
        center: [-74.006, 40.7128],
        pitch: 60,
        bearing: -20,
      }}
    >
      <Light anchor="viewport" color="white" intensity={0.5} />
    </Maplibre>
  );
};
```

## Properties

---

- The component sets the lighting via map.setLight() when mounted or when props change.

- The previous light configuration is restored automatically on unmount using map.setLight(prevLight).

### Reactive Properties

---

###### `anchor`: "map" | "viewport"

Determines whether lighting is relative to the map (`"map"`) or the viewport/camera (`"viewport"`).

Default: `"viewport"`

###### `color`: ColorSpecification

Specifies the color of the light source. Can be a hex string or an RGBA array.

Default: `"white"`

###### `intensity`: number

A multiplier for the brightness of lighting effects. Affects how strong shading appears on 3D extrusions or terrain.

Default: `0.5`

###### `position`: [number, number, number]

Defines the position of the light source in spherical coordinates:
`[r, azimuthal angle, polar angle]`

This is rarely used unless creating a custom lighting effect.

## Source

---

[light.tsx](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/light.tsx)

## Examples

---

[3D Terrain and sky](../../guides/examples/3d-terrain)

## Further Reading

---

[MapLibre Light Specification](https://maplibre.org/maplibre-style-spec/light/)

[Map#setLight](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setlight)
