import type { LightSpecification } from "maplibre-gl";
import { onCleanup, splitProps, type Component } from "solid-js";
import { useMapEffect } from "./map";

type LightSpec = LightSpecification;

export const Light: Component<LightSpec> = (initialProps) => {
  const [props] = splitProps(initialProps, ["anchor"]);
  let prevLight: LightSpecification | undefined;
  useMapEffect((map) => {
    // Snapshot current light for later cleanup
    prevLight = map.getStyle().light as LightSpecification;
    // set Light
    map.setLight(props);

    onCleanup(() => {
      if (map.isStyleLoaded() && prevLight) {
        map.setLight(prevLight);
      }
    });
  });
  return <></>;
};
