import { createEffect, createSignal, type Component } from "solid-js";
import { LineLayer, Maplibre, Source } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import type { FeatureCollection } from "geojson";
const AnimLine: Component = (props) => {
  const speedFactor = 30; // number of frames per longitude degree
  let startTime = performance.now();
  let progress = 0; // progress = timestamp - startTime
  let resetTime = false;

  const [map, setMap] = createSignal<maplibregl.Map>();

  const geojson = {
    type: "FeatureCollection",
    features: [
      {
        type: "Feature",
        geometry: {
          type: "LineString",
          coordinates: [[0, 0]],
        },
        properties: [],
      },
    ],
  };

  createEffect(() => {
    const source = map()?.getSource("line") as
      | maplibregl.GeoJSONSource
      | undefined;
    function animateLine(timestamp: number) {
      if (resetTime) {
        // resume previous progress
        startTime = performance.now() - progress;
        resetTime = false;
      } else {
        progress = timestamp - startTime;
      }

      // restart if it finishes a loop
      if (progress > speedFactor * 360) {
        startTime = timestamp;
        geojson.features[0].geometry.coordinates = [];
      } else {
        const x = progress / speedFactor;
        // draw a sine wave with some math.
        const y = Math.sin((x * Math.PI) / 90) * 40;
        // append new coordinates to the lineString
        geojson.features[0].geometry.coordinates.push([x, y]);
        // then update the map
        source?.setData(geojson as FeatureCollection);
      }
      // Request the next frame of the animation.
      requestAnimationFrame(animateLine);
    }
    requestAnimationFrame(animateLine);
  });
  return (
    <Maplibre
      style={{
        height: "55vh",
        "min-height": "300px",
      }}
      options={{
        zoom: 0.5,
        center: [0, 0],
        style: "https://tiles.openfreemap.org/styles/bright",
      }}
      onidle={(e) => {
        setMap(e.target);
      }}
    >
      <Source
        id="line"
        source={{
          type: "geojson",
          data: geojson as FeatureCollection,
        }}
      >
        <LineLayer
          layer={{
            layout: {
              "line-cap": "round",
              "line-join": "round",
            },
            paint: {
              "line-color": "#ed6498",
              "line-width": 5,
              "line-opacity": 0.8,
            },
          }}
        />
      </Source>
    </Maplibre>
  );
};

export default AnimLine;
