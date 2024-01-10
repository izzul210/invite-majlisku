/** @format */
'use client';
import React, { useState, useEffect } from 'react';
import { useQueryClient } from 'react-query';
import moment from 'moment';
//Components import
import ModalProvider from '../../component/drawer/DrawerProvider';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import ButtonProvider from '../../component/button/ButtonProvider';
import RsvpActionButton from '../../component/button/RsvpActionButton';
import InputTextProvider from '../../component/input/InputTextProvider';
//API import
import { useSubmitPersonalGuestResponse } from '../../hooks/usePostApi';
//Assets import
import { PhoneIcon, MinusIcon, PlusIcon, OpenLetterIcon } from '../../component/icons/icons';

export default function PersonalizedAttendingRsvpModal({
	isOpen,
	handleClose,
	handleBackButton,
	handlePostRequest,
	enable_unlimited_pax,
	guest_pax_limit,
	enable_multiple_slots,
	enable_bahasa = false,
	event_time,
	event_time_slot_2 = null,
}) {
	//From React Query
	const queryClient = useQueryClient();
	const guestDetails = queryClient.getQueryData('personalizedGuestDetail') || {};
	//States
	const [name, setName] = useState(guestDetails?.name || '');
	const [tel, setTel] = useState(guestDetails?.response?.phone || '');
	const [pax, setPax] = useState(guestDetails?.response?.pax || 1);
	const [wish, setWish] = useState(guestDetails?.response?.wish || '');
	const [timeSlot, setTimeSlot] = useState(guestDetails?.response?.timeSlot || null);
	const [error, setError] = useState(null);
	const [timeSlotError, setTimeSlotError] = useState(null);
	//POST Request
	const submitGuestResponse = useSubmitPersonalGuestResponse();
	//Title Text
	const greetingText = enable_bahasa ? `Sila sahkan kehadiran` : `Please confirm your RSVP`;
	const nameText = enable_bahasa ? 'Nama' : 'Name';
	const telText = enable_bahasa ? 'No Tel' : 'Contact';
	const paxText = enable_bahasa ? 'Bilangan Kehadiran' : 'Total Pax';
	const timeslotText = enable_bahasa ? 'Pilih Waktu' : 'Time Slot';
	const wishText = enable_bahasa ? 'Ucapan anda' : 'Your Wish';
	const confirmText = enable_bahasa ? 'Saya Hadir' : `I'm Attending`;
	const cancelText = enable_bahasa ? 'Batal' : 'Cancel';
	const nameInputErrorText = enable_bahasa ? 'Sila nyatakan nama anda' : 'Please enter your name';
	const timeSlotInputErrorText = enable_bahasa ? 'Sila pilih waktu' : 'Please choose a timeslot';

	useEffect(() => {
		setName(guestDetails?.name || '');
		setTel(guestDetails?.response?.phone || '');
		setPax(guestDetails?.response?.pax || 1);
		setWish(guestDetails?.response?.wish || '');
		setTimeSlot(guestDetails?.response?.timeSlot || null);
	}, [guestDetails]);

	const handleChangeName = (e) => {
		setError(null);
		setName(e.target.value);
	};

	const checkForInputName = () => {
		setError(null);
		if (name === '') {
			setError(nameInputErrorText);
			return false;
		} else if (!timeSlot && enable_multiple_slots) {
			setTimeSlotError(timeSlotInputErrorText);
			return false;
		} else {
			return true;
		}
	};

	const handleReset = () => {
		setName('');
		setTel('');
		setPax(1);
		setWish('');
		setTimeSlot(null);
		setError(null);
		setTimeSlotError(null);
	};

	const handleSubmit = async () => {
		if (checkForInputName()) {
			let guestRes = {
				name: name,
				phone: tel,
				rsvp: 'attending',
				pax: pax,
				wish: wish ? wish : '',
			};

			if (enable_multiple_slots) {
				guestRes = {
					...guestRes,
					timeSlot: timeSlot,
				};
			}

			const response = await submitGuestResponse.mutateAsync(guestRes);
			if (response) {
				handlePostRequest();
			} else {
				window.alert('Error please contact me!');
			}
		}
	};

	const onClickAddPax = () => {
		if (!enable_unlimited_pax && guest_pax_limit && pax >= guest_pax_limit) return;
		setPax(pax + 1);
	};

	const onClickMinusPax = () => {
		if (pax > 1) {
			setPax(pax - 1);
		} else {
			setPax(1);
		}
	};

	return (
		<ModalProvider
			disableSwipeToClose
			topBorder
			backButton
			isOpen={isOpen}
			handleBackButton={handleBackButton}
			handleClose={handleClose}>
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
						{/* <div className='flex flex-col gap-1'>
							<InviteTextProvider color='#475467' className='uppercase font-medium'>
								{nameText}
							</InviteTextProvider>
							<div>
								<InputTextProvider
									error={error}
									className='text-base'
									placeholder='Enter name'
									value={name}
									onChange={handleChangeName}
									disabled
								/>
								{error && (
									<InviteTextProvider color='red' className='text-base'>
										{error}
									</InviteTextProvider>
								)}
							</div>
						</div>
						<div className='flex flex-col gap-1'>
							<InviteTextProvider color='#475467' className='uppercase font-medium'>
								{telText}
							</InviteTextProvider>
							<InputTextProvider
								className='text-base'
								placeholder='Enter phone'
								value={tel}
								onChange={(e) => setTel(e.target.value)}
								icon={<PhoneIcon fill='#98A2B3' />}
							/>
						</div> */}
						{enable_multiple_slots ? (
							<div className='flex flex-col gap-1'>
								<InviteTextProvider color='#475467' className='uppercase font-medium'>
									{timeslotText}*
								</InviteTextProvider>
								<div className='flex flex-row gap-2'>
									<TimeSlotButton
										active={timeSlot === 1}
										onClick={() => {
											setTimeSlotError(null);
											setTimeSlot(1);
										}}>
										{moment(event_time).format('h:mm A')}
									</TimeSlotButton>
									<TimeSlotButton
										active={timeSlot === 2}
										onClick={() => {
											setTimeSlotError(null);
											setTimeSlot(2);
										}}>
										{moment(event_time_slot_2).format('h:mm A')}
									</TimeSlotButton>
								</div>
								{timeSlotError && (
									<InviteTextProvider color='red' className='text-base'>
										{timeSlotError}
									</InviteTextProvider>
								)}
							</div>
						) : null}

						<div className='flex flex-col gap-2'>
							<InviteTextProvider color='#475467' className='uppercase font-medium'>
								{paxText}{' '}
								{!enable_unlimited_pax && guest_pax_limit ? `(Max ${guest_pax_limit})` : null}
							</InviteTextProvider>
							<div className='flex flex-row items-center gap-3'>
								<button className='py-2 px-4 border-2' onClick={onClickMinusPax}>
									<MinusIcon />
								</button>
								<InviteTextProvider
									color='#475467'
									fontFamily='poppins'
									className='uppercase font-semibold text-base'>
									{pax}
								</InviteTextProvider>
								<button className='py-2 px-4 border-2' onClick={onClickAddPax}>
									<PlusIcon />
								</button>
							</div>
						</div>
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
		</ModalProvider>
	);
}

const TimeSlotButton = ({ children, active, ...props }) => {
	const styleProvider = active
		? {
				border: '1px solid #98A2B3',
				background:
					'var(--nude-tint-75, linear-gradient(0deg, rgba(255, 255, 255, 0.75) 0%, rgba(255, 255, 255, 0.75) 100%), #F1BFBE)',
		  }
		: {
				border: '1px solid #D0D5DD',
		  };

	return (
		<button
			{...props}
			className='flex-1 py-3 px-4 rounded-full'
			style={{ ...styleProvider, fontFamily: 'Lora', color: '#1D4648' }}>
			{children}
		</button>
	);
};
