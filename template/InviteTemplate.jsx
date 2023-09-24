/** @format */
import React from 'react';
//Context import
import { useInviteContext } from '../pages/_app';
import { TentativeDefault, TentativeAccordian } from './tentative/Tentative';
import { ContactAccordian, ContactDefault } from './contacts/Contacts';
import { WishAccordian, WishDefault } from './wishlist/Wishlist';
import { CalendarAccordian, CalendarDefault } from './calendar/Calendar';
//Screen import
import FirstScreen from './firstScreen/FirstScreen';
import GreetingScreen from './greetingScreen/GreetingScreen';
import EventDetails from './eventDetails/EventDetails';

const Tentative = () => {
	const { eventDetails, state } = useInviteContext();
	const { enable_bahasa, itinerary } = eventDetails;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <TentativeDefault activities={itinerary} enable_bahasa={enable_bahasa} />;
			default:
				return <TentativeAccordian activities={itinerary} enable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
};

const Contacts = () => {
	const { eventDetails, state } = useInviteContext();
	const { contact_info, enable_bahasa } = eventDetails;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <ContactDefault contact_info={contact_info} emable_bahasa={enable_bahasa} />;
			default:
				return <ContactAccordian contact_info={contact_info} emable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
};

const Wishlist = () => {
	const { eventDetails, state } = useInviteContext();
	const { wishlist, enable_bahasa } = eventDetails;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <WishDefault wishlist={wishlist} enable_bahasa={enable_bahasa} />;
			default:
				return <WishAccordian wishlist={wishlist} enable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
};

const Calendar = () => {
	const { eventDetails, state } = useInviteContext();
	const { enable_bahasa, event_date, location_info, event_time, event_title_1, italic_title } =
		eventDetails;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
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

	return renderComponent();
};

function InviteTemplate() {
	return (
		<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
			<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
				<FirstScreen />
				<GreetingScreen />
				<EventDetails />
				<div className='w-full flex gap-6 flex-col px-4 sm:px-0 py-8' style={{ maxWidth: '400px' }}>
					<Tentative />
					<Contacts />
					<Wishlist />
					<Calendar />
				</div>
			</div>
		</div>
	);
}

export default InviteTemplate;
