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
//Temporary
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

function InviteTemplateGuest({ inviteId, guestId }) {
	const [design, setDesign] = useState(20);
	const [premium_design, setPremiumDesign] = useState(0);
	const { data: eventDetails, isLoading } = useEventDetails(inviteId);
	const { data: personalizedGuestDetail, isLoading: isLoadingPersonalizedGuestDetail } =
		usePersonalizedGuestDetail(guestId);
	const { data: itinerary } = useItineraryList();
	const { data: wishlist } = useWishList();

	const [loadingAnimation, setLoadingAnimation] = useState(true);

	useEffect(() => {
		const timer = setTimeout(() => {
			setLoadingAnimation(false);
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

	const handleChangeDesign = (event) => {
		setDesign(event.target.value);
	};

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
						<div className='w-full flex flex-col gap-2 items-center justify-center bg-[#1E1E1E] p-5'>
							<p className='text-white'>Choose Template</p>
							<div className='bg-white'>
								<Select
									labelId='demo-simple-select-label'
									id='demo-simple-select'
									value={design}
									label='Design'
									onChange={handleChangeDesign}>
									<MenuItem value={0}>Minimalist 1</MenuItem>
									<MenuItem value={1}>Minimalist 2</MenuItem>
									<MenuItem value={2}>Minimalist 3</MenuItem>
									<MenuItem value={20}>Premium 1</MenuItem>
									<MenuItem value={21}>Premium 2</MenuItem>
									<MenuItem value={22}>Premium 3</MenuItem>
									<MenuItem value={23}>Premium 4</MenuItem>
									<MenuItem value={24}>Premium 5</MenuItem>
									<MenuItem value={25}>Premium 6</MenuItem>
									<MenuItem value={26}>Premium 7</MenuItem>
									<MenuItem value={27}>Premium 8</MenuItem>
									<MenuItem value={5}>Islamic 1</MenuItem>
									<MenuItem value={6}>Islamic 2</MenuItem>
									<MenuItem value={7}>Islamic 3</MenuItem>
								</Select>
							</div>
						</div>
					</>
				)}
			</>
		</InviteContext.Provider>
	);
}

export default InviteTemplateGuest;
