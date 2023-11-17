/** @format */
import React from 'react';
import GiftPage from './GiftPage';

export default function Page({ params }) {
	return (
		<main>
			<GiftPage inviteId={params.id} />
		</main>
	);
}
