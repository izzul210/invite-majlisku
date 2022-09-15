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
//Icons
import { GiftIcon, BackIcon, TickIcon } from '../../components/icons';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';
// const API = process.env.REACT_APP_TEST_API;

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

let initialStates = {
	userData: null,
	itinerary: null,
	weddingDetails: {},
	guestDetails: null,
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
	}
};

function Rsvp({ title, imageUrl, description, userId, guestId }) {
	const [state, dispatch] = useReducer(rsvpReducer, initialStates);
	const { userData, guestDetails, resetTheClock } = state;

	useEffect(() => {
		getWeddingInfo();
	}, [resetTheClock]);

	function getWeddingInfo() {
		console.log(`${API}/weddingdetails/${userId}`);
		axios
			.get(`${API}/weddingdetails/${userId}`)
			.then((res) => {
				let userInfo = res.data[0];
				dispatch({ type: 'INIT_USER_DATA', payload: userInfo });
				dispatch({ type: 'INIT_WEDDING_DETAILS', payload: userInfo.rsvpDetails });
				// console.log(userInfo.rsvpDetails);
				getGuestInfo(userInfo.id);
				getGiftList(userInfo.id);
				getItineraryList(userInfo.id);
			})
			.catch((err) => {
				console.log('timeout!');
				console.log(err.message);
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

	function postGuestResponse(body) {
		dispatch({ type: 'LOADING', payload: true });
		axios
			.post(`${API}/guestresponse/${state.userData.id}/${state.guestDetails.id}`, body)
			.then((res) => {
				dispatch({ type: 'LOADING', payload: false });
				dispatch({ type: 'GUEST_SUBMIT' });
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
								<MainRSVP state={state} dispatch={dispatch} />
							) : state.page === 1 ? (
								<GuestPage
									state={state}
									dispatch={dispatch}
									postGuestResponse={postGuestResponse}
								/>
							) : (
								<GiftPage state={state} dispatch={dispatch} guestReserveFunc={guestReserveFunc} />
							)}
						</>
					) : (
						<WholePageLoadingState height_vh='80vh' />
					)}
				</Container>
			</main>
		</div>
	);
}

const MainRSVP = ({ state, dispatch }) => {
	const { userData, guestDetails, weddingDetails, itinerary } = state;
	const { eventInfo } = weddingDetails;

	useEffect(() => {
		window.scrollTo(0, 0);
	}, []);

	function nextPage() {
		dispatch({ type: 'NEXT_PAGE' });
	}

	function goToGiftPage() {
		dispatch({ type: 'GIFT_PAGE' });
	}

	return (
		<div className='rsvp-main'>
			<div className='main-desc'>
				<div className='invite-text'>
					<div style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 400 }}>
						{guestDetails?.name},
					</div>{' '}
					You are cordially invited to the
				</div>
				<div className='walimatul-text'>{eventInfo?.eventName}</div>
				<div className='background-image'>
					<div
						className='image'
						style={
							userData?.dashboardImg ? { backgroundImage: `url(${userData?.dashboardImg})` } : {}
						}></div>
				</div>
				{userData ? (
					<div className='bride-groom'>
						{userData?.groomName} & {userData?.brideName}
					</div>
				) : (
					<div className='bride-groom'></div>
				)}
				<div className='wedding-date'>
					<div>{moment(userData?.weddingDate).format('dddd, Do MMMM YYYY')}</div>
					{guestDetails?.selectedSlot && guestDetails?.selectedSlot == '2' ? (
						<div style={{ marginTop: '8px' }}>1:30PM - 3:30PM</div>
					) : (
						<div style={{ marginTop: '8px' }}>11:00AM - 1:30PM</div>
					)}
				</div>
				<div className='wedding-detail'>
					<div className='wedding-detail-text'>
						<p>{eventInfo?.description}</p>
					</div>
				</div>
				<div className='hosted-by'>
					<div className='top-text'>Hosted By:</div>

					<div className='parent'>
						<div>{eventInfo?.groomFather}</div>& <div>{eventInfo?.groomMother}</div>
					</div>
					{eventInfo.brideFather && eventInfo.brideMother ? (
						<div className='parent'>
							<div>{eventInfo?.brideFather}</div>& <div>{eventInfo?.brideMother}</div>
						</div>
					) : (
						<></>
					)}
				</div>
			</div>

			<div className='buttons-section'>
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
			</div>

			<div className='wedding-more-details'>
				<DetailsAccordian
					weddingDetails={weddingDetails}
					userData={userData}
					itinerary={itinerary}
					guestDetails={guestDetails}
				/>
			</div>
		</div>
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
	const { loading, guestDetails } = state;
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

		if (guestDetails?.allocatedPax) setMaxPax(guestDetails?.allocatedPax);
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
	const { userData, going, guestDetails } = state;

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
						<div className='top-section'>Thank you!</div>
						{going ? (
							<div className='top-detail'>
								You are Coming to Our <br />
								Special Day!
							</div>
						) : (
							<div className='top-detail'>
								Your Response Has Kindly
								<br />
								Been Submitted!
							</div>
						)}
						<div className='background-image'>
							<div
								className='image'
								style={
									userData?.dashboardImg
										? { backgroundImage: `url(${userData?.dashboardImg})` }
										: {}
								}></div>
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
								/>
							</div>
						)}

						<div className='home-button'>
							<div className='button' onClick={() => goHomeFunc()}>
								Home
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
	const { gifts, guestDetails } = state;

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
				<div className='title'>GIFT REGISTRY</div>
				<div className='description'>
					<p>Please know that your presence at our wedding is present enough!</p>
					<p>
						However, for friends and family who have been asking for gift ideas, this is a guidance
						registry (optional price and shop):
					</p>
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
	const { giftReserve, guestDetails } = state;
	// const [guestEmail, setGuestEmail] = useState('');

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
					<div className='title'>YOU RESERVED THIS GIFT</div>
				) : (
					<>
						<div className='title'>RESERVE GIFT</div>
						<div className='description'>
							Please note that you don’t have to buy the exact price and brand.{' '}
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
							Cancel Reservation
						</div>
					) : (
						<div className='reserve-button' onClick={() => submitReserve()}>
							Reserve
						</div>
					)}

					{giftReserve.link ? (
						<a
							href={giftReserve.link}
							target='_blank'
							rel='noreferrer'
							className='view-shop-button'>
							View Shop
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
	const { confirmModal, loading_gift, guestDetails } = state;

	const closeModal = () => {
		dispatch({ type: 'SET_CONFIRM_MODAL', payload: false });
	};

	const confirmAction = () => {
		const body = {
			reserved: guestDetails.id,
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
					<div className='text-top'>Confirm Reserve this item as gift?</div>
				</div>
				<div className='bottom-modal'>
					{/* <div className='note'>
						[IMPORTANT] Please note that once confirmed, the action is irreversible
					</div> */}
					<div className='buttons'>
						<div className='cancel-button' onClick={() => closeModal()}>
							Cancel
						</div>
						<div className='confirm-button' onClick={() => confirmAction()}>
							Confirm
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

const CancelModal = ({ state, dispatch, guestReserveFunc }) => {
	const { cancelModal, loading_gift, guestDetails, giftReserve } = state;
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
					<div className='text-top'>CANCEL GIFT RESERVATION?</div>
				</div>
				<div className='bottom-modal'>
					<div className='note'>
						Why are you cancelling? Help the bride and groom understand the reasons.
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
							Cancel Reservation
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

const ThankYouModal = ({ state, dispatch }) => {
	const { thakyouModal, loading_gift, guestDetails } = state;

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
						Thank you {guestDetails.name}! The Item Has Been reserved as gift
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='thankyou-text'>The Bride Will Be Very Grateful!</div>
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
	const { sorryModal, loading_gift, guestDetails } = state;

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
					<div className='text-top'>Sorry to let you go {guestDetails.name}!</div>
				</div>
				<div className='bottom-modal'>
					<div className='thankyou-text'>The Bride and Groom Appreciate Your Thoughts!</div>
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

	const title = `Wedding ${userInfo.brideName} & ${userInfo.groomName}`;
	const imageUrl = userInfo.whatsappImg;
	const description = `You're invited to Wedding ${userInfo.brideName} & ${userInfo.groomName}! `;
	const userId = id;

	return { props: { title, imageUrl, description, userId, guestId } };
}

export default Rsvp;
