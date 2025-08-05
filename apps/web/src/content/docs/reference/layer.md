---
title: Layer
description: This component allows apps to create a map layer.
sidebar:
  order: 6
---

This component allows apps to create a map layer using Solidjs.

:::note
This Component **must** be wrapped by a [source layer](../source)
:::

The underlying factory function for each layer component encompasses a `createLayerComponent` utility which generates SolidJS components for [MapLibre GL JS layers](https://maplibre.org/maplibre-style-spec/layers/).

It abstracts the boilerplate for adding, updating, and removing layers declaratively.

This function is used to define typed components like :

- [`BackgroundLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#background)
- [`FillLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#fill)
- [`LineLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#line)
- [`SymbolLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#symbol)
- [`RasterLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#raster)
- [`CircleLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#circle)
- [`HeatmapLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#heatmap)
- [`HillshadeLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#hillshade)
- [`FillExtrusionLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#fill-extrusion)
- [`SkyLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#sky)
- [`ColorReliefLayerSpecification`](https://maplibre.org/maplibre-style-spec/layers/#color-relief)

```tsx
import {
  Source,
  Layer
  Maplibre,
} from  "solidjs-maplibre-gl";
const App: Component = () => {
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
};

export default App;
```

## Properties

---

### Reactive Properties

---

###### `id`: string

Optional ID for the layer. If omitted, a default id will be assigned using Solidjs [createUniqueId](https://docs.solidjs.com/reference/component-apis/create-unique-id) genertor.

###### `layer`: Omit<LineLayerSpecification, "type" | "id" | "source">

T
The layer definition excluding the id, source, and type fields. These are automatically injected by the factory component.

This includes:

`paint`: Paint properties (e.g. colors, opacity, radius)

`layout`: Layout properties

`filter`: An expression used to filter features

`minzoom`, `maxzoom`: Optional zoom range

### Callbacks

---

###### `onclick`: (evt: [MapEvent](./types.md#mapevent)) => void

Called when the layer is clicked on.

###### `ondblclick`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent) ) => void

Called when a pointing device (usually a mouse) is pressed and released twice at the same point on the layer in rapid succession.

###### `onmousedown`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent) ) => void

Called when a pointing device (usually a mouse) is pressed within the layer.

###### `onmouseup`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent) ) => void

Called when a pointing device (usually a mouse) is released within the layer.

###### `onmousemove`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent) ) => void

Called when a pointing device (usually a mouse) is moved while the cursor is inside the map. As you move the cursor across the layer, the event will fire every time the cursor changes position within the layer.

###### `onmouseenter`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent) ) => void

Called when a pointing device (usually a mouse) enters a visible portion of the layer(s).

###### `onmouseleave`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent) ) => void

Called when a pointing device (usually a mouse) leaves a visible portion of the layer(s) or moves from the layer to outside the map canvas.

###### `onmouseout`: (event: [MapLayerMouseEvent](./types.md#maplayermouseevent) ) => void

Called when a point device (usually a mouse) leaves the map's canvas.

###### `ontouchstart`: (event: [MapLayerTouchEvent](./types.md#maplayertouchevent)) => void

Called when a `touchstart` event occurs within the layer.

###### `ontouchend`: (event: [MapLayerTouchEvent](./types.md#maplayertouchevent)) => void

Called when a `touchend` event occurs within the layer.

###### `ontouchmove`: (event: [MapLayerTouchEvent](./types.md#maplayertouchevent)) => void

Called when a `touchmove` event occurs within the layer.

###### `ontouchcancel`: (event: [MapLayerTouchEvent](./types.md#maplayertouchevent)) => void

Called when a `touchcancel` event occurs within the layer.

## Source

---

[layer.tsx](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/layer.tsx)

## Examples

---

[3D Terrain and Sky](../../guides/examples/3d-terrain)

[Animate a series of images](../../guides/examples/animate-images)

[Video on a map](../../guides/examples/vid-on-map)

## Further Reading

---

You can refer to the [layer specification](https://maplibre.org/maplibre-style-spec/layers/) docs for full option details for each layer type.
