import { createEffect, createSignal, type Component } from "solid-js";
import { CircleLayer, GlobeControl, Maplibre, Source, SymbolLayer } from "src";
import "maplibre-gl/dist/maplibre-gl.css";
import styles from "../modules/Cluster.module.css";

const Cluster: Component = (props) => {
	const [cluster, setCluster] = createSignal(true);
	const [clusterMaxZoom, setClusterMaxZoom] = createSignal(11);
	const [clusterRadius, setClusterRadius] = createSignal(50);

	return (
		<Maplibre
			style={{
				height: "55vh",
				"min-height": "300px",
				"margin-top": "12px",
			}}
			options={{
				center: [180, 35],
				zoom: 2,
				style:
					"https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json",
			}}
		>
			<Source
				id="geojson"
				source={{
					type: "geojson",
					data: "https://maplibre.org/maplibre-gl-js/docs/assets/earthquakes.geojson",
					cluster: cluster(),
					clusterMaxZoom: cluster() ? clusterMaxZoom() : undefined,
					clusterRadius: cluster() ? clusterRadius() : undefined,
				}}
			>
				<CircleLayer
					layer={{
						type: "circle",
						filter: ["has", "point_count"],
						paint: {
							"circle-color": [
								"step",
								["get", "point_count"],
								"#51bbd6",
								50,
								"#f1f075",
								150,
								"#f28cb1",
							],
							"circle-radius": ["+", 10, ["sqrt", ["get", "point_count"]]],
							"circle-opacity": 0.8,
						},
					}}
				/>

				<SymbolLayer
					layer={{
						type: "symbol",
						filter: ["has", "point_count"],
						layout: {
							"text-field": "{point_count_abbreviated}",
							"text-size": 12,
						},
					}}
				/>
				<CircleLayer
					layer={{
						type: "circle",
						filter: ["!has", "point_count"],
						paint: {
							"circle-color": "#ffff00",
							"circle-radius": 2,
						},
					}}
				/>
			</Source>
			<GlobeControl />
		</Maplibre>
	);
};

export default Cluster;
