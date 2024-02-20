/** @format */

import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//Components import
import {
	HostsText,
	GreetingText_Premium,
	GreetingTitle,
	MainTitle,
	GuestNameTitle,
} from './components/greetingScreenComponents';
import { greetingTitleContainer, variants } from '../animationProps';

const greetingsColor = 'rgba(201, 145, 126, 1)';
const titleColor = 'rgba(201, 45, 96, 1)';
const event_opening_title_default = 'Assalamualaikum dan salam sejahtera';
const greeting_title_default = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`;
const greeting_1_default = 'Dengan segala hormatnya kami\n mempersilakan';
const greeting_2_default = 'ke majlis resepsi untuk meraikan majlis';

export default function GreetingScreenRustic({
	event_opening_title,
	host_details,
	event_title_2,
	greeting_title,
	greeting_1,
	greeting_2,
	guest_name,
}) {
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

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
			className='w-full relative flex justify-center items-center'
			style={{ minHeight: windowWidth < 500 ? windowWidth * 1.92 : 790 }}>
			<Image
				className='h-full z-0'
				src='/greeting-rustic.png'
				alt='Greeting Islamic'
				layout='fill'
				objectFit='cover'
				objectPosition='center'
				quality={50}
				priority
			/>
			<div className='w-full text-center flex flex-col items-center justify-center gap-6 px-11 z-1 relative'>
				<motion.div
					ref={hostRef}
					initial='hidden'
					animate={hostInView ? 'visible' : 'hidden'}
					className='w-full'
					variants={greetingTitleContainer}>
					{event_opening_title ? (
						<motion.div className='w-full' variants={variants}>
							<GreetingText_Premium color={greetingsColor}>
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
						<GreetingText_Premium color={greetingsColor}>
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
						<GreetingText_Premium color={greetingsColor}>
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
			</div>
		</div>
	);
}
