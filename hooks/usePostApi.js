/** @format */
'use client';
import { useMutation, useQueryClient } from 'react-query';
import { useEventDetails } from './useApi';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

export const useSubmitGuestResponse = () => {
	const queryClient = useQueryClient();
	const router = useRouter();
	const { data: eventDetails } = useEventDetails();

	const submitGuestResponse = useMutation({
		mutationFn: async (data) => {
			const response = await axios.post(`${API}/newguest/${eventDetails.user_id}`, data);
			return response.data;
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries('wishlist');
			queryClient.setQueryData(['guestDetail'], data);
		},
		onError: (err) => {
			console.log('Error for submitGuestResponse', err);
		},
	});

	return submitGuestResponse;
};
