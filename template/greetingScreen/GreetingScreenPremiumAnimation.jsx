/** @format */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//Components import
import { premiumColorTheme } from '../colorThemes';
import { Graphic_1, Ellipse_1 } from '../../component/graphics/graphics';
import {
	HostsText,
	GreetingText_Premium,
	GreetingTitle,
	MainTitle,
	GuestNameTitle,
} from './components/greetingScreenComponents';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
//Animation cosnt import
import { greetingTitleContainer, variants } from '../animationProps';

const event_opening_title_default = 'Assalamualaikum dan salam sejahtera';
const greeting_title_default = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`;
const greeting_1_default = 'Dengan segala hormatnya kami\n mempersilakan';
const greeting_2_default = 'ke majlis resepsi untuk meraikan majlis';

export default function GreetingScreenPremium({
	enable_bahasa = false,
	event_opening_title,
	host_details,
	event_title_2,
	greeting_title,
	greeting_1,
	greeting_2,
	guest_name,
	premium_design = 0,
}) {
	const { useConvertText } = useInviteFunc();

	//Extract premium color:
	const { backgroundColor, greetingColor, fill, titleColor } = premiumColorTheme[premium_design];

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
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	return (
		<div
			className='w-full text-center flex flex-col items-center justify-center gap-12 pt-10'
			style={{
				minHeight: '600px',
				background: backgroundColor,
				transform: 'translateY(-1%)',
				position: 'relative',
			}}>
			<Ellipse_1
				fill={fill}
				className='ellipse-2'
				style={{ position: 'absolute', top: -80, right: -40, zIndex: 1 }}
			/>
			<div
				className='w-full flex flex-col gap-6 items-center px-5  bg-white pt-20 rounded-t-full'
				style={{ zIndex: 3 }}>
				<motion.div
					ref={hostRef}
					initial='hidden'
					animate={hostInView ? 'visible' : 'hidden'}
					className='w-full'
					variants={greetingTitleContainer}>
					{event_opening_title ? (
						<motion.div className='w-full' variants={variants}>
							<GreetingText_Premium color={greetingColor}>
								{event_opening_title ? event_opening_title : event_opening_title_default}
							</GreetingText_Premium>
						</motion.div>
					) : null}
					<HostsText color={titleColor}>
						{host_details.split('\n').map((char, index) => (
							<motion.span key={char + '-' + index} variants={variants}>
								{char}
							</motion.span>
						))}
					</HostsText>
				</motion.div>
				<motion.div
					ref={greetingTitleRef}
					initial='hidden'
					animate={greetingTitleInView ? 'visible' : 'hidden'}
					className='flex flex-col gap-4'
					variants={greetingTitleContainer}>
					<motion.div className='w-full' variants={variants}>
						<GreetingText_Premium color={greetingColor}>
							{greeting_1 ? greeting_1 : greeting_1_default}
						</GreetingText_Premium>
					</motion.div>
					<motion.div className='w-full' variants={variants}>
						{guest_name ? (
							<GuestNameTitle color={titleColor}>{guest_name}</GuestNameTitle>
						) : (
							<GreetingTitle color={titleColor}>
								{greeting_title ? greeting_title : greeting_title_default}
							</GreetingTitle>
						)}
					</motion.div>
					<motion.div className='w-full' variants={variants}>
						<GreetingText_Premium color={greetingColor}>
							{greeting_2 ? greeting_2 : greeting_2_default}
						</GreetingText_Premium>
					</motion.div>
				</motion.div>
				<motion.div
					ref={eventTitleRef}
					initial='hidden'
					animate={eventTitleInView ? 'visible' : 'hidden'}
					className='flex w-full items-center flex-col pt-8 gap-4'
					variants={greetingTitleContainer}>
					<MainTitle color={titleColor}>
						{event_title_2.split('\n').map((char, index) => (
							<motion.span key={char + '-' + index} variants={variants}>
								{char}
							</motion.span>
						))}
					</MainTitle>
				</motion.div>
				<div className='w-full flex justify-center' style={{ transform: 'translateY(50%)' }}>
					<Graphic_1 fill={fill} className='graphic-1' width='177' height='177' />
				</div>
			</div>
		</div>
	);
}
