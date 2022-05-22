import React from 'react';

import classNames from 'classnames';

import { Fallback } from '../Fallback';
import styles from './MapLayout.module.css';

export interface IMapLayoutProps {
  children: React.ReactNode;
  mapLoad: boolean;
  dataLoad: boolean;
}

export const MapLayout: React.FC<IMapLayoutProps> = (props) => {
  const { children, mapLoad, dataLoad } = props;

  console.log(dataLoad, mapLoad);

  return (
    <div className={styles['container']}>
      {/*<div className={classNames(styles['map'], mapLoad && styles['map-show'])}>*/}
      {dataLoad && (
        <div
          className={classNames(styles['map'], mapLoad && styles['map-show'])}
        >
          {children}
        </div>
      )}
      <div
        className={classNames(
          styles['fallback'],
          !(dataLoad && mapLoad) && styles['fallback-show']
        )}
      >
        <Fallback />
      </div>
    </div>
  );
};
