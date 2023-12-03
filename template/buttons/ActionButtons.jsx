/** @format */

import React from 'react';
//Buttons import
import RsvpButton from './RsvpButton';
import GiftRegistryButton from './GiftRegistryButton';
import MoneyGiftButton from './MoneyGiftButton';
import PersonalizedRsvpButton from './PersonalizedRsvpButton';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

const DeadlineText = ({ enable_bahasa, color }) => {
	const dateline = '10.10.2022';
	const datelineText = enable_bahasa ? 'Sila RSVP sebelum' : 'Kindly RSVP by';

	return (
		<InviteTextProvider color={color} className='text-[14px] text-center py-2 uppercase'>
			{datelineText} {dateline}
		</InviteTextProvider>
	);
};

function ActionButtons({
	//theme
	color = '#1D4648',
	//variants
	guest_name = null,
	preview,
	//enable states
	enable_bahasa = false,
	enable_gift_registry = false,
	enable_money_gift = false,
	enable_deadline = true,
}) {
	const actionButtonsProps = {
		preview,
		enable_bahasa,
	};

	return (
		<div className='w-full flex flex-col gap-2 px-5'>
			{guest_name ? <PersonalizedRsvpButton /> : <RsvpButton {...actionButtonsProps} />}
			{enable_gift_registry && <GiftRegistryButton {...actionButtonsProps} />}
			{enable_money_gift && <MoneyGiftButton {...actionButtonsProps} />}
			{enable_deadline && <DeadlineText enable_bahasa={enable_bahasa} color={color} />}
		</div>
	);
}

export default ActionButtons;
