/** @format */

import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import moment from 'moment';
//Context import
import { useInviteContext } from '../../pages/_app';
//Component
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../component/button/ButtonProvider';
import { BackButton, MoneyGift, AttendingIcon } from '../../component/icons/icons';
//Icons import
import { MajliskuSmallIcon, GiftIcon } from '../../component/icons/icons';

function Rsvp() {
	const description = 'RSVP';
	const title = 'RSVP';
	const router = useRouter();
	const { eventDetails } = useInviteContext();
	const { event_date } = eventDetails;

	let queryId = router.query.id;

	const handleBackButton = () => {
		router.push(`/${queryId}`);
	};

	const handleToMoneyGift = () => {
		router.push(`/${queryId}/moneygift`);
	};

	const handleToGiftRegistry = () => {
		router.push(`/${queryId}/gift`);
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
					<div className='w-full max-w-2xl gap-4 py-6 mt-4'>
						<div className='px-6 pb-4'>
							<button onClick={handleBackButton}>
								<BackButton />
							</button>
						</div>

						<div className='p-6  w-full border-t  sm:border-0 items-center flex flex-col gap-4'>
							<div className='my-2'>
								<AttendingIcon width={48} height={48} />
							</div>

							<InviteTextProvider className='uppercase font-medium text-xl text-center'>
								Terima kasih kerana Rsvp
							</InviteTextProvider>
							<InviteTextProvider className='uppercase font-normal text-center'>
								Kami menanti kehadiran anda!
							</InviteTextProvider>
							<div className='w-full border-b-2 pb-4'>
								<InviteLineLogo color='#D0D5DD' height='1px' />
								<InviteTextProvider className='uppercase font-medium text-center'>
									{moment(event_date).format('dddd, D MMMM YYYY')}
								</InviteTextProvider>
							</div>
						</div>
						<div className='flex justify-center w-full'>
							<div className='px-6 flex flex-col gap-2 w-full max-w-sm'>
								<ButtonProvider className='uppercase font-medium'>
									Simpan Di Kalendar
								</ButtonProvider>
								<ButtonProvider className='uppercase' onClick={handleToGiftRegistry}>
									<GiftIcon /> Bawa Hadiah
								</ButtonProvider>
								<ButtonProvider className='uppercase' onClick={handleToMoneyGift}>
									<MoneyGift /> Salam Kaut
								</ButtonProvider>
								<ButtonProvider className='uppercase' onClick={handleBackButton}>
									Halaman Utama
								</ButtonProvider>
								<a href='https://majlisku.com' target='_blank' rel='noreferrer' className='w-full'>
									<ButtonProvider type='primary' className='uppercase w-full'>
										<MajliskuSmallIcon /> Lawat Majlisku
									</ButtonProvider>
								</a>
							</div>
						</div>
					</div>
				</div>
			</main>
		</div>
	);
}

export default Rsvp;
