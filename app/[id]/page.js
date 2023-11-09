/** @format */
//Libraries import
import moment from 'moment';
//Invite template
import InviteTemplate from '../../template/InviteTemplate';

async function getEventData(id) {
	const res = await fetch(
		`https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user/rsvpdetails/${id}`
	);

	if (!res.ok) {
		throw new Error('Failed to fetch data');
	}

	return res.json();
}

export async function generateMetadata({ params }) {
	// read route params
	const id = params.id;

	let title = `You're cordially invited to our Event!`;
	let description = `Kindly click to RSVP `;
	let weddingText = '';

	// fetch data
	const rsvpDetails = await fetch(
		`https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user/rsvpdetails/${id}`
	).then((res) => res.json());

	//Filter data
	if (rsvpDetails?.event_title_2) {
		weddingText = rsvpDetails.event_title_2;
	} else if (rsvpDetails?.bride_name && rsvpDetails?.groom_name) {
		weddingText = `${rsvpDetails.groom_name} & ${rsvpDetails.bride_name}`;
	}

	const eventDate = moment(rsvpDetails?.event_date).format('DD.MM.YY');

	title = `${weddingText} | ${eventDate}`;

	return {
		title: title,
		description: description,
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
