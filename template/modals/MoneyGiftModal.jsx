/** @format */

import React from 'react';
import Image from 'next/image';
import { useQueryClient } from 'react-query';
//Components import
import ModalProvider from '../../component/drawer/DrawerProvider';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';

export default function MoneyGiftModal({ isOpen, handleClose, handleRsvp, enable_bahasa = false }) {
	const queryClient = useQueryClient();
	const eventDetails = queryClient.getQueryData('eventDetails') || {};
	const { money_gift_details } = eventDetails || {};

	const titleText = enable_bahasa ? 'Salam Kaut' : 'Money Gift';

	return (
		<ModalProvider isOpen={isOpen} handleClose={handleClose}>
			<div className='mt-4 w-full'>
				<div className='w-full flex flex-col text-start gap-4'>
					<InviteTextProvider className='uppercase font-semibold text-[20px]'>
						{titleText}
					</InviteTextProvider>
					<InviteLineLogo color='#F1BFBE' height='1px' />
				</div>
				<div className='mt-4 px-2 w-full flex flex-col uppercase gap-3'>
					<DetailContainer title='Name' detail={money_gift_details?.name} />
					<DetailContainer title='Bank' detail={money_gift_details?.bankName} />
					<DetailContainer title='Account No' detail={money_gift_details?.accNum} />
				</div>
				{money_gift_details?.qrCodeUrl ? (
					<div style={{ width: '100%', height: 'auto', marginTop: 12 }}>
						<Image
							priority
							src={money_gift_details?.qrCodeUrl}
							alt='Qr Code Url'
							layout='responsive'
							width={1000}
							height={1200}
							style={{
								border: 10,
							}}
							placeholder='blur'
							blurDataURL='data:...'
						/>
					</div>
				) : null}
			</div>
		</ModalProvider>
	);
}

const DetailContainer = ({ title, detail }) => {
	return (
		<div className='flex flex-row gap-2 items-center'>
			<InviteTextProvider
				className='font-semibold  tracking-[0.5px] text-[14px]'
				fontFamily='sansPro'>
				{title}:
			</InviteTextProvider>
			<InviteTextProvider className='text-[14px]' fontFamily='sansPro'>
				{detail}
			</InviteTextProvider>
		</div>
	);
};
