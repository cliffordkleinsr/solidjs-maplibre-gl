import {
  createSignal,
  For,
  type Component,
  type JSX,
  type ParentComponent,
} from "solid-js";
import styles from "../modules/Form.module.css";
import { COLOR_RAMPS } from "./utils";
import {
  ColorReliefLayer,
  GlobeControl,
  HillshadeLayer,
  Light,
  Maplibre,
  Source,
  TerrainControl,
} from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

type ColorRamp = keyof typeof COLOR_RAMPS;
const [colorRamp, setColorRamp] = createSignal<ColorRamp>("LINZ");
const [hillshade, setHillshade] = createSignal(0.4);
const ColorRelief: Component = (props) => {
  return (
    <>
      <Maplibre
        style={{
          height: "55vh",
          "min-height": "300px",
        }}
        options={{
          center: [11.5, 47.3],
          zoom: 9.5,
          style:
            "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
        }}
      >
        <Source
          id="terrain"
          source={{
            type: "raster-dem",
            tiles: [
              "https://demotiles.maplibre.org/terrain-tiles/{z}/{x}/{y}.png",
            ],
            minzoom: 0,
            maxzoom: 12,
            tileSize: 256,
            attribution:
              "<a href='https://earth.jaxa.jp/en/data/policy/'>AW3D30 (JAXA)</a>",
          }}
        >
          <TerrainControl
            position="top-right"
            options={{
              source: "terrain",
              exaggeration: 1.5,
            }}
          />
        </Source>
        <Source
          source={{
            type: "raster-dem",
            tiles: [
              "https://demotiles.maplibre.org/terrain-tiles/{z}/{x}/{y}.png",
            ],
            minzoom: 0,
            maxzoom: 12,
            tileSize: 256,
            attribution:
              "<a href='https://earth.jaxa.jp/en/data/policy/'>AW3D30 (JAXA)</a>",
          }}
        >
          <ColorReliefLayer
            layer={{
              paint: {
                "color-relief-opacity": 1,
                "color-relief-color": COLOR_RAMPS[colorRamp()],
              },
            }}
          />
          <HillshadeLayer
            layer={{
              paint: {
                "hillshade-method": "igor",
                "hillshade-exaggeration": hillshade(),
                "hillshade-highlight-color": "#ffffff",
              },
            }}
          />
        </Source>
        <Light anchor="map" />
        <GlobeControl />
      </Maplibre>
      <div class={styles.control_panel}>
        <div>
          <Select />
        </div>
        <div>
          <Slider />
        </div>
      </div>
    </>
  );
};

export default ColorRelief;

const Select: ParentComponent<JSX.HTMLAttributes<HTMLSelectElement>> = (
  props,
) => {
  return (
    <select
      class={styles.select}
      value={colorRamp()}
      onChange={(e) => {
        setColorRamp(e.target.value);
      }}
    >
      <For each={Object.keys(COLOR_RAMPS)}>
        {(ramp) => <option value={ramp}>{ramp}</option>}
      </For>
    </select>
  );
};

const Slider: ParentComponent<JSX.HTMLAttributes<HTMLInputElement>> = (
  props,
) => {
  return (
    <div class={styles.slider}>
      <label for="">Hillshade</label>
      <input
        type="range"
        value={hillshade()}
        onChange={(e) => {
          setHillshade(parseFloat(e.target.value));
        }}
        min={0}
        max={1}
        step={0.01}
      />
    </div>
  );
};
