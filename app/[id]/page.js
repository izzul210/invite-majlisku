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

	//fetch data
	const metadataDetails = await fetch(`${API}/metadata/${id}`, { cache: 'no-store' }).then((res) =>
		res.json()
	);

	console.log('metadataDetails', metadataDetails);

	title = metadataDetails?.metadata_title;
	description = metadataDetails?.metadata_description;
	imageUrl = metadataDetails?.metadata_image_url
		? metadataDetails?.metadata_image_url
		: 'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/wallpaper%2Fdefaultmetadata.png?alt=media&token=61a3e3d2-e688-47dc-bd4a-7d9d435597f5';

	title = title.replace(/\n/g, ' ');

	return {
		title: title,
		description: description,
		openGraph: {
			title: title,
			description: description,
			images: imageUrl,
		},
	};
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
	return (
		<main>
			<InviteTemplate inviteId={params.id} />
		</main>
	);
}

/******* TESTING ***********/
/***** Types of Testing */
/*
1. New User
2. Existing User

For Existing User:
Step-1: Choose user's invite-id and categorize them based on dates (at least 30 users)
- All currently active users + wedding in December (PRIORITY)
- Use Cloud functions to extract the data from Firestore
Step-2: Observe and analyze their eventDetails. See what's missing or different names
Step-3* (if there are issues with Step-2): Use Cloud Functions to help filter the data before it sends to the frontend
Step-4: Make sure the data on the frontend is VALID, or else display EMPTY STATE

*/
