import { FillExtrusionPaint } from 'mapbox-gl';

export const BUILDING_PAINT_OPTIONS: FillExtrusionPaint = {
	'fill-extrusion-color': '#222227',
	'fill-extrusion-height': ['interpolate', ['linear'], ['zoom'], 15, 0, 16.05, ['get', 'height']],
	'fill-extrusion-base': ['interpolate', ['linear'], ['zoom'], 15, 0, 16.05, ['get', 'min_height']],
	'fill-extrusion-opacity': 0.8,
};
