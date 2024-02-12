/** @format */

import React, { useState } from 'react';
import { GiftIcon } from '../../component/icons/icons';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import GiftRegistryModal from '../modals/GiftRegistryModal';

function GiftRegistryButton({ enable_bahasa, preview }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				disabled={preview}
				className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
				style={{ color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #1E1E1E' }}
				onClick={() => setOpen(true)}>
				<GiftIcon />
				<InviteTextProvider className='uppercase'>
					{enable_bahasa ? 'Bawa Hadiah' : 'Gift Registry'}
				</InviteTextProvider>
			</button>
			<GiftRegistryModal
				isOpen={open}
				handleClose={() => setOpen(false)}
				handleOpen={() => setOpen(true)}
			/>
		</>
	);
}

export default GiftRegistryButton;
