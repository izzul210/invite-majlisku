/** @format */
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { initialStates } from '../initalStates';
//Templates import
const EventDetailsBasic = dynamic(() => import('./EventDetailsBasic'));
const EventDetailsDefault = dynamic(() => import('./EventDetailsDefault'));
const EventDetailsMinimal_2 = dynamic(() => import('./EventDetailsMinimal_2'));
const EventDetailsPremium = dynamic(() => import('./EventDetailsPremium'));
//Modals import
const RsvpActionModal = dynamic(() => import('../modals/RsvpActionModal'));
const AttendingRsvpModal = dynamic(() => import('../modals/AttendingRsvpModal'));
const NotAttendingRsvpModal = dynamic(() => import('../modals/NotAttendingRsvpModal'));
const MaybeRsvpModal = dynamic(() => import('../modals/MaybeRsvpModal'));

export default function EventDetails({ eventDetails }) {
	const { event_date, event_time, description, enable_bahasa, location_info } = eventDetails || {};
	const { design, premium_design } = initialStates;

	const [openModal, setOpenModal] = useState(false);
	const [attendingModal, setAttendingModal] = useState(false);
	const [notAttendingModal, setNotAttendingModal] = useState(false);
	const [maybeModal, setMaybeModal] = useState(false);

	const eventDetailsProps = {
		enable_bahasa,
		event_date,
		event_start: event_time?.start,
		event_end: event_time?.end,
		description,
		event_address: location_info?.address,
		waze_link: location_info?.wazeLink,
		google_link: location_info?.googleLink,
	};

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

	return (
		<>
			{(() => {
				switch (design) {
					case 0:
						return <EventDetailsDefault {...eventDetailsProps} background='white' />;
					case 1:
						return <EventDetailsMinimal_2 {...eventDetailsProps} />;
					case 3:
						return <EventDetailsPremium premium_design={premium_design} {...eventDetailsProps} />;
					case 5:
					case 6:
					case 7:
						return (
							<EventDetailsBasic
								{...eventDetailsProps}
								onClickRSVP={handleOnClickRsvp}
								onClickGiftRegistry={handleOnClickGift}
								onClickMoneyGift={handleOnClickMoneyGift}
							/>
						);
					default:
						return <EventDetailsDefault {...eventDetailsProps} />;
				}
			})()}
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
