/** @format */
'use client';
import { useMutation, useQueryClient } from 'react-query';
import { useEventDetails } from './useApi';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

export const useSubmitGuestResponse = () => {
	const queryClient = useQueryClient();
	const eventDetails = queryClient.getQueryData('eventDetails') || {};

	const submitGuestResponse = useMutation({
		mutationFn: async (data) => {
			const response = await axios.post(`${API}/newguest/${eventDetails.user_id}`, data);
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

export const useSubmitPersonalGuestResponse = () => {
	const queryClient = useQueryClient();
	const eventDetails = queryClient.getQueryData('eventDetails');
	const guestDetails = queryClient.getQueryData('personalizedGuestDetail');

	const submitGuestResponse = useMutation({
		mutationFn: async (data) => {
			const response = await axios.post(
				`${API}/guestresponse/${eventDetails.user_id}/${guestDetails.id}`,
				data
			);
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

export const useSubmitReserveGift = () => {
	const queryClient = useQueryClient();
	const { data: eventDetails } = useEventDetails();
	const guestDetail = queryClient.getQueryData('guestDetail');

	const submitGuestReserveGift = useMutation({
		mutationFn: async (body) => {
			console.log('guestDetail', guestDetail);
			const response = await axios.post(
				`${API}/updategift/${eventDetails.user_id}/${body.giftId}`,
				{
					reserved: guestDetail.id,
					giftReserved: body.giftReserved,
				}
			);
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

export const useSubmitPersonalReserveGift = () => {
	const queryClient = useQueryClient();
	const { data: eventDetails } = useEventDetails();
	const guestDetail = queryClient.getQueryData('personalizedGuestDetail');

	const submitGuestReserveGift = useMutation({
		mutationFn: async (body) => {
			console.log('guestDetail', guestDetail);
			const response = await axios.post(
				`${API}/updategift/${eventDetails.user_id}/${body.giftId}`,
				{
					reserved: guestDetail.id,
					giftReserved: body.giftReserved,
				}
			);
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
