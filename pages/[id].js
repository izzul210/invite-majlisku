/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInviteContext, useInviteDispatchContext } from './_app';
import Head from 'next/head';
//Icons import
import { MajliskuLoadingIcon } from '../component/icons/icons';
////////////////Importing components
//Invite import
import InviteTemplate from '../template/InviteTemplate';
//Libraries
import axios from 'axios';
import moment from 'moment';
////////Updated Import
import { useEventDetails } from '../hooks/useApi';

function GeneralRsvp({ title, imageUrl, description, rsvpDetails, id }) {
	const [loadingAnimation, setLoadingAnimation] = useState(true);
	const { dispatchEventDetails, dispatch } = useInviteDispatchContext();
	const { isLoading } = useEventDetails();

	useEffect(() => {
		dispatch({ type: 'SET_INVITE_ID', payload: id });
		dispatchEventDetails({ type: 'SET_EVENT_DETAILS', payload: rsvpDetails });
		const timer = setTimeout(() => {
			setLoadingAnimation(false);
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

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
					{loadingAnimation && !isLoading ? (
						<motion.div
							initial={{ opacity: 1, filter: 'blur(0)' }}
							animate={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 2, delay: 1 } }}
							className='loading-overlay'>
							<MajliskuLoadingIcon />
						</motion.div>
					) : null}
					{!isLoading && <InviteTemplate />}
				</div>
			</main>
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

	const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

	try {
		const res = await axios.get(`${API}/rsvpdetails/${id}`);
		rsvpDetails = res.data;
	} catch (err) {
		return {
			redirect: {
				destination: '/404', // Replace '/error-page' with the URL of the page you want to redirect to
				permanent: false,
			},
		};
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

	return { props: { title, imageUrl, description, rsvpDetails, id } };
}

export default GeneralRsvp;
