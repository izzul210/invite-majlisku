/** @format */

import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
//Context import
import { useInviteContext } from '../inviteContext';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import ButtonProvider from '../../component/button/ButtonProvider';
import RsvpActionButton from '../../component/button/RsvpActionButton';
//Assets import
import { OpenLetterIcon } from '../../component/icons/icons';
//API import
import { useSubmitPersonalGuestResponse } from '../../hooks/usePostApi';

export default function PersonalizedMaybeRsvpModal({
	handleClose,
	handlePostRequest,
	enable_bahasa = false,
}) {
	const { userId } = useInviteContext();
	//From React Query
	const queryClient = useQueryClient();
	const guestDetails = queryClient.getQueryData('personalizedGuestDetail') || {};
	//States
	const [wish, setWish] = useState('');
	const [error, setError] = useState(null);
	//POST Request
	const submitGuestResponse = useSubmitPersonalGuestResponse(userId);
	//Title text
	const greetingText = enable_bahasa ? `Sila sahkan kehadiran` : `Please confirm your RSVP`;
	const wishText = enable_bahasa ? 'Ucapan anda' : 'Your Wish';
	const confirmText = enable_bahasa ? 'Saya Tidak Pasti' : `I'm Not Sure Yet`;
	const cancelText = enable_bahasa ? 'Batal' : 'Cancel';

	useEffect(() => {
		setWish(guestDetails?.response?.wish || '');
	}, [guestDetails]);

	const handleReset = () => {
		setWish('');
		setError(null);
	};

	const handleSubmit = async () => {
		let guestRes = {
			rsvp: 'maybe',
			pax: 1,
			wish: wish,
		};

		const response = await submitGuestResponse.mutateAsync(guestRes);
		if (response) {
			handlePostRequest();
		} else {
			window.alert('Error please contact me!');
		}
	};

	return (
		<div className='w-full flex flex-col items-center'>
			{/***** Page Container ***/}
			<div className='w-full max-w-2xl gap-4 py-2 mt-4'>
				<div className='p-0  w-full items-center flex flex-col gap-4'>
					<OpenLetterIcon width={48} height={48} />
					<InviteTextProvider className='uppercase font-medium text-center'>
						<div>{greetingText},</div>
						<div>{guestDetails?.name}</div>
					</InviteTextProvider>
					<InviteLineLogo color='#D0D5DD' height='1px' />
				</div>

				<div className='p-0 flex flex-col gap-6'>
					<div className='flex flex-col gap-1'>
						<InviteTextProvider color='#475467' className='uppercase font-medium'>
							{wishText}
						</InviteTextProvider>
						<textarea
							className='border-2 py-2 px-3 rounded-md'
							style={{ fontFamily: 'EB Garamond' }}
							rows='4'
							placeholder='Enter message'
							value={wish}
							onChange={(e) => setWish(e.target.value)}
						/>
					</div>
					<div className='flex flex-row gap-2 '>
						<ButtonProvider
							onClick={() => {
								handleReset();
								handleClose();
							}}
							className='w-full uppercase'>
							{cancelText}
						</ButtonProvider>
						<RsvpActionButton
							isLoading={submitGuestResponse.isLoading}
							className='w-full uppercase'
							onClick={handleSubmit}>
							{confirmText}
						</RsvpActionButton>
					</div>
				</div>
			</div>
		</div>
	);
}
