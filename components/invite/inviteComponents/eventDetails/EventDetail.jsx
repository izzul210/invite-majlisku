/** @format */

import React from 'react';
import moment from 'moment';
//Hooks import
import { useConvert } from '../../hooks/useInviteFunc';
//Components import
import { LineLogo } from '../../components/LineLogo';
//Icon import
import googleMapIcon from '../../../../public/icons/googleMap.png';
import wazeIcon from '../../../../public/icons/waze.png';
import Image from 'next/image';

export const EventDetails = ({
	type = 'default',
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	event_theme_title = '',
	event_theme_description = '',
	waze_link = null,
	google_link = null,
	theme = {
		lineHeight: '2px',
		backgroundColor: '#FFFFFF',
		textColor: '#265b44',
		lineColor: 'rgba(45, 106, 79, 0.3)',
	},
}) => {
	const { useConvertText } = useConvert();

	const eventDetailClass = type === 'default' ? 'event-details' : 'event-details-minimal';

	const styleSheet =
		type === 'default'
			? {
					borderBottom: '1px solid rgba(228, 231, 236, 1)',
					color: theme.textColor,
			  }
			: {
					color: theme.textColor,
			  };

	const formattedDate = moment(event_date).format('dddd, Do MMMM YYYY');
	const formattedTime = `${moment(event_start).format('h:mm A')} - ${moment(event_end).format(
		'h:mm A'
	)}`;

	const formatted_event_address = useConvertText(event_address);
	const formatted_event_description = useConvertText(event_theme_description);

	function isStringEmpty(str) {
		if (str == null) return true;
		else {
			return str?.trim().length === 0;
		}
	}

	return (
		<div className={eventDetailClass} style={{ background: theme.backgroundColor }}>
			<LineLogo height={theme.lineHeight} color={theme.lineColor} />
			<div className='event-detail-container'>
				<div className='event-date' style={styleSheet}>
					{formattedDate}
				</div>
				<div className='event-time' style={styleSheet}>
					{formattedTime}
				</div>
				<div className='event-location' style={styleSheet}>
					{formatted_event_address}
					<div className='event-location-buttons'>
						<a
							href={waze_link ? waze_link : `https://waze.com/ul?q=${event_address}`}
							target='_blank'
							rel='noreferrer'
							className='waze-button'>
							<Image src={wazeIcon} alt='Waze' height='20px' width='20spx' />
						</a>
						<a
							href={google_link ? google_link : `http://maps.google.com/?q=1200 ${event_address}`}
							target='_blank'
							rel='noreferrer'
							className='googleMap-button'>
							<Image src={googleMapIcon} alt='Google Map' height='20px' width='16px' />
						</a>
					</div>
				</div>
				{!isStringEmpty(event_theme_description) ? (
					<div className='event-theme' style={styleSheet}>
						<div className='theme-desc'>{formatted_event_description}</div>
					</div>
				) : null}
			</div>
		</div>
	);
};
