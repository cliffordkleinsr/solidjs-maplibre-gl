import { createEffect, createSignal, Show, type Component } from "solid-js";
import { CircleLayer, Maplibre, Source } from "src";

const TestErr: Component<{}> = (props) => {
	const geojson: GeoJSON.FeatureCollection = {
		type: "FeatureCollection",
		features: [
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [-122.4, 37.8],
				},
				properties: {
					name: "A",
				},
			},
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [-122.42, 37.82],
				},
				properties: {
					name: "B",
				},
			},
			{
				type: "Feature",
				geometry: {
					type: "Point",
					coordinates: [-122.38, 37.78],
				},
				properties: {
					name: "C",
				},
			},
		],
	};
	const [showLayer, setShowLayer] = createSignal(true);
	const toggleLayer = () => {
		setShowLayer(!showLayer());
	};
	//   createEffect(() => console.log(showLayer()))
	return (
		<div
			style={{
				height: "400px",
				width: "600px",
			}}
		>
			<button type="button" onClick={toggleLayer}>
				{showLayer() ? "Hide Layer" : "Show Layer"}
			</button>

			<Maplibre
				style={{
					"margin-top": "20px",
					height: "400px",
					width: "100%",
				}}
				options={{
					center: [-122.4, 37.8],
					zoom: 14,
					style: "https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
				}}
			>
				<Show when={showLayer()}>
					<Source
						id="my-data"
						source={{
							type: "geojson",
							data: geojson,
						}}
					>
						<CircleLayer
							layer={{
								paint: {
									"circle-radius": 10,
									"circle-color": "#007cbf",
								},
							}}
						/>
					</Source>
				</Show>
			</Maplibre>
		</div>
	);
};

export default TestErr;
