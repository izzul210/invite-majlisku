/** @format */

import React, { useEffect, useReducer } from 'react';
import Head from 'next/head';
//Components Import
import WholePageLoadingState from '../components/wholePageLoadingState';
//MUI import
import Container from '@mui/material/Container';
//Libraries
import axios from 'axios';
import moment from 'moment';
import { MainRSVP, ThankYouPage, GiftPage, MoneyPage, Footer } from '../components/subcomponents';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

let initialStates = {
	rsvp_details: null,
	guestInput: null,
	itinerary: null,
	wishlist: [],
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

const mainReducer = (state, action) => {
	switch (action.type) {
		case 'GET_RSVP_DETAILS':
			return { ...state, rsvp_details: action.payload };
		case 'SET_CONFIRM_MODAL':
			return { ...state, confirmModal: action.payload };
		case 'SET_CANCEL_MODAL':
			return { ...state, cancelModal: action.payload };
		case 'SET_THANK_YOU_MODAL':
			return { ...state, thakyouModal: action.payload };
		case 'GET_WISHLIST':
			return { ...state, wishlist: action.payload };
		case 'SET_SORRY_MODAL':
			return { ...state, sorryModal: action.payload };
		case 'SET_GUEST_INFO':
			return { ...state, guestInput: action.payload };
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
		case 'NEXT_PAGE':
			return { ...state, page: state.page + 1 };
		case 'GIFT_PAGE':
			return { ...state, page: 2 };
		case 'MONEY_PAGE':
			return { ...state, page: 3 };
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

function GeneralRsvp({ title, imageUrl, description, rsvpDetails }) {
	const [state, dispatch] = useReducer(mainReducer, initialStates);
	const { rsvp_details, resetTheClock } = state;

	useEffect(() => {
		getThemAll();
	}, [resetTheClock]);

	function getThemAll() {
		dispatch({ type: 'GET_RSVP_DETAILS', payload: rsvpDetails });
		getGiftList(rsvpDetails.user_id);
		getItineraryList(rsvpDetails.user_id);
		getWishList(rsvpDetails.user_id);
		dispatch({
			type: 'INIT_TIME_SLOT',
			payload: {
				start: rsvpDetails.event_time?.start,
				end: rsvpDetails.event_time?.end,
			},
		});
	}

	function getWishList(userID) {
		axios.get(`${API}/getguestwishes/${userID}`).then((res) => {
			let wishlist = res.data;
			dispatch({ type: 'GET_WISHLIST', payload: wishlist });
		});
	}

	function getGiftList(userID) {
		axios.get(`${API}/getgifts/${userID}`).then((res) => {
			let giftlist = res.data;
			dispatch({ type: 'GET_GIFTS', payload: giftlist });
		});
	}

	function getItineraryList(userID) {
		axios.get(`${API}/getitinerary/${userID}`).then((res) => {
			let itineraryList = res.data;
			dispatch({ type: 'INIT_ITINERARY', payload: itineraryList });
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
	function postGuestResponse(body, postReqFunc) {
		dispatch({ type: 'LOADING', payload: true });
		axios.post(`${API}/newguest/${rsvp_details.user_id}`, body).then((res) => {
			dispatch({ type: 'SET_GUEST_INFO', payload: res.data });
			dispatch({ type: 'LOADING', payload: false });
			dispatch({ type: 'GUEST_SUBMIT' });
			postReqFunc();
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
				<Container maxWidth='md' style={{ padding: '0px 0px' }}>
					{rsvp_details ? (
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
	const id = context.query.id;
	let rsvpDetails;

	try {
		const res = await axios.get(`${API}/rsvpdetails/${id}`);
		rsvpDetails = res.data;
	} catch (err) {
		console.log('Error for /rsvpdetails!');
		console.log(err.message);
		return {
			redirect: {
				destination: '/error', // Replace '/error-page' with the URL of the page you want to redirect to
				permanent: false,
			},
		};
	}

	//Assign title
	let title;
	const formattedDate = moment(rsvpDetails?.event_date).format('DD.MM.YY');
	if (rsvpDetails?.metadata?.title) {
		title = rsvpDetails.metadata.title;
	} else if (rsvpDetails?.event_title_2) {
		title = rsvpDetails.event_title_2;
	} else if (rsvpDetails?.bride_name && rsvpDetails?.groom_name) {
		title = `${rsvpDetails.groom_name} & ${rsvpDetails.bride_name}`;
	} else {
		title = `You're cordially invited to our Event!`;
	}
	title = `${title} | ${formattedDate}`;

	//Assign description
	let description = rsvpDetails?.enable_bahasa
		? `Sila tekan untuk sampaikan kehadiran anda`
		: `Kindly click to RSVP`;

	//Assign image
	let imageUrl;
	if (rsvpDetails?.metadata?.photoURL) {
		imageUrl = rsvpDetails.metadata.photoURL;
	} else if (rsvpDetails?.whatsapp_metadata_img) {
		imageUrl = rsvpDetails.whatsapp_metadata_img;
	} else {
		imageUrl =
			'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/wallpaper%2Fmetadata_img.png?alt=media&token=769f323f-8ad3-4ab3-a742-d45d959b4da2';
	}

	title = title.replace(/\n/g, ' ');

	return { props: { title, imageUrl, description, rsvpDetails } };
}

export default GeneralRsvp;
