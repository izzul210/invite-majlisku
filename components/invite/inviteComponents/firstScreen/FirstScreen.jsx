/** @format */

import React from 'react';
import Image from 'next/image';
//Asssets import
import defaultImage from '../../../../assets/images/dashboard-image.png';
import { MajliskuIconV4 } from '../../../icons';
import { useConvert } from '../../hooks/useInviteFunc';
import moment from 'moment';

export const FirstScreenWithImage = ({
	type = 'default',
	event_title_1 = 'Walimatulurus',
	rsvp_header_image = defaultImage,
	event_date = '2023-10-21',
	event_address = null,
	event_location = null,
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	italic_title = '',
	main_title = '',
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

	const containerBorderStyle = {
		borderTop: '1px solid rgba(208, 213, 221, 1)',
		borderBottom: '1px solid rgba(208, 213, 221, 1)',
		padding: '18px 0px',
		width: '100%',
	};

	const { useConvertText } = useConvert();

	//Formatting title to be displayed
	const formattedTitle = main_title ? useConvertText(main_title) : useConvertText(italic_title);

	const RenderTopTitle = () => {
		if (type === 'default') {
			return <div className='title-1'>{event_title_1}</div>;
		} else if (type === 'minimal2') {
			return <div className='title-2'>{event_title_1}</div>;
		} else if (type === 'minimal1') {
			return (
				<div className='title-2' style={containerBorderStyle}>
					{event_title_1}
				</div>
			);
		}
	};

	const RenderTitle = () => {
		if (type === 'default') {
			return <FirstScreenTitleItalic title={formattedTitle} textColor={theme.textColor} />;
		} else if (type === 'minimal2' || type === 'minimal1') {
			return <FirstScreenTitleDefault title={formattedTitle} textColor={theme.textColor} />;
		}
	};

	const RenderEventDetails = () => {
		if (type === 'default') {
			return (
				<FirstScreenEventDetailsV1
					location={event_address}
					date={event_date}
					textColor={theme.textColor}
				/>
			);
		} else if (type === 'minimal2') {
			return (
				<FirstScreenEventDetailsV2
					location={event_address}
					date={event_date}
					textColor={theme.textColor}
					start_time={event_start}
					end_time={event_end}
				/>
			);
		} else if (type === 'minimal1') {
			return (
				<div style={containerBorderStyle}>
					<FirstScreenEventDetailsV2
						location={event_address}
						date={event_date}
						textColor={theme.textColor}
						start_time={event_start}
						end_time={event_end}
					/>
				</div>
			);
		}
	};

	return (
		<div
			className='first-screen-container'
			style={{
				backgroundColor: theme.backgroundColor,
				borderBottom: '1px solid rgba(208, 213, 221, 1)',
			}}>
			<div className='top-title-section' style={{ color: theme.textColor }}>
				<MajliskuIconV4 />
				<RenderTopTitle />
			</div>
			<div className='image-section'>
				<img
					src={rsvp_header_image}
					alt='Event Image'
					style={theme.roundedStyle ? roundedStyle : null}></img>
			</div>
			<RenderTitle />
			<RenderEventDetails />
		</div>
	);
};

////// FirstScreen components
const FirstScreenTitleItalic = ({ title, textColor }) => (
	<div className='italic-card-title' style={{ color: textColor }}>
		{title}
	</div>
);

const FirstScreenTitleDefault = ({ title, textColor }) => (
	<div className='default-card-title' style={{ color: textColor }}>
		{title}
	</div>
);

const FirstScreenEventDetailsV1 = ({ location, date, textColor }) => (
	<div className='bottom-section-1' style={{ color: textColor }}>
		<div className='event-date'>{moment(date).format('DD.MM.YYYY')}</div>
		<div className='event-location'>{location}</div>
	</div>
);

const FirstScreenEventDetailsV2 = ({ location, date, textColor, start_time, end_time }) => (
	<div className='bottom-section-2' style={{ color: textColor }}>
		<div className='event-date'>{moment(date).format('dddd, Do MMMM YYYY')}</div>
		<div className='event-time'>
			{moment(start_time).format('h:mm A')} - {moment(end_time).format('h:mm A')}
		</div>
		<div className='event-location'>{location}</div>
	</div>
);
