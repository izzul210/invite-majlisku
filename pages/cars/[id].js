/** @format */

import { useRouter } from 'next/router';
import Head from 'next/head';
import axios from 'axios';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

function Cars({ updatedData }) {
	return (
		<div>
			<Head>
				<title>{updatedData}</title>
			</Head>
			<main>
				<h1>{updatedData}</h1>
			</main>
		</div>
	);
}

export async function getServerSideProps(context) {
	let id = context.query.id;
	let weddingTitle;

	await axios
		.get(`${API}/weddingdetails/${id}`)
		.then((res) => {
			let userInfo = res.data[0];
			weddingTitle = userInfo.displayName;
			console.log(weddingTitle);
		})
		.catch((err) => {
			console.log('timeout!');
			console.log(err.message);
		});

	const updatedData = `Kereta ${weddingTitle}`;
	console.log(updatedData);

	return { props: { updatedData } };
}

export default Cars;
