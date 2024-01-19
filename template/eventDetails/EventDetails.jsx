/** @format */
'use client';
import dynamic from 'next/dynamic';
import { useState } from 'react';
import { useInviteContext } from '../inviteContext';
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

export default function EventDetails({ eventDetails, guest_name = null, preview = false }) {
	const {
		event_date,
		event_time,
		description,
		enable_bahasa,
		location_info,
		enable_gift_registry,
		enable_money_gift,
		event_date_deadline,
		enable_deadline,
		event_address,
	} = eventDetails || {};
	const { design } = useInviteContext();
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
		event_address: event_address ? event_address : location_info?.address,
		waze_link: location_info?.wazeLink,
		google_link: location_info?.googleLink,
		enable_gift_registry,
		enable_money_gift,
		event_date_deadline,
		enable_deadline,
		//type
		guest_name,
		preview,
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
			{(() => {
				switch (design) {
					case 0:
						return <EventDetailsDefault {...eventDetailsProps} background='white' />;
					case 1:
						return <EventDetailsMinimal_2 {...eventDetailsProps} />;
					case 3:
						return <EventDetailsDefault {...eventDetailsProps} background='white' />;
					case 5:
					case 6:
					case 7:
					case 30:
					case 31:
					case 32:
					case 33:
					case 34:
					case 35:
					case 40:
					case 41:
					case 42:
					case 50:
					case 51:
					case 52:
						return <EventDetailsBasic {...eventDetailsProps} />;
					case 20:
						return <EventDetailsPremium premium_design={0} {...eventDetailsProps} />;
					case 21:
						return <EventDetailsPremium premium_design={1} {...eventDetailsProps} />;
					case 22:
						return <EventDetailsPremium premium_design={2} {...eventDetailsProps} />;
					case 23:
						return <EventDetailsPremium premium_design={3} {...eventDetailsProps} />;
					case 24:
						return <EventDetailsPremium premium_design={4} {...eventDetailsProps} />;
					case 25:
						return <EventDetailsPremium premium_design={5} {...eventDetailsProps} />;
					case 26:
						return <EventDetailsPremium premium_design={6} {...eventDetailsProps} />;
					case 27:
						return <EventDetailsPremium premium_design={7} {...eventDetailsProps} />;

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
