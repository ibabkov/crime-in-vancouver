import { HeatmapPaint } from 'mapbox-gl';

import { MAP_MIN_ZOOM } from './map';

export const HEATMAP_PAINT_OPTIONS: HeatmapPaint = {
	'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], MAP_MIN_ZOOM, 0.04, 14, 0.03],
	'heatmap-color': [
		'interpolate',
		['linear'],
		['heatmap-density'],
		0,
		'rgba(255, 255, 255,0)',
		0.2,
		'rgba(73, 227, 206, 0.1)',
		0.4,
		'rgba(255, 255, 206, 0.2)',
		0.8,
		'rgba(255, 150, 206, 0.2)',
		1.0,
		'rgba(255, 100, 206, 0.3)',
	],
	'heatmap-radius': ['interpolate', ['linear'], ['zoom'], MAP_MIN_ZOOM, 17, 14, 40],
};
