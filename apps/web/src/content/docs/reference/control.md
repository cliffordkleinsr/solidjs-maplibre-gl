---
title: Controls
description: SolidJS components that wrap MapLibre GL's built-in control classes.
sidebar:
  order: 4
---

SolidJS components that wrap MapLibre GL JS control classes using a `createControl` factory. These include:

- [`NavigationControl`](https://maplibre.org/maplibre-gl-js/docs/API/classes/NavigationControl/)
- [`ScaleControl`](https://maplibre.org/maplibre-gl-js/docs/API/classes/ScaleControl/)
- [`GlobeControl`](https://maplibre.org/maplibre-gl-js/docs/API/classes/GlobeControl/)
- [`AttributionControl`](https://maplibre.org/maplibre-gl-js/docs/API/classes/AttributionControl/)
- [`GeolocateControl`](https://maplibre.org/maplibre-gl-js/docs/API/classes/GeolocateControl/)
- [`FullscreenControl`](https://maplibre.org/maplibre-gl-js/docs/API/classes/FullscreenControl/)
- [`TerrainControl`](https://maplibre.org/maplibre-gl-js/docs/API/classes/TerrainControl/)
- [`LogoControl`](https://maplibre.org/maplibre-gl-js/docs/API/classes/LogoControl/)

```tsx
import type { Component } from "solid-js";
import {
  Maplibre,
  NavigationControl,
  ScaleControl,
  GlobeControl,
} from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const App: Component = () => {
  return (
    <Maplibre
      style={{ width: "100%", height: "400px" }}
      options={{
        zoom: 4,
        center: [0, 0],
      }}
    >
      <NavigationControl position="top-left" />
      <ScaleControl position="bottom-left" />
      <GlobeControl position="top-right" />
    </Maplibre>
  );
};
```

## Properties

---

### Reactive Properties

---

###### `position`:

'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top' | 'bottom' | 'left' | 'right'

A string indicating where on the map the control should be placed.  
This matches MapLibre GL JS’s [`ControlPosition`](https://maplibre.org/maplibre-gl-js/docs/API/#map#addcontrol) enum.

Controls are placed in one of the four corners or along the sides of the map container.

Example:

```tsx
<NavigationControl position="top-right" />
```

###### `options`: Object

An optional object passed to the control's constructor.
The shape of this object depends on which control you're creating. Here are a few examples:

NavigationControl

```ts
{
  showZoom?: boolean;
  showCompass?: boolean;
  visualizePitch?: boolean;
}

```

ScaleControl

```ts
{
  maxWidth?: number; // Default: 100
  unit?: "imperial" | "metric" | "nautical"; // Default: "metric"
}
```

GeolocateControl

```ts
{
  positionOptions?: PositionOptions;
  fitBoundsOptions?: maplibre.FitBoundsOptions;
  trackUserLocation?: boolean;
  showAccuracyCircle?: boolean;
  showUserLocation?: boolean;
}
```

TerrainControl

```ts
{
  source: string;
  exaggeration: number;
}
```

## Source

[controls.tsx](https://github.com/cliffordkleinsr/solidjs-maplibre-gl/blob/main/packages/map/src/controls.tsx)

## Examples

---

[Plain Map](../../guides/examples/plain)

[GeoLocator](../../guides/examples/geolocator)

[Geocode with Nomatim](../../guides/examples/nomatim)

## Further Reading

You can refer to the [MapLibre control](https://maplibre.org/maplibre-gl-js/docs/API/interfaces/IControl/) docs for full option details for each control type.
