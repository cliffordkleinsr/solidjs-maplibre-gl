import {
  createEffect,
  createMemo,
  createSignal,
  type Component,
} from "solid-js";
import { Maplibre, RasterLayer, Source } from "src";
import "maplibre-gl/dist/maplibre-gl.css";

const AnimateImg: Component = (props) => {
  const FRAME_COUNT = 5;
  const [frame, setFrame] = createSignal(0);
  function getPath() {
    return `https://maplibre.org/maplibre-gl-js/docs/assets/radar${frame()}.gif`;
  }
  createEffect(() => {
    function update() {
      setFrame(Math.round((performance.now() / 1000) * 5) % FRAME_COUNT);
      requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  });

  return (
    <Maplibre
      style={{
        height: "55vh",
        "min-height": "300px",
        "margin-top": "20px",
      }}
      options={{
        zoom: 5,
        center: [-76, 43],
        style:
          "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      }}
    >
      <Source
        id="radar"
        source={{
          type: "image",
          url: getPath(),
          coordinates: [
            [-80.425, 46.437],
            [-71.516, 46.437],
            [-71.516, 37.936],
            [-80.425, 37.936],
          ],
        }}
      >
        <RasterLayer
          layer={{
            "source-layer": "radar",
            paint: {
              "raster-fade-duration": 0,
            },
          }}
        />
      </Source>
    </Maplibre>
  );
};

export default AnimateImg;
