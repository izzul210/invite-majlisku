/** @format */
'use server';
const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

import { revalidateTag } from 'next/cache';
import { cookies } from 'next/headers';

export async function submitGuestResponse(body, eventDetails) {
	const response = await fetch(`${API}/newguest/${eventDetails.user_id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	})
		.then((response) => response.json())
		.then((data) => {
			return data;
		});

	console.log('response data', response);

	if (response) {
		// Handle successful response
		revalidateTag('wishlist');
		cookies().set('guestName', response.name);
		cookies().set('guestId', response.id);
		return true;
	} else {
		// Handle error response
		console.log('response not ok', response.json());
		return false;
	}
}

// export function postRequestHook() {
// 	const [loading, setLoading] = useState(false);
// 	const [response, setResponse] = useState(null);
// 	const [error, setError] = useState(null);

// 	const submitGuestResponse = async (body, eventDetails, postReqFunc) => {
// 		setLoading(true);
// 		try {
// 			const response = await fetch(`${API}/newguest/${eventDetails.user_id}`, {
// 				method: 'POST',
// 				headers: {
// 					'Content-Type': 'application/json',
// 				},
// 				body: JSON.stringify(body),
// 			});
// 			const data = await response.json();
// 			// revalidateTag('wishlist');
// 			setResponse(data);
// 			setLoading(false);
// 			postReqFunc();
// 		} catch (error) {
// 			setError(error);
// 			setLoading(false);
// 		}
// 	};

// 	return {
// 		submitGuestResponse,
// 		loading,
// 		response,
// 		error,
// 	};
// }
