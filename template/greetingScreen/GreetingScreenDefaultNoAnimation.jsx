/** @format */

import React from 'react';
//Components import
import ActionButtons from '../buttons/ActionButtons';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import { MajliskuIconV3, GiftIcon, MoneyGift } from '../../component/icons/icons';
import {
	HostsText,
	GreetingText,
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

export default function GreetingScreenDefaultNoAnimation({
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

	let renderHosts = useConvertText(host_details);
	let renderEventTitle = useConvertText(event_title_2);

	return (
		<div
			className='w-full text-center border-t flex flex-col items-center justify-center gap-12 py-10 sm:py-20'
			style={{ minHeight: '600px' }}>
			<div
				className='w-full flex flex-col gap-4 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<InviteLineLogo height='1px' />
				{event_opening_title ? (
					<GreetingText>
						{event_opening_title ? event_opening_title : event_opening_title_default}
					</GreetingText>
				) : null}

				<div className='pb-4 w-full'>
					<HostsText>{renderHosts}</HostsText>
				</div>
				<div className='flex flex-col gap-4'>
					<GreetingText>{greeting_1 ? greeting_1 : greeting_1_default}</GreetingText>
					{guest_name ? (
						<GuestNameTitle>{guest_name}</GuestNameTitle>
					) : (
						<GreetingTitle>
							{greeting_title ? greeting_title : greeting_title_default}
						</GreetingTitle>
					)}
					<GreetingText>{greeting_2 ? greeting_2 : greeting_2_default}</GreetingText>
				</div>
				<div className='flex w-full items-center flex-col gap-4'>
					<MajliskuIconV3 />
					<MainTitle>{renderEventTitle}</MainTitle>
					<MajliskuIconV3 />
				</div>
			</div>
			<ActionButtons
				enable_bahasa={enable_bahasa}
				enable_gift_registry={enable_gift_registry}
				enable_money_gift={enable_money_gift}
				enable_deadline={enable_deadline}
				event_date_deadline={event_date_deadline}
				guest_name={guest_name}
				preview={preview}
			/>
		</div>
	);
}
