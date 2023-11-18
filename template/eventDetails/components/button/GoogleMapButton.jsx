/** @format */

import React from 'react';
import { ButtonProvider } from '../eventDetailsComponents';
import { GoogleMapIcon } from '../../../../component/icons/icons';

function GoogleMapButton({ google_link = null, event_address }) {
	return (
		<a
			href={google_link ? google_link : `http://maps.google.com/?q=1200 ${event_address}`}
			target='_blank'
			rel='noreferrer'
			className='w-full'>
			<ButtonProvider>
				<GoogleMapIcon />
			</ButtonProvider>
		</a>
	);
}

export default GoogleMapButton;
