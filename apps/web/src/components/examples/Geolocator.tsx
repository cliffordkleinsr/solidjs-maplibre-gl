import type { Component } from "solid-js";
import { Maplibre, GeolocateControl } from "solidjs-maplibre-gl";
// import '@maplibre/maplibre-gl-geocoder/dist/maplibre-gl-geocoder.css';
import "maplibre-gl/dist/maplibre-gl.css";
const Geocoder: Component = (props) => {
  
  return (
    <Maplibre
        style={{
            height: "55vh",
            "min-height":'300px'
        }}
        options={{
            center: [-79.4512, 43.6568],
            zoom: 13,
            style:"https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json"
        }}
    >
        <GeolocateControl />
    </Maplibre>
  );
};

export default Geocoder;