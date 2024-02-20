/** @format */
'use client';
import { useMutation, useQueryClient } from 'react-query';
import axios from 'axios';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

export const useSubmitGuestResponse = (userId) => {
	const queryClient = useQueryClient();

	const submitGuestResponse = useMutation({
		mutationFn: async (data) => {
			const response = await axios.post(`${API}/newguest/${userId}`, data);
			return response.data;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries('wishList');
			queryClient.setQueryData(['guestDetail'], data);
		},
		onError: (err) => {
			console.log('Error for submitGuestResponse', err);
		},
	});

	return submitGuestResponse;
};

export const useSubmitPersonalGuestResponse = (userId) => {
	const queryClient = useQueryClient();
	const guestDetails = queryClient.getQueryData('personalizedGuestDetail');

	const submitGuestResponse = useMutation({
		mutationFn: async (data) => {
			const response = await axios.post(`${API}/guestresponse/${userId}/${guestDetails.id}`, data);
			return response.data;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries('wishList');
			queryClient.invalidateQueries('personalizedGuestDetail');
			queryClient.setQueryData(['guestDetail'], data);
		},
		onError: (err) => {
			console.log('Error for submitGuestResponse', err);
		},
	});

	return submitGuestResponse;
};

export const useSubmitReserveGift = (userId) => {
	const queryClient = useQueryClient();
	const guestDetail = queryClient.getQueryData('guestDetail');

	const submitGuestReserveGift = useMutation({
		mutationFn: async (body) => {
			console.log('guestDetail', guestDetail);
			const response = await axios.post(`${API}/updategift/${userId}/${body.giftId}`, {
				reserved: guestDetail.id,
				giftReserved: body.giftReserved,
			});
			return response;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries('giftList');
		},
		onError: (err) => {
			console.log('Error for submitGuestResponse', err);
		},
	});

	return submitGuestReserveGift;
};

export const useSubmitPersonalReserveGift = (userId) => {
	const queryClient = useQueryClient();
	const guestDetail = queryClient.getQueryData('personalizedGuestDetail');

	const submitGuestReserveGift = useMutation({
		mutationFn: async (body) => {
			console.log('guestDetail', guestDetail);
			const response = await axios.post(`${API}/updategift/${userId}/${body.giftId}`, {
				reserved: guestDetail.id,
				giftReserved: body.giftReserved,
			});
			return response;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries('giftList');
		},
		onError: (err) => {
			console.log('Error for submitGuestResponse', err);
		},
	});

	return submitGuestReserveGift;
};
