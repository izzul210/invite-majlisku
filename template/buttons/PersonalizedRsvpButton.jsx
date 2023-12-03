/** @format */

'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
//Modals import
const PersonalizedRsvpActionModal = dynamic(() => import('../modals/PersonalizedRsvpActionModal'));
const PersonalizedAttendingRsvpModal = dynamic(() =>
	import('../modals/PersonalizedAttendingRsvpModal')
);
const PersonalizedNotAttendingRsvpModal = dynamic(() =>
	import('../modals/PersonalizedNotAttendingRsvpModal')
);
const PersonalizedMaybeRsvpModal = dynamic(() => import('../modals/PersonalizedMaybeRsvpModal'));
const ThankYouModal = dynamic(() => import('../modals/ThankYouModal'));

function PersonalizedRsvpButton(props) {
	const [openModal, setOpenModal] = useState(false);
	const [thankyouModal, setThankyouModal] = useState(false);
	const [attendingModal, setAttendingModal] = useState(false);
	const [notAttendingModal, setNotAttendingModal] = useState(false);
	const [maybeModal, setMaybeModal] = useState(false);
	const [status, setStatus] = useState('attending');
	//From React Query:
	const queryClient = useQueryClient();
	const eventDetails = queryClient.getQueryData('eventDetails') || {};
	const guestDetails = queryClient.getQueryData('personalizedGuestDetail') || {};
	const { enable_bahasa, event_time, event_date, event_time_slot_2, enable_multiple_slots } =
		eventDetails || {};

	const handleOnClickRsvp = () => {
		setOpenModal(true);
		// setThankyouModal(true);
	};

	const renderRsvpButtonTitle = () => {
		if (guestDetails?.response) {
			if (guestDetails?.response?.rsvp === 'attending') {
				return `RSVP'D - ${enable_bahasa ? 'Hadir' : 'Attending'}`;
			} else if (guestDetails?.response?.rsvp === 'notattending') {
				return `RSVP'D - ${enable_bahasa ? 'Tidak Hadir' : 'Not Attending'}`;
			} else if (guestDetails?.response?.rsvp === 'maybe') {
				return `RSVP'D - ${enable_bahasa ? 'Tidak Pasti' : 'Not Sure Yet'}`;
			}
		} else {
			return 'RSVP';
		}
	};

	const handleOnClickRsvpResponse = (status) => {
		setOpenModal(false);
		if (status === 0) {
			setAttendingModal(true);
		} else if (status === 1) {
			setNotAttendingModal(true);
		} else if (status === 2) {
			setMaybeModal(true);
		}
	};

	return (
		<>
			<button
				{...props}
				onClick={handleOnClickRsvp}
				style={{ backgroundColor: '#1E1E1E', border: '1px solid #1E1E1E' }}
				className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'>
				<InviteTextProvider className='uppercase' color='white'>
					{renderRsvpButtonTitle()}
				</InviteTextProvider>
			</button>
			<PersonalizedRsvpActionModal
				isOpen={openModal}
				handleClose={() => setOpenModal(false)}
				handleRsvp={handleOnClickRsvpResponse}
				eventDetails={eventDetails}
				enable_bahasa={enable_bahasa}
			/>
			<PersonalizedAttendingRsvpModal
				isOpen={attendingModal}
				enable_multiple_slots={enable_multiple_slots}
				event_time={event_time?.start}
				event_time_slot_2={event_time_slot_2}
				handleClose={() => setAttendingModal(false)}
				handleBackButton={() => {
					setAttendingModal(false);
					setOpenModal(true);
				}}
				handlePostRequest={() => {
					setAttendingModal(false);
					setThankyouModal(true);
				}}
				eventDetails={eventDetails}
				enable_bahasa={enable_bahasa}
			/>
			<PersonalizedNotAttendingRsvpModal
				isOpen={notAttendingModal}
				handleClose={() => setNotAttendingModal(false)}
				handleBackButton={() => {
					setNotAttendingModal(false);
					setOpenModal(true);
				}}
				handlePostRequest={() => {
					setStatus('notattending');
					setNotAttendingModal(false);
					setThankyouModal(true);
				}}
				eventDetails={eventDetails}
				enable_bahasa={enable_bahasa}
			/>
			<PersonalizedMaybeRsvpModal
				isOpen={maybeModal}
				handleClose={() => setMaybeModal(false)}
				handleBackButton={() => {
					setMaybeModal(false);
					setOpenModal(true);
				}}
				handlePostRequest={() => {
					setStatus('maybe');
					setMaybeModal(false);
					setThankyouModal(true);
				}}
				enable_bahasa={enable_bahasa}
			/>
			<ThankYouModal
				isOpen={thankyouModal}
				event_date={event_date}
				eventDetails={eventDetails}
				status={status}
				handleClose={() => setThankyouModal(false)}
				enable_bahasa={enable_bahasa}
			/>
		</>
	);
}

export default PersonalizedRsvpButton;
