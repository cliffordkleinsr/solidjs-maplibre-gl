---
title: FeatureState
description: SolidJS component for managing MapLibre feature states.
sidebar:
  order: 10
---

SolidJS component that manages [feature state](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setfeaturestate) for vector or GeoJSON features in a MapLibre map.  
Supports automatic cleanup and reactive updates.

```tsx
import type { Component } from "solid-js";
import { Maplibre, FeatureState } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const App: Component = () => {
  return (
    <Maplibre
      style={{ width: "100%", height: "100vh" }}
      options={{
        zoom: 4,
        center: [0, 0],
      }}
    >
      <FeatureState
        source="my-source"
        id={123}
        state={{ selected: true, hover: false }}
      />
    </Maplibre>
  );
};
```

## Properties

---

- When the component mounts, it calls [map.setFeatureState](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setfeaturestate).

- If the props change, the state is updated reactively.

- When the component unmounts:
  - All previously applied state keys are automatically removed via [map.removeFeatureState](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#removefeaturestate).

  - Only applies the state if `id` is provided. Otherwise, global feature state is untouched.
    Example with Global State

```tsx
<FeatureState source="my-geojson-source" state={{ visible: true }} />
```

This sets state for all features in the source.

### Reactive Properties

---

###### `source`: string

ID of the source containing the feature to update.

###### `sourceLayer`: string | undefined

Name of the source layer.
Required if the source is a vector source with multiple layers.

###### `id`: string | number | undefined

The unique feature ID for which the state should be applied.
If omitted, the state applies to the source globally (no specific feature).

###### `state`: Record<string, any>

An object representing custom key-value state entries to associate with the feature.
Examples:

```ts
{ selected: true, hover: false }
```

```json
["==", ["feature-state", "selected"], true]
```

## Source

---

[feature-state.tsx](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/feature-state.tsx)

## Examples

---

[Hover Styles](../../guides/examples/hover-styles)

## Further Reading

---

[Feature State Style Specification](https://maplibre.org/maplibre-style-spec/expressions/#feature-state)

[Map#setFeatureState](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#setfeaturestate)

[Map#removeFeatureState](https://maplibre.org/maplibre-gl-js/docs/API/classes/Map/#removefeaturestate)
