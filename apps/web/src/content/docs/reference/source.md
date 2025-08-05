---
title: Source
description: This component allows one to create a map source using Solidjs. It may contain Layer components as children.
sidebar:
  order: 5
---

This component allows one to create a [map source](https://maplibre.org/maplibre-style-spec/sources/) using Solidjs. It may contain [Layer](./layer.md) components as children.

```tsx
import { Source, Maplibre, CircleLayer } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
function App() {
  return (
    <Maplibre
      style={{
        "margin-top": "20px",
        height: "400px",
        width: "100%",
      }}
      options={{
        center: [-122.4, 37.8],
        zoom: 14,
      }}
    >
      <Source
        id="my-data"
        source={{
          type: "geojson",
          data: geojson,
        }}
      >
        <CircleLayer
          layer={{
            paint: {
              "circle-radius": 10,
              "circle-color": "#007cbf",
            },
          }}
        />
      </Source>
    </Maplibre>
  );
}
```

## Properties

---

The props provided to this component should be conforming to the [Mapbox source specification](https://maplibre.org/maplibre-style-spec/sources/)

###### `id`: string

Unique identifier of the source. If not provided, a default id will be assigned using Solidjs [createUniqueId](https://docs.solidjs.com/reference/component-apis/create-unique-id) genertor.

###### `source`: Object<SourceSpecification>

Defines the source specification with the props determined by the `type` of the source.

## Source

---

[source.tsx](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/source.tsx)

## Examples

---

[Hover Styles](../../guides/examples/hover-styles)

[3D Terrain and Sky](../../guides/examples/3d-terrain)

[Animate a series of images](../../guides/examples/animate-images)

[Video on a map](../../guides/examples/vid-on-map)

[Animate a line](../../guides/examples/animate-a-line)

## Further Reading

---

You can refer to the [Source specification](https://maplibre.org/maplibre-style-spec/sources/) docs for full option details for each source type.
