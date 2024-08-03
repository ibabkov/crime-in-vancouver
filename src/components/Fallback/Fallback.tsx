import React from 'react';

import styles from './Fallback.module.css';

export const Fallback: React.FC = () => {
	return (
		<div className={styles.container}>
			<span className={styles.advice}>
				<span className={styles['advice-title']}>Advice</span>
				<span className={styles['advice-text']}>You can ZOOM, ROTATE and PAN the map</span>
			</span>
			<span className={styles.loader}>Loading</span>
		</div>
	);
};
