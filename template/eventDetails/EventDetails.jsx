/** @format */
'use client';
import dynamic from 'next/dynamic';
import { useInviteContext } from '../inviteContext';
//Templates import
const EventDetailsBasic = dynamic(() => import('./EventDetailsBasic'));
const EventDetailsDefault = dynamic(() => import('./EventDetailsDefault'));
const EventDetailsMinimal_2 = dynamic(() => import('./EventDetailsMinimal_2'));
const EventDetailsPremium = dynamic(() => import('./EventDetailsPremium'));
const EventDetailsBasicAnimation = dynamic(() => import('./EventDetailsBasicAnimation'));
const EventDetailsPremiumAnimation = dynamic(() => import('./EventDetailsPremiumAnimation'));

export default function EventDetails({
	eventDetails,
	inviteId,
	guest_name = null,
	preview = false,
}) {
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
		inviteId,
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
						return <EventDetailsBasicAnimation {...eventDetailsProps} />;
					case 20:
						return <EventDetailsPremiumAnimation premium_design={0} {...eventDetailsProps} />;
					case 21:
						return <EventDetailsPremiumAnimation premium_design={1} {...eventDetailsProps} />;
					case 22:
						return <EventDetailsPremiumAnimation premium_design={2} {...eventDetailsProps} />;
					case 23:
						return <EventDetailsPremiumAnimation premium_design={3} {...eventDetailsProps} />;
					case 24:
						return <EventDetailsPremiumAnimation premium_design={4} {...eventDetailsProps} />;
					case 25:
						return <EventDetailsPremiumAnimation premium_design={5} {...eventDetailsProps} />;
					case 26:
						return <EventDetailsPremiumAnimation premium_design={6} {...eventDetailsProps} />;
					case 27:
						return <EventDetailsPremiumAnimation premium_design={7} {...eventDetailsProps} />;

					default:
						return <EventDetailsDefault {...eventDetailsProps} />;
				}
			})()}
		</>
	);
}
