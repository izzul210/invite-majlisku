/** @format */
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useRouter } from 'next/router';
//Context import
import { useInviteContext } from '../../pages/_app';
//Modals import
import RsvpActionModal from '../modals/RsvpActionModal';
import AttendingRsvpModal from '../modals/AttendingRsvpModal';
import NotAttendingRsvpModal from '../modals/NotAttendingRsvpModal';
import MaybeRsvpModal from '../modals/MaybeRsvpModal';
//Template import
const GreetingScreenDefault = dynamic(() => import('./GreetingScreenDefault'));
const GreetingScreenPremium = dynamic(() => import('./GreetingScreenPremium'));

export default function GreetingScreen() {
	const { eventDetails, state } = useInviteContext();
	const {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
	} = eventDetails;
	const { design, premium_design } = state;

	const [openModal, setOpenModal] = useState(false);
	const [attendingModal, setAttendingModal] = useState(false);
	const [notAttendingModal, setNotAttendingModal] = useState(false);
	const [maybeModal, setMaybeModal] = useState(false);
	const router = useRouter();

	let queryId = router.query.id;

	const handleOnClickRsvp = () => {
		setOpenModal(true);
	};
	const handleOnClickGift = () => {
		router.push(`/${queryId}/gift`);
	};
	const handleOnClickMoneyGift = () => {
		router.push(`/${queryId}/moneygift`);
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
		default:
			return (
				<>
					<GreetingScreenDefault
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
					/>
					<AttendingRsvpModal
						isOpen={attendingModal}
						handleClose={() => setAttendingModal(false)}
						handleBackButton={() => {
							setAttendingModal(false);
							setOpenModal(true);
						}}
						enable_bahasa={enable_bahasa}
					/>
					<NotAttendingRsvpModal
						isOpen={notAttendingModal}
						handleClose={() => setNotAttendingModal(false)}
						handleBackButton={() => {
							setNotAttendingModal(false);
							setOpenModal(true);
						}}
						enable_bahasa={enable_bahasa}
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
