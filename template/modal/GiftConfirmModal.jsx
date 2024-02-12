/** @format */

'use client';
import React from 'react';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../component/button/ButtonProvider';
import { GiftIcon } from '../../component/icons/icons';

export default function GiftConfirmModal({
	enable_bahasa,
	handleBack,
	handleConfirm,
	guestDetail,
}) {
	return (
		<div className='mt-4 flex flex-col gap-8 items-center'>
			<GiftIcon height='39.5' width='32' />
			<InviteTextProvider className='uppercase text-center px-2'>
				{enable_bahasa ? 'Anda ingin menghantar hadiah ini' : 'Do you want to reserve this gift'},{' '}
				<b>{guestDetail?.name}</b> ?
			</InviteTextProvider>
			<div className='w-full flex-1 flex flex-row gap-4 pb-8'>
				<ButtonProvider onClick={handleBack} className='w-full uppercase'>
					{enable_bahasa ? 'Batal' : 'Cancel'}
				</ButtonProvider>
				<ButtonProvider onClick={() => handleConfirm()} type='primary' className='w-full uppercase'>
					{enable_bahasa ? 'Setuju' : 'Cofirm'}
				</ButtonProvider>
			</div>
		</div>
	);
}
