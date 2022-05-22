import type { NextPage } from 'next';
import { csv } from 'd3-request';
import { Feature, Point } from 'geojson';

import { ApplicationContainer } from '../containers/Application';
// import {DSVParsedArray, DSVRowString} from "d3-dsv";

const MainPage: NextPage = (props: any) => {
  return <ApplicationContainer data={props.data} />;
};

async function getFetchData(): Promise<any> {
  return new Promise((resolve) => {
    csv(
      'https://crime-in-vancouver-ibabkov.vercel.app/data.csv',
      (error, response) => {
        if (!error) {
          // resolve(response);
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

// function mapData(array: any): Promise<FeatureCollection<Point>> {
//   return resolve({
//     type: 'FeatureCollection',
//     features: response.map(({ lat, lon }, i) => {
//       delete response[i];
//
//       return {
//         type: 'Feature',
//         geometry: { type: 'Point', coordinates: [lon, lat] },
//       } as unknown as Feature<Point>;
//     }),
//   });
// }

MainPage.getInitialProps = async (ctx) => {
  const data = await getFetchData();

  return { data };
};

export default MainPage;
