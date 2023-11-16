/** @format */
import React from 'react';
//Components import
import ModalProvider from '../../../../component/drawer/DrawerProvider';
import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../../../component/button/ButtonProvider';

export default function GiftDetailModal({
	giftDetail = {},
	isOpen,
	handleClose,
	enable_bahasa = false,
}) {
	const inviteText = enable_bahasa
		? 'Adakah Tuan/Puan hadir ke Majlis ini?'
		: 'Would you be able to attend the event?';

	return (
		<ModalProvider isOpen={isOpen} handleClose={handleClose}>
			<div className='mt-4'>
				<div className='flex flex-col text-center gap-4 justify-center items-center'>
					<InviteTextProvider className='uppercase text-sm'>{giftDetail.name}</InviteTextProvider>
				</div>
			</div>
		</ModalProvider>
	);
}
