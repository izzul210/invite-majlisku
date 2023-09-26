/** @format */

import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
	return (
		<Html>
			<Head>
				<link rel='preconnect' href='https://fonts.googleapis.com' />
				<link rel='preconnect' href='https://fonts.gstatic.com' crossOrigin='true' />
				<link
					href='https://fonts.googleapis.com/css2?family=Great+Vibes&display=swap'
					rel='stylesheet'></link>
				<link
					href='https://fonts.googleapis.com/css2?family=Source+Sans+3:wght@200;300;400;500;600&display=swap'
					rel='stylesheet'></link>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
