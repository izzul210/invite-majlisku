/** @format */

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
//API import
import { useEventDetails, useGiftList } from '../../../../hooks/useApi';
//Page components import
import CardLoadingState from '../../../../component/loading/CardLoadingState';
import Footnote from '../../../../template/Footnote';
//Gift components import
import GiftContainerProvider from './components/GiftContainerProvider';
import GiftTopBar from './components/GiftTopBar';
import GiftTopAreaProvider from './components/GiftTopAreaProvider';
import GiftList from './components/GiftList';

export default function GiftPage({ inviteId, guestId }) {
	const { data: eventDetails, isLoading } = useEventDetails(inviteId);
	const { data: giftlist, isLoading: giftIsLoading } = useGiftList();
	const router = useRouter();

	const handleReturnMainPage = () => {
		router.push(`/${inviteId}/${guestId}`);
	};

	if (isLoading) {
		return <CardLoadingState loadingState={isLoading} />;
	}

	return (
		<>
			<GiftContainerProvider>
				<GiftTopBar handleBackButton={handleReturnMainPage} />
				<GiftTopAreaProvider
					enable_bahasa={eventDetails?.enable_bahasa}
					address={eventDetails?.delivery_address}
				/>
				<GiftList
					handleReturnMainPage={handleReturnMainPage}
					giftlist={giftlist}
					giftIsLoading={giftIsLoading}
				/>
			</GiftContainerProvider>
			<Footnote />
		</>
	);
}
