import type { GeoJSON, FeatureCollection, Geometry, Position } from "geojson";
import type { Source, GeoJSONSource } from "maplibre-gl";
import * as maplibre from "maplibre-gl";
import { onCleanup } from "solid-js";

/**
 * Performs a deep equality comparison between two values
 * @param a - First value to compare
 * @param b - Second value to compare
 * @returns True if values are deeply equal, false otherwise
 */
export function deepEqual(a: unknown, b: unknown): boolean {
	if (typeof a !== typeof b) return false;

	if (
		typeof a === "object" &&
		typeof b === "object" &&
		a !== null &&
		b !== null
	) {
		for (const key in a) {
			if (!(key in b)) return false;

			if (
				!deepEqual(
					(a as Record<string, unknown>)[key],
					(b as Record<string, unknown>)[key],
				)
			)
				return false;
		}
		for (const key in b) {
			if (!(key in a)) return false;

			if (
				!deepEqual(
					(a as Record<string, unknown>)[key],
					(b as Record<string, unknown>)[key],
				)
			)
				return false;
		}
		return true;
	}

	return a === b;
}

/**
 * Type guard to check if a source is a GeoJSON source
 * @param source - The source to check
 * @returns True if the source is a GeoJSON source
 */
export function isGeoJSONSource(source?: Source): source is GeoJSONSource {
	return source?.type === "geojson";
}

/**
 * Type guard to check if GeoJSON data is a FeatureCollection
 * @param data - The data to check, either a string or GeoJSON object
 * @returns True if the data is a FeatureCollection
 */
export function isFeatureCollection(
	data: string | GeoJSON,
): data is FeatureCollection {
	return typeof data === "object" && data.type === "FeatureCollection";
}

/**
 * Extracts all coordinate positions from a GeoJSON geometry
 * @param g - The GeoJSON geometry to process
 * @returns Array of coordinate positions
 */
export function geometryPoints(g: Geometry): Position[] {
	switch (g.type) {
		case "Point":
			return [g.coordinates];
		case "GeometryCollection":
			return g.geometries.flatMap(geometryPoints);
		case "LineString":
			return g.coordinates;
		case "MultiLineString":
			return g.coordinates.flat(1);
		case "MultiPoint":
			return g.coordinates;
		case "MultiPolygon":
			return g.coordinates.flat(2);
		case "Polygon":
			return g.coordinates.flat(1);
		default:
			return [];
	}
}

/**
 * Type definition for MapLibre event handlers
 * Maps event names to their corresponding handler functions
 * @template T - Type extending maplibre.Evented, defaults to maplibre.Map
 */
export type MapEvents<T extends maplibre.Evented = maplibre.Map> = Partial<{
	[P in keyof maplibre.MapEventType as `on${P}`]: (
		e: Omit<maplibre.MapEventType[P], "target"> & { target: T },
	) => void;
}>;

/**
 * Adds event listeners to a MapLibre target and handles cleanup
 * @param target - The MapLibre evented object to attach listeners to
 * @param listeners - Object containing event handlers
 * @template T - Type extending maplibre.Evented
 */
export function addEventListeners<T extends maplibre.Evented>(
	target: T,
	listeners: MapEvents<T>,
) {
	for (const [key, listener] of Object.entries(listeners)) {
		if (!key.startsWith("on")) {
			continue;
		}

		const name = key.slice(2).toLowerCase();
		if (
			name === "click" &&
			"getElement" in target &&
			typeof target.getElement === "function"
		) {
			const el = (target as any).getElement?.();
			if (el) {
				el.addEventListener("click", listener);
				onCleanup(() => el.removeEventListener("click", listener));
			}
		} else {
			// Normal maplibre event
			target.on(name, listener);
			onCleanup(() => {
				target.off(name, listener);
			});
		}
	}
}
