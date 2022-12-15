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
import { MainRSVP, GuestPage, GiftPage, Footer } from '../components/subcomponents';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

let initialStates = {
	userData: null,
	guestInput: null,
	itinerary: null,
	weddingDetails: {},
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
		case 'SET_CONFIRM_MODAL':
			return { ...state, confirmModal: action.payload };
		case 'SET_CANCEL_MODAL':
			return { ...state, cancelModal: action.payload };
		case 'SET_THANK_YOU_MODAL':
			return { ...state, thakyouModal: action.payload };
		case 'SET_SORRY_MODAL':
			return { ...state, sorryModal: action.payload };
		case 'INIT_USER_DATA':
			return { ...state, userData: action.payload };
		case 'SET_GUEST_INFO':
			return { ...state, guestInput: action.payload };
		case 'INIT_ITINERARY':
			return { ...state, itinerary: action.payload };
		case 'INIT_WEDDING_DETAILS':
			return { ...state, weddingDetails: action.payload };
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

function GeneralRsvp({ title, imageUrl, description, userId, userInfo }) {
	const [state, dispatch] = useReducer(mainReducer, initialStates);
	const { userData, resetTheClock } = state;

	useEffect(() => {
		getThemAll();
	}, [resetTheClock]);

	function getThemAll() {
		dispatch({ type: 'INIT_USER_DATA', payload: userInfo });
		dispatch({ type: 'INIT_WEDDING_DETAILS', payload: userInfo.rsvpDetails });
		getGiftList(userInfo.id);
		getItineraryList(userInfo.id);

		//Init time
		dispatch({
			type: 'INIT_TIME_SLOT',
			payload: {
				start: userInfo.rsvpDetails.timeSlot.start,
				end: userInfo.rsvpDetails.timeSlot.end,
			},
		});
	}

	function getGiftList(userID) {
		axios.get(`${API}/getgifts/${userID}`).then((res) => {
			let giftlist = res.data;
			// console.log('giftlist:', giftlist);
			dispatch({ type: 'GET_GIFTS', payload: giftlist });
		});
	}

	function getItineraryList(userID) {
		axios.get(`${API}/getitinerary/${userID}`).then((res) => {
			let itineraryList = res.data;
			// console.log('itineraryList:', itineraryList);
			dispatch({ type: 'INIT_ITINERARY', payload: itineraryList });
		});
	}

	function guestReserveFunc(body, reserved) {
		dispatch({ type: 'LOADING_GIFT', payload: true });
		axios
			.post(`${API}/updategift/${state.userData.id}/${state.giftReserve.id}`, body)
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
		axios.post(`${API}/newguest/${state.userData.id}`, body).then((res) => {
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
				<Container maxWidth='md'>
					{userData ? (
						<>
							{state.page === 0 ? (
								<MainRSVP state={state} dispatch={dispatch} postGuestResponse={postGuestResponse} />
							) : state.page === 1 ? (
								<GuestPage
									state={state}
									dispatch={dispatch}
									postGuestResponse={postGuestResponse}
								/>
							) : (
								<GiftPage state={state} dispatch={dispatch} guestReserveFunc={guestReserveFunc} />
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
	let userInfo;

	console.log('context.query:', context.query);

	await axios
		.get(`${API}/weddingdetails/${id}`)
		.then((res) => {
			userInfo = res.data[0];
		})
		.catch((err) => {
			console.log('timeout!');
			console.log(err.message);
		});

	const title = `You're cordially invited to The Wedding of ${userInfo.brideName} & ${
		userInfo.groomName
	} | ${moment(userInfo?.weddingDate).format('DD.MM.YY')}`;
	const imageUrl = userInfo.whatsappImg;
	const description = `Kindly click to RSVP `;
	const userId = id;

	return { props: { title, imageUrl, description, userId, userInfo } };
}

export default GeneralRsvp;
