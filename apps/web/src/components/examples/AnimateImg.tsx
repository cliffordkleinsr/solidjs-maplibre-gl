import {
  createEffect,
  createMemo,
  createSignal,
  type Component,
} from "solid-js";
import { Maplibre, RasterLayer, Source } from "solidjs-maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const AnimateImg: Component = (props) => {
  const FRAME_COUNT = 5;
  const [frame, setFrame] = createSignal(0);

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
      }}
      options={{
        zoom: 5,
        center: [-76, 43],
        style:
          "https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
      }}
    >
      <Source
        id="image"
        source={{
          type: "image",
          url: `https://maplibre.org/maplibre-gl-js/docs/assets/radar${frame()}.gif`,
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
