/** @format */

import React, { useEffect, useState } from 'react';
//Components import
import CardLoadingState from './cardLoadingState';
//MUI import
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
//Libraries
import moment from 'moment';
import 'moment/locale/ms-my';
import 'moment/locale/en-ca';
//Icons
import {
	GiftIcon,
	WishIcon,
	WishIcon2,
	CloseIcon,
	MaybeIcon,
	NotGoingIcon,
	GoingIcon,
} from './icons';
import Image from 'next/image';
import rsvpIcon from '../assets/icons/rsvpIcon.png';
import goingIcon from '../assets/icons/goingIcon.svg';
import notGoingIcon from '../assets/icons/notGoingIcon.svg';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

export const GoingModal = ({ state, dispatch, goingModal, setGoingModal, postGuestResponse }) => {
	const { loading, guestDetails, rsvp_details } = state;
	const { guest_pax_limit, enable_bahasa, enable_unlimited_pax } = rsvp_details;
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

		if (guest_pax_limit) {
			if (guestDetails?.allocatedPax) setMaxPax(guestDetails?.allocatedPax);
			else setMaxPax(guest_pax_limit);
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
					<div className='text-top'>
						{enable_bahasa
							? 'KAMI SEDIA MENANTI KETIBAAN ANDA DI SANA'
							: 'WE ARE LOOKING FORWARD TO SEEING YOU THERE!'}
						{guestDetails?.name ? `, ${guestDetails.name}` : null}!
					</div>
				</div>
				<div className='modal-content'>
					{!guestDetails ? (
						<div className='guest-info'>
							<div className='full-name'>
								<div className='name'>{enable_bahasa ? 'NAMA*' : 'NAME*'}</div>
								<input
									placeholder={enable_bahasa ? 'ISI NAMA' : 'ENTER NAME'}
									value={name}
									onChange={(e) => setName(e.target.value)}></input>
							</div>
							<div className='phone-number'>
								<div className='name'>{enable_bahasa ? 'TELEFON*' : 'CONTACT*'}</div>
								<input
									placeholder={enable_bahasa ? 'ISI NO TEL' : 'ENTER PHONE NUMBER'}
									type='tek'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}></input>
							</div>
						</div>
					) : (
						<></>
					)}
					<div className='pax-input'>
						<div className='name'>
							{enable_bahasa ? 'BILANGAN KEHADIRAN' : 'TOTAL PAX'}{' '}
							{enable_unlimited_pax ? '' : `MAX ${maxPax}`}*
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
									if (enable_unlimited_pax) {
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
						<div className='name'>{enable_bahasa ? 'UCAPAN' : 'YOUR WISH'}</div>
						<textarea
							value={wish}
							onChange={(e) => setWish(e.target.value)}
							placeholder={enable_bahasa ? 'ISI UCAPAN' : 'ENTER WISH'}></textarea>
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='cancel-button' onClick={() => closeModal()}>
						{enable_bahasa ? 'BATAL' : 'CANCEL'}
					</div>
					{guestDetails ? (
						<div className='confirm-button' onClick={() => submitResponseFunc()}>
							<CardLoadingState loadingState={loading} />
							{enable_bahasa ? 'SETUJU' : 'CONFIRM'}
						</div>
					) : (
						<div
							className='confirm-button'
							style={name && phone ? { opacity: 1 } : { opacity: 0.5 }}
							onClick={() => {
								if (name && phone) submitResponseFunc();
							}}>
							<CardLoadingState loadingState={loading} />
							{enable_bahasa ? 'SETUJU' : 'CONFIRM'}
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
	const { loading, guestDetails, rsvp_details } = state;
	const { enable_bahasa } = rsvp_details;
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
						{enable_bahasa
							? 'KAMI MEMOHON MAAF ATAS KESULITAN, TERIMA KASIH KERANA MEMBALAS'
							: 'WE ARE SORRY TO HEAR THAT BUT THANK YOU FOR THE THOUGHTFUL RESPONSE'}
					</div>
				</div>
				<div className='modal-content'>
					{!guestDetails ? (
						<div className='guest-info'>
							<div className='full-name'>
								<div className='name'>{enable_bahasa ? 'NAMA*' : 'NAME*'}</div>
								<input
									placeholder={enable_bahasa ? 'ISI NAMA' : 'ENTER NAME'}
									value={name}
									onChange={(e) => setName(e.target.value)}></input>
							</div>
							<div className='phone-number'>
								<div className='name'>{enable_bahasa ? 'TELEFON*' : 'CONTACT*'}</div>
								<input
									placeholder={enable_bahasa ? 'ISI NO TEL' : 'ENTER PHONE NUMBER'}
									type='tel'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}></input>
							</div>
						</div>
					) : (
						<></>
					)}
					<div className='wish-input'>
						<div className='name'>{enable_bahasa ? 'UCAPAN' : 'YOUR WISH'}</div>
						<textarea
							value={wish}
							onChange={(e) => setWish(e.target.value)}
							placeholder={enable_bahasa ? 'ISI UCAPAN' : 'ENTER WISH'}></textarea>
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='cancel-button' onClick={() => closeModal()}>
						{enable_bahasa ? 'BATAL' : 'CANCEL'}
					</div>
					{guestDetails ? (
						<div className='confirm-button' onClick={() => submitResponseFunc()}>
							<CardLoadingState loadingState={loading} />
							{enable_bahasa ? 'SETUJU' : 'CONFIRM'}
						</div>
					) : (
						<div
							className='confirm-button'
							style={name && phone ? { opacity: 1 } : { opacity: 0.5 }}
							onClick={() => {
								if (name && phone) submitResponseFunc();
							}}>
							<CardLoadingState loadingState={loading} />
							{enable_bahasa ? 'SETUJU' : 'CONFIRM'}
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export const MaybeModal = ({ state, dispatch, maybeModal, setMaybeModal, postGuestResponse }) => {
	const { loading, guestDetails, rsvp_details } = state;
	const { enable_bahasa } = rsvp_details;
	const [rsvp, setRsvp] = useState('maybe');
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
		setMaybeModal(false);
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
			open={maybeModal}
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
					<Image src={rsvpIcon} alt='' width={60} height={60} />
					<div className='text-top'>
						{enable_bahasa ? 'HARAP ANDA SUDI DATANG!' : 'LET US KNOW!'}
					</div>
				</div>
				<div className='modal-content'>
					{!guestDetails ? (
						<div className='guest-info'>
							<div className='full-name'>
								<div className='name'>{enable_bahasa ? 'NAMA*' : 'NAME*'}</div>
								<input
									placeholder={enable_bahasa ? 'ISI NAMA' : 'ENTER NAME'}
									value={name}
									onChange={(e) => setName(e.target.value)}></input>
							</div>
							<div className='phone-number'>
								<div className='name'>{enable_bahasa ? 'TELEFON*' : 'CONTACT*'}</div>
								<input
									placeholder={enable_bahasa ? 'ISI NO TEL' : 'ENTER PHONE NUMBER'}
									type='tel'
									value={phone}
									onChange={(e) => setPhone(e.target.value)}></input>
							</div>
						</div>
					) : (
						<></>
					)}
					<div className='wish-input'>
						<div className='name'>{enable_bahasa ? 'UCAPAN' : 'YOUR WISH'}</div>
						<textarea
							value={wish}
							onChange={(e) => setWish(e.target.value)}
							placeholder={enable_bahasa ? 'ISI UCAPAN' : 'ENTER WISH'}></textarea>
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='cancel-button' onClick={() => closeModal()}>
						{enable_bahasa ? 'BATAL' : 'CANCEL'}
					</div>
					{guestDetails ? (
						<div className='confirm-button' onClick={() => submitResponseFunc()}>
							<CardLoadingState loadingState={loading} />
							{enable_bahasa ? 'SETUJU' : 'CONFIRM'}
						</div>
					) : (
						<div
							className='confirm-button'
							style={name && phone ? { opacity: 1 } : { opacity: 0.5 }}
							onClick={() => {
								if (name && phone) submitResponseFunc();
							}}>
							<CardLoadingState loadingState={loading} />
							{enable_bahasa ? 'SETUJU' : 'CONFIRM'}
						</div>
					)}
				</div>
			</div>
		</Dialog>
	);
};

export const RSVPModal = ({
	state,
	dispatch,
	rsvpModal,
	setRsvpModal,
	setGoingModal,
	setNotGoingModal,
	setMaybeModal,
}) => {
	const { rsvp_details } = state;
	const { enable_bahasa } = rsvp_details;
	function closeModal() {
		setRsvpModal(false);
	}

	function goingAction() {
		setRsvpModal(false);
		setGoingModal(true);
	}

	function notGoingAction() {
		setRsvpModal(false);
		setNotGoingModal(true);
	}

	function maybeAction() {
		setRsvpModal(false);
		setMaybeModal(true);
	}

	return (
		<Dialog
			open={rsvpModal}
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
							<CloseIcon width={17} height={17} />
						</div>
					</div>
					<Image src={rsvpIcon} alt='' width={100} height={100} />
					<div className='text-top'>
						{enable_bahasa
							? 'Bolehkah Tuan/Puan Hadir ke Majlis ini?'
							: 'Would you be able to attend the event?'}
					</div>
				</div>
				<div className='modal-content'>
					<div className='rsvp-buttons-2'>
						<div className='rsvp-button-2' onClick={() => goingAction()}>
							<Image src={goingIcon} alt='' width={24} height={24} />
							{enable_bahasa ? 'Saya Hadir' : `I'm Attending`}
						</div>
						<div className='rsvp-button-2' onClick={() => notGoingAction()}>
							<Image src={notGoingIcon} alt='' width={24} height={24} />{' '}
							{enable_bahasa ? 'Tidak Hadir' : `Not Attending`}
						</div>
						<div className='rsvp-button-2' onClick={() => maybeAction()}>
							<MaybeIcon fillColor='black' />
							{enable_bahasa ? 'Tidak Pasti' : `Not Sure Yet`}
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export const ConfirmModal = ({ state, dispatch, guestReserveFunc }) => {
	const { confirmModal, loading_gift, guestDetails, giftReserve, guestInput, rsvp_details } = state;
	const { enable_bahasa } = rsvp_details;

	const closeModal = () => {
		dispatch({ type: 'SET_CONFIRM_MODAL', payload: false });
	};

	const confirmAction = () => {
		const body = {
			reserved: guestDetails?.id ? guestDetails?.id : guestInput?.id,
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
						{enable_bahasa
							? 'Anda bersetuju untuk simpan hadiah ini?'
							: 'Confirm Reserve this item as gift?'}
					</div>
					<div className='smol-text'>
						{enable_bahasa ? 'Daripada:' : 'From:'}{' '}
						<b>{guestDetails?.name ? guestDetails?.name : guestInput?.name}</b>
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='note'>
						[IMPORTANT] Please note that once confirmed, the action is irreversible
					</div>
					<div className='buttons'>
						<div className='cancel-button' onClick={() => closeModal()}>
							{enable_bahasa ? 'Batal' : 'Cancel'}
						</div>
						<div className='confirm-button' onClick={() => confirmAction()}>
							{enable_bahasa ? 'Setuju' : 'Confirm'}
						</div>
					</div>
				</div>
			</div>
		</Dialog>
	);
};

export const PreRSVPModal = ({ state, dispatch }) => {
	const { confirmModal, loading_gift, rsvp_details } = state;
	const { enable_bahasa } = rsvp_details;

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
					<div className='text-top' style={{ marginBottom: '16px' }}>
						{enable_bahasa
							? 'Sila nyatakan kehadiran anda sebelum menempah hadiah'
							: 'Hey, kindly RSVP to reserve this item as gift'}
					</div>
				</div>
				<div className='bottom-modal'>
					<div className='buttons'>
						<div className='confirm-button' onClick={() => goBackHome()}>
							{enable_bahasa ? 'Kembali' : 'Return Home'}
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

export const QrCodeModal = ({ state, openState, closeFunc }) => {
	const { rsvp_details } = state;
	const { money_gift_details } = rsvp_details;

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
					<img src={money_gift_details?.qrCodeUrl}></img>
				</div>
			</div>
		</Dialog>
	);
};

export const ThankYouModal = ({ state, dispatch }) => {
	const { thakyouModal, loading_gift, guestDetails, rsvp_details } = state;
	const { enable_bahasa } = rsvp_details;

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
							{enable_bahasa
								? `Terima kasih ${guestDetails?.name}! Hadiah berjaya di simpan`
								: `Thank you ${guestDetails?.name}! The Item Has Been reserved as gift`}
						</div>
					) : (
						<div className='text-top'>
							{enable_bahasa
								? 'Terima kasih! Hadiah berjaya disimpan'
								: 'Thank you! The Item Has Been reserved as gift'}
						</div>
					)}
				</div>
				<div className='bottom-modal'>
					<div className='thankyou-text'>
						{enable_bahasa ? '' : 'The Bride Will Be Very Grateful!'}
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
