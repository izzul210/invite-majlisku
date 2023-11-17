/** @format */

'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
//API import
import { useEventDetails, useGiftList } from '../../../hooks/useApi';
//Page components import
import GiftContainerProvider from './components/GiftContainerProvider';
import GiftTopBar from './components/GiftTopBar';
import GiftTopAreaProvider from './components/GiftTopAreaProvider';
import GiftList from './components/GiftList';
import Footnote from '../../../template/Footnote';

export default function GiftPage({ inviteId }) {
	const { data: eventDetails, isLoading } = useEventDetails(inviteId);
	const { data: giftlist, isLoading: giftIsLoading } = useGiftList();
	const router = useRouter();

	const handleReturnMainPage = () => {
		router.push(`/${inviteId}`);
	};

	if (isLoading) {
		return <div>Looading...</div>;
	}

	return (
		<>
			<GiftContainerProvider>
				<GiftTopBar handleBackButton={handleReturnMainPage} />
				<GiftTopAreaProvider
					title='Senarai Hadiah'
					description='Anda tak diwajibkan untuk membeli hadiah-hadiah ini. Ini hanya sekadar panduan'
					address='No 30, Jalan Saujana Damai 1 Taman Saujana Damai 4300 Kajang'
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
