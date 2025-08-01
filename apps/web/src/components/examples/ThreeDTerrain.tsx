import { createEffect, type Component } from "solid-js";
import {
  Maplibre,
  Source,
  TerrainControl,
  HillshadeLayer,
  Sky,
  Light,
} from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const ThreeDTerrain: Component = (props) => {
  return (
    <Maplibre
      style={{
        "margin-top": "20px",
        height: "400px",
        width: "100%",
      }}
      options={{
        center: [11.39085, 47.27574],
        zoom: 12,
        pitch: 70,
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
        maxPitch: 85,
      }}
    >
      <Light anchor="map" />
      <Sky
        sky-color="#80ccff"
        sky-horizon-blend={0.5}
        horizon-color="#ccddff"
        horizon-fog-blend={0.5}
        fog-color="#fcf0dd"
        fog-ground-blend={0.2}
      />
      <Source
        id="terrain-dem"
        source={{
          type: "raster-dem",
          url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
          tileSize: 256,
        }}
      />
      <Source
        id="hillshade-dem"
        source={{
          type: "raster-dem",
          url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
          tileSize: 256,
        }}
      >
        <HillshadeLayer
          layer={{
            layout: {
              visibility: "visible",
            },
            paint: {
              "hillshade-shadow-color": "#473B24",
            },
          }}
        />
      </Source>
      <TerrainControl
        options={{
          source: "terrain-dem",
          exaggeration: 1.5,
        }}
      />
    </Maplibre>
  );
};

export default ThreeDTerrain;
