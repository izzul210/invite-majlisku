/** @format */
//Libraries import
import moment from 'moment';
//Invite template
import InviteTemplate from '../../template/InviteTemplate';

async function getEventData(id) {
	const res = await fetch(
		`https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user/rsvpdetails/${id}`,
		{
			method: 'GET',
			headers: {
				Accept: 'application/json',
			},
		}
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export async function generateMetadata({ params }) {
	// read route params
	const id = params.id;

	//init data
	let title = `You're cordially invited to our Event!`;
	let description = `Kindly click to RSVP `;
	let weddingText = '';
	let imageUrl =
		'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/wallpaper%2Fmetadata_img.png?alt=media&token=769f323f-8ad3-4ab3-a742-d45d959b4da2';

	//fetch data
	const rsvpDetails = await fetch(
		`https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user/rsvpdetails/${id}`,
		{ cache: 'no-store' }
	).then((res) => res.json());

	//Filter data
	if (rsvpDetails?.event_title_2) {
		weddingText = rsvpDetails.event_title_2;
	} else if (rsvpDetails?.bride_name && rsvpDetails?.groom_name) {
		weddingText = `${rsvpDetails.groom_name} & ${rsvpDetails.bride_name}`;
	}

	const eventDate = moment(rsvpDetails?.event_date).format('DD.MM.YY');

	title = `${weddingText} | ${eventDate}`;

	if (rsvpDetails?.whatsapp_metadata_img) {
		imageUrl = rsvpDetails.whatsapp_metadata_img;
	}

	if (rsvpDetails?.metadata) {
		if (rsvpDetails?.metadata?.title) {
			title = `${rsvpDetails.metadata.title} | ${eventDate}`;
		}
		if (rsvpDetails?.metadata?.photoURL) {
			imageUrl = rsvpDetails.metadata.photoURL;
		}
	}

	title = title.replace(/\n/g, ' ');

	return {
		title: title,
		description: description,
		images: [
			{
				url: imageUrl,
				width: 1200,
				height: 630,
			},
		],
	};
}

export default async function Page({ params }) {
	const data = await getEventData(params.id);

	return (
		<main>
			<InviteTemplate eventDetails={data} />
		</main>
	);
}
