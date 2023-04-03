/** @format */

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
///////////MUI
import { styled } from '@mui/material/styles';
import ArrowForwardIosSharpIcon from '@mui/icons-material/ArrowForwardIosSharp';
import MuiAccordion from '@mui/material/Accordion';
import MuiAccordionSummary from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import TextField from '@mui/material/TextField';
///////////Calendar
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
//////////Libraries
import moment from 'moment';
import { atcb_action } from 'add-to-calendar-button';
import 'add-to-calendar-button/assets/css/atcb.css';
///////////Icons
import { WhatsappIcon, PhoneIcon } from '../components/icons';
import googleMapIcon from '../public/icons/googleMap.png';
import wazeIcon from '../public/icons/waze.png';

const Accordion = styled((props) => (
	<MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
	'&:not(:last-child)': {
		borderBottom: '1px solid rgba(0,0,0,0.3)',
	},
	'&:before': {
		display: 'none',
	},
}));

const AccordionSummary = styled((props) => (
	<MuiAccordionSummary
		expandIcon={
			<ArrowForwardIosSharpIcon sx={{ fontSize: '0.9rem', transform: 'rotate(90deg)' }} />
		}
		{...props}
	/>
))(({ theme }) => ({
	flexDirection: 'row',
	'& .MuiAccordionSummary-expandIconWrapper.Mui-expanded': {
		transform: 'rotate(180deg)',
	},
	'& .MuiAccordionSummary-content': {},
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
	padding: theme.spacing(2),
}));

export const DetailsAccordian = ({ itinerary, guestDetails, time, rsvp_details }) => {
	const {
		enable_itinerary,
		enable_bahasa,
		event_address,
		contact_info,
		event_title_2,
		event_date,
		location_info,
	} = rsvp_details;
	const [expanded, setExpanded] = React.useState('');
	const addressRef = useRef(null);
	const contactRef = useRef(null);
	const calendarRef = useRef(null);

	let startDate = '11:00';
	let endDate = '13:30';

	if (time.start !== '' && time.end !== '') {
		startDate = `${moment(time.start).format('HH:mm')}`;
		endDate = `${moment(time.end).format('HH:mm')}`;
	} else {
		startDate = '11:00';
		endDate = '13:30';
	}

	const handleChange = (panel) => (event, newExpanded) => {
		setExpanded(newExpanded ? panel : false);
	};

	function checkContacts() {
		if (rsvp_details.contact_info[0].name !== '' || rsvp_details.contact_info[0].phone !== '') {
			return true;
		} else return false;
	}

	return (
		<div className='accordian-card'>
			{guestDetails?.selectedSlot && guestDetails?.selectedSlot == '2' ? (
				<></>
			) : enable_itinerary ? (
				<Accordion defaultExpanded={true} onChange={handleChange('panel0')}>
					<AccordionSummary aria-controls='panel0d-content' id='panel0d-header'>
						<div className='summary-title'>{enable_bahasa ? 'ATURCARA' : 'ITINERARY'}</div>
					</AccordionSummary>
					<AccordionDetails>
						{itinerary && itinerary.length !== 0 ? (
							<div className='activityContent'>
								{itinerary
									.sort(function (a, b) {
										var c = new Date(a.date);
										var d = new Date(b.date);
										return d < c ? 1 : d > c ? -1 : 0;
									})
									.map((activity, index) => {
										return (
											<div className='yes_activity' key={index}>
												<div className='activity_detail'>
													<div className='activity_title'>{activity.title}</div>
													<div className='activity_description'>{activity.description}</div>
													<div className='blurryBottom'></div>
												</div>
												<div className='date'>
													<div className='bold'>{moment(activity.date).format('h:mm a')}</div>
												</div>
											</div>
										);
									})}
							</div>
						) : (
							<></>
						)}
					</AccordionDetails>
				</Accordion>
			) : (
				<></>
			)}

			<Accordion ref={addressRef} defaultExpanded={true} onChange={handleChange('panel1')}>
				<AccordionSummary aria-controls='panel1d-content' id='panel1d-header'>
					<div className='summary-title'>{enable_bahasa ? 'Lokasi' : 'Address'}</div>
				</AccordionSummary>
				<AccordionDetails>
					<div className='address-details'>
						<div className='content-details'>{location_info?.address}</div>
						<div className='button-section'>
							<a
								href={
									location_info?.wazeLink
										? location_info?.wazeLink
										: `https://waze.com/ul?q=${location_info?.address}`
								}
								target='_blank'
								rel='noreferrer'
								className='waze-button'>
								<Image src={wazeIcon} alt='' width='25px' height='25px'></Image>
							</a>

							<a
								href={
									location_info?.googleLink
										? location_info?.googleLink
										: `http://maps.google.com/?q=1200 ${location_info?.address}`
								}
								target='_blank'
								rel='noreferrer'
								className='googleMap-button'>
								<Image src={googleMapIcon} alt='' width='18px' height='23px'></Image>
							</a>
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
			{checkContacts() ? (
				<Accordion ref={contactRef} defaultExpanded={true} onChange={handleChange('panel2')}>
					<AccordionSummary aria-controls='panel2d-content' id='panel2d-header'>
						<div className='summary-title'>{enable_bahasa ? 'Telefon' : 'Contact'}</div>
					</AccordionSummary>
					<AccordionDetails>
						<div className='contact-details'>
							{contact_info.map((contact, id) => (
								<div className='bride-contact' key={id}>
									<div className='name'>{contact?.name}</div>
									<div className='phone-call'>
										<div className='phone-text'>{contact?.phone}</div>
										<div className='phome-actions'>
											<a
												href={`https://wa.me/6${contact?.phone}`}
												target='_blank'
												rel='noreferrer'
												className='contact'>
												<WhatsappIcon width='22px' height='22px' />
											</a>
											<a href={`tel:+${contact?.phone}`} rel='noreferrer'>
												<PhoneIcon width='22px' height='22px' fillColor='#1E1E1E' />
											</a>
										</div>
									</div>
								</div>
							))}
						</div>
					</AccordionDetails>
				</Accordion>
			) : null}

			<Accordion defaultExpanded={true} onChange={handleChange('panel3')}>
				<AccordionSummary aria-controls='panel3d-content' id='panel3d-header'>
					<div className='summary-title'>{enable_bahasa ? 'Kalendar' : 'Calendar'}</div>
				</AccordionSummary>
				<AccordionDetails>
					<div className='calendar-details'>
						<StaticDatePickerLandscape eventDetails={rsvp_details} />
					</div>
					<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
						<div
							ref={calendarRef}
							className='add-to-calendar'
							onClick={() =>
								atcb_action({
									name: event_title_2 ? event_title_2 : `The Wedding`,
									startDate: moment(event_date).format('YYYY-MM-DD'),
									endDate: moment(event_date).format('YYYY-MM-DD'),
									startTime: `${startDate}`,
									endTime: `${endDate}`,
									location: event_address,
									options: ['Apple', 'Google'],
									timeZone: 'Asia/Singapore',
									iCalFileName: 'Reminder-Event',
								})
							}>
							{enable_bahasa ? 'Simpan Di Kalendar' : 'Add to Calendar'}
						</div>
					</div>
				</AccordionDetails>
			</Accordion>
		</div>
	);
};

export const AddToCalendar = ({ time, rsvp_details }) => {
	const { event_title_2, event_date, event_address, enable_bahasa } = rsvp_details;
	let startDate = '11:00';
	let endDate = '13:30';

	if (time.start !== '' && time.end !== '') {
		startDate = `${moment(time.start).format('HH:mm')}`;
		endDate = `${moment(time.end).format('HH:mm')}`;
	} else {
		startDate = '11:00';
		endDate = '13:30';
	}

	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
			<div
				className='add-to-calendar'
				onClick={() =>
					atcb_action({
						name: event_title_2 ? event_title_2 : `The Wedding`,
						startDate: moment(event_date).format('YYYY-MM-DD'),
						endDate: moment(event_date).format('YYYY-MM-DD'),
						startTime: `${startDate}`,
						endTime: `${endDate}`,
						location: event_address,
						options: ['Apple', 'Google'],
						timeZone: 'Asia/Singapore',
						iCalFileName: 'Reminder-Event',
					})
				}>
				{enable_bahasa ? 'Simpan di Kalendar' : 'Add to Calendar'}
			</div>
		</div>
	);
};

export function StaticDatePickerLandscape({ eventDetails }) {
	const [value, setValue] = React.useState(eventDetails?.event_date);

	useEffect(() => {
		setValue(eventDetails?.event_date);
	}, [eventDetails]);

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<StaticDatePicker
				onChange={() => {}}
				displayStaticWrapperAs='desktop'
				value={value}
				renderInput={(params) => <TextField {...params} />}
			/>
		</LocalizationProvider>
	);
}
