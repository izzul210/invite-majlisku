/** @format */
'use client';
import React, { useEffect } from 'react';
import Image from 'next/image';
import { useQueryClient } from 'react-query';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../component/button/ButtonProvider';
//Default gift image
import defaultgiftimage from '../../public/defaultgift.png';

export default function GiftDetailModal({
	giftDetails,
	enable_bahasa = false,
	handleSwitchModalContent,
}) {
	const queryClient = useQueryClient();
	const { name, imageUrl, link, category, id } = giftDetails || {};
	const guestDetail = queryClient.getQueryData('personalizedGuestDetail') || null;

	useEffect(() => {}, [imageUrl]);

	const handleReserveButton = () => {
		if (guestDetail) {
			handleSwitchModalContent('confirmReserve');
		} else {
			handleSwitchModalContent('returnHome');
		}
	};

	return (
		<>
			<div className='mt-4 p-4 flex flex-col gap-2 items-center'>
				<div className='max-h-[320px] overflow-hidden'>
					<Image
						key={id}
						src={imageUrl ? imageUrl : defaultgiftimage}
						alt={name}
						width={320}
						height={320}
						placeholder='blur'
						blurDataURL='data:...'
					/>
				</div>
				<div className='flex flex-col w-full py-4 gap-4'>
					<div className='flex'>
						<div className='rounded-full bg-[#F2F4F7] px-2 py-1'>
							<InviteTextProvider
								color='#000000BF'
								fontFamily='sansPro'
								className='text-[14px] font-semibold uppercase'>
								{category}
							</InviteTextProvider>
						</div>
					</div>
					<InviteTextProvider
						fontFamily='sansPro'
						className='text-[18px] font-semibold'
						color='#101828'>
						{name}
					</InviteTextProvider>
				</div>
			</div>
			<div className='w-full flex-1 pb-4'>
				<ButtonProvider onClick={handleReserveButton} type='primary' className='w-full uppercase'>
					{enable_bahasa ? 'Simpan Hadiah' : 'Reserve Gift'}
				</ButtonProvider>
				{link && link !== '' ? (
					<a href={link} target='_blank'>
						<InviteTextProvider className='uppercase text-center underline pt-6'>
							View Shop
						</InviteTextProvider>
					</a>
				) : null}
			</div>
		</>
	);
}
