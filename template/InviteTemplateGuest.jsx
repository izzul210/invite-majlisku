/** @format */
'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
	useEventDetails,
	usePersonalizedGuestDetail,
	useItineraryList,
	useWishList,
} from '../hooks/useApi';
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

const OpeningComponent = ({ onOpen, title, enable_bahasa, isLoading }) => {
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
			style={{ minHeight: '100vh' }}
			transition={{ type: 'tween', duration: 0.7 }}
			className='opening-screen flex flex-col justify-between pb-12  items-center justify-center w-full'
			onClick={onOpen}>
			<div></div>
			<div className='flex items-center justify-center gap-12 flex-col'>
				<MajliskuMainIcon />
				{isLoading ? null : (
					<div className='text-center'>
						<InviteTextProvider color='#F1BFBE' className='pb-[12px]'>
							To:
						</InviteTextProvider>
						<InviteTextProvider
							fontFamily='greatVibes'
							color='#F1BFBE'
							className='uppercase lowercase capitalize text-center text-[34px] sm:text-3xl'>
							<div style={{ whiteSpace: 'pre-line' }}>{title}</div>
						</InviteTextProvider>
					</div>
				)}
			</div>
			{isLoading ? (
				<InviteTextProvider color='#F1BFBE' className='uppercase cursor-pointer pb-[120px]'>
					Loading...
				</InviteTextProvider>
			) : (
				<InviteTextProvider color='#F1BFBE' className='neons uppercase cursor-pointer pb-[120px]'>
					{enable_bahasa ? 'Sila tekan untuk buka' : 'Tap To Open'}
				</InviteTextProvider>
			)}
		</motion.div>
	);
};

function InviteTemplateGuest({ inviteId, guestId }) {
	//Fetch data
	const { data: eventDetails, isLoading } = useEventDetails(inviteId);
	const { data: personalizedGuestDetail, isLoading: isLoadingPersonalizedGuestDetail } =
		usePersonalizedGuestDetail(guestId);
	const { data: itinerary } = useItineraryList();
	const { data: wishlist } = useWishList();
	//States
	const [isOpen, setIsOpen] = useState(true);
	const [mainPageVisible, setMainPageVisible] = useState(false);

	const handleOpen = () => {
		if (!isLoading && !isLoadingPersonalizedGuestDetail) {
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
		<InviteContext.Provider value={{ design }}>
			<>
				<AnimatePresence>
					{isOpen ? (
						<OpeningComponent
							onOpen={handleOpen}
							enable_bahasa={eventDetails?.enable_bahasa}
							title={personalizedGuestDetail?.name}
							isLoading={isLoading || isLoadingPersonalizedGuestDetail}
						/>
					) : null}
				</AnimatePresence>
				<motion.div
					variants={containerVariants}
					initial='hidden'
					animate={mainPageVisible ? 'visible' : 'hidden'}
					exit='exit'>
					{!isLoading && (
						<>
							<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
								<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
									<FirstScreen eventDetails={eventDetails} childVariants={childVariants} />
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
										<Calendar eventDetails={eventDetails} />
										<Wishlist eventDetails={eventDetails} wishlist={wishlist} />
									</div>
								</div>
							</div>
							<Footnote />
						</>
					)}
				</motion.div>
			</>
		</InviteContext.Provider>
	);
}

export default InviteTemplateGuest;
