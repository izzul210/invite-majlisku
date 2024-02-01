/** @format */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//Components import
import ActionButtons from '../buttons/ActionButtons';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import { MajliskuIconV3, GiftIcon, MoneyGift } from '../../component/icons/icons';
import {
	HostsText,
	GreetingText,
	GreetingText_Premium,
	GreetingTitle,
	MainTitle,
	ButtonProvider,
	GuestNameTitle,
} from './components/greetingScreenComponents';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';

const event_opening_title_default = 'Assalamualaikum dan salam sejahtera';
const greeting_title_default = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`;
const greeting_1_default = 'Dengan segala hormatnya kami\n mempersilakan';
const greeting_2_default = 'ke majlis resepsi untuk meraikan majlis';

export default function GreetingScreenDefault({
	enable_bahasa = false,
	event_opening_title,
	host_details,
	event_title_2,
	greeting_title,
	greeting_1,
	greeting_2,
	//For RSVP
	event_date_deadline = null,
	enable_deadline = false,
	enable_gift_registry = false,
	enable_money_gift = false,
	//type
	guest_name = null,
	preview = false,
}) {
	const { useConvertText } = useInviteFunc();

	const [ref, inView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	const [ref2, inView2] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	const [ref3, inView3] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	const [ref4, inView4] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	let renderHosts = useConvertText(host_details);
	let renderEventTitle = useConvertText(event_title_2);

	const container = {
		visible: {
			transition: {
				staggerChildren: 0.3,
				duration: 3,
				delay: 0,
			},
		},
	};

	const variants = {
		hidden: { opacity: 0.2, y: '30%', filter: 'blur(20px)' },
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
		<div
			className='w-full text-center border-t flex flex-col items-center justify-center gap-12 py-10 sm:py-20'
			style={{ minHeight: '600px' }}>
			<div
				className='w-full flex flex-col gap-4 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<motion.div
					ref={ref}
					initial='hidden'
					animate={inView ? 'visible' : 'hidden'}
					className='w-full'
					variants={variants}>
					<InviteLineLogo height='2px' />
					{event_opening_title ? (
						<GreetingText>
							{event_opening_title ? event_opening_title : event_opening_title_default}
						</GreetingText>
					) : null}

					<div className='pb-4 border-b-2 w-full border-dotted'>
						<HostsText>{renderHosts}</HostsText>
					</div>
				</motion.div>
				<motion.div
					ref={ref2}
					initial='hidden'
					animate={inView2 ? 'visible' : 'hidden'}
					className='flex flex-col gap-4'
					variants={variants}>
					<motion.div className='w-full'>
						<GreetingText>{greeting_1 ? greeting_1 : greeting_1_default}</GreetingText>
					</motion.div>
					<motion.div className='w-full'>
						{guest_name ? (
							<GuestNameTitle>{guest_name}</GuestNameTitle>
						) : (
							<GreetingTitle>
								{greeting_title ? greeting_title : greeting_title_default}
							</GreetingTitle>
						)}
					</motion.div>
					<motion.div className='w-full'>
						<GreetingText>{greeting_2 ? greeting_2 : greeting_2_default}</GreetingText>
					</motion.div>
				</motion.div>
				<motion.div
					ref={ref3}
					initial='hidden'
					animate={inView3 ? 'visible' : 'hidden'}
					className='flex w-full items-center flex-col gap-4'
					variants={variants}>
					<MajliskuIconV3 />
					<MainTitle>{renderEventTitle}</MainTitle>
					<MajliskuIconV3 />
				</motion.div>
				<motion.div
					ref={ref4}
					initial='hidden'
					animate={inView4 ? 'visible' : 'hidden'}
					className='flex w-full items-center flex-col gap-4'
					variants={variants}>
					<ActionButtons
						enable_bahasa={enable_bahasa}
						enable_gift_registry={enable_gift_registry}
						enable_money_gift={enable_money_gift}
						enable_deadline={enable_deadline}
						event_date_deadline={event_date_deadline}
						guest_name={guest_name}
						preview={preview}
					/>
				</motion.div>
			</div>
		</div>
	);
}

/*

	return (
		<div
			className='w-full text-center border-t flex flex-col items-center justify-center gap-12 py-10 sm:py-20'
			style={{ minHeight: '600px' }}>
			<motion.div
				ref={ref}
				initial='hidden'
				variants={container}
				animate={inView ? 'visible' : 'hidden'}
				className='w-full flex flex-col gap-4 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<motion.div className='w-full' variants={variants}>
					<InviteLineLogo height='2px' />
					{event_opening_title ? (
						<GreetingText>
							{event_opening_title ? event_opening_title : event_opening_title_default}
						</GreetingText>
					) : null}

					<div className='pb-4 border-b-2 w-full border-dotted'>
						<HostsText>{renderHosts}</HostsText>
					</div>
				</motion.div>
				<motion.div className='flex flex-col gap-4' variants={variants}>
					<motion.div className='w-full' variants={variants}>
						<GreetingText>{greeting_1 ? greeting_1 : greeting_1_default}</GreetingText>
					</motion.div>
					<motion.div className='w-full' variants={variants}>
						{guest_name ? (
							<GuestNameTitle>{guest_name}</GuestNameTitle>
						) : (
							<GreetingTitle>
								{greeting_title ? greeting_title : greeting_title_default}
							</GreetingTitle>
						)}{' '}
					</motion.div>
					<motion.div className='w-full' variants={variants}>
						<GreetingText>{greeting_2 ? greeting_2 : greeting_2_default}</GreetingText>
					</motion.div>
				</motion.div>
				<motion.div className='flex w-full items-center flex-col gap-4' variants={variants}>
					<MajliskuIconV3 />
					<MainTitle>{renderEventTitle}</MainTitle>
					<MajliskuIconV3 />
				</motion.div>
				<motion.div className='w-full flex flex-row justify-center' variants={variants}>
					<ActionButtons
						enable_bahasa={enable_bahasa}
						enable_gift_registry={enable_gift_registry}
						enable_money_gift={enable_money_gift}
						enable_deadline={enable_deadline}
						event_date_deadline={event_date_deadline}
						guest_name={guest_name}
						preview={preview}
					/>
				</motion.div>
			</motion.div>
		</div>
	);
	*/
