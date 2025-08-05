import { createEffect, createMemo, createSignal, type Component, type JSX } from "solid-js";
import { Maplibre, MapsProvider, useMaps } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";
import syncMaps from './sync'

const MapCProvider: Component = (props) => {
  const [maplist, setMapList] = createSignal<maplibregl.Map[]>([])
  
  createEffect(() => {
    syncMaps(...maplist());
  })
  return (
    <div style={{position: 'relative', height: '100%', "min-height": '500px', "margin-bottom": '100px'}}>
        <MapsProvider>
            <MapsProbe />
            <Maplibre
                style={{
                    position: 'absolute',
                    width: '50%',
                    height: '100%',
                }}
                options={{
                    zoom: 11,
                    center: [-73.98549273280152, 40.74944478577233],
                    pitch: 30,
                    style:'https://basemaps.cartocdn.com/gl/positron-gl-style/style.json'
                }}
                onidle={(e) => {
                    setMapList((m) => {
                        if (m.includes(e.target)) {
                            return m
                        } else {
                            return [...m, e.target]
                        }
                    })
                }}
            />
            <Maplibre
                style={{
                    position: 'absolute',
                    left: '50%',
                    width: '50%',
                    height: '100%'
                }}
                options={{
                    zoom: 11,
                    center: [-73.98549273280152, 40.74944478577233],
                    pitch: 30,
                    style:'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json'
                }}
                onidle={(e) => {
                    setMapList((m) => {
                        if (m.includes(e.target)) {
                            return m
                        } else {
                            return [...m, e.target]
                        }
                        
                    })
                }}
            />
        </MapsProvider>
    </div>
  );
};

export default MapCProvider;

const MapsProbe = () => {
  const keys = createMemo(() =>
    [...(useMaps()?.maps().keys() ?? [])].join(", "),
  );
  return <p style={mounted}>Mounted maps: <span style={{"font-family":'sans-serif'}}>{keys()}</span></p>;
};

const mounted:JSX.CSSProperties = {
    'padding': '0.7rem 1rem',
    background: '#3d3d3dff',
    "border-top-right-radius": '16px'
}