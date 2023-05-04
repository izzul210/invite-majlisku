/** @format */

import React from 'react';

export const EventSummaryCard = ({
	guestName = null,
	eventTitle1,
	updatedEventTitle2,
	formattedDate,
	eventTime,
	eventLocation,
	malay,
	updateEventDescription,
}) => {
	return (
		<div className='invite-card-middle'>
			<div className='guest-name'>{guestName}</div>
			<div className='invite-text'>
				{malay ? 'Undangan kami seikhlas hati ke' : 'You are cordially invited to'}
			</div>
			<div className='event-title-1-b'>{eventTitle1}</div>
			<div className='event-title-2'>{updatedEventTitle2}</div>
			<div className='event-information'>
				<div className='event-date'>{formattedDate}</div>
				<div className='event-time'>{eventTime}</div>
				<div className='event-location'>
					<div>{eventLocation}</div>
				</div>
			</div>
			{updateEventDescription ? (
				<div className='event-description'>{updateEventDescription}</div>
			) : null}
		</div>
	);
};
