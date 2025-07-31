import type { Component } from "solid-js";
import { FullScreenControl, Maplibre } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const Fullscreen: Component = (props) => {
  
  return (
    <Maplibre
      style={{
        height: "55vh",
        "min-height": "300px",
      }}
      options={{
        style:
          "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      }}
    >
         <FullScreenControl position="top-left" />
    </Maplibre>
  );
};

export default Fullscreen;