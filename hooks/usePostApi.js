/** @format */

'use server';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

import { redirect } from 'next/navigation';

export async function submitGuestResponse(body, rsvpDetails) {
	const response = await fetch(`${API}/newguest/${rsvpDetails.user_id}`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(body),
	});

	if (response.ok) {
		// Handle successful response
		console.log('response ok', response);
	} else {
		// Handle error response
		console.log('response not ok', response);
	}
}
