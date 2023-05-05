/** @format */

import React from 'react';
//Icons
import { MajliskuIcon } from './icons';
//Libraries
import moment from 'moment';
import 'moment/locale/ms-my';
import 'moment/locale/en-ca';
//Components import
import { EventSummaryCard } from './templateComponents/cardEventSummary';
import { CardTitle } from './templateComponents/cardTitle';
import { HostedByCard } from './templateComponents/cardHost';

/*********************** TEMPLATE ****************************/
export const InviteTemplate = (props) => {
	const {
		eventTitle1 = 'Walimatulurus',
		eventTitle2 = 'Izzul Syazwan\n&\nNurul Syafiqah',
		eventLocation = 'Crystall Hall, Level 4, Plaza Alam Sentral,\nShah Alam, Selangor',
		guestName = null,
		eventDate = '2022-10-15',
		dashboardImage = defaultImage,
		hosts = null,
		startTime = '2022-09-18 12:30',
		endTime = '2022-09-18 15:00',
		malay = false,
		content,
		description = null,
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

	const updateEventDescription = description?.split('\n').map((line, index) => (
		<>
			{line}
			<br />
		</>
	));

	const formattedDate = moment(eventDate).format('dddd, Do MMMM YYYY');

	function checkHost() {
		if (hosts) {
			if (hosts?.length !== 0 && hosts[0] !== '') return true;
		} else {
			return false;
		}
	}

	const eventTime = `${moment(startTime).format('h:mm A')} - ${moment(endTime).format('h:mm A')}`;

	return (
		<div className='invite-canvas'>
			<div className='invite-card'>
				{/********* TOP CARD SECTION *****/}
				<CardTitle dashboardImage={dashboardImage} eventTitle1={eventTitle1} />
				{/********* MIDDLE CARD SECTION *****/}
				<EventSummaryCard
					guestName={guestName}
					eventTitle1={eventTitle1}
					updatedEventTitle2={updatedEventTitle2}
					formattedDate={formattedDate}
					eventTime={eventTime}
					eventLocation={eventLocation}
					malay={malay}
					updateEventDescription={updateEventDescription}
				/>
				{/********** Hosted By Section *******/}
				{checkHost() ? <HostedByCard hosts={hosts} malay={malay} /> : null}

				{content}
			</div>
		</div>
	);
};
