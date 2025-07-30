import type { Component } from "solid-js";
import { Maplibre, Marker } from "solidjs-maplibre-gl";

const SimpleMarker: Component<{}> = (props) => {
  
  return (
    <Maplibre
            style={{
                height: "400px",
                width: "100%",
            }}
            options={{
                style:"https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
                center: [142, 43],
                zoom:5
            }}
    >
        <Marker lnglat={[141.692222, 42.775]} />
    </Maplibre>
  );
};

export default SimpleMarker;