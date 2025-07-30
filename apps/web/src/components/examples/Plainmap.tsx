import type { Component } from "solid-js";
import { Maplibre, NavigationControl, ScaleControl } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
const Plainmap: Component<{}> = (props) => {
  
  return (
        <Maplibre
            style={{
                width: "100%",
                height: '400px'
            }}
            options={{
                zoom:3.5,
                center: [12.86271398748148, 48.067124540317785]
            }}
            
        >
            <NavigationControl />
            <ScaleControl />
            {/* <GlobeControl />  todo */} 
        </Maplibre>
  );
};

export default Plainmap;