/** @format */

import { useQuery, useQueryClient, useMutation } from 'react-query';
import { useInviteContext } from '../pages/_app';
//Libraries
import axios from 'axios';
import moment from 'moment';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

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

// export const useEventDetails = () => {
// 	const { state } = useInviteContext();
// 	const {
// 		data = {},
// 		isLoading,
// 		error,
// 	} = useQuery({
// 		queryKey: ['eventDetails'],
// 		queryFn: async () => {
// 			const response = await axios.get(`${API}/rsvpdetails/${state?.inviteId}`).then((res) => {
// 				return res.data;
// 			});

// 			return { initialEventDetails, ...response };
// 		},
// 		enable: state?.inviteId ? true : false,
// 	});

// 	return {
// 		data,
// 		isLoading,
// 		error,
// 	};
// };

export const useEventDetails = () => {
	const { eventDetails } = useInviteContext();
	const {
		data = {},
		isLoading,
		error,
	} = useQuery({
		queryKey: ['eventDetails'],
		queryFn: () => {
			return eventDetails;
		},
		enable: eventDetails?.user_id ? true : false,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export const useItineraryList = () => {
	// const { data: eventDetails } = useEventDetails();
	const { eventDetails } = useInviteContext();
	const { data, isLoading, error } = useQuery({
		queryKey: ['itineraryList'],
		queryFn: async () => {
			const response = await axios
				.get(`${API}/getitinerary/${eventDetails?.user_id}`)
				.then((res) => {
					return res.data;
				});

			return response;
		},
		enable: eventDetails?.user_id ? true : false,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export const useGiftList = () => {
	// const { data: eventDetails } = useEventDetails();
	const { eventDetails } = useInviteContext();
	const { data, isLoading, error } = useQuery({
		queryKey: ['giftList'],
		queryFn: async () => {
			const response = await axios.get(`${API}/getgifts/${eventDetails?.user_id}`).then((res) => {
				return res.data;
			});

			return response;
		},
		enable: eventDetails?.user_id ? true : false,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export const useWishList = () => {
	// const { data: eventDetails } = useEventDetails();
	const { eventDetails } = useInviteContext();
	const { data, isLoading, error } = useQuery({
		queryKey: ['wishList'],
		queryFn: async () => {
			const response = await axios
				.get(`${API}/getguestwishes/${eventDetails?.user_id}`)
				.then((res) => {
					return res.data;
				});

			return response;
		},
		enable: eventDetails?.user_id ? true : false,
	});

	return {
		data,
		isLoading,
		error,
	};
};
