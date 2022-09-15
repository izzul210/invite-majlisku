/** @format */

import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';

export default function Home() {
	return (
		<div className={styles.container}>
			<Head>
				<title>E-Invite with Majlisku</title>
				<meta name='description' content='Create e-invite with Majlisku.app' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<main className={styles.main}>
				<h1 className={styles.title}>
					Welcome to <a href='https://majlisku.app'>Majlisku.ap!</a>
				</h1>
			</main>

			<footer>
				<div
					style={{
						textAlign: 'center',
						padding: '16px',
						color: 'white',
						display: 'flex',
						flexDirection: 'column',
						gap: '5px',
						fontFamily: 'Poppins',
						fontSize: '15px',
					}}>
					<div>
						© 2022{' '}
						<a style={{ color: 'white', textDecoration: 'none' }} href='https://majlisku.app'>
							Majlisku.app
						</a>
					</div>
					<div>
						by{' '}
						<a
							style={{ color: 'white', textDecoration: 'underline' }}
							href='https://www.instagram.com/izzul_023/'>
							Izzul
						</a>{' '}
						&{' '}
						<a
							style={{ color: 'white', textDecoration: 'underline' }}
							href='https://twitter.com/theizzulsyazwan'>
							Izzul
						</a>{' '}
					</div>
				</div>
			</footer>
		</div>
	);
}
