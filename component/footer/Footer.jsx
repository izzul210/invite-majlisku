/** @format */

export default function Footer() {
	return (
		<footer>
			<div
				style={{
					textAlign: 'center',
					padding: '16px',
					color: 'white',
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					fontFamily: 'Source Sans Pro',
					fontSize: '15px',
					background: 'rgba(30, 30, 30, 1)',
				}}>
				<div>Send e-invite and manage guestlist</div>
				<div style={{ fontWeight: 600 }}>
					© 2022{' '}
					<a
						style={{ color: 'white', textDecoration: 'none' }}
						target='_blank'
						rel='noreferrer'
						href='https://majlisku.com'>
						Majlisku.com
					</a>
				</div>

				<div style={{ color: 'rgba(102, 112,133,1)' }}>
					by{' '}
					<a style={{ textDecoration: 'underline' }} href='https://www.instagram.com/izzul_023/'>
						Izzul Syahmi
					</a>{' '}
					&{' '}
					<a style={{ textDecoration: 'underline' }} href='https://twitter.com/theizzulsyazwan'>
						Izzul Syazwan
					</a>{' '}
				</div>
			</div>
		</footer>
	);
}
