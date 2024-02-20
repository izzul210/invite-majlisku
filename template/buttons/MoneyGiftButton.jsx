/** @format */

import React, { useState } from 'react';
import Image from 'next/image';
//Context import
import { useInviteContext } from '../inviteContext';
//Icons import
import { MoneyGift } from '../../component/icons/icons';
//Components import
import ModalProvider from '../../component/drawer/DrawerProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

/***** Components *****/
const MoneyGiftModal = ({ isOpen, handleClose, enable_bahasa = false }) => {
	const { eventDetails } = useInviteContext();
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
};

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

function MoneyGiftButton({ enable_bahasa, preview }) {
	const [open, setOpen] = useState(false);

	return (
		<>
			<button
				className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
				style={{ color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #1E1E1E' }}
				onClick={() => setOpen(true)}>
				<MoneyGift />
				<InviteTextProvider className='uppercase'>
					{enable_bahasa ? 'Salam Kaut' : 'Money Gift'}
				</InviteTextProvider>
			</button>
			<MoneyGiftModal
				enable_bahasa={enable_bahasa}
				isOpen={open}
				handleClose={() => setOpen(false)}
			/>
		</>
	);
}

export default MoneyGiftButton;
