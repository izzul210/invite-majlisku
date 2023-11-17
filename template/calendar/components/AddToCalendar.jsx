/** @format */
'use client';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import moment from 'moment';
import React from 'react';

// function AddToCalendar({ enable_bahasa, event_title, start_time, end_time, address, event_date }) {
// 	return (
// 		<div>
// 			<AddToCalendarButton
// 				// buttonStyle='round'
// 				styleLight="--btn-background: transparent; --btn-text: #1E1E1E; --btn-text-transform: uppercase; --font: 'Lora'; --btn-border: #D0D5DD;
//                 --btn-shadow: none; --btn-shadow-hover: none; --btn-shadow-active:none"
// 				hideCheckmark
// 				options='Google'
// 				hideIconList
// 				timeZone='Asia/Singapore'
// 				iCalFileName='Reminder-Event'
// 				buttonStyle='round'
// 				//Event Details
// 				label={enable_bahasa ? 'Simpan di Kalendar' : 'Save to Calendar'}
// 				name={event_title || 'The Wedding'}
// 				location={address || 'Wedding Place'}
// 				startDate={event_date || '2025-10-21'}
// 				endDate={event_date || '2025-10-21'}
// 				startTime={moment(start_time).format('HH:mm')}
// 				endTime={moment(end_time).format('HH:mm')}></AddToCalendarButton>
// 		</div>
// 	);
// }

function AddToCalendar({ enable_bahasa, event_title, start_time, end_time, address, event_date }) {
	return (
		<div className='w-full flex justify-center border-[#D0D5DD] rounded-full border'>
			<AddToCalendarButton
				styleLight="--btn-background: transparent; --btn-text: #1E1E1E; --btn-text-transform: uppercase; --font: 'Lora'; --btn-border: rgba(0,0,0,0);
                --btn-shadow: none; --btn-shadow-hover: none; --btn-shadow-active:none"
				hideCheckmark
				options='Google'
				hideIconList
				timeZone='Asia/Singapore'
				iCalFileName='Reminder-Event'
				buttonStyle='round'
				//Event Details
				label={enable_bahasa ? 'Simpan di Kalendar' : 'Save to Calendar'}
				name={event_title || 'The Wedding'}
				location={address || 'Wedding Place'}
				startDate={event_date || '2025-10-21'}
				endDate={event_date || '2025-10-21'}
				startTime={moment(start_time).format('HH:mm')}
				endTime={moment(end_time).format('HH:mm')}></AddToCalendarButton>
		</div>
	);
}

export default AddToCalendar;
