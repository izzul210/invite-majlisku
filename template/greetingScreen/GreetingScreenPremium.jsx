/** @format */

import React from 'react';
//Components import
import { premiumColorTheme } from '../colorThemes';
import { Graphic_1, Ellipse_1 } from '../../component/graphics/graphics';
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

export default function GreetingScreenPremium({
	enable_bahasa = false,
	host_details = `Simpulan bin Simpulan\n &\n Simpulan binti Simpulan`,
	guest = null,
	event_title_2 = 'Pengantin Lelaki bin Simpulan\n&Pengantin Wanita binti Simpulan',
	greeting_title = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
	greet_content_1 = 'Dengan segala hormatnya kami\n mempersilakan',
	greet_content_2 = 'ke majlis resepsi untuk meraikan majlis',
	premium_design = 0,
}) {
	const { useConvertText } = useInviteFunc();

	//Extract premium color:
	const { backgroundColor, greetingColor, fill, titleColor } = premiumColorTheme[premium_design];

	let renderHosts = useConvertText(host_details);
	let renderEventTitle = useConvertText(event_title_2);

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
				<GreetingText_Premium color={greetingColor}>
					Assalamualaikum dan salam sejahtera
				</GreetingText_Premium>
				<HostsText color={titleColor}>{renderHosts}</HostsText>
				<div className='flex flex-col gap-4'>
					<GreetingText_Premium color={greetingColor}>{greet_content_1}</GreetingText_Premium>
					<GreetingTitle color={titleColor}>{greeting_title}</GreetingTitle>
					<GreetingText_Premium color={greetingColor}>{greet_content_2}</GreetingText_Premium>
				</div>
				<div className='flex w-full items-center flex-col pt-8 gap-4'>
					<MainTitle color={titleColor}>{renderEventTitle}</MainTitle>
				</div>
				<div className='w-full flex justify-center' style={{ transform: 'translateY(50%)' }}>
					<Graphic_1 fill={fill} className='graphic-1' width='177' height='177' />
				</div>
			</div>
			{/* <div
				className='w-full h-[70px] z-10'
				style={{ background: 'black', transform: 'translateY(-55%)' }}></div> */}
		</div>
	);
}
