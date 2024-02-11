/** @format */

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useEventDetails, useItineraryList, useWishList } from '../hooks/useApi';
import Footnote from './Footnote';
import { InviteContext } from './inviteContext';
import InviteTextProvider from '../component/textProvider/InviteTextProvider';
//Screen import
import FirstScreen from './firstScreen/FirstScreen';
import GreetingScreen from './greetingScreen/GreetingScreen';
import EventDetails from './eventDetails/EventDetails';
import Tentative from './tentative/Tentative';
import Wishlist from './wishlist/Wishlist';
import Contacts from './contacts/Contacts';
import Calendar from './calendar/Calendar';
import { MajliskuMainIcon } from '../component/icons/icons';

const OpeningComponent = ({ onOpen, enable_bahasa }) => {
	return (
		<motion.div
			initial={{ opacity: 1, y: '0%', backgroundColor: '#0E7F6E' }}
			animate={{
				opacity: 1,
				y: '0%',
				backgroundColor: '#0E7F6E',
			}}
			exit={{
				opacity: 1,
				y: '-100%',
			}}
			transition={{ type: 'tween', duration: 0.7 }}
			style={{ minHeight: '100vh' }}
			className='opening-screen flex flex-col justify-between  items-center justify-center  w-full'
			onClick={onOpen}>
			<div></div>
			<MajliskuMainIcon />
			<InviteTextProvider color='#F1BFBE' className='uppercase cursor-pointer pb-24'>
				{enable_bahasa ? 'Sila tekan untuk buka' : 'Tap To Open'}
			</InviteTextProvider>
		</motion.div>
	);
};

function InviteTemplatePreview({ designId, userId }) {
	let design = parseInt(designId);
	const [premium_design, setPremiumDesign] = useState(0);
	const { data: eventDetails, isLoading } = useEventDetails(userId, 'previewdetails');
	const { data: itinerary } = useItineraryList();
	const { data: wishlist } = useWishList();

	const [loadingAnimation, setLoadingAnimation] = useState(true);

	const [isOpen, setIsOpen] = useState(true);
	const [mainPageVisible, setMainPageVisible] = useState(false);

	const handleOpen = () => {
		if (!isLoading) {
			setIsOpen(false);
			setTimeout(() => setMainPageVisible(true), 100);
			// Delay to match the opening screen animation
		}
	};

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
		<InviteContext.Provider value={{ design, premium_design }}>
			<>
				<AnimatePresence>
					{isOpen ? (
						<OpeningComponent onOpen={handleOpen} enable_bahasa={eventDetails?.enable_bahasa} />
					) : null}
				</AnimatePresence>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate={mainPageVisible ? 'visible' : 'hidden'}
					exit='exit'>
					{!isLoading && (
						<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
							<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
								<FirstScreen eventDetails={eventDetails} childVariants={childVariants} />
								<GreetingScreen eventDetails={eventDetails} />
								<EventDetails eventDetails={eventDetails} />
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
					)}
					<Footnote />
				</motion.div>
			</>
		</InviteContext.Provider>
	);
}

export default InviteTemplatePreview;
