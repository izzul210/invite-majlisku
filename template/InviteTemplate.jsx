/** @format */
'use client';
import React from 'react';
//Screen import
import FirstScreen from './firstScreen/FirstScreen';
import GreetingScreen from './greetingScreen/GreetingScreen';
import EventDetails from './eventDetails/EventDetails';
import Tentative from './tentative/Tentative';
//API import

function InviteTemplate({ eventDetails }) {
	return (
		<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
			<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
				<FirstScreen eventDetails={eventDetails} />
				<GreetingScreen eventDetails={eventDetails} />
				<EventDetails eventDetails={eventDetails} />
				<div className='w-full flex gap-3 flex-col px-5 sm:px-0 py-8' style={{ maxWidth: '400px' }}>
					<Tentative />
					{/* <Contacts />
					<Wishlist />
					<Calendar /> */}
				</div>
			</div>
		</div>
	);
}

export default InviteTemplate;
