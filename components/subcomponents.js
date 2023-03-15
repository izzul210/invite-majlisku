/** @format */

import React, { useEffect, useState } from 'react';
//Components import
import { DetailsAccordian, AddToCalendar } from './accordian';
//MUI import
import Container from '@mui/material/Container';
//Libraries
import moment from 'moment';
import 'moment/locale/ms-my';
import 'moment/locale/en-ca';
//Icons
import {
	BackIcon,
	NewGiftIcon,
	GoingIcon,
	TickIcon,
	NotGoingIcon,
	MoneyIcon,
	QRCode,
} from './icons';

//Importing modals
import {
	GoingModal,
	NotGoingModal,
	ConfirmModal,
	PreRSVPModal,
	CancelModal,
	QrCodeModal,
	ThankYouModal,
	SorryModal,
} from './modals';

const defaultImage =
	'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/thumbnails%2Fxxg05Isu0bTG09OF7qbezUi8Gzm2%2Frsvp%2FrsvpImage?alt=media&token=d24710b3-74ae-49ba-a76e-4b4567dbf12f';

const InviteTemplate = (props) => {
	const {
		eventTitle1 = 'Walimatulurus',
		eventTitle2 = 'Izzul Syazwan\n&\nNurul Syafiqah',
		eventLocation = 'Crystall Hall, Level 4, Plaza Alam Sentral,\nShah Alam, Selangor',
		guestName = null,
		eventDate = '2022-10-15',
		dashboardImage = defaultImage,
		hosts = [
			'Mohd Rizal bin Johari & Zubaidah binti Mohd Isa',
			'Othman bin Abdul Rahman & Nik Mahhasni Bt Jaffar',
		],
		startTime = '2022-09-18 12:30',
		endTime = '2022-09-18 15:00',
		malay = false,
		content,
	} = props;

	if (malay) {
		moment.locale('ms-my', {
			// Specify the callback function for
			// customizing the values
			meridiem: function (hour, minute, isLowercase) {
				if (hour >= 12) return isLowercase ? 'p.m.' : 'P.M.';
				else return isLowercase ? 'a.m.' : 'A.M.';
			},
		});
	} else {
		moment.locale('en-ca');
	}

	//Convert text string to render the title due to the \n
	const updatedEventTitle2 = eventTitle2.split('\n').map((line, index) => (
		<>
			{line}
			<br />
		</>
	));

	const formattedDate = moment(eventDate).format('dddd, Do MMMM YYYY');

	return (
		<div className='invite-canvas'>
			<div className='invite-card'>
				{/********* TOP CARD SECTION *****/}
				<div className='invite-card-top'>
					<div className='event-title-1'>{eventTitle1}</div>
					<div className='header-image'>
						<img src={dashboardImage}></img>
					</div>
				</div>
				{/********* MIDDLE CARD SECTION *****/}
				<div className='invite-card-middle'>
					<div className='guest-name'>{guestName}</div>
					<div className='invite-text'>
						{malay ? 'Undangan kami seikhlas hati ke' : 'You are cordially invited to the'}
					</div>
					<div className='event-title-1-b'>{eventTitle1}</div>
					<div className='event-title-2'>{updatedEventTitle2}</div>
					<div className='event-information'>
						<div className='event-date'>{formattedDate}</div>
						<div className='event-time'>
							{moment(startTime).format('h:mm A')} - {moment(endTime).format('h:mm A')}
						</div>
						<div className='event-location'>
							<div>{eventLocation}</div>
						</div>
					</div>
				</div>
				{/********** Hosted By Section *******/}
				<div className='invite-card-hosted-by'>
					<div className='hosted-by'>{malay ? 'Oleh:' : 'Hosted By:'}</div>
					{hosts?.map((host, index) => (
						<div className='host' key={index}>
							{host}
						</div>
					))}
				</div>
				{content}
			</div>
		</div>
	);
};

export const MainRSVP = ({ state, dispatch, postGuestResponse }) => {
	const { guestDetails, itinerary, time, rsvp_details } = state;
	const {
		event_title_1,
		event_title_2,
		rsvp_header_image,
		event_date,
		eventInfo,
		event_address,
		enable_bahasa,
		enable_gift_registry,
		enable_money_gift,
	} = rsvp_details;

	const [hosts, setHosts] = useState([]);
	const [weddingTitle, setWeddingTitle] = useState('');
	const [goingModal, setGoingModal] = useState(false);
	const [notGoingModal, setNotGoingModal] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
		getHosts();
		checkWeddingTitle();
	}, []);

	function goToGiftPage() {
		dispatch({ type: 'GIFT_PAGE' });
	}

	function goToMoneyPage() {
		dispatch({ type: 'MONEY_PAGE' });
	}

	function getHosts() {
		let tempHosts = [];
		if (eventInfo?.groomFather && !eventInfo?.groomMother) {
			tempHosts.push(eventInfo?.groomFather);
		} else if (!eventInfo?.groomFather && eventInfo?.groomMother) {
			tempHosts.push(eventInfo?.groomMother);
		} else if (eventInfo?.groomFather && eventInfo?.groomMother) {
			tempHosts.push(`${eventInfo?.groomFather} & ${eventInfo?.groomMother}`);
		}

		if (eventInfo?.brideFather && !eventInfo?.brideMother) {
			tempHosts.push(eventInfo?.brideFather);
		} else if (!eventInfo?.brideFather && eventInfo?.brideMother) {
			tempHosts.push(eventInfo?.brideMother);
		} else if (eventInfo?.brideFather && eventInfo?.brideMother) {
			tempHosts.push(`${eventInfo?.brideFather} & ${eventInfo?.brideMother}`);
		}

		setHosts(tempHosts);
	}

	function checkWeddingTitle() {
		if (event_title_2) {
			setWeddingTitle(event_title_2);
		} else {
			if (rsvp_details?.bride_name && rsvp_details?.groom_name) {
				setWeddingTitle(`${rsvp_details.bride_name} & ${rsvp_details.groom_name}`);
			}
		}
	}

	return (
		<InviteTemplate
			malay={enable_bahasa}
			eventTitle1={event_title_1}
			eventTitle2={weddingTitle}
			dashboardImage={rsvp_header_image}
			eventDate={event_date}
			startTime={time.start}
			endTime={time.end}
			eventLocation={event_address}
			hosts={hosts}
			guestName={guestDetails?.name ? guestDetails?.name : null}
			content={
				<div className='rsvp-main'>
					{/*************************** ACTION AREA ****************/}
					<div className='buttons-area'>
						<div className='rsvp-buttons'>
							{guestDetails?.rsvp === 'attending' ? (
								<>
									<button
										className='default-button before-button'
										onClick={() => setGoingModal(true)}>
										<GoingIcon /> {enable_bahasa ? 'Saya Hadir' : 'I am Going'}
									</button>
									<button className='default-button' onClick={() => setNotGoingModal(true)}>
										{enable_bahasa ? 'Tidak Hadir' : 'NOT Going'}
									</button>
								</>
							) : guestDetails?.rsvp === 'notattending' ? (
								<>
									<button className='default-button' onClick={() => setGoingModal(true)}>
										{enable_bahasa ? 'Hadir' : 'Going'}
									</button>
									<button
										className='default-button before-button'
										onClick={() => setNotGoingModal(true)}>
										<NotGoingIcon /> {enable_bahasa ? 'Saya Tidak Hadir' : 'I am NOT Going'}
									</button>
								</>
							) : (
								<>
									<button
										className='default-button before-button'
										onClick={() => setGoingModal(true)}>
										<GoingIcon />
										{enable_bahasa ? 'Hadir' : 'Going'}
									</button>
									<button
										className='default-button before-button'
										onClick={() => setNotGoingModal(true)}>
										<NotGoingIcon /> {enable_bahasa ? 'Tidak Hadir' : 'Not Going'}
									</button>
								</>
							)}
						</div>
						<div className='rsvp-buttons'>
							{enable_gift_registry ? (
								<button className='default-button gift-button' onClick={() => goToGiftPage()}>
									<NewGiftIcon /> {enable_bahasa ? 'Bawa Hadiah' : 'Reserve Gift'}
								</button>
							) : (
								<></>
							)}
							{enable_money_gift ? (
								<button className='default-button gift-button' onClick={() => goToMoneyPage()}>
									<MoneyIcon /> {enable_bahasa ? 'Salam Kaut' : 'Money Gift'}
								</button>
							) : (
								<></>
							)}
						</div>
					</div>

					<div className='wedding-more-details'>
						<DetailsAccordian
							itinerary={itinerary}
							guestDetails={guestDetails}
							time={time}
							rsvp_details={rsvp_details}
						/>
					</div>

					<GoingModal
						state={state}
						dispatch={dispatch}
						goingModal={goingModal}
						setGoingModal={setGoingModal}
						postGuestResponse={postGuestResponse}
					/>
					<NotGoingModal
						state={state}
						dispatch={dispatch}
						notGoingModal={notGoingModal}
						setNotGoingModal={setNotGoingModal}
						postGuestResponse={postGuestResponse}
					/>
				</div>
			}></InviteTemplate>
	);
};

export const ThankYouPage = ({ state, dispatch }) => {
	const { going, guestInput, time, guestDetails, rsvp_details } = state;
	const { rsvp_header_image, event_date, enable_bahasa, enable_gift_registry, enable_money_gift } =
		rsvp_details;

	function goToGiftPage() {
		dispatch({ type: 'GIFT_PAGE' });
	}

	function goToMoneyPage() {
		dispatch({ type: 'MONEY_PAGE' });
	}

	const goHomeFunc = () => {
		dispatch({ type: 'RESET_THE_CLOCK' });
		dispatch({ type: 'PREVIOUS_PAGE' });
		dispatch({ type: 'RESET_SUBMIT' });
	};

	return (
		<div className='rsvp-thankyou'>
			<Container maxWidth='xs' style={{ height: '100%' }}>
				<div
					style={{
						display: 'flex',
						flexDirection: 'column',
						justifyContent: 'space-between',
						height: '100%',
					}}>
					<div>
						{guestInput ? (
							<div className='top-section'>
								{enable_bahasa ? 'Terima Kasih,' : 'Thank you,'} <br />{' '}
								<div style={{ fontSize: '24px' }}>{guestInput?.name}</div>
							</div>
						) : (
							<div className='top-section'>
								{enable_bahasa ? 'Terima Kasih,' : 'Thank you,'} <br />{' '}
								<div style={{ fontSize: '24px' }}>
									{guestDetails?.name ? guestDetails?.name : null}
								</div>
							</div>
						)}

						{going ? (
							<div className='top-detail'>
								{enable_bahasa ? (
									'Kami menanti kehadiran anda!'
								) : (
									<>
										You are Coming to Our <br />
										Special Day!
									</>
								)}
							</div>
						) : (
							<div className='top-detail'>
								{enable_bahasa ? (
									'Kami telah menerima respon anda'
								) : (
									<>
										Your Response Has Kindly
										<br />
										Been Submitted!
									</>
								)}
							</div>
						)}
						<div className='background-image'>
							<div
								className='image'
								style={
									rsvp_header_image ? { backgroundImage: `url(${rsvp_header_image})` } : {}
								}></div>
						</div>
						{going && (
							<div className='rsvp-detail'>{moment(event_date).format('dddd, Do MMMM YYYY')}</div>
						)}
					</div>
					<div>
						{going && (
							<div className='add-calendar'>
								<AddToCalendar time={time} rsvp_details={rsvp_details} />
							</div>
						)}
						{enable_gift_registry ? (
							<button className='send-gift-button' onClick={() => goToGiftPage()}>
								<NewGiftIcon /> {enable_bahasa ? 'Bawa Hadiah' : 'Reserve Gift'}
							</button>
						) : (
							<></>
						)}
						{enable_money_gift ? (
							<button className='send-gift-button' onClick={() => goToMoneyPage()}>
								<MoneyIcon /> {enable_bahasa ? 'Salam Kaut' : 'Money Gift'}
							</button>
						) : (
							<></>
						)}
						<div className='home-button'>
							<div className='button' onClick={() => goHomeFunc()}>
								{enable_bahasa ? 'Halaman Utama' : 'Home'}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

/////////////////////////////Start: GIFT REGISTRY
export const GiftPage = ({ state, dispatch, guestReserveFunc }) => {
	const { giftPage } = state;

	return (
		<>
			{giftPage === 0 ? (
				<GiftRegistry state={state} dispatch={dispatch} />
			) : (
				<ReserveGift state={state} dispatch={dispatch} guestReserveFunc={guestReserveFunc} />
			)}
		</>
	);
};

export const GiftRegistry = ({ state, dispatch }) => {
	const { gifts, guestDetails, rsvp_details } = state;
	const { enable_bahasa } = rsvp_details;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function goHomePage() {
		dispatch({ type: 'GO_HOME_PAGE' });
	}

	const reserveGift = (gift) => {
		if (gift?.reserved === guestDetails?.id || !gift.reserved) {
			dispatch({ type: 'INIT_GIFT_RESERVE', payload: gift });
			dispatch({ type: 'RESERVE_GIFT_PAGE' });
		}
	};

	const reserveStatus = (gift) => {
		if (gift?.reserved && gift?.reserved !== guestDetails?.id) {
			return '1 out of 1 reserved';
		} else if (gift?.reserved && gift?.reserved === guestDetails?.id) {
			return (
				<>
					<TickIcon fillColor={'#98A2B3'} /> Reserved by you
				</>
			);
		} else {
			return '0 out of 1 reserved';
		}
	};

	const GiftCard = ({ gift }) => (
		<div
			className='gift-card'
			onClick={() => reserveGift(gift)}
			style={gift.reserved ? { opacity: 0.5 } : { opacity: 1 }}>
			<div
				className='gift-image'
				style={{ backgroundImage: `url(${gift?.imageUrl})`, backgroundSize: 'cover' }}></div>
			<div className='gift-category'>{gift?.category}</div>
			<div className='gift-name'>{gift?.name}</div>
			<div className='gift-reserved'>{reserveStatus(gift)}</div>
		</div>
	);

	return (
		<div className='gift-registry'>
			<div className='top-section'>
				<div style={{ cursor: 'pointer' }} onClick={() => goHomePage()}>
					<BackIcon />
				</div>
				<div className='title'>{enable_bahasa ? 'SENARAI HADIAH' : 'GIFT REGISTRY'}</div>
				<div className='description'>
					{enable_bahasa ? (
						<p>Hadiah-hadiah yang tersenarai hanya sekadar panduan:</p>
					) : (
						<p>
							For friends and family who have been asking for gift ideas, this is a guidance
							registry:
						</p>
					)}
				</div>
			</div>

			<Container className='gift-list' maxWidth='md' disableGutters style={{ height: '100%' }}>
				{gifts?.map((gift) => (
					<GiftCard gift={gift} key={gift.id} />
				))}
			</Container>
		</div>
	);
};

export const ReserveGift = ({ state, dispatch, guestReserveFunc }) => {
	const { giftReserve, guestInput, guestDetails, rsvp_details } = state;
	const { enable_bahasa } = rsvp_details;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function goBackPage() {
		dispatch({ type: 'REGISTRY_GIFT_PAGE' });
	}

	function submitReserve() {
		dispatch({ type: 'SET_CONFIRM_MODAL', payload: true });
	}

	function submitCancel() {
		dispatch({ type: 'SET_CANCEL_MODAL', payload: true });
	}

	return (
		<div className='gift-reserve'>
			<div className='top-section'>
				<div style={{ cursor: 'pointer' }} onClick={() => goBackPage()}>
					<BackIcon />
				</div>
				{giftReserve?.reserved && giftReserve?.reserved === guestDetails?.id ? (
					<div className='title'>
						{enable_bahasa ? 'ANDA TELAH MENYIMPAN HADIAH INI' : 'YOU RESERVED THIS GIFT'}
					</div>
				) : (
					<div className='title'>{enable_bahasa ? 'SIMPAN HADIAH' : 'RESERVE GIFT'} </div>
				)}
				<>
					<div className='description'>
						{enable_bahasa
							? 'Anda boleh membeli jenama atau harga lain dari yang dinyatakan.'
							: 'Please note that you don’t have to buy the exact price and brand.'}
					</div>
				</>
			</div>
			<div className='content-section'>
				<div className='gift-card'>
					<div
						className='gift-image'
						style={{
							backgroundImage: `url(${giftReserve?.imageUrl})`,
							backgroundSize: 'cover',
						}}></div>
					<div className='gift-name'>{giftReserve?.name}</div>
					<div className='gift-reserved'>
						{giftReserve?.reserved ? '1 out of 1 reserved' : '0 out of 1 reserved'}
					</div>
				</div>
				<div className='buttons'>
					{giftReserve?.reserved && giftReserve?.reserved === guestDetails?.id ? (
						<div className='cancel-button' onClick={() => submitCancel()}>
							{enable_bahasa ? 'Batal' : 'Cancel Reservation'}
						</div>
					) : (
						<div className='reserve-button' onClick={() => submitReserve()}>
							{enable_bahasa ? 'Simpan' : 'Reserve'}
						</div>
					)}

					{giftReserve.link ? (
						<a
							href={giftReserve.link}
							target='_blank'
							rel='noreferrer'
							className='view-shop-button'>
							{enable_bahasa ? 'Lihat Kedai' : 'View Shop'}
						</a>
					) : (
						<></>
					)}
				</div>
			</div>
			{guestInput || guestDetails ? (
				<ConfirmModal state={state} dispatch={dispatch} guestReserveFunc={guestReserveFunc} />
			) : (
				<PreRSVPModal state={state} dispatch={dispatch} />
			)}
			<CancelModal state={state} dispatch={dispatch} guestReserveFunc={guestReserveFunc} />
			<ThankYouModal state={state} dispatch={dispatch} />
			<SorryModal state={state} dispatch={dispatch} />
		</div>
	);
};

////////////////////////////Start: MONEY REGISTRY
export const MoneyPage = ({ state, dispatch }) => {
	const { rsvp_details } = state;
	const { money_gift_details } = rsvp_details;
	const [openModal, setOpenModal] = useState(false);
	const { enable_bahasa } = rsvp_details;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function goHomePage() {
		dispatch({ type: 'GO_HOME_PAGE' });
	}

	const openModalFunc = () => {
		setOpenModal(true);
	};

	const closeModal = () => {
		setOpenModal(false);
	};

	return (
		<div className='money-gift'>
			<div className='top-section'>
				<div style={{ cursor: 'pointer' }} onClick={() => goHomePage()}>
					<BackIcon />
				</div>
				<div className='title'>{enable_bahasa ? 'KIRIM SALAM KAUT' : 'SEND MONEY GIFT'}</div>
				<div className='rsvp-money-detail'>
					<div className='rsvp-money-name'>
						<div className='money-title'>Name:</div>
						<div className='money-value'>{money_gift_details?.name}</div>
					</div>
					<div className='rsvp-money-name'>
						<div className='money-title'>Bank:</div>
						<div className='money-value'>{money_gift_details?.bankName}</div>
					</div>
					<div className='rsvp-money-name account-no'>
						<div className='money-title'>Account No:</div>
						<div className='money-value'>{money_gift_details?.accountNum}</div>
					</div>
					{money_gift_details?.qrCodeUrl ? (
						<div className='qr-code' onClick={() => openModalFunc()}>
							<QRCode />
							View QR Code
						</div>
					) : null}
				</div>
			</div>
			<QrCodeModal state={state} openState={openModal} closeFunc={closeModal} />
		</div>
	);
};

export const Footer = () => {
	return (
		<footer>
			<div
				style={{
					textAlign: 'center',
					padding: '16px',
					color: 'white',
					display: 'flex',
					flexDirection: 'column',
					gap: '5px',
					fontFamily: 'Lora',
					fontSize: '15px',
					background: '#1E1E1E',
				}}>
				<div>
					© 2022{' '}
					<a
						style={{ color: 'white', textDecoration: 'none' }}
						target='_blank'
						rel='noreferrer'
						href='https://majlisku.com'>
						Majlisku.com
					</a>
				</div>

				<div>
					by{' '}
					<a
						style={{ color: 'white', textDecoration: 'underline' }}
						href='https://www.instagram.com/izzul_023/'>
						Izzul Syahmi
					</a>{' '}
					&{' '}
					<a
						style={{ color: 'white', textDecoration: 'underline' }}
						href='https://twitter.com/theizzulsyazwan'>
						Izzul Syazwan
					</a>{' '}
				</div>
				<div style={{ fontSize: '0.8rem', marginTop: 10, opacity: 0.9 }}>
					Create Digital Invite for FREE with{' '}
					<a
						style={{ color: 'white', textDecoration: 'underline' }}
						target='_blank'
						rel='noreferrer'
						href='https://majlisku.com'>
						Majlisku.com
					</a>
				</div>
			</div>
		</footer>
	);
};
