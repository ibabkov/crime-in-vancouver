import type { NextPage } from 'next';
import { csv } from 'd3-request';
import { Feature, FeatureCollection, Point } from 'geojson';

import { ApplicationContainer } from '../containers/Application';

const MainPage: NextPage = (props: any) => {
  return <ApplicationContainer data={props.data} />;
};

function getFetchData(): Promise<FeatureCollection<Point>> {
  return new Promise((resolve) => {
    csv(
      'https://crime-in-vancouver-ibabkov.vercel.app/data.csv',
      (error, response) => {
        if (!error) {
          resolve({
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
      }
    );
  });
}

MainPage.getInitialProps = async (ctx) => {
  const data = await getFetchData();

  return { data };
};

export default MainPage;
