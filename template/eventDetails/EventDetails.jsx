/** @format */
import { useEffect } from 'react';
//Context import
import { useInviteContext } from '../../pages/_app';
//Templates import
import EventDetailsDefault from './EventDetailsDefault';
import EventDetailsMinimal_2 from './EventDetailsMinimal_2';
import EventDetailsPremium from './EventDetailsPremium';

export default function EventDetails() {
	const { eventDetails, state } = useInviteContext();
	const { event_date, event_time, description, location_info } = eventDetails;
	const { design, premium_design } = state;

	useEffect(() => {}, [design]);

	const eventDetailsProps = {
		event_date,
		event_start: event_time?.start,
		event_end: event_time?.end,
		description,
		event_address: location_info.address,
		waze_link: location_info?.wazeLink,
		google_link: location_info?.googleLink,
	};

	switch (design) {
		case 0:
			return <EventDetailsDefault {...eventDetailsProps} background='white' />;
		case 1:
			return <EventDetailsMinimal_2 {...eventDetailsProps} />;
		case 3:
			return <EventDetailsPremium premium_design={premium_design} {...eventDetailsProps} />;
		default:
			return <EventDetailsDefault {...eventDetailsProps} />;
	}
}
