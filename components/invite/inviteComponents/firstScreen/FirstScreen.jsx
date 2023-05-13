/** @format */

import React from 'react';
import Image from 'next/image';
//Asssets import
import defaultImage from '../../../../assets/images/dashboard-image.png';
import { MajliskuIconV4 } from '../../../icons';
import { useConvert } from '../../hooks/useInviteFunc';
import moment from 'moment';

export const FirstScreenWithImage = ({
	event_title_1 = 'Walimatulurus',
	rsvp_header_image = defaultImage,
	event_date = '2023-10-21',
	event_address = null,
	italic_title = '',

	theme = {
		backgroundColor: '#ffffff',
		textColor: '#244637',
		lineColor: '#244637',
		roundedStyle: false,
	},
}) => {
	const roundedStyle = {
		borderTopLeftRadius: '500px',
		borderTopRightRadius: '500px',
	};

	const { useConvertText } = useConvert();

	return (
		<div className='card-top' style={{ backgroundColor: theme.backgroundColor }}>
			<div className='top-title-section' style={{ color: theme.textColor }}>
				<MajliskuIconV4 />
				<div className='title'>{event_title_1}</div>
			</div>
			<div className='image-section'>
				<img
					src={rsvp_header_image}
					alt='Event Image'
					style={theme.roundedStyle ? roundedStyle : null}
					layout='fill'
				/>
			</div>
			<div className='bottom-section' style={{ color: theme.textColor }}>
				<div className='italic-title'>
					<div className='italic-title-display'>{useConvertText(italic_title)}</div>
				</div>
				<div className='event-date'>{moment(event_date).format('DD.MM.YYYY')}</div>
				<div className='event-location'>{event_address}</div>
			</div>
		</div>
	);
};
