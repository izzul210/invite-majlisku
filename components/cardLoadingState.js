/** @format */

import React from 'react';
//MUI Imports
import CircularProgress from '@mui/material/CircularProgress';
import Backdrop from '@mui/material/Backdrop';

function CardLoadingState({ loadingState }) {
	return (
		<Backdrop
			sx={{
				color: 'black',
				backgroundColor: 'rgba(255,255,255,0.5)',
				zIndex: (theme) => theme.zIndex.drawer - 1,
				opacity: 1,
				position: 'absolute',
				opacity: 1,
			}}
			open={loadingState}>
			<CircularProgress color='inherit'></CircularProgress>
		</Backdrop>
	);
}

export default CardLoadingState;
