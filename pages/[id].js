/** @format */

'use client';
import React, { useEffect, useState, useReducer, Suspense } from 'react';
import { motion } from 'framer-motion';
import { useInviteContext, useInviteDispatchContext } from './_app';
import Head from 'next/head';
//Icons import
import { MajliskuLoadingIcon } from '../component/icons/icons';
//Invite import
import InviteTemplate from '../template/InviteTemplate';
//Components Import
import WholePageLoadingState from '../components/wholePageLoadingState';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
//Libraries
import axios from 'axios';
import moment from 'moment';
import { MainRSVP, ThankYouPage, GiftPage, MoneyPage, Footer } from '../components/subcomponents';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

function GeneralRsvp({ title, imageUrl, description, rsvpDetails }) {
	const rsvp_details = null;
	const [loadingAnimation, setLoadingAnimation] = useState(true);
	const { state } = useInviteContext();
	const { dispatchEventDetails, dispatch } = useInviteDispatchContext();

	useEffect(() => {
		dispatchEventDetails({ type: 'SET_EVENT_DETAILS', payload: rsvpDetails });
		getItineraryList(rsvpDetails.user_id);
		getWishList(rsvpDetails.user_id);
		getGiftList(rsvpDetails.user_id);
		dispatch({ type: 'SET_LOADING', payload: false });
		handleLoadingAnimation();
	}, []);

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

	const handleLoadingAnimation = () => {
		setLoadingAnimation(true);
		setTimeout(() => {
			setLoadingAnimation(false);
		}, 5000);
	};

	function getWishList(userID) {
		axios.get(`${API}/getguestwishes/${userID}`).then((res) => {
			let wishlist = res.data;
			dispatchEventDetails({ type: 'SET_WISHLIST', payload: wishlist });
		});
	}

	function getGiftList(userID) {
		axios.get(`${API}/getgifts/${userID}`).then((res) => {
			let giftlist = res.data;
			dispatchEventDetails({ type: 'SET_GIFTS', payload: giftlist });
		});
	}

	function getItineraryList(userID) {
		axios.get(`${API}/getitinerary/${userID}`).then((res) => {
			let itineraryList = res.data;
			dispatchEventDetails({ type: 'SET_ITINERARY', payload: itineraryList });
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
			<main>
				<div className='app-container'>
					{state?.loading || loadingAnimation ? (
						<motion.div
							initial={{ opacity: 1, filter: 'blur(0)' }}
							animate={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 3, delay: 1 } }}
							className='loading-overlay'>
							<MajliskuLoadingIcon />
						</motion.div>
					) : null}

					<InviteTemplate />
				</div>
			</main>
			<Footer />
		</div>
	);
}

export async function generateMetadata({ params }) {
	//read route params
	const id = params.id;

	//define metadata details
	let title = `You're cordially invited to our Event!`;
	let weddingText = '';
	let description = `Kindly click to RSVP `;
	let rsvpDetails = {};
	let imageUrl;

	//fetch data from api
	try {
		const res = await axios.get(`${API}/rsvpdetails/${id}`);
		rsvpDetails = res.data;
	} catch (err) {
		console.log('Error in generateMetadata');
	}

	//Render title
	if (rsvpDetails?.event_title_2) {
		weddingText = rsvpDetails.event_title_2;
	} else if (rsvpDetails?.bride_name && rsvpDetails?.groom_name) {
		weddingText = `${rsvpDetails.groom_name} & ${rsvpDetails.bride_name}`;
	}

	if (rsvpDetails?.enable_bahasa) {
		description = `Sila tekan untuk sampaikan kehadiran anda`;
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
		openGraph: {
			title: title,
			description: 'Description from generateMetadata',
			images: [
				{
					url: imageUrl,
					width: 800,
					height: 600,
				},
			],
		},
	};
}

export async function getServerSideProps(context) {
	const id = context.query.id;
	let rsvpDetails;
	let title = `You're cordially invited to our Event!`;
	let weddingText = '';
	let description = `Kindly click to RSVP `;
	let imageUrl =
		'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/wallpaper%2Fmetadata_img.png?alt=media&token=769f323f-8ad3-4ab3-a742-d45d959b4da2';

	try {
		const res = await axios.get(`${API}/rsvpdetails/${id}`);
		rsvpDetails = res.data;
	} catch (err) {
		console.log('error in getServerSideProps');
	}

	if (rsvpDetails?.event_title_2) {
		weddingText = rsvpDetails.event_title_2;
	} else if (rsvpDetails?.bride_name && rsvpDetails?.groom_name) {
		weddingText = `${rsvpDetails.groom_name} & ${rsvpDetails.bride_name}`;
	}

	if (rsvpDetails?.enable_bahasa) {
		description = `Sila tekan untuk sampaikan kehadiran anda`;
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

	return { props: { title, imageUrl, description, rsvpDetails } };
}

export default GeneralRsvp;
