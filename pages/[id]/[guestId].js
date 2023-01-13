/** @format */

import React, { useEffect, useState, useReducer } from 'react';
import Head from 'next/head';
//Components import
import { DetailsAccordian, AddToCalendar } from '../../components/accordian';
import CardLoadingState from '../../components/cardLoadingState';
import WholePageLoadingState from '../../components/wholePageLoadingState';
//MUI import
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
//Libraries
import axios from 'axios';
import moment from 'moment';
import 'moment/locale/ms-my';
import 'moment/locale/en-ca';
//Icons
import {
	GiftIcon,
	BackIcon,
	TickIcon,
	NewGiftIcon,
	GoingIcon,
	NotGoingIcon,
	WishIcon,
	WishIcon2,
	CloseIcon,
	MoneyIcon,
	QRCode,
} from '../../components/icons';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

let initialStates = {
	userData: null,
	itinerary: null,
	weddingDetails: {},
	guestDetails: null,
	time: { start: '12:00', end: '15:00' },
	page: 0,
	giftPage: 0,
	loading: false,
	loading_gift: false,
	submitted: false,
	resetTheClock: false,
	going: null,
	gifts: null,
	giftReserve: null,
	confirmModal: false,
	cancelModal: false,
	thakyouModal: false,
	sorryModal: false,
};

const rsvpReducer = (state, action) => {
	switch (action.type) {
		case 'SET_CONFIRM_MODAL':
			return { ...state, confirmModal: action.payload };
		case 'SET_CANCEL_MODAL':
			return { ...state, cancelModal: action.payload };
		case 'SET_THANK_YOU_MODAL':
			return { ...state, thakyouModal: action.payload };
		case 'SET_SORRY_MODAL':
			return { ...state, sorryModal: action.payload };
		case 'INIT_USER_DATA':
			return { ...state, userData: action.payload };
		case 'INIT_ITINERARY':
			return { ...state, itinerary: action.payload };
		case 'INIT_WEDDING_DETAILS':
			return { ...state, weddingDetails: action.payload };
		case 'INIT_GUEST_DETAILS':
			return { ...state, guestDetails: action.payload };
		case 'INIT_GIFT_RESERVE':
			return { ...state, giftReserve: action.payload };
		case 'GET_GIFTS':
			return { ...state, gifts: action.payload };
		case 'RESET_SUBMIT':
			return { ...state, submitted: false };
		case 'UPDATE_GOING':
			return { ...state, going: action.payload };
		case 'GUEST_SUBMIT':
			return { ...state, submitted: true };
		case 'GO_HOME_PAGE':
			return { ...state, page: 0 };
		case 'MONEY_PAGE':
			return { ...state, page: 3 };
		case 'NEXT_PAGE':
			return { ...state, page: state.page + 1 };
		case 'GIFT_PAGE':
			return { ...state, page: 2 };
		case 'RESERVE_GIFT_PAGE':
			return { ...state, giftPage: 1 };
		case 'REGISTRY_GIFT_PAGE':
			return { ...state, giftPage: 0 };
		case 'PREVIOUS_PAGE':
			return { ...state, page: state.page - 1 };
		case 'LOADING':
			return { ...state, loading: action.payload };
		case 'LOADING_GIFT':
			return { ...state, loading_gift: action.payload };
		case 'RESET_THE_CLOCK':
			return { ...state, resetTheClock: !state.resetTheClock };
		case 'INIT_TIME_SLOT':
			return { ...state, time: action.payload };
	}
};

function Rsvp({ title, imageUrl, description, userId, guestId, userInfo }) {
	const [state, dispatch] = useReducer(rsvpReducer, initialStates);
	const { userData, guestDetails, resetTheClock } = state;

	useEffect(() => {
		getThemAll();
	}, [resetTheClock]);

	function getThemAll() {
		dispatch({ type: 'INIT_USER_DATA', payload: userInfo });
		dispatch({ type: 'INIT_WEDDING_DETAILS', payload: userInfo.rsvpDetails });
		getGuestInfo(userInfo.id);
		getGiftList(userInfo.id);
		getItineraryList(userInfo.id);

		//Init time
		dispatch({
			type: 'INIT_TIME_SLOT',
			payload: {
				start: userInfo.rsvpDetails.timeSlot.start,
				end: userInfo.rsvpDetails.timeSlot.end,
			},
		});
	}

	function getGuestInfo(userID) {
		axios
			.get(`${API}/getguestlist/${userID}/${guestId}`)
			.then((res) => {
				let guestInfo = res.data[0];
				// console.log('guestInfo:', guestInfo);
				dispatch({ type: 'INIT_GUEST_DETAILS', payload: guestInfo });
			})
			.catch((err) => {
				console.log('timeout!');
				console.log(err.message);
			});
	}

	function getGiftList(userID) {
		axios.get(`${API}/getgifts/${userID}`).then((res) => {
			let giftlist = res.data;
			// console.log('giftlist:', giftlist);
			dispatch({ type: 'GET_GIFTS', payload: giftlist });
		});
	}

	function postGuestResponse(body, postReqFunc) {
		dispatch({ type: 'LOADING', payload: true });
		axios
			.post(`${API}/guestresponse/${state.userData.id}/${state.guestDetails.id}`, body)
			.then((res) => {
				dispatch({ type: 'LOADING', payload: false });
				dispatch({ type: 'GUEST_SUBMIT' });
				postReqFunc();
			});
	}

	function guestReserveFunc(body, reserved) {
		dispatch({ type: 'LOADING_GIFT', payload: true });
		axios
			.post(`${API}/updategift/${state.userData.id}/${state.giftReserve.id}`, body)
			.then((res) => {
				dispatch({ type: 'LOADING_GIFT', payload: false });
				if (reserved) {
					dispatch({ type: 'SET_CONFIRM_MODAL', payload: false });
					dispatch({ type: 'SET_THANK_YOU_MODAL', payload: true });
				} else {
					dispatch({ type: 'SET_CANCEL_MODAL', payload: false });
					dispatch({ type: 'SET_SORRY_MODAL', payload: true });
				}

				dispatch({ type: 'RESET_THE_CLOCK' });
			});
	}

	function getItineraryList(userID) {
		axios.get(`${API}/getitinerary/${userID}`).then((res) => {
			let itineraryList = res.data;
			// console.log('itineraryList:', itineraryList);
			dispatch({ type: 'INIT_ITINERARY', payload: itineraryList });
		});
	}

	return (
		<div>
			<Head>
				<title>{title}</title>
				<meta name='description' content={description}></meta>
				<meta property='og:title' content={title}></meta>
				<meta property='og:description' content={description}></meta>
				<meta property='og:image' content={imageUrl}></meta>
			</Head>
			<main>
				<Container maxWidth='md'>
					{userData && guestDetails ? (
						<>
							{state.page === 0 ? (
								<MainRSVP state={state} dispatch={dispatch} postGuestResponse={postGuestResponse} />
							) : state.page === 1 ? (
								<GuestPage
									state={state}
									dispatch={dispatch}
									postGuestResponse={postGuestResponse}
								/>
							) : state.page === 2 ? (
								<GiftPage state={state} dispatch={dispatch} guestReserveFunc={guestReserveFunc} />
							) : (
								<MoneyPage state={state} dispatch={dispatch} />
							)}
						</>
					) : (
						<WholePageLoadingState height_vh='80vh' />
					)}
				</Container>
			</main>
			<Footer />
		</div>
	);
}

const MainRSVP = ({ state, dispatch, postGuestResponse }) => {
	const { userData, guestDetails, weddingDetails, itinerary, time, gifts } = state;
	const { eventInfo, rsvpImage } = weddingDetails;
	const [goingModal, setGoingModal] = useState(false);
	const [notGoingModal, setNotGoingModal] = useState(false);

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function nextPage() {
		dispatch({ type: 'NEXT_PAGE' });
	}

	function goToGiftPage() {
		dispatch({ type: 'GIFT_PAGE' });
	}

	function goToMoneyPage() {
		dispatch({ type: 'MONEY_PAGE' });
	}

	const displayGroomParents = () => {
		if (eventInfo?.groomFather && !eventInfo?.groomMother) {
			return (
				<div className='parent'>
					<div>{eventInfo?.groomFather}</div>
				</div>
			);
		} else if (!eventInfo?.groomFather && eventInfo?.groomMother) {
			return (
				<div className='parent'>
					<div>{eventInfo?.groomMother}</div>
				</div>
			);
		} else {
			return (
				<div className='parent'>
					<div>{eventInfo?.groomFather}</div>& <div>{eventInfo?.groomMother}</div>
				</div>
			);
		}
	};

	const displayBrideParents = () => {
		if (eventInfo?.brideFather && !eventInfo?.brideMother) {
			return (
				<div className='parent'>
					<div>{eventInfo?.brideFather}</div>
				</div>
			);
		} else if (!eventInfo?.brideFather && eventInfo?.brideMother) {
			return (
				<div className='parent'>
					<div>{eventInfo?.brideMother}</div>
				</div>
			);
		} else {
			return (
				<div className='parent'>
					<div>{eventInfo?.brideFather}</div>& <div>{eventInfo?.brideMother}</div>
				</div>
			);
		}
	};

	if (weddingDetails?.bahasa) {
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

	return (
		<div className='rsvp-main'>
			<div className='main-desc'>
				<div className='invite-text'>
					<div style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 400 }}>
						{guestDetails?.name},
					</div>{' '}
					{weddingDetails?.bahasa
						? 'Undangan kami seikhlas hati, harap sudi datang menyeri ke'
						: 'You are cordially invited to the'}
				</div>
				<div className='walimatul-text'>{eventInfo?.eventName}</div>
				<div className='background-image'>
					<div
						className='image'
						style={rsvpImage ? { backgroundImage: `url(${rsvpImage})` } : {}}></div>
				</div>
				{userData ? (
					<div className='bride-groom'>
						<div>{userData?.brideName}</div>
						<div>&</div>
						<div>{userData?.groomName}</div>
					</div>
				) : (
					<div className='bride-groom'></div>
				)}
				<div className='wedding-date'>
					<div>{moment(userData?.weddingDate).format('dddd, Do MMMM YYYY')}</div>
					{time ? (
						<div style={{ marginTop: '8px' }}>
							{moment(time.start).format('h:mm A')} - {moment(time.end).format('h:mm A')}
						</div>
					) : (
						<div style={{ marginTop: '8px' }}>11:00AM - 1:30PM</div>
					)}
				</div>
				<div className='wedding-detail'>
					<div className='wedding-detail-text'>
						<p>{eventInfo?.description}</p>
					</div>
				</div>
				{eventInfo?.groomFather ||
				eventInfo?.groomMother ||
				eventInfo?.brideFather ||
				eventInfo?.brideMother ? (
					<div className='hosted-by'>
						<div className='top-text'>{weddingDetails?.bahasa ? 'Oleh:' : 'Hosted By:'}</div>
						{eventInfo.groomFather || eventInfo.groomMother ? displayGroomParents() : <></>}
						{eventInfo.brideFather || eventInfo.brideMother ? displayBrideParents() : <></>}
					</div>
				) : (
					<></>
				)}
			</div>

			{/* <div className='buttons-section'>
				<div className='rsvp-button' onClick={() => nextPage()}>
					{guestDetails.rsvp === 'attending'
						? `RSVP'D - I'M GOING`
						: guestDetails.rsvp === 'notattending'
						? `RSVP'D - I'M NOT GOING`
						: `RSVP`}
				</div>
				<div className='guest-button' onClick={() => goToGiftPage()}>
					SEND GIFT
				</div>
			</div> */}

			<div className='buttons-area'>
				<div className='rsvp-buttons'>
					{guestDetails?.rsvp === 'attending' ? (
						<>
							<button className='default-button before-button' onClick={() => setGoingModal(true)}>
								<GoingIcon /> {weddingDetails?.bahasa ? 'Saya Hadir' : 'I am going'}
							</button>
							<button className='default-button' onClick={() => setNotGoingModal(true)}>
								{weddingDetails?.bahasa ? 'Tidak Hadir' : 'Not Going'}
							</button>
						</>
					) : guestDetails?.rsvp === 'notattending' ? (
						<>
							<button className='default-button' onClick={() => setGoingModal(true)}>
								{weddingDetails?.bahasa ? 'Hadir' : 'Going'}
							</button>
							<button
								className='default-button before-button'
								onClick={() => setNotGoingModal(true)}>
								<NotGoingIcon /> {weddingDetails?.bahasa ? 'Saya Tidak Hadir' : 'I am Not Going'}
							</button>
						</>
					) : (
						<>
							<button className='default-button before-button' onClick={() => setGoingModal(true)}>
								{weddingDetails?.bahasa ? 'Hadir' : 'Going'}
							</button>
							<button
								className='default-button before-button'
								onClick={() => setNotGoingModal(true)}>
								{weddingDetails?.bahasa ? 'Tidak Hadir' : 'Not Going'}
							</button>
						</>
					)}
				</div>
				<div className='rsvp-buttons'>
					{weddingDetails?.giftRegistryEnable ? (
						<button className='default-button gift-button' onClick={() => goToGiftPage()}>
							<NewGiftIcon /> {weddingDetails?.bahasa ? 'Bawa Hadiah' : 'Reserve Gift'}
						</button>
					) : (
						<></>
					)}
					{weddingDetails?.moneyGiftEnable ? (
						<button className='default-button gift-button' onClick={() => goToMoneyPage()}>
							<MoneyIcon /> {weddingDetails?.bahasa ? 'Salam Kaut' : 'Money Gift'}
						</button>
					) : (
						<></>
					)}
				</div>
			</div>

			<div className='wedding-more-details'>
				<DetailsAccordian
					weddingDetails={weddingDetails}
					userData={userData}
					itinerary={itinerary}
					guestDetails={guestDetails}
					time={time}
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
	);
};

const GoingModal = ({ state, dispatch, goingModal, setGoingModal, postGuestResponse }) => {
	const { loading, guestDetails, weddingDetails } = state;
	const [rsvp, setRsvp] = useState('attending');
	const [pax, setPax] = useState(1);
	const [wish, setWish] = useState('');
	const [maxPax, setMaxPax] = useState(1);

	useEffect(() => {
		if (guestDetails?.response && guestDetails.rsvp !== 'invited' && guestDetails.rsvp !== '') {
			setWish(guestDetails?.response.wish);
			setPax(guestDetails?.response.pax);
		}

		if (weddingDetails?.maxPax) {
			if (guestDetails?.allocatedPax) setMaxPax(guestDetails?.allocatedPax);
			else setMaxPax(weddingDetails?.maxPax);
		}
	}, [guestDetails]);

	const closeModal = () => {
		setGoingModal(false);
	};

	const submitResponseFunc = () => {
		const guestRes = {
			rsvp: rsvp,
			pax: pax,
			wish: wish ? wish : '',
		};

		dispatch({ type: 'UPDATE_GOING', payload: rsvp === 'attending' ? true : false });
		postGuestResponse(guestRes, () => {
			closeModal();
			dispatch({ type: 'NEXT_PAGE' });
		});
	};

	return (
		<Dialog
			open={goingModal}
			TransitionComponent={Transition}
			PaperProps={{
				style: { borderRadius: 10, margin: '32px 12px' },
			}}
			keepMounted
			onClose={() => {
				closeModal();
			}}>
			<div className='goingModal-card' style={{ position: 'relative' }}>
				{/* <CardLoadingState loadingState={loading_gift} /> */}
				<div className='top-modal' style={{ padding: '8px 0px' }}>
					<div className='close-button-area'>
						<div className='close-button' onClick={() => closeModal()}>
							<CloseIcon />
						</div>
					</div>
					<WishIcon width='60px' height='60px' />
					<div className='text-top'>
						{weddingDetails?.bahasa
							? 'KAMI SEDIA MENANTI KETIBAAN ANDA DI SANA'
							: 'WE ARE LOOKING FORWARD TO SEEING YOU THERE!'}
						{', '}
						{guestDetails.name}!
					</div>
				</div>
				<div className='modal-content'>
					<div className='pax-input'>
						<div className='name'>
							{weddingDetails?.bahasa ? 'BILANGAN KEHADIRAN' : 'TOTAL PAX'}{' '}
							{weddingDetails?.unlimitedPax ? '' : `MAX ${maxPax}`}*
						</div>
						<div className='pax-buttons'>
							<div
								className='minus'
								onClick={() => {
									pax > 1 && setPax((prev) => prev - 1);
								}}>
								-
							</div>
							<div className='pax-value'>{pax}</div>
							<div
								className='plus'
								onClick={() => {
									if (weddingDetails?.unlimitedPax) {
										setPax((prev) => prev + 1);
									} else {
										if (pax < maxPax) setPax((prev) => prev + 1);
									}
								}}>
								+
							</div>
						</div>
					</div>
					<div className='wish-input'>
						<div className='name'>{weddingDetails?.bahasa ? 'UCAPAN' : 'YOUR WISH'}</div>
						<textarea
							value={wish}
							onChange={(e) => setWish(e.target.value)}
							placeholder='ENTER WISH'></textarea>
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='cancel-button' onClick={() => closeModal()}>
						{weddingDetails?.bahasa ? 'BATAL' : 'CANCEL'}
					</div>
					<div className='confirm-button' onClick={() => submitResponseFunc()}>
						<CardLoadingState loadingState={loading} />
						{weddingDetails?.bahasa ? 'SETUJU' : 'CONFIRM'}
					</div>
				</div>
			</div>
		</Dialog>
	);
};

const NotGoingModal = ({ state, dispatch, notGoingModal, setNotGoingModal, postGuestResponse }) => {
	const { loading, guestDetails, weddingDetails } = state;
	const [rsvp, setRsvp] = useState('notattending');
	const [pax, setPax] = useState(1);
	const [wish, setWish] = useState('');
	const [maxPax, setMaxPax] = useState(1);

	useEffect(() => {
		if (guestDetails?.response && guestDetails.rsvp !== 'invited' && guestDetails.rsvp !== '') {
			setWish(guestDetails?.response.wish);
		}

		if (weddingDetails?.maxPax) {
			if (guestDetails?.allocatedPax) setMaxPax(guestDetails?.allocatedPax);
			else setMaxPax(weddingDetails?.maxPax);
		}
	}, [guestDetails]);

	const closeModal = () => {
		setNotGoingModal(false);
	};

	const submitResponseFunc = () => {
		const guestRes = {
			rsvp: rsvp,
			pax: pax,
			wish: wish ? wish : '',
		};

		dispatch({ type: 'UPDATE_GOING', payload: rsvp === 'attending' ? true : false });
		postGuestResponse(guestRes, () => {
			closeModal();
			dispatch({ type: 'NEXT_PAGE' });
		});
	};

	return (
		<Dialog
			open={notGoingModal}
			TransitionComponent={Transition}
			PaperProps={{
				style: { borderRadius: 10, margin: '32px 12px' },
			}}
			keepMounted
			onClose={() => {
				closeModal();
			}}>
			<div className='goingModal-card' style={{ position: 'relative' }}>
				{/* <CardLoadingState loadingState={loading_gift} /> */}
				<div className='top-modal' style={{ padding: '8px 0px' }}>
					<div className='close-button-area'>
						<div className='close-button' onClick={() => closeModal()}>
							<CloseIcon />
						</div>
					</div>
					<WishIcon2 width='60px' height='60px' />
					<div className='text-top'>
						{weddingDetails?.bahasa
							? 'KAMI MEMOHON MAAF ATAS KESULITAN, TERIMA KASIH KERANA MEMBALAS'
							: 'WE ARE SORRY TO HEAR THAT BUT THANK YOU FOR THE THOUGHTFUL RESPONSE'}
					</div>
				</div>
				<div className='modal-content'>
					<div className='wish-input'>
						<div className='name'>{weddingDetails?.bahasa ? 'UCAPAN' : 'YOUR WISH'}</div>
						<textarea
							value={wish}
							onChange={(e) => setWish(e.target.value)}
							placeholder='ENTER WISH'></textarea>
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='cancel-button' onClick={() => closeModal()}>
						{weddingDetails?.bahasa ? 'BATAL' : 'CANCEL'}
					</div>
					<div className='confirm-button' onClick={() => submitResponseFunc()}>
						<CardLoadingState loadingState={loading} />
						{weddingDetails?.bahasa ? 'SETUJU' : 'CONFIRM'}
					</div>
				</div>
			</div>
		</Dialog>
	);
};

//////////////////////////////Start: GUEST RSVP
const GuestPage = ({ state, dispatch, postGuestResponse }) => {
	const { submitted } = state;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	return (
		<>
			{!submitted ? (
				<GuestRSVP state={state} dispatch={dispatch} postGuestResponse={postGuestResponse} />
			) : (
				<ThankYouPage state={state} dispatch={dispatch} />
			)}
		</>
	);
};

const GuestRSVP = ({ state, dispatch, postGuestResponse }) => {
	const { loading, guestDetails, weddingDetails } = state;
	const [fullName, setFullName] = useState('');
	const [phoneNumber, setPhoneNumber] = useState('');
	const [rsvp, setRsvp] = useState('');
	const [pax, setPax] = useState(1);
	const [wish, setWish] = useState('');
	const [maxPax, setMaxPax] = useState(1);

	useEffect(() => {
		if (guestDetails?.response && guestDetails.rsvp !== 'invited' && guestDetails.rsvp !== '') {
			setFullName(guestDetails?.response.fullName);
			setPhoneNumber(guestDetails?.response.phoneNumber);
			setRsvp(guestDetails?.rsvp);
			setWish(guestDetails?.response.wish);
			setPax(guestDetails?.response.pax);
		}

		if (weddingDetails?.maxPax) {
			if (guestDetails?.allocatedPax) setMaxPax(guestDetails?.allocatedPax);
			else setMaxPax(weddingDetails?.maxPax);
		}
	}, [guestDetails]);

	function prevStep() {
		dispatch({ type: 'PREVIOUS_PAGE' });
	}

	const submitChecked = () => {
		if (fullName !== '' && phoneNumber !== '' && rsvp !== '') {
			return true;
		} else {
			return false;
		}
	};

	const submitResponseFunc = () => {
		const guestRes = {
			fullName: fullName,
			phoneNumber: phoneNumber,
			rsvp: rsvp,
			pax: pax,
			wish: wish ? wish : '',
		};

		dispatch({ type: 'UPDATE_GOING', payload: rsvp === 'attending' ? true : false });
		postGuestResponse(guestRes);
	};

	return (
		<div className='rsvp-guest'>
			<div className='top-section'>
				<div style={{ cursor: 'pointer' }} onClick={() => prevStep()}>
					<BackIcon />
				</div>
				<div className='title'>Can You Make It?</div>
			</div>
			<div className='input-section'>
				{/* Full Name */}
				<div className='full-name'>
					<input
						value={fullName}
						onChange={(e) => setFullName(e.target.value)}
						placeholder='*FULL NAME'></input>
				</div>
				{/* Phone Number */}
				<div className='phone-number'>
					<input
						type='tel'
						value={phoneNumber}
						onChange={(e) => setPhoneNumber(e.target.value)}
						pattern='[0-9]{3}-[0-9]{2}-[0-9]{3}'
						placeholder='*PHONE NUMBER'></input>
				</div>
				{/* RSVP */}
				<div className='rsvp-input'>
					<div className='name'>RSVP</div>
					<div className='rsvp-buttons'>
						<div
							className={rsvp === 'attending' ? 'yes-button' : 'no-button'}
							onClick={() => setRsvp('attending')}>
							GOING
						</div>
						<div
							className={rsvp === 'notattending' ? 'yes-button' : 'no-button'}
							onClick={() => setRsvp('notattending')}>
							NOT GOING
						</div>
					</div>
				</div>
				{/* Pax */}
				{rsvp === 'attending' ? (
					<div className='pax-input'>
						<div className='name'>TOTAL PAX (MAX {maxPax})</div>
						<div className='pax-buttons'>
							<div
								className='minus'
								onClick={() => {
									pax > 1 && setPax((prev) => prev - 1);
								}}>
								-
							</div>
							<div className='pax-value'>{pax}</div>
							<div
								className='plus'
								onClick={() => {
									pax < maxPax && setPax((prev) => prev + 1);
								}}>
								+
							</div>
						</div>
					</div>
				) : (
					<div className='pax-input'></div>
				)}
				{/* WISH */}
				<div className='wish-input'>
					<div className='name'>WISH</div>
					<textarea
						value={wish}
						onChange={(e) => setWish(e.target.value)}
						placeholder='ENTER WISH'></textarea>
				</div>
			</div>
			<div className='submit-section'>
				<div
					className='submit-button'
					onClick={() => {
						if (submitChecked()) submitResponseFunc();
					}}
					style={submitChecked() ? { opacity: 1 } : { opacity: 0.2 }}>
					<CardLoadingState loadingState={loading} />
					SUBMIT
				</div>
			</div>
		</div>
	);
};

const ThankYouPage = ({ state, dispatch }) => {
	const { userData, going, guestDetails, time, weddingDetails } = state;
	const { rsvpImage } = weddingDetails;

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
						<div className='top-section'>
							{weddingDetails?.bahasa ? 'Terima Kasih,' : 'Thank you,'} <br />
							<div style={{ fontSize: '24px' }}>{guestDetails.name}</div>
						</div>
						{going ? (
							<div className='top-detail'>
								{weddingDetails?.bahasa ? (
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
								{weddingDetails?.bahasa ? (
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
								style={rsvpImage ? { backgroundImage: `url(${rsvpImage})` } : {}}></div>
						</div>
						{going && (
							<div className='rsvp-detail'>
								{moment(userData?.weddingDate).format('dddd, Do MMMM YYYY')}
							</div>
						)}
					</div>
					<div>
						{going && (
							<div className='add-calendar'>
								<AddToCalendar
									weddingDetails={userData.rsvpDetails}
									userData={userData}
									guestDetails={guestDetails}
									time={time}
								/>
							</div>
						)}
						{weddingDetails?.giftRegistryEnable ? (
							<button className='send-gift-button' onClick={() => goToGiftPage()}>
								<NewGiftIcon /> {weddingDetails?.bahasa ? 'Bawa Hadiah' : 'Reserve Gift'}
							</button>
						) : (
							<></>
						)}
						{weddingDetails?.moneyGiftEnable ? (
							<button className='send-gift-button' onClick={() => goToMoneyPage()}>
								<MoneyIcon /> {weddingDetails?.bahasa ? 'Salam Kaut' : 'Money Gift'}
							</button>
						) : (
							<></>
						)}
						<div className='home-button'>
							<div className='button' onClick={() => goHomeFunc()}>
								{weddingDetails?.bahasa ? 'Halaman Utama' : 'Home'}
							</div>
						</div>
					</div>
				</div>
			</Container>
		</div>
	);
};

/////////////////////////////Start: GIFT REGISTRY
const GiftPage = ({ state, dispatch, guestReserveFunc }) => {
	const { giftPage } = state;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

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

const GiftRegistry = ({ state, dispatch }) => {
	const { gifts, guestDetails, weddingDetails } = state;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function goHomePage() {
		dispatch({ type: 'GO_HOME_PAGE' });
	}

	const reserveGift = (gift) => {
		if (gift?.reserved === guestDetails.id || !gift.reserved) {
			dispatch({ type: 'INIT_GIFT_RESERVE', payload: gift });
			dispatch({ type: 'RESERVE_GIFT_PAGE' });
		}
	};

	const reserveStatus = (gift) => {
		if (gift?.reserved && gift?.reserved !== guestDetails.id) {
			return '1 out of 1 reserved';
		} else if (gift?.reserved === guestDetails.id) {
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
				<div className='title'>{weddingDetails?.bahasa ? 'SENARAI HADIAH' : 'GIFT REGISTRY'}</div>
				<div className='description'>
					{weddingDetails?.bahasa ? (
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

const ReserveGift = ({ state, dispatch, guestReserveFunc }) => {
	const { giftReserve, guestDetails, weddingDetails } = state;

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
				{giftReserve?.reserved === guestDetails.id ? (
					<div className='title'>
						{weddingDetails?.bahasa ? 'ANDA TELAH MENYIMPAN HADIAH INI' : 'YOU RESERVED THIS GIFT'}
					</div>
				) : (
					<>
						<div className='title'>
							{weddingDetails?.bahasa ? 'SIMPAN HADIAH' : 'RESERVE GIFT'}{' '}
						</div>
						<div className='description'>
							{weddingDetails?.bahasa
								? 'Anda boleh membeli jenama atau harga lain dari yang dinyatakan.'
								: 'Please note that you don’t have to buy the exact price and brand.'}
						</div>
					</>
				)}
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
				{/* <div className='input-section'>
					<div className='instruction'>Enter Email Address To Reserve</div>
					<input
						placeholder='guest@gmail.com'
						value={guestEmail}
						onChange={(e) => setGuestEmail(e.target.value)}></input>
				</div> */}
				<div className='buttons'>
					{giftReserve?.reserved === guestDetails.id ? (
						<div className='cancel-button' onClick={() => submitCancel()}>
							{weddingDetails?.bahasa ? 'Batal' : 'Cancel Reservation'}
						</div>
					) : (
						<div className='reserve-button' onClick={() => submitReserve()}>
							{weddingDetails?.bahasa ? 'Simpan' : 'Reserve'}
						</div>
					)}

					{giftReserve.link ? (
						<a
							href={giftReserve.link}
							target='_blank'
							rel='noreferrer'
							className='view-shop-button'>
							{weddingDetails?.bahasa ? 'Lihat Kedai' : 'View Shop'}
						</a>
					) : (
						<></>
					)}
				</div>
			</div>
			<ConfirmModal state={state} dispatch={dispatch} guestReserveFunc={guestReserveFunc} />
			<CancelModal state={state} dispatch={dispatch} guestReserveFunc={guestReserveFunc} />
			<ThankYouModal state={state} dispatch={dispatch} />
			<SorryModal state={state} dispatch={dispatch} />
		</div>
	);
};

const ConfirmModal = ({ state, dispatch, guestReserveFunc }) => {
	const { confirmModal, loading_gift, guestDetails, giftReserve, weddingDetails } = state;

	const closeModal = () => {
		dispatch({ type: 'SET_CONFIRM_MODAL', payload: false });
	};

	const confirmAction = () => {
		const body = {
			reserved: guestDetails.id,
			giftReserved: giftReserve?.name,
		};
		guestReserveFunc(body, true);
	};

	return (
		<Dialog
			open={confirmModal}
			TransitionComponent={Transition}
			PaperProps={{
				style: { borderRadius: 10, margin: '32px 12px' },
			}}
			keepMounted
			onClose={() => {
				closeModal();
			}}>
			<div className='giftModal' style={{ position: 'relative' }}>
				<CardLoadingState loadingState={loading_gift} />
				<div className='top-modal'>
					<GiftIcon />
					<div className='text-top'>
						{weddingDetails?.bahasa
							? 'Anda bersetuju untuk simpan hadiah ini?'
							: 'Confirm Reserve this item as gift?'}
					</div>
				</div>
				<div className='bottom-modal'>
					{/* <div className='note'>
						[IMPORTANT] Please note that once confirmed, the action is irreversible
					</div> */}
					<div className='buttons'>
						<div className='cancel-button' onClick={() => closeModal()}>
							{weddingDetails?.bahasa ? 'Batal' : 'Cancel'}
						</div>
						<div className='confirm-button' onClick={() => confirmAction()}>
							{weddingDetails?.bahasa ? 'Setuju' : 'Confirm'}
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

const CancelModal = ({ state, dispatch, guestReserveFunc }) => {
	const { cancelModal, loading_gift, guestDetails, giftReserve, weddingDetails } = state;
	const [cancelReason, setCancelReason] = useState('');

	const closeModal = () => {
		dispatch({ type: 'SET_CANCEL_MODAL', payload: false });
	};

	const confirmAction = () => {
		if (cancelReason) {
			let cancellationBody = {
				guestId: guestDetails.id,
				date: moment().format('MMMM Do YYYY, h:mm:ss a'),
				reason: cancelReason,
				giftReserved: giftReserve.name,
			};

			let cancellationMessages = [];

			//Get the already exist cancellations
			if (giftReserve.cancelMessages) {
				cancellationMessages = giftReserve.cancelMessages;
			}

			//Add a new one
			cancellationMessages.push(cancellationBody);

			const body = {
				reserved: '',
				cancelMessages: cancellationMessages,
			};
			guestReserveFunc(body, false);
		}
	};

	return (
		<Dialog
			open={cancelModal}
			TransitionComponent={Transition}
			PaperProps={{
				style: { borderRadius: 10, margin: '32px 12px' },
			}}
			keepMounted
			onClose={() => {
				closeModal();
			}}>
			<div className='giftModal' style={{ position: 'relative' }}>
				<CardLoadingState loadingState={loading_gift} />
				<div className='top-modal' style={{ padding: '20px 0px' }}>
					<div className='text-top'>
						{weddingDetails?.bahasa ? 'BATAL SIMPAN HADIAH?' : 'CANCEL GIFT RESERVATION?'}
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='note'>
						{weddingDetails?.bahasa
							? 'Sila nyatakan sebab pembatalan'
							: 'Why are you cancelling? Help the bride and groom understand the reasons'}
					</div>
					<div className='cancel-input'>
						<textarea
							placeholder='Hey, sorry that I cancel this gift because something happend..'
							value={cancelReason}
							onChange={(e) => setCancelReason(e.target.value)}></textarea>
					</div>
					<div className='buttons'>
						<div
							style={cancelReason ? { opacity: 1 } : { opacity: 0.5 }}
							className='cancel-button'
							onClick={() => confirmAction()}>
							{weddingDetails?.bahasa ? 'Batal' : 'Cancel Reservation'}
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

const ThankYouModal = ({ state, dispatch }) => {
	const { thakyouModal, loading_gift, guestDetails, weddingDetails } = state;

	const closeModal = () => {
		dispatch({ type: 'SET_THANK_YOU_MODAL', payload: false });
	};

	function goHomePage() {
		closeModal();
		dispatch({ type: 'GIFT_PAGE' });
		dispatch({ type: 'REGISTRY_GIFT_PAGE' });
	}

	return (
		<Dialog
			open={thakyouModal}
			TransitionComponent={Transition}
			PaperProps={{
				style: { borderRadius: 10, margin: '32px 12px' },
			}}
			keepMounted
			onClose={() => {
				closeModal();
			}}>
			<div className='giftModal' style={{ position: 'relative' }}>
				<CardLoadingState loadingState={loading_gift} />
				<div className='top-modal'>
					<GiftIcon />
					<div className='text-top'>
						{weddingDetails?.bahasa
							? `Terima kasih ${guestDetails.name}! Hadiah berjaya disimpan`
							: `Thank you ${guestDetails.name}! The Item Has Been reserved as gift`}
					</div>
				</div>
				<div className='bottom-modal'>
					{/* <div className='thankyou-text'>The Bride Will Be Very Grateful!</div> */}
					<div className='buttons'>
						<div className='confirm-button' onClick={() => goHomePage()}>
							OKAY
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

const SorryModal = ({ state, dispatch }) => {
	const { sorryModal, loading_gift, guestDetails, weddingDetails } = state;

	const closeModal = () => {
		dispatch({ type: 'SET_SORRY_MODAL', payload: false });
	};

	function goHomePage() {
		closeModal();
		dispatch({ type: 'GIFT_PAGE' });
		dispatch({ type: 'REGISTRY_GIFT_PAGE' });
	}

	return (
		<Dialog
			open={sorryModal}
			TransitionComponent={Transition}
			PaperProps={{
				style: { borderRadius: 10, margin: '32px 12px' },
			}}
			keepMounted
			onClose={() => {
				closeModal();
			}}>
			<div className='giftModal' style={{ position: 'relative' }}>
				<CardLoadingState loadingState={loading_gift} />
				<div className='top-modal'>
					<div className='text-top'></div>
				</div>
				<div className='bottom-modal'>
					<div className='thankyou-text'>
						{weddingDetails?.bahasa
							? 'Pengantin hargai keputusan anda'
							: 'The Bride and Groom Appreciate Your Thoughts!'}
					</div>
					<div className='buttons'>
						<div className='confirm-button' onClick={() => goHomePage()}>
							OKAY
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

const Footer = () => {
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
					<a style={{ color: 'white', textDecoration: 'none' }} href='https://majlisku.app'>
						Majlisku.app
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
			</div>
		</footer>
	);
};

////////////////////////////Start: MONEY REGISTRY
export const MoneyPage = ({ state, dispatch }) => {
	const { weddingDetails } = state;
	const [openModal, setOpenModal] = useState(false);

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
				<div className='title'>
					{weddingDetails?.bahasa ? 'KIRIM SALAM KAUT' : 'SEND MONEY GIFT'}
				</div>
				<div className='rsvp-money-detail'>
					<div className='rsvp-money-name'>
						<div className='money-title'>Name:</div>
						<div className='money-value'>{weddingDetails?.moneyGiftDetails?.name}</div>
					</div>
					<div className='rsvp-money-name'>
						<div className='money-title'>Bank:</div>
						<div className='money-value'>{weddingDetails?.moneyGiftDetails?.bankName}</div>
					</div>
					<div className='rsvp-money-name account-no'>
						<div className='money-title'>Account No:</div>
						<div className='money-value'>{weddingDetails?.moneyGiftDetails?.accountNum}</div>
					</div>
					{weddingDetails?.moneyGiftDetails?.qrCodeUrl ? (
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

const QrCodeModal = ({ state, openState, closeFunc }) => {
	const { weddingDetails } = state;

	return (
		<Dialog
			open={openState}
			TransitionComponent={Transition}
			PaperProps={{
				style: { borderRadius: 10, margin: '32px 12px' },
			}}
			keepMounted
			onClose={() => {
				closeFunc();
			}}>
			<div className='giftModal' style={{ position: 'relative' }}>
				<div className='qr-modal-content'>
					<img src={weddingDetails?.moneyGiftDetails?.qrCodeUrl}></img>
				</div>
			</div>
		</Dialog>
	);
};

export async function getServerSideProps(context) {
	let id = context.query.id;
	let guestId = context.query.guestId;
	let userInfo;

	console.log('context.query:', context.query);

	await axios
		.get(`${API}/weddingdetails/${id}`)
		.then((res) => {
			userInfo = res.data[0];
		})
		.catch((err) => {
			console.log('timeout!');
			console.log(err.message);
		});

	const title = `You're cordially invited to The Wedding of ${userInfo.brideName} & ${
		userInfo.groomName
	} | ${moment(userInfo?.weddingDate).format('DD.MM.YY')}`;
	const imageUrl = userInfo.whatsappImg;
	const description = `Kindly click to RSVP `;
	const userId = id;

	return { props: { title, imageUrl, description, userId, guestId, userInfo } };
}

export default Rsvp;
