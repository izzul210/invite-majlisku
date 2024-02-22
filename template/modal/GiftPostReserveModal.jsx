/** @format */

'use client';
import React from 'react';
import Link from 'next/link';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../component/button/ButtonProvider';
import { GiftIcon, MajliskuWhiteIcon } from '../../component/icons/icons';

export default function GiftConfirmModal({ enable_bahasa, handleClose }) {
	return (
		<div className='mt-4 flex flex-col gap-8 items-center'>
			<GiftIcon height='39.5' width='32' />
			<InviteTextProvider className='uppercase text-center px-4'>
				{enable_bahasa
					? 'Terima kasih, hadiah berjaya disimpan!'
					: 'Thank you, your gift is reserved!'}
			</InviteTextProvider>
			<div className='w-full flex-1 flex flex-col gap-2 pb-8'>
				<ButtonProvider onClick={handleClose} className='w-full uppercase'>
					{enable_bahasa ? 'Halaman Utama' : 'Back to Home'}
				</ButtonProvider>
				<Link href='https://majlisku.com' target='_blank'>
					<ButtonProvider type='primary' className='w-full uppercase'>
						<MajliskuWhiteIcon />
						{enable_bahasa ? 'Cipta undangan anda' : 'Create your invitation'}
					</ButtonProvider>
				</Link>
			</div>
		</div>
	);
}
