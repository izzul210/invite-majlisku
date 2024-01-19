/** @format */

import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
//Components import
import {
	HostsText,
	GreetingText,
	GreetingText_Premium,
	GreetingTitle,
	MainTitle,
	GuestNameTitle,
} from './components/greetingScreenComponents';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';

const greetingsColor = 'rgba(201, 45, 96, 1)';
const titleColor = 'rgba(201, 45, 96, 1)';
const event_opening_title_default = 'Assalamualaikum dan salam sejahtera';
const greeting_title_default = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`;
const greeting_1_default = 'Dengan segala hormatnya kami\n mempersilakan';
const greeting_2_default = 'ke majlis resepsi untuk meraikan majlis';

export default function GreetingScreenRoyal({
	enable_bahasa = false,
	event_opening_title,
	host_details,
	event_title_2,
	greeting_title,
	greeting_1,
	greeting_2,
	guest_name,
}) {
	const { useConvertText } = useInviteFunc();
	let renderHosts = useConvertText(host_details);
	let renderEventTitle = useConvertText(event_title_2);

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

	return (
		<div
			className='w-full relative flex justify-center items-center'
			style={{ minHeight: windowWidth < 500 ? windowWidth * 1.78 : 780 }}>
			<Image
				className='h-full z-0'
				src='/greeting-royal.png'
				alt='Greeting Islamic'
				layout='fill'
				objectFit='cover'
				objectPosition='center'
			/>
			<div className='w-full text-center flex flex-col items-center justify-center gap-6 px-12 z-1 relative'>
				{event_opening_title ? (
					<GreetingText_Premium color={greetingsColor}>
						{event_opening_title ? event_opening_title : event_opening_title_default}
					</GreetingText_Premium>
				) : null}

				<HostsText color={titleColor}>{renderHosts}</HostsText>
				<div className='flex flex-col gap-4'>
					<GreetingText_Premium color={greetingsColor}>
						{greeting_1 ? greeting_1 : greeting_1_default}
					</GreetingText_Premium>
					{guest_name ? (
						<GuestNameTitle color={titleColor}>{guest_name}</GuestNameTitle>
					) : (
						<GreetingTitle color={titleColor}>
							{greeting_title ? greeting_title : greeting_title_default}
						</GreetingTitle>
					)}
					<GreetingText_Premium color={greetingsColor}>
						{greeting_2 ? greeting_2 : greeting_2_default}
					</GreetingText_Premium>
				</div>
				<div className='flex w-full items-center flex-col pt-8 gap-4'>
					<MainTitle color={titleColor}>{renderEventTitle}</MainTitle>
				</div>
			</div>
		</div>
	);
}
