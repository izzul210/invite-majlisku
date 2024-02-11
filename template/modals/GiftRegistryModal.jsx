/** @format */

import React from 'react';
import Image from 'next/image';
import { useQueryClient } from 'react-query';
import { useGiftList } from '../../hooks/useApi';
//Components import
import ModalProvider from '../../component/drawer/DrawerProvider';
//Gift cpomponent import
import GiftContainerProvider from '../../component/gift/GiftContainerProvider';
import GiftTopAreaProvider from '../../component/gift/GiftTopAreaProvider';
import GiftList from '../../component/gift/GiftList';

export default function GiftRegistryModal({ isOpen, handleClose, handleOpen }) {
	const queryClient = useQueryClient();
	const eventDetails = queryClient.getQueryData('eventDetails') || {};
	const { data: giftlist, isLoading: giftIsLoading } = useGiftList();

	return (
		<ModalProvider padding='8px' topBorder isOpen={isOpen} handleClose={handleClose}>
			<GiftContainerProvider>
				<GiftTopAreaProvider
					enable_bahasa={eventDetails?.enable_bahasa}
					address={eventDetails?.delivery_address}
				/>
				<GiftList
					enable_bahasa={eventDetails?.enable_bahasa}
					giftlist={giftlist}
					giftIsLoading={giftIsLoading}
					handleCloseGiftRegistry={handleClose}
					handleOpenGiftRegistry={handleOpen}
					handleReturnMainPage={handleClose}
				/>
			</GiftContainerProvider>
		</ModalProvider>
	);
}
