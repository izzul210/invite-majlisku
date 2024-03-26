/** @format */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//Components import
import ActionButtons from '../buttons/ActionButtons';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import { MajliskuIconV3 } from '../../component/icons/icons';
import {
	HostsText,
	GreetingText,
	GreetingTitle,
	MainTitle,
	GuestNameTitle,
} from './components/greetingScreenComponents';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
import { greetingTitleContainer, variants } from '../animationProps';

const event_opening_title_default = 'Assalamualaikum dan salam sejahtera';
const greeting_title_default = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`;
const greeting_1_default = 'Dengan segala hormatnya kami\n mempersilakan';
const greeting_2_default = 'ke majlis resepsi untuk meraikan majlis';

export default function GreetingScreenDefaultAnimation({
	event_opening_title,
	host_details,
	event_title_2,
	greeting_title,
	greeting_1,
	greeting_2,
	//type
	guest_name = null,
}) {
	const { useConvertText } = useInviteFunc();
	let renderHosts = useConvertText(host_details);
	let renderEventTitle = useConvertText(event_title_2);

	const [hostRef, hostInView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	const [greetingTitleRef, greetingTitleInView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	const [eventTitleRef, eventTitleInView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 1, // Defines at what percentage of the component's height the animation should start
		}) || [];

	return (
		<div
			className='w-full text-center border-t flex flex-col items-center justify-center gap-12 py-10 sm:py-20'
			style={{ minHeight: '600px' }}>
			<div
				className='w-full flex flex-col gap-4 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<motion.div
					ref={hostRef}
					initial='hidden'
					animate={hostInView ? 'visible' : 'hidden'}
					className='w-full flex flex-col gap-2'
					variants={greetingTitleContainer}>
					<motion.div className='w-full' variants={variants}>
						<InviteLineLogo height='1px' />
					</motion.div>
					{event_opening_title ? (
						<motion.div className='w-full' variants={variants}>
							<GreetingText>
								{event_opening_title ? event_opening_title : event_opening_title_default}
							</GreetingText>
						</motion.div>
					) : null}

					<div className='pb-4 w-full'>
						<HostsText>
							{host_details.split('\n').map((char, index) => (
								<motion.span key={char + '-' + index} variants={variants}>
									{char}
								</motion.span>
							))}
						</HostsText>
					</div>
				</motion.div>
				<motion.div
					ref={greetingTitleRef}
					initial='hidden'
					animate={greetingTitleInView ? 'visible' : 'hidden'}
					className='flex flex-col gap-4'
					variants={greetingTitleContainer}>
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
						)}
					</motion.div>
					<motion.div className='w-full' variants={variants}>
						<GreetingText>{greeting_2 ? greeting_2 : greeting_2_default}</GreetingText>
					</motion.div>
				</motion.div>
				<motion.div
					ref={eventTitleRef}
					initial='hidden'
					animate={eventTitleInView ? 'visible' : 'hidden'}
					className='flex w-full items-center flex-col pt-8 gap-4'
					variants={greetingTitleContainer}>
					<motion.div variants={variants}>
						<MajliskuIconV3 />
					</motion.div>
					<MainTitle>
						{event_title_2.split('\n').map((char, index) => (
							<motion.span key={char + '-' + index} variants={variants}>
								{char}
							</motion.span>
						))}
					</MainTitle>
					<motion.div variants={variants}>
						<MajliskuIconV3 />
					</motion.div>
				</motion.div>
			</div>
			<ActionButtons />
		</div>
	);
}
