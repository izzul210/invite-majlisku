/** @format */

'use server';
const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

import { redirect } from 'next/navigation';
import { revalidateTag } from 'next/cache';

export async function submitGuestResponse(body, eventDetails) {
	const response = await fetch(`${API}/newguest/${eventDetails.user_id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (response.ok) {
		// Handle successful response
		revalidateTag('wishlist');
	} else {
		// Handle error response
		console.log('response not ok', response);
	}
}
