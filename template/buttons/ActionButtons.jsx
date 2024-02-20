/** @format */

import React from 'react';
import moment from 'moment';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//Context import
import { useInviteContext } from '../inviteContext';
//Buttons import
import RsvpButton from './RsvpButton';
import GiftRegistryButton from './GiftRegistryButton';
import MoneyGiftButton from './MoneyGiftButton';
import PersonalizedRsvpButton from './PersonalizedRsvpButton2';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';

const DeadlineText = ({ enable_bahasa, color, event_date_deadline = '2012-12-12' }) => {
	const datelineText = enable_bahasa ? 'Sila RSVP sebelum' : 'Kindly RSVP by';

	return (
		<InviteTextProvider color={color} className='text-[14px] text-center py-2 uppercase'>
			{datelineText} {moment(event_date_deadline).format('DD.MM.YYYY')}
		</InviteTextProvider>
	);
};

const ExpiredRsvp = ({ enable_bahasa }) => {
	const expiredText = enable_bahasa ? 'Maaf, RSVp sudah tamat tempoh.' : 'Sorry, RSVP has expired.';
	const expiredText2 = enable_bahasa
		? 'Sila hubungi hos anda'
		: 'Please reach out to your host directly';

	return (
		<div
			className='w-full flex flex-col items-center justify-center p-5 uppercase'
			style={{
				background:
					'linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%)',
			}}>
			<InviteTextProvider className='text-[14px] font-medium text-center uppercase'>
				{expiredText}
				<br />
				<br />
				{expiredText2}
			</InviteTextProvider>
			<InviteLineLogo color='#D0D5DD' />
		</div>
	);
};

function ActionButtonsTest({
	//theme
	color = '#1D4648',
	//variants
	guest_name = null,
}) {
	const { eventDetails, preview } = useInviteContext();
	const {
		enable_bahasa,
		enable_gift_registry,
		enable_money_gift,
		event_date_deadline,
		enable_deadline,
	} = eventDetails || {};

	const actionButtonsProps = {
		preview,
		enable_bahasa,
	};

	const hasDatePassed = event_date_deadline ? moment().isAfter(moment(event_date_deadline)) : false;

	const [ref, inView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 1, // Defines at what percentage of the component's height the animation should start
		}) || [];

	if (enable_deadline && hasDatePassed) {
		return <ExpiredRsvp enable_bahasa={enable_bahasa} />;
	}

	const container = {
		visible: {
			transition: {
				staggerChildren: 0.3,
				duration: 1,
				delay: 0,
			},
		},
	};

	const variants = {
		hidden: { opacity: 0.1, y: '30%', filter: 'blur(20px)' },
		visible: {
			opacity: 1,
			y: '0%',
			filter: 'blur(0px)',
			transition: {
				duration: 0.8, // Increase this value to make the transition slower
			},
		},
	};

	return (
		<motion.div
			ref={ref}
			initial='hidden'
			variants={container}
			animate={inView ? 'visible' : 'hidden'}
			className='w-full flex flex-col gap-2 px-5'>
			<motion.div className='w-full' variants={variants}>
				{guest_name ? <PersonalizedRsvpButton /> : <RsvpButton {...actionButtonsProps} />}
			</motion.div>
			<motion.div className='w-full' variants={variants}>
				{enable_gift_registry && <GiftRegistryButton {...actionButtonsProps} />}
			</motion.div>
			<motion.div className='w-full' variants={variants}>
				{enable_money_gift && <MoneyGiftButton {...actionButtonsProps} />}
			</motion.div>
			<motion.div className='w-full' variants={variants}>
				{enable_deadline && (
					<DeadlineText
						enable_bahasa={enable_bahasa}
						color={color}
						event_date_deadline={event_date_deadline}
					/>
				)}
			</motion.div>
		</motion.div>
	);
}

export default ActionButtonsTest;
