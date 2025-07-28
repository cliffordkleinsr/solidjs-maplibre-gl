import { render } from "@solidjs/testing-library";
import { createMemo } from "solid-js";
import { MapsProvider, useMaps, Maplibre } from "src";
import { afterEach, describe, expect, it, vi,  } from "vitest";



describe("Maps provider", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  const MapsProbe = () => {
    const mapsContext = useMaps();
    const ids = createMemo(() => {
      const ids = mapsContext?.maps().keys();
      return ids ? [...ids] : [];
    });
    return <p id="probe">maps: {ids().join(",")}</p>;
  };

  it("map registers itself in the provided maps context", () => {
    const result = render(() => (
      <MapsProvider>
        <Maplibre id="my-map" />
        <MapsProbe />
      </MapsProvider>
    ));
    expect(result.container.querySelector("#probe"))
  });
});