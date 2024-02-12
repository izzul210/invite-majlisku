/** @format */

'use client';
import React from 'react';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../component/button/ButtonProvider';
import { GiftIcon } from '../../component/icons/icons';

export default function ReturnHomeModal({ enable_bahasa, handleClose }) {
	return (
		<div className='mt-4 flex flex-col gap-8 items-center'>
			<GiftIcon height={40} width={32} />
			<InviteTextProvider className='uppercase text-center px-2'>
				{enable_bahasa
					? 'Sila RSVP dahulu untuk menempah hadiah ini'
					: 'Kindly Rsvp to reserve this item as a gift'}
			</InviteTextProvider>
			<div className='w-full flex-1 flex flex-row gap-4 pb-8'>
				<ButtonProvider onClick={handleClose} type='primary' className='w-full uppercase'>
					{enable_bahasa ? 'Kembali' : 'Return'}
				</ButtonProvider>
			</div>
		</div>
	);
}
