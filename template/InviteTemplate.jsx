/** @format */
'use client';
import React from 'react';
//Screen import
import FirstScreen from './firstScreen/FirstScreen';
import GreetingScreen from './greetingScreen/GreetingScreen';
import EventDetails from './eventDetails/EventDetails';
import Tentative from './tentative/Tentative';
//API import

// const Wishlist = () => {
// 	const { state } = useInviteContext();
// 	const { data: eventDetails, isLoading } = useEventDetails();
// 	const { data: wishlist } = useWishList(eventDetails.user_id);
// 	const { enable_bahasa } = eventDetails;
// 	const { design } = state;

// 	const renderComponent = () => {
// 		switch (design) {
// 			case 0:
// 				return <WishDefault wishlist={wishlist} enable_bahasa={enable_bahasa} />;
// 			default:
// 				return <WishAccordian wishlist={wishlist} enable_bahasa={enable_bahasa} />;
// 		}
// 	};

// 	return renderComponent();
// };

// const Calendar = () => {
// 	const { state } = useInviteContext();
// 	const { data: eventDetails, isLoading } = useEventDetails();
// 	const { enable_bahasa, event_date, location_info, event_time, event_title_1, italic_title } =
// 		eventDetails;
// 	const { design } = state;

// 	const renderComponent = () => {
// 		switch (design) {
// 			case 0:
// 				return (
// 					<CalendarDefault
// 						enable_bahasa={enable_bahasa}
// 						location_info={location_info}
// 						event_time={event_time}
// 						event_date={event_date}
// 						event_title={`${event_title_1} ${italic_title}`}
// 					/>
// 				);
// 			default:
// 				return (
// 					<CalendarAccordian
// 						enable_bahasa={enable_bahasa}
// 						location_info={location_info}
// 						event_time={event_time}
// 						event_date={event_date}
// 						event_title={`${event_title_1} ${italic_title}`}
// 					/>
// 				);
// 		}
// 	};

// 	return renderComponent();
// };

function InviteTemplate({ eventDetails }) {
	return (
		<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
			<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
				<FirstScreen eventDetails={eventDetails} />
				<GreetingScreen eventDetails={eventDetails} />
				<EventDetails eventDetails={eventDetails} />
				<div className='w-full flex gap-3 flex-col px-5 sm:px-0 py-8' style={{ maxWidth: '400px' }}>
					<Tentative />
					{/* <Contacts />
					<Wishlist />
					<Calendar /> */}
				</div>
			</div>
		</div>
	);
}

export default InviteTemplate;
