/** @format */
'use client';
import dynamic from 'next/dynamic';
import React, { useState } from 'react';
import { useQueryClient } from 'react-query';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
//Modals import
const RsvpActionModal = dynamic(() => import('../modals/RsvpActionModal'));
const AttendingRsvpModal = dynamic(() => import('../modals/AttendingRsvpModal'));
const NotAttendingRsvpModal = dynamic(() => import('../modals/NotAttendingRsvpModal'));
const MaybeRsvpModal = dynamic(() => import('../modals/MaybeRsvpModal'));
const ThankYouModal = dynamic(() => import('../modals/ThankYouModal'));

function RsvpButton(props) {
	const [openModal, setOpenModal] = useState(false);
	const [thankyouModal, setThankyouModal] = useState(false);
	const [attendingModal, setAttendingModal] = useState(false);
	const [notAttendingModal, setNotAttendingModal] = useState(false);
	const [maybeModal, setMaybeModal] = useState(false);
	const [status, setStatus] = useState('attending');
	//From React Query:
	const queryClient = useQueryClient();
	const eventDetails = queryClient.getQueryData('eventDetails') || {};
	const {
		enable_bahasa,
		event_time,
		event_date,
		event_time_slot_2,
		enable_multiple_slots,
		enable_unlimited_pax,
		guest_pax_limit,
	} = eventDetails || {};

	const handleOnClickRsvp = () => {
		setOpenModal(true);
		// setThankyouModal(true);
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
				disabled={props.preview === true}
				{...props}
				onClick={handleOnClickRsvp}
				style={{ backgroundColor: '#1E1E1E', border: '1px solid #1E1E1E' }}
				className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'>
				<InviteTextProvider className='uppercase' color='white'>
					RSVP
				</InviteTextProvider>
			</button>
			<RsvpActionModal
				isOpen={openModal}
				handleClose={() => setOpenModal(false)}
				handleRsvp={handleOnClickRsvpResponse}
				eventDetails={eventDetails}
				enable_bahasa={enable_bahasa}
			/>
			<AttendingRsvpModal
				enable_unlimited_pax={enable_unlimited_pax}
				guest_pax_limit={guest_pax_limit}
				enable_bahasa={enable_bahasa}
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
			/>
			<NotAttendingRsvpModal
				enable_bahasa={enable_bahasa}
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
			/>
			<MaybeRsvpModal
				enable_bahasa={enable_bahasa}
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
			/>
			<ThankYouModal
				enable_bahasa={enable_bahasa}
				isOpen={thankyouModal}
				event_date={event_date}
				eventDetails={eventDetails}
				status={status}
				handleClose={() => setThankyouModal(false)}
			/>
		</>
	);
}

export default RsvpButton;
