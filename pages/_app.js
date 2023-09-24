/** @format */
'use client';
import React, { createContext, useReducer } from 'react';
import '../styles/globals.css';
import '../styles/rsvp.scss';
import '../styles/accordian.scss';
import '../styles/InviteTemplate.scss';
import '../template/tentative/Tentative.scss';
//New import
import '../component/textProvider/InviteTextProvider.scss';
import '../template/firstScreen/FirstScreen.scss';

export const InviteContext = createContext({});
export const InviteDispatchContext = createContext(null);

export function useInviteContext() {
	return React.useContext(InviteContext);
}

export function useInviteDispatchContext() {
	return React.useContext(InviteDispatchContext);
}

const initialStates = {
	design: 0,
	premium_design: 0,
	loading: true,
};

const initialEventDetails = {
	event_title_1: '',
	event_title_2: '',
	italic_title: '',
	greeting_1: 'Dengan segala hormatnya kami mempersilakan',
	greeting_2: 'ke majlis resepsi untuk meraikan majlis',
	greeting_title: `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
	host_details: '',
	description: '',
	event_date: '',
	event_date_deadline: '',
	event_time: { start: null, end: null },
	event_time_slot_2: null,
	event_location: '',
	location_info: {
		address: '',
		googleLink: '',
		wazeLink: '',
	},
	event_address: '',
	contact_info: [],
	guest_pax_limit: 2,
	rsvp_header_image: '',
	money_gift_details: {
		accNum: null,
		bankName: null,
		name: null,
		qrCodeUrl: null,
	},
	delivery_address: '',
	thank_you_text: '',
	//enable states
	enable_multiple_slot: false,
	enable_bahasa: false,
	enable_gift_registry: false,
	enable_itinerary: false,
	enable_money_gift: false,
	enable_unlimited_pax: false,
	enable_wishes: false,
	enable_deadline: false,
	//arrays of other stuff
	wishlist: [],
	itinerary: [],
	gifts: [],
};

export const eventReducer = (state, action) => {
	switch (action.type) {
		case 'SET_EVENT_DETAILS':
			return {
				...initialEventDetails,
				...action.payload,
			};
		case 'SET_WISHLIST':
			return {
				...state,
				wishlist: action.payload,
			};
		case 'SET_ITINERARY':
			return {
				...state,
				itinerary: action.payload,
			};
		case 'SET_GIFTS':
			return {
				...state,
				gifts: action.payload,
			};

		default:
			return state;
	}
};

export const inviteReducer = (state, action) => {
	switch (action.type) {
		case 'SET_RSVP_DETAILS':
			return {
				...state,
				rsvp_details: action.payload,
			};
		case 'SET_LOADING':
			return {
				...state,
				loading: action.payload,
			};
		default:
			return state;
	}
};

export const InviteProvider = ({ children }) => {
	const [state, dispatch] = useReducer(inviteReducer, initialStates);
	const [eventDetails, dispatchEventDetails] = useReducer(eventReducer, initialEventDetails);

	return (
		<InviteContext.Provider value={{ state, eventDetails }}>
			<InviteDispatchContext.Provider value={{ dispatch, dispatchEventDetails }}>
				{children}
			</InviteDispatchContext.Provider>
		</InviteContext.Provider>
	);
};

function MyApp({ Component, pageProps }) {
	return (
		<InviteProvider>
			<Component {...pageProps} />
		</InviteProvider>
	);
}

export default MyApp;
