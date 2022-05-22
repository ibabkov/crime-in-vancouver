import React from 'react';

import { InteractiveMap, Layer, Source } from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';

import { useFetchCrimeData } from '../../hooks/useFetchCrimeData';
import { HEATMAP_PAINT_OPTIONS } from '../../constants/heatMapLayer';
import { CIRCLE_PAINT_OPTIONS } from '../../constants/circleLayer';
import { BUILDING_PAINT_OPTIONS } from '../../constants/buildingLayer';
import {
  MAP_BOUNDS,
  MAP_INITIAL_VIEW_STATE,
  MAP_STYLE,
  MAPBOX_TOKEN,
} from '../../constants/map';
import { MapLayout } from '../../components/MapLayout';

export function ApplicationContainer() {
  const [load, setLoad] = React.useState(false);
  const crimeData = useFetchCrimeData();
  const handleLoad = React.useCallback(() => setLoad(true), [setLoad]);

  return (
    <MapLayout load={load}>
      <InteractiveMap
        {...MAP_INITIAL_VIEW_STATE}
        mapboxApiAccessToken={MAPBOX_TOKEN}
        mapStyle={MAP_STYLE}
        onLoad={handleLoad}
      >
        <Source id={'heatmap-source'} type={'geojson'} data={crimeData}>
          <Layer
            id="heatmap-layer"
            type="heatmap"
            maxzoom={15}
            paint={HEATMAP_PAINT_OPTIONS}
          />
          <Layer
            id="circle-layer"
            type="circle"
            minzoom={15}
            paint={CIRCLE_PAINT_OPTIONS}
          />
        </Source>
        <Layer
          id="building-layer"
          source="composite"
          type="fill-extrusion"
          source-layer="building"
          filter={['==', 'extrude', 'true']}
          minzoom={15}
          paint={BUILDING_PAINT_OPTIONS}
        />
      </InteractiveMap>
    </MapLayout>
  );
}
