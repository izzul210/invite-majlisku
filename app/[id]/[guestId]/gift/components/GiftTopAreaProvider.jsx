/** @format */

import React from 'react';
import InviteTextProvider from '../../../../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../../../../component/misc/InviteLineLogo';

const AddressIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 16 16' fill='none'>
		<g clip-path='url(#clip0_2224_58018)'>
			<path
				d='M10.667 2H0.666992V10.6667H10.667V2Z'
				stroke='#1D4648'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M10.667 5.33325H13.3337L15.3337 7.33325V10.6666H10.667V5.33325Z'
				stroke='#1D4648'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M3.66667 14.0001C4.58714 14.0001 5.33333 13.2539 5.33333 12.3334C5.33333 11.4129 4.58714 10.6667 3.66667 10.6667C2.74619 10.6667 2 11.4129 2 12.3334C2 13.2539 2.74619 14.0001 3.66667 14.0001Z'
				stroke='#1D4648'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
			<path
				d='M12.3337 14.0001C13.2541 14.0001 14.0003 13.2539 14.0003 12.3334C14.0003 11.4129 13.2541 10.6667 12.3337 10.6667C11.4132 10.6667 10.667 11.4129 10.667 12.3334C10.667 13.2539 11.4132 14.0001 12.3337 14.0001Z'
				stroke='#1D4648'
				stroke-width='1.5'
				stroke-linecap='round'
				stroke-linejoin='round'
			/>
		</g>
		<defs>
			<clipPath id='clip0_2224_58018'>
				<rect width='16' height='16' fill='white' />
			</clipPath>
		</defs>
	</svg>
);

function GiftTopAreaProvider({ enable_bahasa, address }) {
	const giftTitle = enable_bahasa ? 'Registri Hadiah' : 'Reserve a Gift';
	const giftDescription = enable_bahasa
		? 'Anda tak diwajibkan untuk membeli hadiah-hadiah ini. Ini hanya sekadar panduan'
		: `You're not obligated to purchase any of these gifts. They are just suggestions.`;

	return (
		<div className='w-full py-6 px-8'>
			<div className='w-full flex flex-col gap-4 py-2'>
				<InviteTextProvider className='font-semibold text-[20px] uppercase'>
					{giftTitle}
				</InviteTextProvider>
				{giftDescription && (
					<InviteTextProvider className='text-[14px]' color='#667085' fontFamily='sansPro'>
						{giftDescription}
					</InviteTextProvider>
				)}
			</div>
			<InviteLineLogo color='#F1BFBE' height='1px' />
			{address && address !== '' ? (
				<div
					className='px-[14px] py-2 flex flex-col gap-2 rounded-[8px] w-full'
					style={{
						background:
							'var(--nude-tint-75, linear-gradient(0deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.75) 100%), #F1BFBE)',
					}}>
					<InviteTextProvider
						fontFamily='sansPro'
						color='#1D4648'
						className='text-[14px] font-semibold uppercase flex items-center gap-2'>
						<AddressIcon />
						{enable_bahasa ? 'Alamat' : 'Delivery'}
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
