/** @format */

import React from 'react';
import Image from 'next/legacy/image';
//Components import
import {
	HostsText,
	GreetingText_Premium,
	GreetingTitle,
	MainTitle,
	GuestNameTitle,
} from './components/greetingScreenComponents';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';

const greetingsColor = '#F1BFBE';
const titleColor = 'rgba(201, 45, 96, 1)';
const event_opening_title_default = 'Assalamualaikum dan salam sejahtera';
const greeting_title_default = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`;
const greeting_1_default = 'Dengan segala hormatnya kami\n mempersilakan';
const greeting_2_default =
	'ke majlis resepsi untuk meraikan majlis Perkahwinan Putera kesayangan kami';

export default function GreetingScreenIslamic_2({
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

	return (
		<div className='w-full relative  min-h-[780px] md:min-h-[860px]  flex justify-center items-center'>
			<Image
				className='h-[780px] md:h-[860px] z-0'
				src='/greeting-islamic.png'
				alt='Greeting Islamic'
				layout='fill'
				objectFit='cover'
				objectPosition='center'
			/>
			<div className='w-full text-center flex flex-col items-center justify-center gap-6 p-11 md:p-10 z-1 relative'>
				<GreetingText_Premium color={greetingsColor}>
					{event_opening_title ? event_opening_title : event_opening_title_default}
				</GreetingText_Premium>
				<HostsText color={titleColor}>{renderHosts}</HostsText>
				<div className='flex flex-col gap-4'>
					<GreetingText_Premium color={greetingsColor}>
						{greeting_1 ? greeting_1 : greeting_1_default}
					</GreetingText_Premium>{' '}
					{guest_name ? (
						<GuestNameTitle color={titleColor}>{guest_name}</GuestNameTitle>
					) : (
						<GreetingTitle color={titleColor}>
							{greeting_title ? greeting_title : greeting_title_default}
						</GreetingTitle>
					)}
					<GreetingText_Premium color={greetingsColor}>
						{greeting_2 ? greeting_2 : greeting_2_default}
					</GreetingText_Premium>{' '}
				</div>
				<div className='flex w-full items-center flex-col pt-8 gap-4'>
					<MainTitle color={titleColor}>{renderEventTitle}</MainTitle>
				</div>
			</div>
		</div>
	);
}
