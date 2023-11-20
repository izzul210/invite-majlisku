/** @format */

export const initialStates = {
	design: 6,
	premium_design: 0,
	loading: true,
	inviteId: null,
};

export const initialEventDetails = {
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
