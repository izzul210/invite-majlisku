/** @format */

import React from 'react';
import Image from 'next/image';
//MUI import
import Skeleton from '@mui/material/Skeleton';
//Hooks import
import { useGiftList } from '../../hooks/useApi';
//Context import
import { useInviteContext } from '../inviteContext';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import defaultgiftimage from '../../public/defaultgift.png';
/****** Misc */
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

const ReservedTag = () => {
	return (
		<div
			className='rounded-full px-2 py-1'
			style={{
				background:
					'var(--nude-tint-50, linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), #F1BFBE)',
			}}>
			<InviteTextProvider
				color='#00000080'
				fontFamily='sansPro'
				className='text-[14px] tracking-[0.5px] flex flex-row gap-1 items-center font-semibold uppercase'>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='16'
					height='16'
					viewBox='0 0 16 16'
					fill='none'>
					<path
						d='M13.3337 4L6.00033 11.3333L2.66699 8'
						stroke='#F1BFBE'
						stroke-width='1.5'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
					<path
						d='M13.3337 4L6.00033 11.3333L2.66699 8'
						stroke='black'
						stroke-opacity='0.5'
						stroke-width='1.5'
						stroke-linecap='round'
						stroke-linejoin='round'
					/>
				</svg>
				Reserved
			</InviteTextProvider>
		</div>
	);
};

/***** Components */
const GiftContainerProvider = ({ children }) => {
	return (
		<div className='w-full flex flex-col pb-6 items-center'>
			<div className='w-full max-w-lg'>{children}</div>
		</div>
	);
};
const GiftTopAreaProvider = ({ enable_bahasa, address }) => {
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
};

const ReservedImage = ({ imageUrl }) => {
	const reservedText = 'This gift is reserved';

	return (
		<div className='relative max-h-[200px] overflow-hidden'>
			<div style={{ background: 'rgba(0, 0, 0, 0.30)' }}>
				<Image
					src={imageUrl ? imageUrl : defaultgiftimage}
					alt={'Gift Image'}
					width={320}
					height={200}
					placeholder='blur'
					blurDataURL='data:...'
					style={{ opacity: 0.3 }}
				/>
			</div>

			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '12%',
				}}>
				<div className='flex flex-row gap-2'>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='24'
						height='24'
						viewBox='0 0 24 24'
						fill='none'>
						<path
							d='M20 6L9 17L4 12'
							stroke='white'
							stroke-width='1.5'
							stroke-linecap='round'
							stroke-linejoin='round'
						/>
					</svg>
					<InviteTextProvider
						className='uppercase font-semibold text-[14px]'
						fontFamily='sansPro'
						color='#FFF'>
						{reservedText}
					</InviteTextProvider>
				</div>
			</div>
		</div>
	);
};

const GiftListLoading = () => {
	return (
		<div className='flex flex-col gap-6 items-center justify-center'>
			{Array.from(new Array(8)).map((_, index) => (
				<div className='w-full max-w-[320px] p-3' key={index}>
					<Skeleton className='w-full' variant='rectangular' height={200} />
					<div className='flex py-4 flex-col gap-2'>
						<Skeleton variant='rounded' sx={{ width: 90 }} />
					</div>
					<Skeleton variant='text' sx={{ fontSize: '18px', width: 120 }} />
				</div>
			))}
		</div>
	);
};

const GiftCard = ({ giftDetails, ...props }) => {
	const { name, imageUrl, link, category, reserved, id } = giftDetails || {};
	return (
		<div className='w-full max-w-[320px] p-3 cursor-pointer' {...props}>
			{reserved ? (
				<ReservedImage imageUrl={imageUrl} />
			) : (
				<div className='max-h-[200px] overflow-hidden'>
					<Image
						src={imageUrl ? imageUrl : defaultgiftimage}
						alt={name}
						width={320}
						height={200}
						placeholder='blur'
						blurDataURL='data:...'
					/>
				</div>
			)}

			<div className='flex py-4 flex-col gap-2'>
				<div className='flex flex-row justify-between items-center'>
					<div className='rounded-full bg-[#F2F4F7] px-2 py-1'>
						<InviteTextProvider
							color='#000000BF'
							fontFamily='sansPro'
							className='text-[14px] tracking-[0.5px] font-semibold uppercase'>
							{category}
						</InviteTextProvider>
					</div>
					{reserved && <ReservedTag />}
				</div>
			</div>
			<InviteTextProvider
				fontFamily='sansPro'
				className='text-[18px] font-semibold'
				color='#101828'>
				{name}
			</InviteTextProvider>
		</div>
	);
};

const GiftList = ({ handleSetGiftDetail, giftlist, giftIsLoading }) => {
	const handleClickGift = (gift) => {
		if (gift.reserved) return;
		handleSetGiftDetail(gift);
	};

	if (giftIsLoading) return <GiftListLoading />;
	return (
		<>
			{giftlist?.length > 0 ? (
				<div className='flex flex-col gap-6 items-center justify-center'>
					{giftlist?.map((gift) => (
						<GiftCard key={gift.id} giftDetails={gift} onClick={() => handleClickGift(gift)} />
					))}
				</div>
			) : (
				<div className='p-5 h-[340px] flex justify-center items-start text-center'>
					<InviteTextProvider className='text-[18px] opacity-70'>
						Host has not yet add any gift.
						<br /> Stay tuned!
					</InviteTextProvider>
				</div>
			)}
		</>
	);
};

export default function GiftRegistryModal({ handleSetGiftDetail }) {
	const { eventDetails } = useInviteContext();
	const { data: giftlist, isLoading: giftIsLoading } = useGiftList(eventDetails?.user_id);

	return (
		<GiftContainerProvider>
			<GiftTopAreaProvider
				enable_bahasa={eventDetails?.enable_bahasa}
				address={eventDetails?.delivery_address}
			/>
			<GiftList
				enable_bahasa={eventDetails?.enable_bahasa}
				handleSetGiftDetail={handleSetGiftDetail}
				giftlist={giftlist}
				giftIsLoading={giftIsLoading}
			/>
		</GiftContainerProvider>
	);
}
