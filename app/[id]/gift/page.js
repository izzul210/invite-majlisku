/** @format */
import React from 'react';
import GiftPage from './GiftPage';

export const metadata = {
	title: {
		absolute: 'Gift Registry | Majlisku',
	},
	description: {
		absolute: 'List of gift registry items for the Wedding',
	},
};

export default function Page({ params }) {
	return (
		<main>
			<GiftPage inviteId={params.id} />
		</main>
	);
}
