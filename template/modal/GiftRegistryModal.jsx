/** @format */

import React from 'react';
import { useQueryClient } from 'react-query';
import { useGiftList } from '../../hooks/useApi';
//Gift cpomponent import
import GiftContainerProvider from '../../component/gift/GiftContainerProvider';
import GiftTopAreaProvider from '../../component/gift/GiftTopAreaProvider';
import GiftList from '../../component/gift/GiftList';

export default function GiftRegistryModal({ handleSetGiftDetail }) {
	const queryClient = useQueryClient();
	const eventDetails = queryClient.getQueryData('eventDetails') || {};
	const { data: giftlist, isLoading: giftIsLoading } = useGiftList();

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
