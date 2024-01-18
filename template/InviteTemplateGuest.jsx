/** @format */
'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
	useEventDetails,
	usePersonalizedGuestDetail,
	useItineraryList,
	useWishList,
} from '../hooks/useApi';
import Footnote from './Footnote';
import { InviteContext } from './inviteContext';
//Screen import
import FirstScreen from './firstScreen/FirstScreen';
import GreetingScreen from './greetingScreen/GreetingScreen';
import EventDetails from './eventDetails/EventDetails';
import Tentative from './tentative/Tentative';
import Wishlist from './wishlist/Wishlist';
import Contacts from './contacts/Contacts';
import Calendar from './calendar/Calendar';
import { MajliskuLoadingIcon } from '../component/icons/icons';

const convertOldTheme = (type) => {
	if (!type) return 1;

	switch (type) {
		case 'default':
			return 3;
		case 'minimal1':
			return 2;
		case 'minimal2':
			return 1;
		default:
			return 1;
	}
};

function InviteTemplateGuest({ inviteId, guestId }) {
	const [premium_design, setPremiumDesign] = useState(0);
	const { data: eventDetails, isLoading } = useEventDetails(inviteId);
	const { data: personalizedGuestDetail, isLoading: isLoadingPersonalizedGuestDetail } =
		usePersonalizedGuestDetail(guestId);
	const { data: itinerary } = useItineraryList();
	const { data: wishlist } = useWishList();

	const [loadingAnimation, setLoadingAnimation] = useState(true);

	const design = Number(eventDetails?.design_num)
		? Number(eventDetails.design_num)
		: convertOldTheme(eventDetails?.type);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoadingAnimation(false);
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<InviteContext.Provider value={{ design, premium_design }}>
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
					<>
						<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
							<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
								<FirstScreen eventDetails={eventDetails} />
								<GreetingScreen
									eventDetails={eventDetails}
									guest_name={personalizedGuestDetail?.name}
								/>
								<EventDetails
									eventDetails={eventDetails}
									guest_name={personalizedGuestDetail?.name}
								/>
								<div
									className='w-full flex gap-3 flex-col px-5 sm:px-0 py-8'
									style={{ maxWidth: '400px' }}>
									<Tentative eventDetails={eventDetails} itinerary={itinerary} />
									<Contacts eventDetails={eventDetails} />
									<Wishlist eventDetails={eventDetails} wishlist={wishlist} />
									<Calendar eventDetails={eventDetails} />
								</div>
							</div>
						</div>
						<Footnote />
					</>
				)}
			</>
		</InviteContext.Provider>
	);
}

export default InviteTemplateGuest;
