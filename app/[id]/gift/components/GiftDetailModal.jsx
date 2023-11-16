/** @format */
'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
//Components import
import ModalProvider from '../../../../component/drawer/DrawerProvider';
import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../../../component/button/ButtonProvider';
import GiftConfirmModal from './GiftConfirmModal';
import GiftPostReserveModal from './GiftPostReserveModal';

export default function GiftDetailModal({
	giftDetails,
	isOpen,
	handleClose,
	enable_bahasa = false,
}) {
	const inviteText = enable_bahasa
		? 'Adakah Tuan/Puan hadir ke Majlis ini?'
		: 'Would you be able to attend the event?';

	const [confirmModal, setConfirmModal] = useState(false);
	const [postReseveModal, setPostReserveModal] = useState(false);

	const { name, imageUrl, link, category, reserved, id } = giftDetails || {};

	useEffect(() => {}, [imageUrl]);

	const handleReserveButton = () => {
		handleClose();
		setConfirmModal(true);
	};

	const handleConfirmReserve = () => {
		setConfirmModal(false);
		setPostReserveModal(true);
	};

	return (
		<>
			<ModalProvider isOpen={isOpen} handleClose={handleClose}>
				<div className='mt-4 p-4 flex flex-col gap-2 items-center'>
					<div className='max-h-[320px] overflow-hidden'>
						<Image
							key={id}
							src={imageUrl}
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
				<div className='w-full flex-1 pb-8'>
					<ButtonProvider onClick={handleReserveButton} type='primary' className='w-full uppercase'>
						Simpan Hadiah
					</ButtonProvider>
				</div>
			</ModalProvider>
			<GiftConfirmModal
				isOpen={confirmModal}
				handleClose={() => setConfirmModal(false)}
				handleConfirm={handleConfirmReserve}
			/>
			<GiftPostReserveModal
				isOpen={postReseveModal}
				handleClose={() => setPostReserveModal(false)}
			/>
		</>
	);
}
