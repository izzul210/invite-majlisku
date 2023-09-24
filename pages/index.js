/** @format */

import Head from 'next/head';

export default function Home() {
	return (
		<>
			<Head>
				<meta http-equiv='refresh' content='0;url=https://majlisku.com' />
			</Head>
		</>
	);
}

export async function getServerSideProps() {
	return {
		redirect: {
			destination: 'https://majlisku.com',
			permanent: false,
		},
	};
}
