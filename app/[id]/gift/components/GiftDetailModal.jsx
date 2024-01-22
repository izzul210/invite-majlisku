/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useQueryClient } from 'react-query';
//API import
import { useSubmitReserveGift } from '../../../../hooks/usePostApi';
//Components import
import ModalProvider from '../../../../component/drawer/DrawerProvider';
import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../../../component/button/ButtonProvider';
import GiftConfirmModal from './GiftConfirmModal';
import GiftPostReserveModal from './GiftPostReserveModal';
import ReturnHomeModal from './ReturnHomeModal';
//Default gift image
import defaultgiftimage from '../../../../public/defaultgift.png';

export default function GiftDetailModal({
	giftDetails,
	isOpen,
	handleClose,
	handleReturnMainPage,
	enable_bahasa = false,
}) {
	const queryClient = useQueryClient();
	const [confirmModal, setConfirmModal] = useState(false);
	const [postReserveModal, setPostReserveModal] = useState(false);
	const [returnHomeModal, setReturnHomeMModal] = useState(false);
	const { name, imageUrl, link, category, id } = giftDetails || {};

	const guestDetail = queryClient.getQueryData('guestDetail') || null;

	const submitGuestReserveGift = useSubmitReserveGift();

	useEffect(() => {}, [imageUrl]);

	const handleReserveButton = () => {
		handleClose();
		if (guestDetail) {
			setConfirmModal(true);
		} else {
			setReturnHomeMModal(true);
		}
	};

	const handleConfirmReserve = async () => {
		const response = await submitGuestReserveGift.mutateAsync({ giftId: id, giftReserved: name });
		if (response) {
			setConfirmModal(false);
			setPostReserveModal(true);
		} else {
			window.alert('Error please contact me!');
		}
	};

	return (
		<>
			<ModalProvider
				loading={submitGuestReserveGift.isLoading}
				isOpen={isOpen}
				handleClose={handleClose}>
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
						Simpan Hadiah
					</ButtonProvider>
					{link && link !== '' ? (
						<a href={link} target='_blank'>
							<InviteTextProvider className='uppercase text-center underline pt-6'>
								View Shop
							</InviteTextProvider>
						</a>
					) : null}
				</div>
			</ModalProvider>
			<GiftConfirmModal
				isOpen={confirmModal}
				handleClose={() => setConfirmModal(false)}
				handleConfirm={handleConfirmReserve}
				guestDetail={guestDetail}
			/>
			<GiftPostReserveModal
				isOpen={postReserveModal}
				handleClose={() => setPostReserveModal(false)}
				handleReturnMainPage={handleReturnMainPage}
			/>
			<ReturnHomeModal
				enable_bahasa={enable_bahasa}
				handleReturnMainPage={handleReturnMainPage}
				isOpen={returnHomeModal}
				handleClose={() => setReturnHomeMModal(false)}
			/>
		</>
	);
}
