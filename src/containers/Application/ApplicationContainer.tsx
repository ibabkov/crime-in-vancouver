import React from 'react';

import { Map, Layer, Source, MapEvent } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useFetchCrimeData } from '../../hooks/useFetchCrimeData';
import { HEATMAP_PAINT_OPTIONS } from '../../constants/heatMapLayer';
import { CIRCLE_PAINT_OPTIONS } from '../../constants/circleLayer';
import { BUILDING_PAINT_OPTIONS } from '../../constants/buildingLayer';
import {
	MAP_3D_TERRAIN,
	MAP_BOUNDS,
	MAP_INITIAL_VIEW_STATE,
	MAP_STYLE,
	MAP_MIN_ZOOM,
	MAP_MAX_ZOOM,
	MAPBOX_ACCESS_TOKEN,
	MAP_BORDER_ZOOM,
} from '../../constants/map';
import { MapLayout } from '../../components/MapLayout';

export function ApplicationContainer() {
	const [mapLoaded, setMapLoaded] = React.useState(false);
	const [crimeData, dataLoadingProgress] = useFetchCrimeData();
	const dataLoaded = Boolean(crimeData) && [-1, 1].includes(dataLoadingProgress);
	const handleLoad = React.useCallback(
		({ target: map }: MapEvent) => {
			setMapLoaded(true);
			map.addSource('mapbox-dem', { type: 'raster-dem', url: MAP_3D_TERRAIN, tileSize: 512, maxzoom: MAP_MAX_ZOOM });
			map.setTerrain({ source: 'mapbox-dem', exaggeration: ['interpolate', ['linear'], ['zoom'], MAP_MIN_ZOOM, 1.5, MAP_MAX_ZOOM, 0.4] });
		},
		[setMapLoaded],
	);

	return (
		<MapLayout dataLoaded={dataLoaded} loadingProgress={dataLoadingProgress} mapLoaded={mapLoaded}>
			<Map
				mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
				initialViewState={MAP_INITIAL_VIEW_STATE}
				mapStyle={MAP_STYLE}
				maxBounds={MAP_BOUNDS}
				onLoad={handleLoad}
			>
				<Source id={'heatmap-source'} type={'geojson'} data={crimeData!} />
				<Layer source={'heatmap-source'} id="heatmap-layer" type="heatmap" maxzoom={MAP_BORDER_ZOOM} paint={HEATMAP_PAINT_OPTIONS} />
				<Layer source={'heatmap-source'} id="circle-layer" type="circle" minzoom={MAP_BORDER_ZOOM} paint={CIRCLE_PAINT_OPTIONS} />
				<Layer
					id="building-layer"
					source="composite"
					type="fill-extrusion"
					source-layer="building"
					filter={['==', 'extrude', 'true']}
					minzoom={MAP_BORDER_ZOOM}
					paint={BUILDING_PAINT_OPTIONS}
				/>
			</Map>
		</MapLayout>
	);
}
