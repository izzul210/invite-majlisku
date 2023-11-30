/** @format */

import React from 'react';
import InviteTextProvider from '../../../../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../../../../component/misc/InviteLineLogo';

function GiftTopAreaProvider({ title, description, address }) {
	return (
		<div className='w-full py-6 px-8'>
			<div className='w-full flex flex-col gap-4 py-2'>
				<InviteTextProvider className='font-semibold text-[20px] uppercase'>
					{title}
				</InviteTextProvider>
				{description && (
					<InviteTextProvider className='text-[14px]' color='#667085' fontFamily='sansPro'>
						{description}
					</InviteTextProvider>
				)}
			</div>
			<InviteLineLogo color='#F1BFBE' height='1px' />
			{address && address !== '' ? (
				<div className='py-4 flex flex-col gap-2'>
					<InviteTextProvider
						fontFamily='sansPro'
						color='#667085'
						className='text-[14px] font-semibold uppercase'>
						Alamat
					</InviteTextProvider>
					<InviteTextProvider fontFamily='sansPro' color='#667085' className='text-[14px]'>
						{address}
					</InviteTextProvider>
				</div>
			) : null}
		</div>
	);
}

export default GiftTopAreaProvider;
