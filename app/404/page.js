/** @format */
import Image from "next/legacy/image";
import styles from '../../styles/Home.module.css';
import errorPageImg from '../../assets/images/404.png';
import majliskuIcon from '../../assets/images/majlisku-icon.png';

export const metadata = {
	title: {
		absolute: 'URL Not Found | Majlisku',
	},
	description: {
		absolute: 'Create e-invite with Majlisku.app',
	},
};

export default function Error() {
	return (
		<div className={styles.container}>
			<main
				style={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'flex-start',
					fontFamily: 'Lora, serif',
					flexDirection: 'column',
					padding: '20px 10px',
					gap: 16,
				}}>
				<div
					style={{
						width: 'min(400px, 100%)',
						display: 'flex',
						flexDirection: 'column',
						alignItems: 'center',
						justifyContent: 'flex-start',
					}}>
					<div
						style={{
							width: '100%',
							height: 'auto',
							display: 'flex',
							margin: '15px 0px',
							justifyContent: 'flex-end',
						}}>
						<Image src={majliskuIcon} width={40} height={40} alt='majlisku icon' />
					</div>
					<div style={{ margin: '20px 0px' }}>
						<Image src={errorPageImg} width={140} height={140} alt='404' />
					</div>
					<h1
						className={styles.title}
						style={{
							color: 'rgba(55, 63, 71, 1)',
							fontSize: 20,
							marginTop: 16,
							textTransform: 'uppercase',
						}}>
						Oops! It appears you are not on the guest list for this event
					</h1>
					<h3
						style={{
							color: 'rgba(55, 63, 71, 1)',
							fontSize: 18,
							textAlign: 'center',
							fontWeight: 400,
						}}>
						The URL link seems to be broken or missing. Kindly contact your gracious host for the
						right link <br />
						<br /> Meanwhile, you can visit our homepage for inspiration of your own event
					</h3>
					<div style={{ marginTop: 20, textAlign: 'center' }}>
						<a
							href='https://majlisku.com'
							style={{
								fontWeight: 600,
								border: '1px solid #D0D5DD',
								padding: '8px 16px',
								borderRadius: 100,
							}}>
							Go to Majlisku.com
						</a>
						<p style={{ marginTop: 26 }}>
							by{' '}
							<a
								style={{ textDecoration: 'underline' }}
								href='https://www.instagram.com/izzul_023/'>
								Izzul Syahmi
							</a>{' '}
							&{' '}
							<a style={{ textDecoration: 'underline' }} href='https://twitter.com/theizzulsyazwan'>
								Izzul Syazwan
							</a>{' '}
						</p>
					</div>
				</div>
			</main>
		</div>
	);
}
