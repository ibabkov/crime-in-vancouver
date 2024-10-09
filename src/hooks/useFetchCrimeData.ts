import React from 'react';

import { csv } from 'd3-request';
import { FeatureCollection, Feature, Point } from 'geojson';

import { CRIMES_DATA_API_URL } from '../constants/crimeData';

export const useFetchCrimeData = (): [FeatureCollection<Point> | null, number] => {
	const [data, setData] = React.useState<FeatureCollection<Point> | null>(null);
	const [progress, setProgress] = React.useState<number>(-1);

	React.useEffect(() => {
		if (progress !== -1) return;

		csv(CRIMES_DATA_API_URL, (error, response) => {
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
		}).on('progress', event => {
			if (event.lengthComputable) {
				setProgress(event.loaded / event.total);
			}
		});
	}, []);

	return [data, progress];
};
