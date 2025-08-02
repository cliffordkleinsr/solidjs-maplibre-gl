import {
  createEffect,
  createSignal,
  on,
  onCleanup,
  type Component,
} from "solid-js";
import { LineLayer, Maplibre, Source } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import * as d3 from "d3-fetch";
import type { FeatureCollection, Feature, LineString, Position } from "geojson";
import type { LngLatLike } from "maplibre-gl";

// A feature with a LineString geometry and no properties
type LineStringFeature = Feature<LineString, null>;

// Your feature collection of LineStrings, no properties needed
type LineStringFeatureCollection = {
  type: "FeatureCollection";
  features: LineStringFeature[];
};

type BaseFeatureCollection = Omit<
  FeatureCollection<LineString, null>,
  "features"
> & {
  features: LineStringFeature[];
};

const RouteFeat: Component = (props) => {
  const [geoData, setGeoData] = createSignal<BaseFeatureCollection | null>(
    null,
  );
  const [map, setMap] = createSignal<maplibregl.Map>();
  //reactive gotcha
  createEffect(
    on(
      map,
      async (currentMap) => {
        if (!currentMap) return;

        const data = (await d3.json(
          "https://maplibre.org/maplibre-gl-js/docs/assets/hike.geojson",
        )) as BaseFeatureCollection;

        const coordinates = data.features[0].geometry.coordinates;
        data.features[0].geometry.coordinates = [coordinates[0]];

        setGeoData(data);
        currentMap
          .jumpTo({ center: coordinates[0] as LngLatLike, zoom: 14 })
          .setPitch(30);
        // on a regular basis, add more coordinates from the saved list and update the map
        let i = 0;
        const timer = setInterval(() => {
          if (i < coordinates.length) {
            data.features[0].geometry.coordinates.push(coordinates[i]);
            const source = map()?.getSource("trace") as
              | maplibregl.GeoJSONSource
              | undefined;
            source?.setData(data);
            map()?.panTo(coordinates[i] as LngLatLike);
            i++;
          } else {
            clearInterval(timer);
          }
        }, 10);
      },
      { defer: true },
    ),
  );
  return (
    <Maplibre
      style={{
        height: "55vh",
        "min-height": "300px",
      }}
      options={{
        zoom: 0,
        style: "https://tiles.openfreemap.org/styles/liberty",
      }}
      onidle={(e) => {
        setMap(e.target);
      }}
    >
      <Source
        id="trace"
        source={{
          type: "geojson",
          data: geoData() as FeatureCollection,
        }}
      >
        <LineLayer
          layer={{
            paint: {
              "line-color": "#9b5b08ff",
              "line-opacity": 0.75,
              "line-width": 5,
            },
          }}
        />
      </Source>
    </Maplibre>
  );
};

export default RouteFeat;
