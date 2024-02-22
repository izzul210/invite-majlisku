/** @format */

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { useQueryClient } from 'react-query';
//Context import
import { useInviteContext } from '../inviteContext';
//Hooks import
import { useSubmitPersonalReserveGift } from '../../hooks/usePostApi';
//Gift Registry modal content
const GiftRegistryModal = dynamic(() => import('../modal/GiftRegistryModal'));
import PersonalizedGiftDetailModal from '../modal/PersonalizedGiftDetailModal';
import GiftConfirmModal from '../modal/GiftConfirmModal';
import ReturnHomeModal from '../modal/ReturnHomeModal';
import GiftPostReserveModal from '../modal/GiftPostReserveModal';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import ModalProvider from '../../component/drawer/DrawerProvider';
import { GiftIcon } from '../../component/icons/icons';

function GiftRegistryButton({ enable_bahasa, preview }) {
	const { userId } = useInviteContext();
	//STATES
	const [openModal, setOpenModal] = useState(false);
	const [modalContent, setModalContent] = useState(null);
	const [giftDetails, setGiftDetails] = useState(null);
	const [loading, setLoading] = useState(false);
	//POST Request
	const queryClient = useQueryClient();
	const submitGuestReserveGift = useSubmitPersonalReserveGift(userId);
	//GET
	const guestDetail = queryClient.getQueryData('personalizedGuestDetail') || null;

	const handleOpenModal = () => {
		setModalContent('giftRegistry');
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setTimeout(() => {
			setModalContent('giftRegistry');
		}, 500);
	};

	const handleSwitchModalContent = (content) => {
		setOpenModal(false);
		setTimeout(() => {
			setModalContent(content);
			setOpenModal(true);
		}, 500);
	};

	const handleBackButton = () => {
		handleSwitchModalContent('giftRegistry');
	};

	const handleSetGiftDetail = (gift) => {
		setGiftDetails(gift);
		handleSwitchModalContent('giftDetail');
	};

	const handleConfirmReserve = async () => {
		setLoading(true);
		const response = await submitGuestReserveGift.mutateAsync({
			giftId: giftDetails.id,
			giftReserved: giftDetails.name,
		});

		if (response) {
			setLoading(false);
			handleSwitchModalContent('postReserve');
		} else {
			window.alert('Error please contact me!');
		}
	};

	return (
		<>
			<button
				disabled={preview}
				className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
				style={{ color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #1E1E1E' }}
				onClick={handleOpenModal}>
				<GiftIcon />
				<InviteTextProvider className='uppercase'>
					{enable_bahasa ? 'Bawa Hadiah' : 'Gift Registry'}
				</InviteTextProvider>
			</button>
			<ModalProvider
				loading={loading}
				padding='8px'
				topBorder={modalContent === 'giftRegistry' || modalContent === 'giftDetail'}
				backButton={modalContent === 'giftDetail'}
				isOpen={openModal}
				handleBackButton={handleBackButton}
				handleClose={handleCloseModal}>
				{(() => {
					switch (modalContent) {
						case 'giftRegistry':
							return <GiftRegistryModal handleSetGiftDetail={handleSetGiftDetail} />;
						case 'giftDetail':
							return (
								<PersonalizedGiftDetailModal
									giftDetails={giftDetails}
									handleSwitchModalContent={handleSwitchModalContent}
									enable_bahasa={enable_bahasa}
								/>
							);
						case 'returnHome':
							return (
								<ReturnHomeModal enable_bahasa={enable_bahasa} handleClose={handleCloseModal} />
							);
						case 'confirmReserve':
							return (
								<GiftConfirmModal
									enable_bahasa={enable_bahasa}
									handleConfirm={handleConfirmReserve}
									guestDetail={guestDetail}
									handleBack={handleBackButton}
								/>
							);
						case 'postReserve':
							return (
								<GiftPostReserveModal
									enable_bahasa={enable_bahasa}
									handleClose={handleCloseModal}
								/>
							);
						default:
							return null;
					}
				})()}
			</ModalProvider>
		</>
	);
}

export default GiftRegistryButton;
