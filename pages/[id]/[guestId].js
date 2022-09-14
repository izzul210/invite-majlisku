/** @format */

import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

function Cars({ title, imageUrl, description }) {
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
				<h1>{title}</h1>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	let id = context.query.id;
	let guestId = context.query.guestId;
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

	const title = `Wedding ${userInfo.brideName} & ${userInfo.groomName}`;
	const imageUrl = userInfo.whatsappImg;
	// const description = `You're invited to Wedding ${userInfo.brideName} & ${userInfo.groomName}! `;
	const description = `Assalamualaikum & Salam Sejahtera

	Kami sekeluarga ingin menjemput kehadiran Tan Sri | Puan Sri | Dato' Seri | Datin Seri | Dato' | Datin | Tuan | Puan | Encik | Cik untuk bersama-sama memeriahkan majlis perkahwinan putera dan puteri
	
	*Syaf & Izzul*
	
	🗓️ Sabtu, 15 Oktober 2022
	🕐 11:00 am - 1:30 pm
	📍 Magica Crystal Hall, Level 4 Plaza Alam Sentral, Jalan Majlis, Seksyen 14, 40000 Shah Alam, Selangor
	
	Sila lengkapkan RSVP tuan/puan di link yang tertera  sebelum 30 September 2022`;

	return { props: { title, imageUrl, description } };
}

export default Cars;
