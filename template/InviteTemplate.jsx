/** @format */
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useEventDetails, useItineraryList, useWishList } from '../hooks/useApi';
//Screen import
import FirstScreen from './firstScreen/FirstScreen';
import GreetingScreen from './greetingScreen/GreetingScreen';
import EventDetails from './eventDetails/EventDetails';
import Tentative from './tentative/Tentative';
import Wishlist from './wishlist/Wishlist';
import Contacts from './contacts/Contacts';
import { MajliskuLoadingIcon } from '../component/icons/icons';

//API import

function InviteTemplate({ inviteId }) {
	const { data: eventDetails, isLoading } = useEventDetails(inviteId);
	const { data: itinerary } = useItineraryList();
	const { data: wishlist } = useWishList();

	const [loadingAnimation, setLoadingAnimation] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoadingAnimation(false);
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<>
			{loadingAnimation && !isLoading ? (
				<motion.div
					initial={{ opacity: 1, filter: 'blur(0)' }}
					animate={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 2, delay: 1 } }}
					className='loading-overlay'>
					<MajliskuLoadingIcon />
				</motion.div>
			) : null}
			{!isLoading && (
				<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
					<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
						<FirstScreen eventDetails={eventDetails} />
						<GreetingScreen eventDetails={eventDetails} />
						<EventDetails eventDetails={eventDetails} />
						<div
							className='w-full flex gap-3 flex-col px-5 sm:px-0 py-8'
							style={{ maxWidth: '400px' }}>
							<Tentative eventDetails={eventDetails} itinerary={itinerary} />
							<Contacts eventDetails={eventDetails} />
							<Wishlist eventDetails={eventDetails} wishlist={wishlist} />
						</div>
					</div>
				</div>
			)}
		</>
	);
}

export default InviteTemplate;
