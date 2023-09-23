/** @format */
import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { useRouter } from 'next/router';
//Context import
import { useInviteContext } from '../pages/_app';
//Template components
import {
	FirstScreenDefault,
	FirstScreenMinimal_2,
	FirstScreenMinimal_1,
	FirstScreenPremium,
	FirstScreenEmbossed,
} from './firstScreen/FirstScreen';
import { GreetingScreenDefault, GreetingScreenPremium } from './greetingScreen/GreetingScreen';
import {
	EventDetailsMinimal_2,
	EventDetailsDefault,
	EventDetailsPremium,
} from './eventDetails/EventDetails';
import { TentativeDefault, TentativeAccordian } from './tentative/Tentative';
import { ContactAccordian, ContactDefault } from './contacts/Contacts';
import { WishAccordian, WishDefault } from './wishlist/Wishlist';
import { CalendarAccordian, CalendarDefault } from './calendar/Calendar';
//Components import
import ModalProvider from '../component/modal/ModalProvider';
import InviteTextProvider from '../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../component/misc/InviteLineLogo';
import ButtonProvider from '../component/button/ButtonProvider';
import InputTextProvider from '../component/input/InputTextProvider';
//Assets import
import {
	PhoneIcon,
	MinusIcon,
	PlusIcon,
	OpenLetterIcon,
	AttendingIcon,
	NotAttendingIcon,
	MaybeIcon,
} from '../component/icons/icons';

////////RSVP sections
function AttendingRsvpModal({ isOpen, handleClose, handleBackButton, enable_bahasa = false }) {
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

function NotAttendingRsvpModal({ isOpen, handleClose, handleBackButton, enable_bahasa = false }) {
	const [name, setName] = useState('');
	const [tel, setTel] = useState('');
	const [wish, setWish] = useState('');
	const [error, setError] = useState(null);

	const router = useRouter();
	let queryId = router.query.id;

	const greetingText = enable_bahasa ? (
		<>
			Maafkan kami atas kesulitan
			<br /> Terima kasih kerana sudi meberi respons
		</>
	) : (
		<>
			We are sorry to hear that
			<br /> Thank you for the thoughtful response
		</>
	);
	const nameText = enable_bahasa ? 'Nama' : 'Name';
	const telText = enable_bahasa ? 'No Tel' : 'Contact';
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

function MaybeRsvpModal({ isOpen, handleClose, handleBackButton, enable_bahasa = false }) {
	const [name, setName] = useState('');
	const [tel, setTel] = useState('');
	const [wish, setWish] = useState('');
	const [error, setError] = useState(null);

	const router = useRouter();
	let queryId = router.query.id;

	const greetingText = enable_bahasa
		? 'Kami amat berbesar hati jika tuan/puan dapat hadir ke majlis kami'
		: 'We are very happy if you could attend our event!';
	const nameText = enable_bahasa ? 'Nama' : 'Name';
	const telText = enable_bahasa ? 'No Tel' : 'Contact';
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

const RsvpActionModal = ({ isOpen, handleClose, handleRsvp, enable_bahasa = false }) => {
	const inviteText = enable_bahasa
		? 'Adakah Tuan/Puan hadir ke Majlis ini?'
		: 'Would you be able to attend the event?';
	const attendingButtonText = enable_bahasa ? 'Hadir' : 'Attending';
	const notAttendingButtonText = enable_bahasa ? 'Tidak Hadir' : 'Not Attending';
	const notSureButtonText = enable_bahasa ? 'Tidak pasti' : 'Not Sure Yet';

	return (
		<ModalProvider isOpen={isOpen} handleClose={handleClose}>
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
		</ModalProvider>
	);
};

//////Layouts
const FirstScreen = () => {
	const { eventDetails, state } = useInviteContext();
	const {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		event_date,
		event_location,
		italic_title,
		event_time,
	} = eventDetails;
	const { design, premium_design } = state;

	useEffect(() => {}, [design]);

	const firstScreenProps = {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		event_date,
		event_location,
		italic_title,
		event_time,
		event_start: event_time?.start,
		event_end: event_time?.end,
	};

	switch (design) {
		case 0:
			return <FirstScreenDefault {...firstScreenProps} />;
		case 1:
			return <FirstScreenMinimal_2 {...firstScreenProps} />;
		case 2:
			return <FirstScreenMinimal_1 {...firstScreenProps} />;
		case 3:
			return <FirstScreenPremium premium_design={premium_design} {...firstScreenProps} />;
		case 4:
			return <FirstScreenEmbossed {...firstScreenProps} />;
		default:
			return <FirstScreenDefault {...firstScreenProps} />;
	}
};

const GreetingScreen = () => {
	const { eventDetails, state } = useInviteContext();
	const {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
	} = eventDetails;
	const { design, premium_design } = state;

	const [openModal, setOpenModal] = useState(false);
	const [attendingModal, setAttendingModal] = useState(false);
	const [notAttendingModal, setNotAttendingModal] = useState(false);
	const [maybeModal, setMaybeModal] = useState(false);
	const router = useRouter();

	let queryId = router.query.id;

	const handleOnClickRsvp = () => {
		setOpenModal(true);
	};
	const handleOnClickGift = () => {
		router.push(`/${queryId}/gift`);
	};
	const handleOnClickMoneyGift = () => {
		router.push(`/${queryId}/moneygift`);
	};

	const handleOnClickRsvpResponse = (status) => {
		setOpenModal(false);
		if (status === 0) {
			setAttendingModal(true);
		} else if (status === 1) {
			setNotAttendingModal(true);
		} else if (status === 2) {
			setMaybeModal(true);
		}
	};

	const greetingScreenProps = {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
	};

	switch (design) {
		case 3:
			return <GreetingScreenPremium premium_design={premium_design} {...greetingScreenProps} />;
		default:
			return (
				<>
					<GreetingScreenDefault
						{...greetingScreenProps}
						onClickRSVP={handleOnClickRsvp}
						onClickGiftRegistry={handleOnClickGift}
						onClickMoneyGift={handleOnClickMoneyGift}
					/>
					<RsvpActionModal
						isOpen={openModal}
						handleClose={() => setOpenModal(false)}
						handleRsvp={handleOnClickRsvpResponse}
						enable_bahasa={enable_bahasa}
					/>
					<AttendingRsvpModal
						isOpen={attendingModal}
						handleClose={() => setAttendingModal(false)}
						handleBackButton={() => {
							setAttendingModal(false);
							setOpenModal(true);
						}}
						enable_bahasa={enable_bahasa}
					/>
					<NotAttendingRsvpModal
						isOpen={notAttendingModal}
						handleClose={() => setNotAttendingModal(false)}
						handleBackButton={() => {
							setNotAttendingModal(false);
							setOpenModal(true);
						}}
						enable_bahasa={enable_bahasa}
					/>
					<MaybeRsvpModal
						isOpen={maybeModal}
						handleClose={() => setMaybeModal(false)}
						handleBackButton={() => {
							setMaybeModal(false);
							setOpenModal(true);
						}}
						enable_bahasa={enable_bahasa}
					/>
				</>
			);
	}
};

const EventDetails = () => {
	const { eventDetails, state } = useInviteContext();
	const { event_date, event_time, description, location_info } = eventDetails;
	const { design, premium_design } = state;

	useEffect(() => {}, [design]);

	const eventDetailsProps = {
		event_date,
		event_start: event_time?.start,
		event_end: event_time?.end,
		description,
		event_address: location_info.address,
		waze_link: location_info?.wazeLink,
		google_link: location_info?.googleLink,
	};

	switch (design) {
		case 0:
			return <EventDetailsDefault {...eventDetailsProps} background='white' />;
		case 1:
			return <EventDetailsMinimal_2 {...eventDetailsProps} />;
		case 3:
			return <EventDetailsPremium premium_design={premium_design} {...eventDetailsProps} />;
		default:
			return <EventDetailsDefault {...eventDetailsProps} />;
	}
};

const Tentative = () => {
	const { eventDetails, state } = useInviteContext();
	const { enable_bahasa, itinerary } = eventDetails;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <TentativeDefault activities={itinerary} enable_bahasa={enable_bahasa} />;
			default:
				return <TentativeAccordian activities={itinerary} enable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
};

const Contacts = () => {
	const { eventDetails, state } = useInviteContext();
	const { contact_info, enable_bahasa } = eventDetails;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <ContactDefault contact_info={contact_info} emable_bahasa={enable_bahasa} />;
			default:
				return <ContactAccordian contact_info={contact_info} emable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
};

const Wishlist = () => {
	const { eventDetails, state } = useInviteContext();
	const { wishlist, enable_bahasa } = eventDetails;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <WishDefault wishlist={wishlist} enable_bahasa={enable_bahasa} />;
			default:
				return <WishAccordian wishlist={wishlist} enable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
};

const Calendar = () => {
	const { eventDetails, state } = useInviteContext();
	const { enable_bahasa, event_date, location_info, event_time, event_title_1, italic_title } =
		eventDetails;
	const { design } = state;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return (
					<CalendarDefault
						enable_bahasa={enable_bahasa}
						location_info={location_info}
						event_time={event_time}
						event_date={event_date}
						event_title={`${event_title_1} ${italic_title}`}
					/>
				);
			default:
				return (
					<CalendarAccordian
						enable_bahasa={enable_bahasa}
						location_info={location_info}
						event_time={event_time}
						event_date={event_date}
						event_title={`${event_title_1} ${italic_title}`}
					/>
				);
		}
	};

	return renderComponent();
};

function InviteTemplate() {
	return (
		<div className='w-full px-0 pb-6 sm:px-4 h-full flex flex-col items-center pt-0 sm:pt-24 sm:bg-transparent'>
			<div className='w-full flex flex-col items-center bg-white max-w-md sm:shadow-xl'>
				<FirstScreen />

				{/* <div ref={ref}>
					<motion.div
						initial={{ filter: 'blur(10px)' }}
						animate={{ filter: inView ? 'blur(0)' : 'blur(10px)' }}
						transition={{ duration: 0.5 }}>
						<GreetingScreen />
					</motion.div>
				</div> */}

				<GreetingScreen />

				<EventDetails />
				<div className='w-full flex gap-6 flex-col px-4 sm:px-0 py-8' style={{ maxWidth: '400px' }}>
					<Tentative />
					<Contacts />
					<Wishlist />
					<Calendar />
				</div>
			</div>
		</div>
	);
}

export default InviteTemplate;
