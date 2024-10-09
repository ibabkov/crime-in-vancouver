import React from 'react';

import classNames from 'classnames';

import { Fallback } from '../Fallback';
import styles from './MapLayout.module.css';

export type MapLayoutProps = {
	children: React.ReactNode;
	mapLoaded: boolean;
	dataLoaded: boolean;
	loadingProgress: number;
};

export const MapLayout: React.FC<MapLayoutProps> = props => {
	const { children, mapLoaded, dataLoaded, loadingProgress } = props;
	const fullLoad = dataLoaded && mapLoaded;

	return (
		<div className={styles['container']}>
			{dataLoaded && <div className={classNames(styles['map'], mapLoaded && styles['map-show'])}>{children}</div>}
			<div className={classNames(styles['fallback'], !fullLoad && styles['fallback-show'])}>
				<Fallback loadingProgress={loadingProgress} />
			</div>
		</div>
	);
};
