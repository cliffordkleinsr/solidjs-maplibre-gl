/**
 * Sync movements of two maps.
 *
 * All interactions that result in movement end up firing
 * a "move" event. The trick here, though, is to
 * ensure that movements don't cycle from one map
 * to the other and back again, because such a cycle
 * - could cause an infinite loop
 * - prematurely halts prolonged movements like
 *   double-click zooming, box-zooming, and flying
 */
export default function syncMaps(...maps: maplibregl.Map[]) {
  // Create all the movement functions, because if they're created every time
  // they wouldn't be the same and couldn't be removed.
  let fns: Parameters<maplibregl.Map["on"]>[1][] = [];
  maps.forEach((map, index) => {
    // When one map moves, we turn off the movement listeners
    // on all the maps, move it, then turn the listeners on again
    fns[index] = () => {
      off();

      const center = map.getCenter();
      const zoom = map.getZoom();
      const bearing = map.getBearing();
      const pitch = map.getPitch();

      const clones = maps.filter((o, i) => i !== index);
      clones.forEach((clone) => {
        clone.jumpTo({
          center: center,
          zoom: zoom,
          bearing: bearing,
          pitch: pitch,
        });
      });

      on();
    };
  });

  const on = () => {
    maps.forEach((map, index) => {
      map.on("move", fns[index]);
    });
  };

  const off = () => {
    maps.forEach((map, index) => {
      map.off("move", fns[index]);
    });
  };

  on();

  return () => {
    off();
    fns = [];
    maps = [];
  };
}
