import React from 'react';

import { Map, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useFetchCrimeData } from '../../hooks/useFetchCrimeData';
import { HEATMAP_PAINT_OPTIONS } from '../../constants/heatMapLayer';
import { CIRCLE_PAINT_OPTIONS } from '../../constants/circleLayer';
import { BUILDING_PAINT_OPTIONS } from '../../constants/buildingLayer';
import { MAP_BOUNDS, MAP_INITIAL_VIEW_STATE, MAP_STYLE, MAPBOX_ACCESS_TOKEN } from '../../constants/map';
import { MapLayout } from '../../components/MapLayout';

export function ApplicationContainer() {
	const [mapLoad, setMapLoad] = React.useState(false);
	const crimeData = useFetchCrimeData();
	const handleLoad = React.useCallback(() => setMapLoad(true), [setMapLoad]);

	return (
		<MapLayout dataLoad={Boolean(crimeData)} mapLoad={mapLoad}>
			<Map
				mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
				initialViewState={MAP_INITIAL_VIEW_STATE}
				mapStyle={MAP_STYLE}
				maxBounds={MAP_BOUNDS}
				onLoad={handleLoad}
			>
				<Source id={'heatmap-source'} type={'geojson'} data={crimeData!} />
				<Layer source={'heatmap-source'} id="heatmap-layer" type="heatmap" maxzoom={15} paint={HEATMAP_PAINT_OPTIONS} />
				<Layer source={'heatmap-source'} id="circle-layer" type="circle" minzoom={15} paint={CIRCLE_PAINT_OPTIONS} />
				<Layer
					id="building-layer"
					source="composite"
					type="fill-extrusion"
					source-layer="building"
					filter={['==', 'extrude', 'true']}
					minzoom={15}
					paint={BUILDING_PAINT_OPTIONS}
				/>
			</Map>
		</MapLayout>
	);
}
