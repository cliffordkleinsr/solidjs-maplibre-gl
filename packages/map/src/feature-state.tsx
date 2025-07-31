import { onCleanup, splitProps } from "solid-js";
import { useMapEffect, useMap } from "./map";

type FeatureStateProps = {
	source: string;
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
 * @param props.id - The ID of the feature to set state for (optional)
 * @param props.state - An object containing the state to set for the feature(s)
 *
 * @returns An empty fragment
 */
export function FeatureState(initial: FeatureStateProps) {
	const [props] = splitProps(initial, ["source", "id", "state"]);

	useMapEffect((map) => {
		map.setFeatureState({ source: props.source, id: props.id }, props.state);
		onCleanup(() => {
			if (map) {
				map.setFeatureState({ source: props.source, id: props.id }, {});
			}
		});
	});

	return <></>;
}
