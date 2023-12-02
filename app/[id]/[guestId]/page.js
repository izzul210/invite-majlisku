/** @format */
import moment from 'moment';
import InviteTemplateGuest from '../../../template/InviteTemplateGuest';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';
// const API = 'http://localhost:5000/myweddingapp-25712/asia-southeast1/user';

/**************** Generating Metadata **********/
export async function generateMetadata({ params }) {
	// read route params
	const id = params.id;
	const guestId = params.guestId;
	//init data
	let title = `You're cordially invited to our Event!`;
	let description = `Kindly click to RSVP `;
	let weddingText = '';
	let imageUrl =
		'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/wallpaper%2Fmetadata_img.png?alt=media&token=769f323f-8ad3-4ab3-a742-d45d959b4da2';

	//metadata_guest_name

	//fetch data
	const metadataDetails = await fetch(`${API}/personalizedmetadata/${id}/${guestId}`).then((res) =>
		res.json()
	);

	if (metadataDetails?.metadata) {
		title = `Invitation for ${metadataDetails.metadata_guest_name} | ${
			metadataDetails.metadata.title
		} | ${moment(metadataDetails?.event_date).format('DD.MM.YY')}`;
		imageUrl = metadataDetails.metadata.photoURL;
		description = metadataDetails.metadata_description;
	} else {
		title = `Invitation for ${metadataDetails.metadata_guest_name} | ${
			metadataDetails?.metadata_title
		} | ${moment(metadataDetails?.event_date).format('DD.MM.YY')}`;
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

export default async function Page({ params }) {
	return (
		<main>
			<InviteTemplateGuest inviteId={params.id} guestId={params.guestId} />
		</main>
	);
}
