/** @format */
//Libraries import
import moment from 'moment';
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
	let imageUrl =
		'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/wallpaper%2Fmetadata_img.png?alt=media&token=769f323f-8ad3-4ab3-a742-d45d959b4da2';

	//fetch data
	const metadataDetails = await fetch(`${API}/metadata/${id}`).then((res) => res.json());

	if (metadataDetails?.metadata) {
		title = `${metadataDetails.metadata.title} | ${moment(metadataDetails?.event_date).format(
			'DD.MM.YY'
		)}`;
		imageUrl = metadataDetails.metadata.photoURL;
		description = metadataDetails.metadata_description;
	} else {
		title = `${metadataDetails?.metadata_title} | ${moment(metadataDetails?.event_date).format(
			'DD.MM.YY'
		)}`;
		imageUrl = metadataDetails?.metadata_image_url;
		description = metadataDetails?.metadata_description;
	}

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
