import React from 'react';

import { csv } from 'd3-request';
import { FeatureCollection, Feature, Point } from 'geojson';

import { CRIMES_DATA_URL } from '../constants/crimeData';

export const useFetchCrimeData = () => {
  const [data, setData] = React.useState<FeatureCollection<Point> | null>(null);

  React.useEffect(() => {
    csv(CRIMES_DATA_URL, (error, response) => {
      if (!error) {
        setData({
          type: 'FeatureCollection',
          features: response.map(({ lat, lon }, i) => {
            delete response[i];

            return {
              type: 'Feature',
              geometry: { type: 'Point', coordinates: [lon, lat] },
            } as unknown as Feature<Point>;
          }),
        });
      }
    });
  }, []);

  return data;
};
