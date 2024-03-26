/** @format */

'use client';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, AnimatePresence } from 'framer-motion';
import { useItineraryList, useWishList } from '../hooks/useApi';
import Footnote from './Footnote';
import { InviteContext } from './inviteContext';
//Screen import
import OpeningScreen from './openingScreen/OpeningScreen';
import FirstScreen from './firstScreen/FirstScreen';
import GreetingScreen from './greetingScreen/GreetingScreen';
import EventDetails from './eventDetails/EventDetails';
import Tentative from './tentative/Tentative';
import Wishlist from './wishlist/Wishlist';
import Contacts from './contacts/Contacts';
const Calendar = dynamic(() => import('./calendar/Calendar'));
import MusicPlayButton from './buttons/MusicPlayButton';

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

function InviteTemplate({ eventDetails }) {
	const preview = false;
	const userId = eventDetails?.user_id;
	//Fetch data
	const { data: itinerary } = useItineraryList(userId);
	const { data: wishlist } = useWishList(userId);
	//States
	const [isOpen, setIsOpen] = useState(true);
	const [calendarVisible, setCalendarVisible] = useState(false);
	const [mainPageVisible, setMainPageVisible] = useState(false);
	const [musicPlayerVisible, setMusicPlayerVisible] = useState(false);
	const [playing, setPlaying] = useState(false);
	const [openIsAllowed, setOpenIsAllowed] = useState(false);

	const handleOpen = () => {
		if (!openIsAllowed) return;
		setIsOpen(false);
		setCalendarVisible(true);
		setMusicPlayerVisible(true);
		setPlaying(true);
		setTimeout(() => setMainPageVisible(true), 100);
	};

	const design = Number(eventDetails?.design_num)
		? Number(eventDetails.design_num)
		: convertOldTheme(eventDetails?.type);

	// const design = 70;

	const stopPlaying = () => {
		setPlaying(false);
	};

	const handleAllowToOpen = () => {
		setOpenIsAllowed(true);
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
		hidden: { opacity: 0.2, y: '15%', filter: 'blur(20px)' },
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
		<InviteContext.Provider value={{ design, eventDetails, userId, preview }}>
			<>
				<MusicPlayButton
					eventDetails={eventDetails}
					playing={playing}
					musicPlayerVisible={musicPlayerVisible}
					stopPlaying={stopPlaying}
					startPlaying={() => setPlaying(true)}
					handleAllowToOpen={handleAllowToOpen}
				/>
				<AnimatePresence>
					{isOpen ? (
						<OpeningScreen
							onOpen={handleOpen}
							enable_bahasa={eventDetails?.enable_bahasa}
							title={eventDetails?.italic_title}
							isLoading={!openIsAllowed}
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
							<GreetingScreen />

							<EventDetails />
							<div
								className='w-full flex gap-3 flex-col px-5 sm:px-0 py-8'
								style={{ maxWidth: '400px' }}>
								<Tentative itinerary={itinerary} />
								<Contacts />
								{calendarVisible && <Calendar />}
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

export default InviteTemplate;
