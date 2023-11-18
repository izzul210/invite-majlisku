/** @format */

import React from 'react';
import { ButtonProvider } from '../eventDetailsComponents';
import { WazeIcon } from '../../../../component/icons/icons';

function WazeButton({ waze_link = null, event_address }) {
	return (
		<a
			href={waze_link ? waze_link : `https://waze.com/ul?q=${event_address}`}
			target='_blank'
			rel='noreferrer'
			className='w-full'>
			<ButtonProvider>
				<WazeIcon />
			</ButtonProvider>
		</a>
	);
}

export default WazeButton;
