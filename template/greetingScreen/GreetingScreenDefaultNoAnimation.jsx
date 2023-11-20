/** @format */

import React from 'react';
//Components import
import RsvpButton from '../buttons/RsvpButton';
import MoneyGiftButton from '../buttons/MoneyGiftButton';
import GiftRegistryButton from '../buttons/GiftRegistryButton';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import { MajliskuIconV3, GiftIcon, MoneyGift } from '../../component/icons/icons';
import {
	HostsText,
	GreetingText,
	GreetingTitle,
	MainTitle,
	ButtonProvider,
} from './components/greetingScreenComponents';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';

export default function GreetingScreenDefaultNoAnimation({
	enable_bahasa = false,
	host_details = `Simpulan bin Simpulan\n &\n Simpulan binti Simpulan`,
	guest = null,
	event_title_2 = 'Pengantin Lelaki bin Simpulan\n&Pengantin Wanita binti Simpulan',
	greeting_title = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
	greet_content_1 = 'Dengan segala hormatnya kami\n mempersilakan',
	greet_content_2 = 'ke majlis resepsi untuk meraikan majlis',
	enable_gift_registry = false,
	enable_money_gift = false,
	onClickRSVP = () => {},
	onClickGiftRegistry = () => {},
	onClickMoneyGift = () => {},
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
				<InviteLineLogo height='2px' />
				<div className='pb-4 border-b-2 w-full border-dotted'>
					<HostsText>{renderHosts}</HostsText>
				</div>
				<div className='flex flex-col gap-4'>
					<GreetingText>{greet_content_1}</GreetingText>
					<GreetingTitle>{greeting_title}</GreetingTitle>
					<GreetingText>{greet_content_2}</GreetingText>
				</div>
				<div className='flex w-full items-center flex-col gap-4'>
					<MajliskuIconV3 />
					<MainTitle>{renderEventTitle}</MainTitle>
					<MajliskuIconV3 />
				</div>
			</div>
			<div className='w-full flex flex-col gap-2' style={{ maxWidth: '290px' }}>
				<RsvpButton />
				{enable_gift_registry && <GiftRegistryButton />}
				{enable_money_gift && <MoneyGiftButton />}
			</div>
		</div>
	);
}
