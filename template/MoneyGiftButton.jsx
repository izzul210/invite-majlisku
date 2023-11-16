/** @format */

import React, { useState } from 'react';
import { MoneyGift } from '../component/icons/icons';
import InviteTextProvider from '../component/textProvider/InviteTextProvider';
import MoneyGiftModal from './modals/MoneyGiftModal';

function MoneyGiftButton({ enable_bahasa }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
				style={{ color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #D0D5DD' }}
				onClick={() => setOpen(true)}>
				<MoneyGift />
				<InviteTextProvider className='uppercase'>
					{enable_bahasa ? 'Salam Kaut' : 'Money Gift'}
				</InviteTextProvider>
			</button>
			<MoneyGiftModal isOpen={open} handleClose={() => setOpen(false)} />
		</>
	);
}

export default MoneyGiftButton;
