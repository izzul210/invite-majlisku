/** @format */
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useItineraryList, useWishList, usePersonalizedGuestDetail } from '../hooks/useApi';
import Footnote from './Footnote';
import { InviteContext } from './inviteContext';
//Screen import
import GuestOpeningScreen from './openingScreen/GuestOpeningScreen';
import FirstScreen from './firstScreen/FirstScreen';
import GreetingScreen from './greetingScreen/GreetingScreen';
import EventDetails from './eventDetails/EventDetails';
import Tentative from './tentative/Tentative';
import Wishlist from './wishlist/Wishlist';
import Contacts from './contacts/Contacts';
import Calendar from './calendar/Calendar';

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

function InviteTemplateGuest({ eventDetails, guestId }) {
	const userId = eventDetails?.user_id;
	//Fetch data
	const { data: personalizedGuestDetail, isLoading: isLoadingPersonalizedGuestDetail } =
		usePersonalizedGuestDetail(userId, guestId);
	const { data: itinerary } = useItineraryList(userId);
	const { data: wishlist } = useWishList(userId);
	//States
	const [isOpen, setIsOpen] = useState(true);
	const [mainPageVisible, setMainPageVisible] = useState(false);

	const handleOpen = () => {
		if (!isLoadingPersonalizedGuestDetail) {
			setIsOpen(false);
			setTimeout(() => setMainPageVisible(true), 100);
		}
	};

	const design = Number(eventDetails?.design_num)
		? Number(eventDetails.design_num)
		: convertOldTheme(eventDetails?.type);

	const containerVariants = {
		hidden: { opacity: 1, filter: 'blur(10px)', display: 'none' },
		visible: {
			opacity: 1,
			filter: 'blur(0px)',
			display: 'block',
			transition: {
				duration: 1,
				when: 'beforeChildren',
				staggerChildren: 0.5,
			},
		},
		exit: { opacity: 0, filter: 'blur(10px)', display: 'none' },
	};

	const childVariants = {
		hidden: { opacity: 0.2, y: '20%', filter: 'blur(20px)' },
		visible: {
			opacity: 1,
			y: '0%',
			filter: 'blur(0px)',
			transition: {
				duration: 1,
				staggerChildren: 0.2,
			},
		},
	};

	return (
		<InviteContext.Provider value={{ design, eventDetails, userId, personalizedGuestDetail }}>
			<>
				<AnimatePresence>
					{isOpen ? (
						<GuestOpeningScreen
							onOpen={handleOpen}
							enable_bahasa={eventDetails?.enable_bahasa}
							title={personalizedGuestDetail?.name}
							isLoading={isLoadingPersonalizedGuestDetail}
						/>
					) : null}
				</AnimatePresence>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate={mainPageVisible ? 'visible' : 'hidden'}
					exit='exit'>
					<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
						<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
							<FirstScreen childVariants={childVariants} />
							<GreetingScreen guest_name={personalizedGuestDetail?.name} />
							<EventDetails guest_name={personalizedGuestDetail?.name} />
							<div
								className='w-full flex gap-3 flex-col px-5 sm:px-0 py-8'
								style={{ maxWidth: '400px' }}>
								<Tentative itinerary={itinerary} />
								<Contacts />
								<Calendar />
								<Wishlist wishlist={wishlist} />
							</div>
						</div>
					</div>
					<Footnote />
				</motion.div>
			</>
		</InviteContext.Provider>
	);
}

export default InviteTemplateGuest;
