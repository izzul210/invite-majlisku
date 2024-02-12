/** @format */
import React from 'react';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import ButtonProvider from '../../component/button/ButtonProvider';
//Assets import
import {
	OpenLetterIcon,
	AttendingIcon,
	NotAttendingIcon,
	MaybeIcon,
} from '../../component/icons/icons';

export default function RsvpActionModal({ handleRsvp, enable_bahasa = false }) {
	const inviteText = enable_bahasa
		? 'Adakah Tuan/Puan hadir ke Majlis ini?'
		: 'Would you be able to attend the event?';
	const attendingButtonText = enable_bahasa ? 'Hadir' : 'Attending';
	const notAttendingButtonText = enable_bahasa ? 'Tidak Hadir' : 'Not Attending';
	const notSureButtonText = enable_bahasa ? 'Tidak pasti' : 'Not Sure Yet';

	return (
		<div className='mt-4'>
			<div className='flex flex-col text-center gap-4 justify-center items-center'>
				<OpenLetterIcon />
				<InviteTextProvider className='uppercase text-sm'>{inviteText}</InviteTextProvider>
				<InviteLineLogo color='#F1BFBE' height='1px' />
			</div>
			<div className='mt-4 flex flex-col uppercase gap-3'>
				<ButtonProvider className='w-full uppercase' onClick={() => handleRsvp(0)}>
					<AttendingIcon /> {attendingButtonText}
				</ButtonProvider>
				<ButtonProvider className='w-full uppercase' onClick={() => handleRsvp(1)}>
					<NotAttendingIcon /> {notAttendingButtonText}
				</ButtonProvider>
				<ButtonProvider className='w-full uppercase' onClick={() => handleRsvp(2)}>
					<MaybeIcon /> {notSureButtonText}
				</ButtonProvider>
			</div>
		</div>
	);
}
