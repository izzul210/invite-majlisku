/** @format */

import React, { useEffect, useState } from 'react';
//Components import
import { DetailsAccordian, AddToCalendar } from './accordian';
import CardLoadingState from './cardLoadingState';
//MUI import
import Container from '@mui/material/Container';
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
//Libraries
import moment from 'moment';
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
} from './icons';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export const MainRSVP = ({ state, dispatch, postGuestResponse }) => {
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

	return (
		<div className='rsvp-main'>
			<div className='main-desc'>
				<div className='invite-text'>
					{guestDetails ? (
						<div style={{ marginBottom: '8px', fontSize: '24px', fontWeight: 400 }}>
							{guestDetails?.name},
						</div>
					) : (
						<></>
					)}
					You are cordially invited to the
				</div>
				<div className='walimatul-text'>{eventInfo?.eventName}</div>
				<div className='background-image'>
					<div
						className='image'
						style={rsvpImage ? { backgroundImage: `url(${rsvpImage})` } : {}}></div>
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
					) : time ? (
						<div style={{ marginTop: '8px' }}>
							{moment(time.start).format('h:mma')} - {moment(time.end).format('h:mma')}
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
						<div className='top-text'>Hosted By:</div>
						{eventInfo.groomFather || eventInfo.groomMother ? displayGroomParents() : <></>}
						{eventInfo.brideFather || eventInfo.brideMother ? displayBrideParents() : <></>}
					</div>
				) : (
					<></>
				)}
			</div>

			<div className='buttons-area'>
				<div className='rsvp-buttons'>
					{guestDetails?.rsvp === 'attending' ? (
						<>
							<button className='default-button before-button' onClick={() => setGoingModal(true)}>
								<GoingIcon /> I am Going
							</button>
							<button className='default-button' onClick={() => setNotGoingModal(true)}>
								Not Going
							</button>
						</>
					) : guestDetails?.rsvp === 'notattending' ? (
						<>
							<button className='default-button' onClick={() => setGoingModal(true)}>
								Going
							</button>
							<button
								className='default-button before-button'
								onClick={() => setNotGoingModal(true)}>
								<NotGoingIcon /> I am Not Going
							</button>
						</>
					) : (
						<>
							<button className='default-button before-button' onClick={() => setGoingModal(true)}>
								Going
							</button>
							<button
								className='default-button before-button'
								onClick={() => setNotGoingModal(true)}>
								Not Going
							</button>
						</>
					)}
				</div>
				{weddingDetails?.giftRegistryEnable ? (
					<button className='default-button gift-button' onClick={() => goToGiftPage()}>
						<NewGiftIcon /> Reserve Gift
					</button>
				) : (
					<></>
				)}
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

export const GoingModal = ({ state, dispatch, goingModal, setGoingModal, postGuestResponse }) => {
	const { loading, guestDetails, weddingDetails } = state;
	const [rsvp, setRsvp] = useState('attending');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
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
			name: name,
			phone: phone,
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
				<div className='top-modal' style={{ padding: '8px 0px' }}>
					<div className='close-button-area'>
						<div className='close-button' onClick={() => closeModal()}>
							<CloseIcon />
						</div>
					</div>
					<WishIcon width='60px' height='60px' />
					<div className='text-top'>WE ARE LOOKING FORWARD TO SEEING YOU THERE!</div>
				</div>
				<div className='modal-content'>
					{!guestDetails ? (
						<div className='guest-info'>
							<div className='full-name'>
								<div className='name'>NAME *</div>
								<input
									placeholder='ENTER NAME'
									value={name}
									onChange={(e) => setName(e.target.value)}></input>
							</div>
							<div className='phone-number'>
								<div className='name'>CONTACT *</div>
								<input
									placeholder='ENTER PHONE NUMBER'
									type='tek'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}></input>
							</div>
						</div>
					) : (
						<></>
					)}
					<div className='pax-input'>
						<div className='name'>TOTAL PAX (MAX {maxPax}) *</div>
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
					<div className='wish-input'>
						<div className='name'>YOUR WISH</div>
						<textarea
							value={wish}
							onChange={(e) => setWish(e.target.value)}
							placeholder='ENTER WISH'></textarea>
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='cancel-button' onClick={() => closeModal()}>
						CANCEL
					</div>
					{guestDetails ? (
						<div className='confirm-button' onClick={() => submitResponseFunc()}>
							<CardLoadingState loadingState={loading} />
							CONFIRM
						</div>
					) : (
						<div
							className='confirm-button'
							style={name && phone ? { opacity: 1 } : { opacity: 0.5 }}
							onClick={() => {
								if (name && phone) submitResponseFunc();
							}}>
							<CardLoadingState loadingState={loading} />
							CONFIRM
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export const NotGoingModal = ({
	state,
	dispatch,
	notGoingModal,
	setNotGoingModal,
	postGuestResponse,
}) => {
	const { loading, guestDetails, weddingDetails } = state;
	const [rsvp, setRsvp] = useState('notattending');
	const [name, setName] = useState('');
	const [phone, setPhone] = useState('');
	const [pax, setPax] = useState(1);
	const [wish, setWish] = useState('');

	useEffect(() => {
		if (guestDetails?.response && guestDetails.rsvp !== 'invited' && guestDetails.rsvp !== '') {
			setWish(guestDetails?.response.wish);
		}
	}, [guestDetails]);

	const closeModal = () => {
		setNotGoingModal(false);
	};

	const submitResponseFunc = () => {
		const guestRes = {
			rsvp: rsvp,
			name: name,
			phone: phone,
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
						WE ARE SORRY TO HEAR THAT BUT THANK YOU FOR THE THOUGHTFUL RESPONSE.
					</div>
				</div>
				<div className='modal-content'>
					{!guestDetails ? (
						<div className='guest-info'>
							<div className='full-name'>
								<div className='name'>NAME *</div>
								<input
									placeholder='ENTER NAME'
									value={name}
									onChange={(e) => setName(e.target.value)}></input>
							</div>
							<div className='phone-number'>
								<div className='name'>CONTACT *</div>
								<input
									placeholder='ENTER PHONE NUMBER'
									type='tek'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}></input>
							</div>
						</div>
					) : (
						<></>
					)}
					<div className='wish-input'>
						<div className='name'>YOUR WISH</div>
						<textarea
							value={wish}
							onChange={(e) => setWish(e.target.value)}
							placeholder='ENTER WISH'></textarea>
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='cancel-button' onClick={() => closeModal()}>
						CANCEL
					</div>
					{guestDetails ? (
						<div className='confirm-button' onClick={() => submitResponseFunc()}>
							<CardLoadingState loadingState={loading} />
							CONFIRM
						</div>
					) : (
						<div
							className='confirm-button'
							style={name && phone ? { opacity: 1 } : { opacity: 0.5 }}
							onClick={() => {
								if (name && phone) submitResponseFunc();
							}}>
							<CardLoadingState loadingState={loading} />
							CONFIRM
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

//////////////////////////////Start: GUEST RSVP
export const GuestPage = ({ state, dispatch, postGuestResponse }) => {
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

export const GuestRSVP = ({ state, dispatch, postGuestResponse }) => {
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

export const ThankYouPage = ({ state, dispatch }) => {
	const { userData, going, guestInput, time, weddingDetails } = state;
	const { rsvpImage } = weddingDetails;

	function goToGiftPage() {
		dispatch({ type: 'GIFT_PAGE' });
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
								Thank you, <br /> <div style={{ fontSize: '24px' }}>{guestInput?.name}</div>
							</div>
						) : (
							<div className='top-section'>Thank you</div>
						)}

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
									guestDetails={guestInput}
									time={time}
								/>
							</div>
						)}
						{weddingDetails?.giftRegistryEnable ? (
							<button className='send-gift-button' onClick={() => goToGiftPage()}>
								<NewGiftIcon /> Reserve Gift
							</button>
						) : (
							<></>
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
export const GiftPage = ({ state, dispatch, guestReserveFunc }) => {
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

export const GiftRegistry = ({ state, dispatch }) => {
	const { gifts, guestDetails } = state;

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
					{/* <p>Please know that your presence at our wedding is present enough!</p> */}
					<p>
						For friends and family who have been asking for gift ideas, this is a guidance registry:
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

export const ReserveGift = ({ state, dispatch, guestReserveFunc }) => {
	const { giftReserve, guestInput } = state;

	function goBackPage() {
		dispatch({ type: 'REGISTRY_GIFT_PAGE' });
	}

	function submitReserve() {
		dispatch({ type: 'SET_CONFIRM_MODAL', payload: true });
	}

	return (
		<div className='gift-reserve'>
			<div className='top-section'>
				<div style={{ cursor: 'pointer' }} onClick={() => goBackPage()}>
					<BackIcon />
				</div>
				<>
					<div className='title'>RESERVE GIFT </div>
					<div className='description'>
						Please note that you don’t have to buy the exact price and brand.{' '}
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
					<div className='reserve-button' onClick={() => submitReserve()}>
						Reserve
					</div>

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
			{guestInput ? (
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

export const ConfirmModal = ({ state, dispatch, guestReserveFunc }) => {
	const { confirmModal, loading_gift, guestDetails, giftReserve, guestInput } = state;

	const closeModal = () => {
		dispatch({ type: 'SET_CONFIRM_MODAL', payload: false });
	};

	const confirmAction = () => {
		const body = {
			reserved: guestInput?.id,
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
					<div className='text-top'>Confirm Reserve this item as gift?</div>
					<div className='smol-text'>
						From: <b>{guestInput?.name}</b>
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='note'>
						[IMPORTANT] Please note that once confirmed, the action is irreversible
					</div>
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

export const PreRSVPModal = ({ state, dispatch }) => {
	const { confirmModal, loading_gift, guestDetails, giftReserve } = state;

	const closeModal = () => {
		dispatch({ type: 'SET_CONFIRM_MODAL', payload: false });
	};

	const goBackHome = () => {
		dispatch({ type: 'GO_HOME_PAGE' });
		dispatch({ type: 'REGISTRY_GIFT_PAGE' });
		closeModal();
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
					<div className='text-top'>Hey, kindly RSVP to reserve this item as gift</div>
				</div>
				<div className='bottom-modal'>
					<div className='buttons'>
						<div className='confirm-button' onClick={() => goBackHome()}>
							Return Home
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export const CancelModal = ({ state, dispatch, guestReserveFunc }) => {
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

export const ThankYouModal = ({ state, dispatch }) => {
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
					{guestDetails ? (
						<div className='text-top'>
							Thank you {guestDetails?.name}! The Item Has Been reserved as gift
						</div>
					) : (
						<div className='text-top'>Thank you! The Item Has Been reserved as gift</div>
					)}
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

export const SorryModal = ({ state, dispatch }) => {
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
					{guestDetails ? (
						<div className='text-top'>Sorry to let you go {guestDetails?.name}!</div>
					) : (
						<div className='text-top'>Sorry to let you go!</div>
					)}
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
					<a style={{ color: 'white', textDecoration: 'none' }} href='https://majlisku.app'>
						Majlisku.app
					</a>
				</div>
				<div>
					by{' '}
					<a
						style={{ color: 'white', textDecoration: 'underline' }}
						href='https://www.instagram.com/izzul_023/'>
						Izzul
					</a>{' '}
					&{' '}
					<a
						style={{ color: 'white', textDecoration: 'underline' }}
						href='https://twitter.com/theizzulsyazwan'>
						Izzul
					</a>{' '}
				</div>
			</div>
		</footer>
	);
};
