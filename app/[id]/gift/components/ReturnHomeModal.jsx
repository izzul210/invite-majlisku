/** @format */

'use client';
import React from 'react';
//Components import
import ModalProvider from '../../../../component/drawer/DrawerProvider';
import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../../../component/button/ButtonProvider';
import { GiftIcon } from '../../../../component/icons/icons';

export default function ReturnHomeModal({ isOpen, handleClose, handleReturnMainPage }) {
	return (
		<ModalProvider isOpen={isOpen} handleClose={handleClose}>
			<div className='mt-4 flex flex-col gap-8 items-center'>
				<GiftIcon height={40} width={32} />
				<InviteTextProvider className='uppercase text-center px-2'>
					Hey, kindly Rsvp to reserve this item as a gift
				</InviteTextProvider>
				<div className='w-full flex-1 flex flex-row gap-4 pb-8'>
					<ButtonProvider
						onClick={handleReturnMainPage}
						type='primary'
						className='w-full uppercase'>
						Return Home
					</ButtonProvider>
				</div>
			</div>
		</ModalProvider>
	);
}
