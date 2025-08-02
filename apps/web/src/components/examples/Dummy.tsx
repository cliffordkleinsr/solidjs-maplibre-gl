import type { Component } from "solid-js";
import { Maplibre } from "solidjs-maplibre-gl";

const Dummy: Component<{}> = (props) => {
  
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
      
      
    ></Maplibre>
  );
};

export default Dummy;