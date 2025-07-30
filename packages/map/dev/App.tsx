import {
	createEffect,
	createMemo,
	createSignal,
	Show,
	type Component,
} from "solid-js";
import logo from "./logo.svg";
import styles from "./App.module.css";

import type { FeatureCollection } from 'geojson'
import {
	MapsProvider,
	Maplibre,
	Marker,
	Popup,
	NavigationControl,
	FullScreenControl,
	Source,
	Layer,
	TerrainControl,
	useMaps
} from 'src'
import "maplibre-gl/dist/maplibre-gl.css";
const App: Component = () => {
	const [visible, setVisible] = createSignal<boolean>(false);
	const [popupInstance, setPopupInstance] = createSignal<maplibregl.Popup>();
	return (
		<div class={styles.App}>
			<MapsProvider>
				<MapsProbe />
				<Maplibre
					style={{
						height: "400px",
						width: "100%",
					}}
					options={{
						center: [142, 43],
						style:
							"https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
						zoom: 5,
					}}
				>
					<Marker
						draggable={true}
						lnglat={[141.692222, 42.775]}
						popup={popupInstance()}
					/>
					<Popup anchor="top" content="you are here" ref={setPopupInstance} />

					<NavigationControl />
					<FullScreenControl />
				</Maplibre>
				{/* map 2 */}

				<Maplibre
					style={{
						"margin-top": "20px",
						height: "400px",
						width: "100%",
					}}
					options={{
						center: [-122.4, 37.8],
						zoom: 14,
					}}
				>
					<Source
						id="my-data"
						source={{
							type: "geojson",
							data: geojson,
						}}
					>
						<Layer
							id="point"
							layer={{
								type: "circle",
								paint: {
									"circle-radius": 10,
									"circle-color": "#007cbf",
								},
							}}
						/>
					</Source>
				</Maplibre>
				<Maplibre
					style={{
						"margin-top": "20px",
						height: "400px",
						width: "100%",
					}}
					options={{
						center: [11.39085, 47.27574],
						zoom: 12,
						pitch: 70,
						style:
							"https://basemaps.cartocdn.com/gl/voyager-gl-style/style.json",
					}}
				>
					<Source
						id="terrain-dem"
						source={{
							type: "raster-dem",
							url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
							tileSize: 256,
						}}
					/>
					<Source
						id="hillshade-dem"
						source={{
							type: "raster-dem",
							url: "https://demotiles.maplibre.org/terrain-tiles/tiles.json",
							tileSize: 256,
						}}
					>
						<Layer
							id="dem"
							layer={{
								type: "hillshade",
								layout: {
									visibility: "visible",
								},
								paint: {
									"hillshade-shadow-color": "#473B24",
								},
							}}
						/>
					</Source>
					<TerrainControl
						options={{
							source: "terrain-dem",
							exaggeration: 1.5,
						}}
					/>
				</Maplibre>
			</MapsProvider>
		</div>
	);
};

export default App;

const geojson: FeatureCollection = {
	type: "FeatureCollection",
	features: [
		{
			type: "Feature",
			geometry: {
				type: "Point",
				coordinates: [-122.4, 37.8],
			},
			properties: {},
		},
	],
};

const MapsProbe = () => {
	const keys = createMemo(() =>
		[...(useMaps()?.maps().keys() ?? [])].join(", "),
	);
	return <p>Mounted maps: {keys()}</p>;
};
