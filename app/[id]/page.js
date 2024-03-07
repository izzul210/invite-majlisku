/** @format */
//Screen import
import InviteTemplate from '../../template/InviteTemplate';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';
// const API = 'http://localhost:5000/myweddingapp-25712/asia-southeast1/user';

/**************** Generating Metadata **********/
export async function generateMetadata({ params }) {
	// read route params
	const id = params.id;

	//init data
	let title = `You're cordially invited to our Event!`;
	let description = `Kindly click to RSVP `;
	let imageUrl = null;

	try {
		//fetch data
		const metadataDetails = await fetch(`${API}/metadata/${id}`, { cache: 'no-store' }).then(
			(res) => res.json()
		);
		title = metadataDetails?.metadata_title;
		description = metadataDetails?.metadata_description;
		imageUrl = metadataDetails?.metadata_image_url
			? metadataDetails?.metadata_image_url
			: 'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/wallpaper%2Fdefaultmetadata.png?alt=media&token=61a3e3d2-e688-47dc-bd4a-7d9d435597f5';

		title = title.replace(/\n/g, ' ');
	} catch (error) {
		console.error('Failed to fetch metadata:', error);
	}

	return {
		title: title,
		description: description,
		metadataBase: new URL('https://invite.majlisku.app'),
		openGraph: {
			title: title,
			description: description,
			images: imageUrl,
		},
	};
}

async function fetchAPI(inviteId) {
	const res = await fetch(`${API}/rsvpdetails/${inviteId}`, { cache: 'no-store' });
	const data = await res.json();

	console.log(`rsvpdetails/${inviteId}`, data);

	return data;
}

/**************** Fetch API *******************/
/*
 *
 *
 *
 *
 *
 *
 * INVITE MAIN PAGE */
export default async function Page({ params }) {
	const eventDetails = await fetchAPI(params.id);

	return (
		<main>
			<InviteTemplate eventDetails={eventDetails} />
		</main>
	);
}
