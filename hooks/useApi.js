/** @format */

'use client';
import { useQuery } from 'react-query';
//Libraries
import axios from 'axios';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';
// const API = 'http://localhost:5000/myweddingapp-25712/asia-southeast1/user';

export const useItineraryList = (userId) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['itineraryList'],
		queryFn: async () => {
			const response = await axios.get(`${API}/getitinerary/${userId}`).then((res) => {
				return res.data;
			});

			return response;
		},
		enabled: !!userId,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export const useWishList = (userId) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['wishList'],
		queryFn: async () => {
			const response = await axios.get(`${API}/getguestwishes2/${userId}`).then((res) => {
				return res.data;
			});

			return response;
		},
		enabled: !!userId,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export const useGiftList = (userId) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['giftList'],
		queryFn: async () => {
			const response = await axios.get(`${API}/getgifts/${userId}`).then((res) => {
				return res.data;
			});

			return response;
		},
		enabled: !!userId,
	});

	return {
		data,
		isLoading,
		error,
	};
};

export const usePersonalizedGuestDetail = (userId, guestId) => {
	const { data, isLoading, error } = useQuery({
		queryKey: ['personalizedGuestDetail'],
		queryFn: async () => {
			const response = await axios.get(`${API}/getguestlist/${userId}/${guestId}`).then((res) => {
				return res.data[0];
			});
			return response;
		},
		enabled: !!userId,
	});

	return {
		data,
		isLoading,
		error,
	};
};
