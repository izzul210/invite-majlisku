/** @format */

import React from 'react';
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
				{event_opening_title ? (
					<GreetingText_Premium color={greetingColor}>
						{event_opening_title ? event_opening_title : event_opening_title_default}
					</GreetingText_Premium>
				) : null}
				<HostsText color={titleColor}>{renderHosts}</HostsText>
				<div className='flex flex-col gap-4'>
					<GreetingText_Premium color={greetingColor}>
						{greeting_1 ? greeting_1 : greeting_1_default}
					</GreetingText_Premium>
					{guest_name ? (
						<GuestNameTitle color={titleColor}>{guest_name}</GuestNameTitle>
					) : (
						<GreetingTitle color={titleColor}>
							{greeting_title ? greeting_title : greeting_title_default}
						</GreetingTitle>
					)}
					<GreetingText_Premium color={greetingColor}>
						{greeting_2 ? greeting_2 : greeting_2_default}
					</GreetingText_Premium>
				</div>
				<div className='flex w-full items-center flex-col pt-8 gap-4'>
					<MainTitle color={titleColor}>{renderEventTitle}</MainTitle>
				</div>
				<div className='w-full flex justify-center' style={{ transform: 'translateY(50%)' }}>
					<Graphic_1 fill={fill} className='graphic-1' width='177' height='177' />
				</div>
			</div>
		</div>
	);
}
