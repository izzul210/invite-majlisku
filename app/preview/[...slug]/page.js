/** @format */

import InviteTemplatePreview from '../../../template/InviteTemplatePreview';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';
// const API = 'http://localhost:5000/myweddingapp-25712/asia-southeast1/user';

async function fetchAPI(userId) {
	const res = await fetch(`${API}/previewdetails/${userId}`, { cache: 'no-store' });
	const data = await res.json();

	console.log(`previewdetails/${userId}`, data);

	return data;
}

export default async function Page({ params }) {
	const eventDetails = await fetchAPI(params.slug[1]);

	return (
		<main>
			<InviteTemplatePreview
				designId={params.slug[0]}
				userId={params.slug[1]}
				eventDetails={eventDetails}
			/>
		</main>
	);
}
