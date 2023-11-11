/** @format */
'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { initialStates } from '../initalStates';
//Modals import
const RsvpActionModal = dynamic(() => import('../modals/RsvpActionModal'));
const AttendingRsvpModal = dynamic(() => import('../modals/AttendingRsvpModal'));
const NotAttendingRsvpModal = dynamic(() => import('../modals/NotAttendingRsvpModal'));
const MaybeRsvpModal = dynamic(() => import('../modals/MaybeRsvpModal'));
//Template import
const GreetingScreenPremium = dynamic(() => import('./GreetingScreenPremium'));
const GreetingScreenDefaultNoAnimation = dynamic(() =>
	import('./GreetingScreenDefaultNoAnimation')
);
const GreetingScreenIslamic_1 = dynamic(() => import('./GreetingScreenIslamic_1'));
const GreetingScreenIslamic_2 = dynamic(() => import('./GreetingScreenIslamic_2'));

export default function GreetingScreen({ eventDetails }) {
	const {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
	} = eventDetails || {};
	const { design, premium_design } = initialStates;

	const [openModal, setOpenModal] = useState(false);
	const [attendingModal, setAttendingModal] = useState(false);
	const [notAttendingModal, setNotAttendingModal] = useState(false);
	const [maybeModal, setMaybeModal] = useState(false);

	const handleOnClickRsvp = () => {
		setOpenModal(true);
	};
	const handleOnClickGift = () => {};
	const handleOnClickMoneyGift = () => {};

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

	const greetingScreenProps = {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
	};

	switch (design) {
		case 3:
			return <GreetingScreenPremium premium_design={premium_design} {...greetingScreenProps} />;
		case 5:
		case 7:
			return <GreetingScreenIslamic_1 premium_design={premium_design} {...greetingScreenProps} />;
		case 6:
			return <GreetingScreenIslamic_2 premium_design={premium_design} {...greetingScreenProps} />;
		default:
			return (
				<>
					<GreetingScreenDefaultNoAnimation
						{...greetingScreenProps}
						onClickRSVP={handleOnClickRsvp}
						onClickGiftRegistry={handleOnClickGift}
						onClickMoneyGift={handleOnClickMoneyGift}
					/>
					<RsvpActionModal
						isOpen={openModal}
						handleClose={() => setOpenModal(false)}
						handleRsvp={handleOnClickRsvpResponse}
						enable_bahasa={enable_bahasa}
						eventDetails={eventDetails}
					/>
					<AttendingRsvpModal
						isOpen={attendingModal}
						handleClose={() => setAttendingModal(false)}
						handleBackButton={() => {
							setAttendingModal(false);
							setOpenModal(true);
						}}
						handlePostRequest={() => {
							setAttendingModal(false);
							setOpenModal(true);
						}}
						enable_bahasa={enable_bahasa}
						eventDetails={eventDetails}
					/>
					<NotAttendingRsvpModal
						isOpen={notAttendingModal}
						handleClose={() => setNotAttendingModal(false)}
						handleBackButton={() => {
							setNotAttendingModal(false);
							setOpenModal(true);
						}}
						enable_bahasa={enable_bahasa}
						eventDetails={eventDetails}
					/>
					<MaybeRsvpModal
						isOpen={maybeModal}
						handleClose={() => setMaybeModal(false)}
						handleBackButton={() => {
							setMaybeModal(false);
							setOpenModal(true);
						}}
						enable_bahasa={enable_bahasa}
					/>
				</>
			);
	}
}
