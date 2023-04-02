/** @format */

import React, { useEffect, useReducer } from 'react';
import Head from 'next/head';
//Components import
import WholePageLoadingState from '../../components/wholePageLoadingState';
//MUI import
import Container from '@mui/material/Container';
//Libraries
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ms-my';
import 'moment/locale/en-ca';

////////////////Importing components
import {
	MainRSVP,
	ThankYouPage,
	GiftPage,
	MoneyPage,
	Footer,
} from '../../components/subcomponents';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';
// const API = 'http://localhost:5000/myweddingapp-25712/asia-southeast1/user';

let initialStates = {
	rsvp_details: null,
	guestInput: null,
	itinerary: null,
	guestDetails: null,
	time: { start: '12:00', end: '15:00' },
	page: 0,
	giftPage: 0,
	loading: false,
	loading_gift: false,
	submitted: false,
	resetTheClock: false,
	going: null,
	gifts: null,
	giftReserve: null,
	confirmModal: false,
	cancelModal: false,
	thakyouModal: false,
	sorryModal: false,
};

const rsvpReducer = (state, action) => {
	switch (action.type) {
		case 'GET_RSVP_DETAILS':
			return { ...state, rsvp_details: action.payload };
		case 'SET_CONFIRM_MODAL':
			return { ...state, confirmModal: action.payload };
		case 'SET_CANCEL_MODAL':
			return { ...state, cancelModal: action.payload };
		case 'SET_THANK_YOU_MODAL':
			return { ...state, thakyouModal: action.payload };
		case 'SET_SORRY_MODAL':
			return { ...state, sorryModal: action.payload };
		case 'INIT_ITINERARY':
			return { ...state, itinerary: action.payload };
		case 'INIT_GUEST_DETAILS':
			return { ...state, guestDetails: action.payload };
		case 'INIT_GIFT_RESERVE':
			return { ...state, giftReserve: action.payload };
		case 'GET_GIFTS':
			return { ...state, gifts: action.payload };
		case 'RESET_SUBMIT':
			return { ...state, submitted: false };
		case 'UPDATE_GOING':
			return { ...state, going: action.payload };
		case 'GUEST_SUBMIT':
			return { ...state, submitted: true };
		case 'GO_HOME_PAGE':
			return { ...state, page: 0 };
		case 'MONEY_PAGE':
			return { ...state, page: 3 };
		case 'NEXT_PAGE':
			return { ...state, page: state.page + 1 };
		case 'GIFT_PAGE':
			return { ...state, page: 2 };
		case 'RESERVE_GIFT_PAGE':
			return { ...state, giftPage: 1 };
		case 'REGISTRY_GIFT_PAGE':
			return { ...state, giftPage: 0 };
		case 'PREVIOUS_PAGE':
			return { ...state, page: state.page - 1 };
		case 'LOADING':
			return { ...state, loading: action.payload };
		case 'LOADING_GIFT':
			return { ...state, loading_gift: action.payload };
		case 'RESET_THE_CLOCK':
			return { ...state, resetTheClock: !state.resetTheClock };
		case 'INIT_TIME_SLOT':
			return { ...state, time: action.payload };
	}
};

function GuestRsvp({ title, imageUrl, description, guestId, rsvpDetails }) {
	const [state, dispatch] = useReducer(rsvpReducer, initialStates);
	const { rsvp_details, guestDetails, resetTheClock } = state;

	useEffect(() => {
		getThemAll();
	}, [resetTheClock]);

	function getThemAll() {
		dispatch({ type: 'GET_RSVP_DETAILS', payload: rsvpDetails });
		getGuestInfo(rsvpDetails.user_id);
		getGiftList(rsvpDetails.user_id);
		getItineraryList(rsvpDetails.user_id);

		//Init time
		dispatch({
			type: 'INIT_TIME_SLOT',
			payload: {
				start: rsvpDetails.event_time.start,
				end: rsvpDetails.event_time.end,
			},
		});
	}

	function getGuestInfo(userID) {
		axios
			.get(`${API}/getguestlist/${userID}/${guestId}`)
			.then((res) => {
				let guestInfo = res.data[0];
				dispatch({ type: 'INIT_GUEST_DETAILS', payload: guestInfo });
			})
			.catch((err) => {
				console.log('Error for API/getguestlist!');
				console.log(err.message);
			});
	}

	function getGiftList(userID) {
		axios.get(`${API}/getgifts/${userID}`).then((res) => {
			let giftlist = res.data;
			dispatch({ type: 'GET_GIFTS', payload: giftlist });
		});
	}

	function postGuestResponse(body, postReqFunc) {
		dispatch({ type: 'LOADING', payload: true });
		axios
			.post(`${API}/guestresponse/${rsvp_details.user_id}/${state.guestDetails.id}`, body)
			.then((res) => {
				dispatch({ type: 'LOADING', payload: false });
				dispatch({ type: 'GUEST_SUBMIT' });
				postReqFunc();
			});
	}

	function guestReserveFunc(body, reserved) {
		dispatch({ type: 'LOADING_GIFT', payload: true });
		axios
			.post(`${API}/updategift/${rsvp_details.user_id}/${state.giftReserve.id}`, body)
			.then((res) => {
				dispatch({ type: 'LOADING_GIFT', payload: false });
				if (reserved) {
					dispatch({ type: 'SET_CONFIRM_MODAL', payload: false });
					dispatch({ type: 'SET_THANK_YOU_MODAL', payload: true });
				} else {
					dispatch({ type: 'SET_CANCEL_MODAL', payload: false });
					dispatch({ type: 'SET_SORRY_MODAL', payload: true });
				}

				dispatch({ type: 'RESET_THE_CLOCK' });
			});
	}

	function getItineraryList(userID) {
		axios.get(`${API}/getitinerary/${userID}`).then((res) => {
			let itineraryList = res.data;
			dispatch({ type: 'INIT_ITINERARY', payload: itineraryList });
		});
	}

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description}></meta>
				<meta property='og:title' content={title}></meta>
				<meta property='og:description' content={description}></meta>
				<meta property='og:image' content={imageUrl}></meta>
			</Head>
			<main>
				<Container maxWidth='md' style={{ padding: '0px 8px' }}>
					{rsvp_details && guestDetails ? (
						<>
							{state.page === 0 ? (
								<MainRSVP state={state} dispatch={dispatch} postGuestResponse={postGuestResponse} />
							) : state.page === 1 ? (
								<ThankYouPage state={state} dispatch={dispatch} />
							) : state.page === 2 ? (
								<GiftPage state={state} dispatch={dispatch} guestReserveFunc={guestReserveFunc} />
							) : (
								<MoneyPage state={state} dispatch={dispatch} />
							)}
						</>
					) : (
						<WholePageLoadingState height_vh='80vh' />
					)}
				</Container>
			</main>
			<Footer />
		</div>
	);
}

export async function getServerSideProps(context) {
	let id = context.query.id;
	let guestId = context.query.guestId;
	let rsvpDetails;

	let title = `You're cordially invited to our Wedding!`;
	let weddingText = '';
	let description = `Kindly click to RSVP `;

	let imageUrl =
		'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/wallpaper%2Fmetadata_img.png?alt=media&token=769f323f-8ad3-4ab3-a742-d45d959b4da2';

	await axios
		.get(`${API}/rsvpdetails/${id}`)
		.then((res) => {
			rsvpDetails = res.data;
		})
		.catch((err) => {
			console.log('Error for /rsvpdetails!');
			console.log(err.message);
		});

	if (rsvpDetails.event_title_2) {
		weddingText = rsvpDetails.event_title_2;
	} else {
		if (rsvpDetails.bride_name && rsvpDetails.groom_name)
			weddingText = `${rsvpDetails.groom_name} & ${rsvpDetails.bride_name}`;
	}

	if (rsvpDetails.enable_bahasa) {
		description = `Sila tekan untuk sampaikan kehadiran anda`;
		title = `Anda dijemput dengan hormat ke Majlis Perkahwinan ${weddingText} | ${moment(
			rsvpDetails?.event_date
		).format('DD.MM.YY')}`;
	} else {
		title = `You're cordially invited to the Wedding of ${weddingText} | ${moment(
			rsvpDetails?.event_date
		).format('DD.MM.YY')}`;
	}

	if (rsvpDetails?.whatsapp_metadata_img) imageUrl = rsvpDetails.whatsapp_metadata_img;

	if (rsvpDetails.metadata) {
		if (rsvpDetails?.metadata?.title) title = rsvpDetails.metadata.title;
		if (rsvpDetails?.metadata?.photoURL) imageUrl = rsvpDetails.metadata.photoURL;
	}

	return { props: { title, imageUrl, description, guestId, rsvpDetails } };
}

export default GuestRsvp;
