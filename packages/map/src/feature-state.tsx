import { createMemo, onCleanup, splitProps } from "solid-js";
import { useMapEffect, useMap } from "./map";

type FeatureStateProps = {
  source: string;
  sourceLayer?: string;
  id?: string | number;
  state: Record<string, any>;
};

/**
 * A component to manage feature states in a MapLibre GL JS map.
 *
 * @component
 * @example
 * ```tsx
 * // Set a feature state for a single feature
 * <FeatureState
 *   source="my-source"
 *   id={123}
 *   state={{ hover: true, selected: false }}
 * />
 *
 * // Set a feature state without an ID (affects all features in source)
 * <FeatureState
 *   source="my-source"
 *   state={{ visible: true }}
 * />
 * ```
 *
 * @remarks
 * The feature state will be automatically cleaned up when the component unmounts.
 *
 * @param props - The component props
 * @param props.source - The ID of the source
 * @param sourceLayer - The reference `Source` layer
 * @param props.id - The ID of the feature to set state for (optional)
 * @param props.state - An object containing the state to set for the feature(s)
 *
 * @returns An empty fragment
 */
export function FeatureState(initial: FeatureStateProps) {
  const [props] = splitProps(initial, ["source", "sourceLayer", "id", "state"]);

  let prevKeys: string[] = [];
  let prevIdentifier:
    | { source: string; sourceLayer?: string; id?: string | number }
    | undefined;

  useMapEffect((map) => {
    const currentIdentifier = {
      source: props.source,
      sourceLayer: props.sourceLayer,
      id: props.id,
    };
    const newKeys = new Set(Object.keys(props.state));

    // Remove outdated keys if the target feature changed or keys were removed
    if (prevIdentifier?.id !== undefined) {
      const targetChanged =
        prevIdentifier.id !== currentIdentifier.id ||
        prevIdentifier.source !== currentIdentifier.source ||
        prevIdentifier.sourceLayer !== currentIdentifier.sourceLayer;

      for (const key of prevKeys) {
        if (targetChanged || !newKeys.has(key)) {
          map.removeFeatureState(prevIdentifier, key);
        }
      }
    }
    // Apply new feature state
    if (currentIdentifier.id !== undefined) {
      map.setFeatureState(currentIdentifier, props.state);
    }

    // Update snapshots
    prevKeys = Array.from(newKeys);
    prevIdentifier = currentIdentifier;
    onCleanup(() => {
      if (!map || !prevIdentifier?.id) return;
      for (const key of prevKeys) {
        map.removeFeatureState(prevIdentifier, key);
      }
    });
  });

  return <></>;
}
