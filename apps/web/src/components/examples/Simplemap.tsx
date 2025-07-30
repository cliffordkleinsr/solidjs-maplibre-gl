import type { Component } from "solid-js";
import { Maplibre } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const SimpleMap: Component<{}> = (props) => {
  return (
    <Maplibre
      style={{
        height: "400px",
        width: "100%",
      }}
      options={{
        style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
      }}
    />
  );
};

export default SimpleMap;
