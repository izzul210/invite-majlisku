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

const DetailContainer = ({ title, value }) => {
	return (
		<div className='flex flex-row gap-2 items-center'>
			<InviteTextProvider fontFamily='sansPro' className='text-sm font-semibold uppercase'>
				{title}:
			</InviteTextProvider>
			<InviteTextProvider fontFamily='sansPro' className='text-sm font-normal uppercase'>
				{value}
			</InviteTextProvider>
		</div>
	);
};
function MoneyGift() {
	const { eventDetails, state } = useInviteContext();
	const { money_gift_details } = eventDetails;
	const router = useRouter();

	let queryId = router.query.id;

	const description = 'Money Gift';
	const title = 'Money Gift';

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
						<div className='py-4 flex flex-col gap-4'>
							<InviteTextProvider className='text-xl uppercase font-semibold'>
								Salam Kaut
							</InviteTextProvider>
							<InviteTextProvider fontFamily='sansPro' color='#667085' className='text-sm'>
								Sumbangan anda, walau seberapa kecil, sangat dihargai dan bermakna bagi kami
							</InviteTextProvider>
							<InviteLineLogo color='#D0D5DD' height='1px' />
						</div>
						<div className='py-0 px-2 flex flex-col gap-3'>
							<DetailContainer title='Name' value={money_gift_details?.name} />
							<DetailContainer title='Bank' value={money_gift_details?.bankName} />
							<DetailContainer title='Account No' value={money_gift_details?.accNum} />
						</div>
					</div>
					{money_gift_details?.qrCodeUrl && (
						<Image
							src={money_gift_details?.qrCodeUrl}
							width={300}
							height={300}
							alt='QR Code Image'
							className='rounded-2xl'
						/>
					)}
				</div>
			</main>
			<Footer />
		</div>
	);
}

export default MoneyGift;
