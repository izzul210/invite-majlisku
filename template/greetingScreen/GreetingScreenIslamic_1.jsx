/** @format */

import React from 'react';
import Image from "next/legacy/image";
//Components import
import {
	HostsText,
	GreetingText,
	GreetingText_Premium,
	GreetingTitle,
	MainTitle,
	ButtonProvider,
} from './components/greetingScreenComponents';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';

const greetingsColor = '#F1BFBE';
const titleColor = 'rgba(201, 45, 96, 1)';

export default function GreetingScreenIslamic_1({
	enable_bahasa = false,
	host_details = `Simpulan bin Simpulan\n &\n Simpulan binti Simpulan`,
	guest = null,
	event_title_2 = 'Pengantin Lelaki bin Simpulan\n&Pengantin Wanita binti Simpulan',
	greeting_title = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
	greet_content_1 = 'Dengan segala hormatnya kami\n mempersilakan',
	greet_content_2 = 'ke majlis resepsi untuk meraikan majlis',
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
					Assalamualaikum dan salam sejahtera
				</GreetingText_Premium>
				<HostsText color={titleColor}>{renderHosts}</HostsText>
				<div className='flex flex-col gap-4'>
					<GreetingText_Premium color={greetingsColor}>{greet_content_1}</GreetingText_Premium>
					<GreetingTitle color={titleColor}>{greeting_title}</GreetingTitle>
					<GreetingText_Premium color={greetingsColor}>{greet_content_2}</GreetingText_Premium>
				</div>
				<div className='flex w-full items-center flex-col pt-8 gap-4'>
					<MainTitle color={titleColor}>{renderEventTitle}</MainTitle>
				</div>
			</div>
		</div>
	);
}
