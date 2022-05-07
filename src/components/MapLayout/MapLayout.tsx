import React from 'react';

import classNames from 'classnames';

import { Fallback } from '../Fallback';
import styles from './MapLayout.module.css';

export interface IMapLayoutProps {
  children: React.ReactNode;
  load: boolean;
}

export const MapLayout: React.FC<IMapLayoutProps> = (props) => {
  const { children, load } = props;

  return (
    <div className={styles['container']}>
      <div className={styles['fallback']}>
        <Fallback />
      </div>
      <div className={classNames(styles['map'], !load && styles['map-hidden'])}>
        {children}
      </div>
    </div>
  );
};
