/** @format */
import dynamic from 'next/dynamic';
import { useInviteContext } from '../inviteContext';
//Calendar immports
const CalendarDefault = dynamic(() => import('./CalendarDefault'));
const CalendarAccordian = dynamic(() => import('./CalendarAccordian'));

export default function Calendar() {
	const { design, eventDetails } = useInviteContext();
	const { enable_bahasa, event_date, location_info, event_time, event_title_1, italic_title } =
		eventDetails;

	const renderComponent = () => {
		switch (design) {
			case 0:
			case 3:
				return (
					<CalendarDefault
						enable_bahasa={enable_bahasa}
						location_info={location_info}
						event_time={event_time}
						event_date={event_date}
						event_title={`${event_title_1} ${italic_title}`}
					/>
				);
			default:
				return (
					<CalendarAccordian
						enable_bahasa={enable_bahasa}
						location_info={location_info}
						event_time={event_time}
						event_date={event_date}
						event_title={`${event_title_1} ${italic_title}`}
					/>
				);
		}
	};

	if (!event_date) return null;
	else return renderComponent();
}
