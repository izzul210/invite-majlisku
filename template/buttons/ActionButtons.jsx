/** @format */

import React from 'react';
import moment from 'moment';
//Buttons import
import RsvpButton from './RsvpButton';
import GiftRegistryButton from './GiftRegistryButton';
import MoneyGiftButton from './MoneyGiftButton';
import PersonalizedRsvpButton from './PersonalizedRsvpButton';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

const DeadlineText = ({ enable_bahasa, color, event_date_deadline = '2012-12-12' }) => {
	const datelineText = enable_bahasa ? 'Sila RSVP sebelum' : 'Kindly RSVP by';

	return (
		<InviteTextProvider color={color} className='text-[14px] text-center py-2 uppercase'>
			{datelineText} {moment(event_date_deadline).format('DD.MM.YYYY')}
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
	enable_deadline = false,
	event_date_deadline = null,
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
			{enable_deadline && (
				<DeadlineText
					enable_bahasa={enable_bahasa}
					color={color}
					event_date_deadline={event_date_deadline}
				/>
			)}
		</div>
	);
}

export default ActionButtons;
