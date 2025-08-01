import maplibregl from "maplibre-gl";
import {
	createEffect,
	createSignal,
	onCleanup,
	Show,
	type Component,
} from "solid-js";
import {
	Maplibre,
	Source,
	Popup,
	FeatureState,
	FillLayer,
	LineLayer,
} from "src";
import "maplibre-gl/dist/maplibre-gl.css";

const HoverStyle: Component<{}> = (props) => {
	const [hoveredFeature, sethoveredFeature] = createSignal<
		maplibregl.MapGeoJSONFeature | undefined
	>();
	const [popupInstance, setPopupInstance] = createSignal<maplibregl.Popup>();
	const [lnglat, setLngLat] = createSignal(new maplibregl.LngLat(0, 0));

	onCleanup(() => {
		popupInstance()?.remove();
	});
	return (
		<Maplibre
			style={{
				height: "55vh",
				"min-height": "300px",
			}}
			options={{
				style:
					"https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
				zoom: 2,
				center: [-100.486052, 37.830348],
			}}
		>
			<Source
				id="geojson"
				source={{
					type: "geojson",
					data: "https://maplibre.org/maplibre-gl-js/docs/assets/us_states.geojson",
				}}
			>
				<FillLayer
					layer={{
						paint: {
							"fill-color": "#00ff55",
							// Change the opacity for the hovered feature
							"fill-opacity": [
								"case",
								["boolean", ["feature-state", "hover"], false],
								0.4,
								0.1,
							],
						},
					}}
					onmousemove={(e) => {
						sethoveredFeature(e.features?.[0]);
						setLngLat(e.lngLat);
					}}
					onmouseleave={(e) => {
						sethoveredFeature(undefined);
					}}
				/>
				<LineLayer
					layer={{
						paint: {
							"line-color": "#00ff55",
							"line-opacity": [
								"case",
								["boolean", ["feature-state", "hover"], false],
								1,
								0.3,
							],
							"line-width": 1,
						},
					}}
				/>
				<Show when={hoveredFeature()} keyed>
					{(hov) => (
						<>
							<FeatureState
								source="geojson"
								id={hoveredFeature()?.id}
								state={{ hover: true, selected: false }}
							/>
							<Popup
								position={lnglat()}
								closeButton={false}
								content={`${hoveredFeature()?.properties.STATE_NAME}`}
								ref={setPopupInstance}
							/>
						</>
					)}
				</Show>
			</Source>
		</Maplibre>
	);
};

export default HoverStyle;
