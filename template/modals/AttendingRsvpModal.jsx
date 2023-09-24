/** @format */

import React, { useState } from 'react';
import { useRouter } from 'next/router';
//Components import
import ModalProvider from '../../component/modal/ModalProvider';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import ButtonProvider from '../../component/button/ButtonProvider';
import InputTextProvider from '../../component/input/InputTextProvider';
//Assets import
import { PhoneIcon, MinusIcon, PlusIcon, OpenLetterIcon } from '../../component/icons/icons';

export default function AttendingRsvpModal({
	isOpen,
	handleClose,
	handleBackButton,
	enable_bahasa = false,
}) {
	const [name, setName] = useState('');
	const [tel, setTel] = useState('');
	const [pax, setPax] = useState(1);
	const [wish, setWish] = useState('');
	const [error, setError] = useState(null);

	const router = useRouter();
	let queryId = router.query.id;

	const greetingText = enable_bahasa
		? 'Kami menanti kedatangan anda!'
		: 'We are looking forward to seeing you there!';
	const nameText = enable_bahasa ? 'Nama' : 'Name';
	const telText = enable_bahasa ? 'No Tel' : 'Contact';
	const paxText = enable_bahasa ? 'Bilangan Kehadiran' : 'Total Pax';
	const wishText = enable_bahasa ? 'Ucapan anda' : 'Your Wish';
	const confirmText = enable_bahasa ? 'Setuju' : 'Confirm';
	const cancelText = enable_bahasa ? 'Batal' : 'Cancel';
	const nameInputErrorText = enable_bahasa ? 'Sila nyatakan nama anda' : 'Please enter your name';

	const handleChangeName = (e) => {
		setError(null);
		setName(e.target.value);
	};

	const checkForInputName = () => {
		setError(null);
		if (name === '') {
			setError(nameInputErrorText);
			return false;
		} else {
			return true;
		}
	};

	const handleSubmit = () => {
		if (checkForInputName()) {
			router.push(`/${queryId}/rsvp`);
		}
	};

	const onClickAddPax = () => {
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
							{greetingText}
						</InviteTextProvider>
						<InviteLineLogo color='#D0D5DD' height='1px' />
					</div>

					<div className='p-0 flex flex-col gap-6'>
						<div className='flex flex-col gap-1'>
							<InviteTextProvider color='#475467' className='uppercase font-medium'>
								{nameText}*
							</InviteTextProvider>
							<div>
								<InputTextProvider
									error={error}
									className='text-base'
									placeholder='Enter name'
									value={name}
									onChange={handleChangeName}
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
						</div>
						<div className='flex flex-col gap-2'>
							<InviteTextProvider color='#475467' className='uppercase font-medium'>
								{paxText}
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
							<ButtonProvider className='w-full uppercase'>{cancelText}</ButtonProvider>
							<ButtonProvider type='primary' className='w-full uppercase' onClick={handleSubmit}>
								{confirmText}
							</ButtonProvider>
						</div>
					</div>
				</div>
			</div>
		</ModalProvider>
	);
}
