/** @format */
import { redirect } from 'next/navigation';
//Libraries import
import moment from 'moment';
//Screen import
import InviteTemplate from '../../template/InviteTemplate';
import FirstScreen from '../../template/firstScreen/FirstScreen';
import GreetingScreen from '../../template/greetingScreen/GreetingScreen';
import EventDetails from '../../template/eventDetails/EventDetails';
import Tentative from '../../template/tentative/Tentative';
import Contacts from '../../template/contacts/Contacts';
import Wishlist from '../../template/wishlist/Wishlist';
import { Suspense } from 'react';

/**************** Generating Metadata **********/
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
		openGraph: {
			images: imageUrl,
		},
	};
}

/**************** Fetch API *******************/
async function getEventDetails(id) {
	const res = await fetch(
		`https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user/rsvpdetails/${id}`,
		{ next: { tags: ['eventDetails'] } }
	);

	if (!res.ok) {
		return undefined;
	}

	return res.json();
}
async function getEventItinerary(userId) {
	const res = await fetch(
		`https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user/getitinerary/${userId}`
	);

	if (!res.ok) {
		return undefined;
	}

	return res.json();
}
async function getWishlist(userId) {
	const res = await fetch(
		`https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user/getguestwishes/${userId}`,
		{ cache: 'no-store' }
	);

	if (!res.ok) {
		return undefined;
	}

	return res.json();
}

/*
 *
 *
 *
 *
 *
 *
 * INVITE MAIN PAGE */
export default async function Page({ params }) {
	const eventDetails = await getEventDetails(params.id);

	//Redirect to page 404 if user doesnt exist
	if (!eventDetails) {
		redirect('/404');
	}

	const itinerary = await getEventItinerary(eventDetails.user_id);
	const wishlist = await getWishlist(eventDetails.user_id);

	return (
		<main>
			<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
				<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
					<FirstScreen eventDetails={eventDetails} />
					<GreetingScreen eventDetails={eventDetails} />
					<EventDetails eventDetails={eventDetails} />
					<div
						className='w-full flex gap-3 flex-col px-5 sm:px-0 py-8'
						style={{ maxWidth: '400px' }}>
						<Suspense fallback={<p>Loading...</p>}>
							<Tentative eventDetails={eventDetails} itinerary={itinerary} />
						</Suspense>
						<Contacts eventDetails={eventDetails} />
						<Suspense fallback={<p>Loading...</p>}>
							<Wishlist eventDetails={eventDetails} wishlist={wishlist} />
						</Suspense>
					</div>
				</div>
			</div>{' '}
		</main>
	);
}
