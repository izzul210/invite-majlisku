/** @format */

'use client';
import ModalProvider from '../../component/drawer/DrawerProvider';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
//Modals content import
import RsvpActionModal from '../modal/RsvpActionModal';
import AttendingRsvpModal from '../modal/AttendingRsvpModal';
import NotAttendingRsvpModal from '../modal/NotAttendingRsvpModal';
import MaybeRsvpModal from '../modal/MaybeRsvpModal';
import ThankYouModal from '../modal/ThankYouModal';

function RsvpButton(props) {
	//From React Query:
	const queryClient = useQueryClient();
	const eventDetails = queryClient.getQueryData('eventDetails') || {};
	//States
	const [openModal, setOpenModal] = useState(false);
	const [modalContent, setModalContent] = useState('rsvpAction');
	const [status, setStatus] = useState('attending');

	const {
		enable_bahasa,
		event_time,
		event_date,
		event_time_slot_2,
		enable_multiple_slots,
		enable_unlimited_pax,
		guest_pax_limit,
		enable_gift_registry,
	} = eventDetails || {};

	const renderBackButton = () => {
		if (
			modalContent === 'attending' ||
			modalContent === 'notattending' ||
			modalContent === 'maybe'
		) {
			return true;
		} else {
			return false;
		}
	};

	const handleOpenModal = () => {
		setOpenModal(true);
	};

	const handleCloseModal = () => {
		setOpenModal(false);
		setTimeout(() => {
			setModalContent('rsvpAction');
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
		if (
			modalContent === 'attending' ||
			modalContent === 'notattending' ||
			modalContent === 'maybe'
		) {
			handleSwitchModalContent('rsvpAction');
		}
	};

	const handleOnClickRsvpResponse = (status) => {
		if (status === 0) {
			handleSwitchModalContent('attending');
		} else if (status === 1) {
			handleSwitchModalContent('notattending');
		} else if (status === 2) {
			handleSwitchModalContent('maybe');
		}
	};

	return (
		<>
			<button
				disabled={props.preview === true}
				{...props}
				onClick={handleOpenModal}
				style={{ backgroundColor: '#1E1E1E', border: '1px solid #1E1E1E' }}
				className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'>
				<InviteTextProvider className='uppercase' color='white'>
					RSVP
				</InviteTextProvider>
			</button>
			<ModalProvider
				topBorder={renderBackButton()}
				backButton={renderBackButton()}
				isOpen={openModal}
				handleBackButton={handleBackButton}
				handleClose={handleCloseModal}>
				{(() => {
					switch (modalContent) {
						case 'rsvpAction':
							return (
								<RsvpActionModal
									handleRsvp={handleOnClickRsvpResponse}
									enable_bahasa={enable_bahasa}
								/>
							);
						case 'attending':
							return (
								<AttendingRsvpModal
									enable_unlimited_pax={enable_unlimited_pax}
									guest_pax_limit={guest_pax_limit}
									enable_bahasa={enable_bahasa}
									enable_multiple_slots={enable_multiple_slots}
									event_time={event_time?.start}
									event_time_slot_2={event_time_slot_2}
									handleClose={handleCloseModal}
									handlePostRequest={() => {
										setStatus('attending');
										handleSwitchModalContent('thankyou');
									}}
									eventDetails={eventDetails}
								/>
							);
						case 'notattending':
							return (
								<NotAttendingRsvpModal
									enable_bahasa={enable_bahasa}
									handleClose={handleCloseModal}
									handlePostRequest={() => {
										setStatus('notattending');
										handleSwitchModalContent('thankyou');
									}}
									eventDetails={eventDetails}
								/>
							);
						case 'maybe':
							return (
								<MaybeRsvpModal
									enable_bahasa={enable_bahasa}
									handleClose={handleCloseModal}
									handlePostRequest={() => {
										setStatus('maybe');
										handleSwitchModalContent('thankyou');
									}}
								/>
							);
						case 'thankyou':
							return (
								<ThankYouModal
									enable_bahasa={enable_bahasa}
									event_date={event_date}
									eventDetails={eventDetails}
									status={status}
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

export default RsvpButton;
