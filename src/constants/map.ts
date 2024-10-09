export const MAP_BOUNDS: [[number, number], [number, number]] = [
	[-123.2, 49.2], // Southwest coordinates
	[-123.05, 49.3], // Northeast coordinates
];

export const MAP_MIN_ZOOM = 13;
export const MAP_MAX_ZOOM = 17;
export const MAP_INITIAL_VIEW_STATE = {
	longitude: -123.12,
	latitude: 49.28,
	zoom: 14,
	minZoom: MAP_MIN_ZOOM,
	maxZoom: MAP_MAX_ZOOM,
	pitch: 75,
	bearing: -27,
};
export const MAP_BORDER_ZOOM = 15;

export const MAP_STYLE = 'mapbox://styles/mapbox/dark-v10';
export const MAP_3D_TERRAIN = 'mapbox://mapbox.terrain-rgb';

export const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN;
