/** @format */
import dynamic from 'next/dynamic';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
//Context import
import { useInviteContext } from '../../pages/_app';
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
//API import
import { useEventDetails } from '../../hooks/useApi';

export default function EventDetails() {
	const { state } = useInviteContext();
	const { data: eventDetails } = useEventDetails();
	const { event_date, event_time, description, location_info } = eventDetails || {};
	const { design, premium_design } = state;

	const [openModal, setOpenModal] = useState(false);
	const [attendingModal, setAttendingModal] = useState(false);
	const [notAttendingModal, setNotAttendingModal] = useState(false);
	const [maybeModal, setMaybeModal] = useState(false);
	const router = useRouter();

	const eventDetailsProps = {
		event_date,
		event_start: event_time?.start,
		event_end: event_time?.end,
		description,
		event_address: location_info?.address,
		waze_link: location_info?.wazeLink,
		google_link: location_info?.googleLink,
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
						return <EventDetailsBasic {...eventDetailsProps} />;
					default:
						return <EventDetailsDefault {...eventDetailsProps} />;
				}
			})()}
		</>
	);
}
