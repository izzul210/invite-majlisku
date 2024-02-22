/** @format */
import React from 'react';
import moment from 'moment';
//Context import
import { useInviteContext } from '../inviteContext';
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

export default function PersonalizedRsvpActionModal({ handleRsvp, enable_bahasa = false }) {
	const { personalizedGuestDetail } = useInviteContext();
	const guestDetails = personalizedGuestDetail || {};
	//Text states
	const inviteText = enable_bahasa
		? `Adakah Tuan/Puan hadir ke Majlis ini,`
		: `Would you be able to attend the event,`;
	const attendingButtonText = enable_bahasa ? 'Hadir' : 'Attending';
	const notAttendingButtonText = enable_bahasa ? 'Tidak Hadir' : 'Not Attending';
	const notSureButtonText = enable_bahasa ? 'Tidak pasti' : 'Not Sure Yet';

	const renderModalText = () => {
		if (guestDetails?.response) {
			if (guestDetails?.response?.rsvp === 'attending') {
				return (
					<>
						<div>
							{guestDetails?.name} - {attendingButtonText}
						</div>
						<div className='text-xs font-semibold mt-1'>
							Rsvp'd {moment(guestDetails.response.date).fromNow()}
						</div>
					</>
				);
			} else if (guestDetails?.response?.rsvp === 'notattending') {
				return (
					<>
						<div>
							{guestDetails?.name} - {notAttendingButtonText}
						</div>
						<div className='text-xs font-semibold mt-1'>
							Rsvp'd {moment(guestDetails.response.date).fromNow()}
						</div>
					</>
				);
			} else if (guestDetails?.response?.rsvp === 'maybe') {
				return (
					<>
						<div>
							{guestDetails?.name} - {notSureButtonText}
						</div>
						<div className='text-xs font-semibold mt-1'>
							Rsvp'd {moment(guestDetails.response.date).fromNow()}
						</div>
					</>
				);
			}
		} else {
			return (
				<>
					{inviteText} <br /> {guestDetails?.name} ?
				</>
			);
		}
	};

	return (
		<div className='mt-4'>
			<div className='flex flex-col text-center gap-4 justify-center items-center'>
				<OpenLetterIcon />
				<InviteTextProvider className='uppercase text-sm'>{renderModalText()}</InviteTextProvider>
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
