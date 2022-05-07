import React from 'react';

import { csv } from 'd3-request';
import { FeatureCollection, Feature, Point } from 'geojson';

import { CRIMES_DATA_URL } from '../constants/crimeData';

const INITIAL_CRIME_DATA: FeatureCollection<Point> = {
  type: 'FeatureCollection',
  features: [],
};

function dataReducer(
  data: FeatureCollection<Point>,
  action: { payload: Feature<Point>[] }
): FeatureCollection<Point> {
  const { payload = [] } = action;

  return { ...data, features: payload };
}

export const useFetchCrimeData = () => {
  const [data, dispatchData] = React.useReducer(
    dataReducer,
    INITIAL_CRIME_DATA
  );

  React.useEffect(() => {
    csv(CRIMES_DATA_URL, (error, response) => {
      if (!error) {
        dispatchData({
          payload: response.map(
            ({ lat, lon }) =>
              ({
                type: 'Feature',
                geometry: { type: 'Point', coordinates: [lon, lat] },
              } as unknown as Feature<Point>)
          ),
        });
      }
    });
  }, []);

  return data;
};
