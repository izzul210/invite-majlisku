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

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description}></meta>
				<meta property='og:title' content={title}></meta>
				<meta property='og:description' content={description}></meta>
				<meta property='og:image' content={imageUrl}></meta>
				<meta name='apple-mobile-web-app-status-bar-style' content='translucent'></meta>
			</Head>
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
