/** @format */
'use client';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
import Image from 'next/image';
import InviteTextProvider from '../../../../../component/textProvider/InviteTextProvider';
import GiftDetailModal from './GiftDetailModal';
import GiftListLoading from './GiftListLoading';

const ReservedImage = ({ imageUrl, reservedId, guestId }) => {
	const reservedText = () => (reservedId === guestId ? 'Reserved by You' : 'This gift is reserved');

	return (
		<div className='relative max-h-[320px] overflow-hidden'>
			<div style={{ background: 'rgba(0, 0, 0, 0.30)' }}>
				<Image
					src={imageUrl}
					alt={imageUrl}
					width={320}
					height={320}
					placeholder='blur'
					blurDataURL='data:...'
					style={{ opacity: 0.3 }}
				/>
			</div>

			<div
				style={{
					position: 'absolute',
					top: '50%',
					left: '20%',
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
						{reservedText()}
					</InviteTextProvider>
				</div>
			</div>
		</div>
	);
};

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

const GiftCard = ({ giftDetails, guestId, ...props }) => {
	const { name, imageUrl, link, category, reserved, id } = giftDetails || {};
	return (
		<div className='w-full max-w-[320px] p-3 cursor-pointer' {...props}>
			{reserved ? (
				<ReservedImage imageUrl={imageUrl} reservedId={giftDetails?.reserved} guestId={guestId} />
			) : (
				<div className=' max-h-[320px] overflow-hidden'>
					<Image
						src={imageUrl}
						alt={name}
						width={320}
						height={320}
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

function GiftList({ giftlist, giftIsLoading, handleReturnMainPage }) {
	const queryClient = useQueryClient();
	const guestDetail = queryClient.getQueryData('personalizedGuestDetail') || null;
	const [giftDetails, setGiftDetails] = useState({});
	const [giftModal, setGiftModal] = useState(false);
	const handleClickGift = (gift) => {
		if (gift.reserved) return;
		setGiftDetails(gift);
		setGiftModal(true);
	};

	if (giftIsLoading) return <GiftListLoading />;
	return (
		<>
			{giftlist?.length > 0 ? (
				<div className='flex flex-col gap-6 items-center justify-center'>
					{giftlist?.map((gift) => (
						<GiftCard
							key={gift.id}
							giftDetails={gift}
							guestId={guestDetail?.id}
							onClick={() => handleClickGift(gift)}
						/>
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
			<GiftDetailModal
				handleReturnMainPage={handleReturnMainPage}
				giftDetails={giftDetails}
				isOpen={giftModal}
				handleClose={() => setGiftModal(false)}
			/>
		</>
	);
}

export default GiftList;
