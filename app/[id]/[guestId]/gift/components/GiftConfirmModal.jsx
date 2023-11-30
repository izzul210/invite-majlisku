/** @format */

'use client';
import React from 'react';
//Components import
import ModalProvider from '../../../../../component/drawer/DrawerProvider';
import InviteTextProvider from '../../../../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../../../../component/button/ButtonProvider';
import { GiftIcon } from '../../../../../component/icons/icons';

export default function GiftConfirmModal({ isOpen, handleClose, handleConfirm, guestDetail }) {
	return (
		<ModalProvider isOpen={isOpen} handleClose={handleClose}>
			<div className='mt-4 flex flex-col gap-8 items-center'>
				<GiftIcon height='39.5' width='32' />
				<InviteTextProvider className='uppercase text-center px-2'>
					Anda ingin menghantar hadiah ini, <b>{guestDetail?.name}</b> ?
				</InviteTextProvider>
				<div className='w-full flex-1 flex flex-row gap-4 pb-8'>
					<ButtonProvider onClick={handleClose} className='w-full uppercase'>
						Batal
					</ButtonProvider>
					<ButtonProvider onClick={handleConfirm} type='primary' className='w-full uppercase'>
						Setuju
					</ButtonProvider>
				</div>
			</div>
		</ModalProvider>
	);
}
