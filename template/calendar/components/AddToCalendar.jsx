/** @format */
'use client';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
import ButtonProvider from '../../../component/button/ButtonProvider';
import moment from 'moment';
import React from 'react';

const GoogleIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none'>
		<g clip-path='url(#clip0_1698_4113)'>
			<path
				d='M23.7663 12.2763C23.7663 11.4605 23.7001 10.6404 23.559 9.83789H12.2402V14.4589H18.722C18.453 15.9492 17.5888 17.2676 16.3233 18.1054V21.1037H20.1903C22.4611 19.0137 23.7663 15.9272 23.7663 12.2763Z'
				fill='#4285F4'
			/>
			<path
				d='M12.2401 24.0013C15.4766 24.0013 18.2059 22.9387 20.1945 21.1044L16.3276 18.106C15.2517 18.838 13.8627 19.2525 12.2445 19.2525C9.11388 19.2525 6.45946 17.1404 5.50705 14.3008H1.5166V17.3917C3.55371 21.4439 7.7029 24.0013 12.2401 24.0013Z'
				fill='#34A853'
			/>
			<path
				d='M5.50277 14.3007C5.00011 12.8103 5.00011 11.1965 5.50277 9.70618V6.61523H1.51674C-0.185266 10.006 -0.185266 14.0009 1.51674 17.3916L5.50277 14.3007Z'
				fill='#FBBC04'
			/>
			<path
				d='M12.2401 4.74966C13.9509 4.7232 15.6044 5.36697 16.8434 6.54867L20.2695 3.12262C18.1001 1.0855 15.2208 -0.034466 12.2401 0.000808666C7.7029 0.000808666 3.55371 2.55822 1.5166 6.61481L5.50264 9.70575C6.45064 6.86173 9.10947 4.74966 12.2401 4.74966Z'
				fill='#EA4335'
			/>
		</g>
		<defs>
			<clipPath id='clip0_1698_4113'>
				<rect width='24' height='24' fill='white' />
			</clipPath>
		</defs>
	</svg>
);

function AddToCalendar({ enable_bahasa, event_title, start_time, end_time, address, event_date }) {
	return (
		<ButtonProvider className='w-full'>
			<AddToCalendarButton
				// hideIconButton
				hideCheckmark
				options='Google'
				hideIconList
				timeZone='currentBrowser'
				iCalFileName='Reminder-Event'
				buttonStyle='custom'
				customCss='/atcb.css'
				//Event Details
				label={enable_bahasa ? 'SIMPAN DI KALENDAR' : 'SAVE TO CALENDAR'}
				name={event_title || 'The Wedding'}
				location={address || 'Wedding Place'}
				startDate={event_date || '2023-12-01'}
				startTime={moment.parseZone(start_time).format('HH:mm')}
				endTime={moment.parseZone(end_time).format('HH:mm')}></AddToCalendarButton>
		</ButtonProvider>
	);
}

export default AddToCalendar;
