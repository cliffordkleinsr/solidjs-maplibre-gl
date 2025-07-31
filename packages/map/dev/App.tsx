import {
  createEffect,
  createMemo,
  createSignal,
  Show,
  type Component,
} from "solid-js";
import logo from "./logo.svg";
import styles from "./App.module.css";

import type { FeatureCollection } from "geojson";
import {
  MapsProvider,
  Maplibre,
  Marker,
  Popup,
  NavigationControl,
  FullScreenControl,
  Source,
  TerrainControl,
  useMaps,
  CircleLayer,
  HillshadeLayer,
} from "src";
import "maplibre-gl/dist/maplibre-gl.css";
import { LngLatLike } from "maplibre-gl";
import Cluster from "./Cluster";
import AnimateImg from "./AnimateImg";
const App: Component = () => {
  const [visible, setVisible] = createSignal<boolean>(true);
  const [lnglat, setLngLat] = createSignal<LngLatLike>([12.88, 48.1]);
  const [popupInstance, setPopupInstance] = createSignal<maplibregl.Popup>();

  //   createEffect(() => console.log(lnglat()))
  return (
    <div class={styles.App}>
      <MapsProvider>
        <MapsProbe />
        <Maplibre
          style={{
            height: "400px",
            width: "100%",
          }}
          options={{
            center: [142, 43],
            style:
              "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
            zoom: 5,
          }}
        >
          <Marker
            draggable={true}
            lnglat={[141.692222, 42.775]}
            popup={popupInstance()}
          />
          <Popup anchor="top" content="you are here" ref={setPopupInstance} />

          <NavigationControl />
          <FullScreenControl />
        </Maplibre>
        {/* map 2 */}

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
                type: "circle",
                paint: {
                  "circle-radius": 10,
                  "circle-color": "#007cbf",
                },
              }}
            />
          </Source>
        </Maplibre>
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
            style:
              "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
          }}
        >
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
                type: "hillshade",
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
            onclick={(e) => {
              setVisible(!visible());
            }}
            ondrag={(e) => {
              setLngLat(e.target.getLngLat().toArray());
            }}
          />
          {/* <Show when={visible()}> */}
          <Popup
            anchor="top"
            content="you are here"
            position={lnglat()}
            onClose={() => {
              setVisible(false);
            }}
          />
          {/* </Show> */}
        </Maplibre>
        <Cluster />
        <AnimateImg />
      </MapsProvider>
    </div>
  );
};

export default App;

const geojson: FeatureCollection = {
  type: "FeatureCollection",
  features: [
    {
      type: "Feature",
      geometry: {
        type: "Point",
        coordinates: [-122.4, 37.8],
      },
      properties: {},
    },
  ],
};

const MapsProbe = () => {
  const keys = createMemo(() =>
    [...(useMaps()?.maps().keys() ?? [])].join(", "),
  );
  return <p>Mounted maps: {keys()}</p>;
};
