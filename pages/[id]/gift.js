/** @format */

import React from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Image from 'next/image';
//Context import
import { useInviteContext } from '../_app';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import { BackButton } from '../../component/icons/icons';
import { Footer } from '../../components/subcomponents';

const GiftCard = ({ gift }) => {
	const { imageUrl, category, name, reserved } = gift;

	const ReservedTag = () => (
		<div
			className='flex flex-row gap-2 items-center px-2 rounded-full'
			style={{
				padding: '2px 0px',
				background:
					'var(--nude-tint-50, linear-gradient(0deg, rgba(255, 255, 255, 0.50) 0%, rgba(255, 255, 255, 0.50) 100%), #F1BFBE) ',
			}}>
			<svg
				xmlns='http://www.w3.org/2000/svg'
				width='16'
				height='16'
				viewBox='0 0 16 16'
				fill='none'>
				<path
					d='M13.3337 4L6.00033 11.3333L2.66699 8'
					stroke='#F1BFBE'
					stroke-width='1.5'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
				<path
					d='M13.3337 4L6.00033 11.3333L2.66699 8'
					stroke='black'
					stroke-opacity='0.5'
					stroke-width='1.5'
					stroke-linecap='round'
					stroke-linejoin='round'
				/>
			</svg>
			<InviteTextProvider
				fontFamily='sansPro'
				color='rgba(121, 71, 70, 1)'
				className='uppercase text-sm font-medium'>
				Reserved
			</InviteTextProvider>
		</div>
	);

	return (
		<div style={{ width: 'min(100%, 300px)' }}>
			<div
				style={{
					height: 200,
					backgroundImage: `url(${imageUrl})`,
					backgroundSize: 'cover',
					backgroundPosition: 'center',
				}}></div>
			<div className='flex flex-col'>
				<div className='flex flex-row justify-between py-3'>
					<div className='px-2 py-[1px] rounded-full' style={{ backgroundColor: '#F2F4F7' }}>
						<InviteTextProvider fontFamily='sansPro' className='uppercase text-sm font-semibold'>
							{category}
						</InviteTextProvider>
					</div>
					<ReservedTag />
				</div>
				<InviteTextProvider fontFamily='sansPro' className='text-lg' color='#101828'>
					{name}
				</InviteTextProvider>
			</div>
		</div>
	);
};

function GiftRegistry() {
	const { eventDetails, state } = useInviteContext();
	const { gifts, enable_bahasa } = eventDetails;
	const router = useRouter();

	let queryId = router.query.id;

	console.log('gifts', gifts);

	//imageUrl
	//name
	//reserved
	//id

	const description = 'Gift Registry';
	const title = 'Gift Registry';

	const address = 'No 30, Jalan Saujana Damai 1, Taman Saujana Damai, 43000 Kajang';

	const giftTextDescription = enable_bahasa
		? 'Hadiah-hadiah yang tersenarai hanya sekadar panduan:'
		: 'For friends and family who have been asking for gift ideas, this is guidance registry:';

	const handleBackButton = () => {
		router.push(`/${queryId}`);
	};

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description}></meta>
				<meta property='og:title' content={title}></meta>
				<meta property='og:description' content={description}></meta>
			</Head>
			<main>
				{/****** Screen Container */}
				<div className='w-full flex flex-col items-center'>
					{/***** Page Container ***/}
					<div className='w-full max-w-2xl gap-4 p-6 mt-4'>
						<button onClick={handleBackButton}>
							<BackButton />
						</button>
						<div className='py-4 flex flex-col gap-1'>
							<InviteTextProvider className='text-xl uppercase font-semibold'>
								Senarai Hadiah
							</InviteTextProvider>
							<InviteTextProvider fontFamily='sansPro' color='#667085' className='text-sm my-2'>
								{giftTextDescription}
							</InviteTextProvider>
							<InviteLineLogo color='#D0D5DD' height='1px' />
						</div>
						<div className='flex flex-col gap-2 pb-3 border-b'>
							<InviteTextProvider
								fontFamily='sansPro'
								className='uppercase text-sm font-semibold'
								color='#667085'>
								Alamat
							</InviteTextProvider>
							<InviteTextProvider fontFamily='sansPro' className='text-sm' color='#667085'>
								{address}
							</InviteTextProvider>
						</div>
						<div className='flex flex-row flex-wrap justify-center items-center gap-y-12 gap-x-4 py-9'>
							{gifts?.map((gift) => (
								<GiftCard gift={gift} key={gift.id} />
							))}
						</div>
					</div>
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default GiftRegistry;
