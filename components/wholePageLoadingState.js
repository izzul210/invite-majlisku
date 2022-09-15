/** @format */

import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

function WholePageLoadingState({ height_vh }) {
	return (
		<div
			style={{
				height: height_vh ? height_vh : '50vh',
				width: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
			}}>
			<CircularProgress color='inherit'></CircularProgress>
		</div>
	);
}

export default WholePageLoadingState;
