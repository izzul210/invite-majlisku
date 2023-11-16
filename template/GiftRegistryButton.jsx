/** @format */

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { GiftIcon } from '../component/icons/icons';
import InviteTextProvider from '../component/textProvider/InviteTextProvider';

function GiftRegistryButton({ enable_bahasa }) {
	const pathname = usePathname();

	return (
		<Link href={`${pathname}/gift`}>
			<div
				className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
				style={{ color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #D0D5DD' }}>
				<GiftIcon />
				<InviteTextProvider className='uppercase'>
					{enable_bahasa ? 'Bawa Hadiah' : 'Gift Registry'}
				</InviteTextProvider>
			</div>
		</Link>
	);
}

export default GiftRegistryButton;
