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
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	event_theme_title = '',
	event_theme_description = 'Lelaki: Baju Melayu/Batik\nPerempuan: Baju Kurung/Bersesuaian',
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

	const styleSheet = {
		borderBottom: `1px solid ${theme.lineColor}`,
		color: theme.textColor,
	};

	const formattedDate = moment(event_date).format('dddd, Do MMMM YYYY');
	const formattedTime = `${moment(event_start).format('h:mm A')} - ${moment(event_end).format(
		'h:mm A'
	)}`;

	const formatted_event_address = useConvertText(event_address);
	const formatted_event_description = useConvertText(event_theme_description);

	return (
		<div className={`event-details`} style={{ background: theme.backgroundColor }}>
			<div className='event-details-content-container'>
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
					{event_theme_description && event_theme_description !== '' ? (
						<div className='event-theme' style={styleSheet}>
							<div className='theme-title'>{event_theme_title}</div>
							<div className='theme-desc'>{formatted_event_description}</div>
						</div>
					) : null}
				</div>
			</div>
		</div>
	);
};
