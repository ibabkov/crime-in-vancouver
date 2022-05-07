export const MAP_BOUNDS: [[number, number], [number, number]] = [
  [-123.2, 49.2], // Southwest coordinates
  [-123.05, 49.3], // Northeast coordinates
];
export const MAP_INITIAL_VIEW_STATE = {
  longitude: -123.12,
  latitude: 49.28,
  zoom: 14,
  minZoom: 13,
  maxZoom: 17,
  pitch: 75,
  bearing: -27,
};

export const MAP_STYLE = 'mapbox://styles/mapbox/dark-v10';

export const MAPBOX_TOKEN =
  'pk.eyJ1Ijoic2luZGVzMjU1IiwiYSI6ImNrc2FsazdndzBjYW8yb28zdzdnMDk5YWQifQ.m9gSKlbl9DaYBESMm8qy8A';
