/** @format */
'use client';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useInviteContext } from '../inviteContext';
//Template imports
const FirstScreenDefault = dynamic(() => import('./FirstScreenDefault'));
const FirstScreenMinimal_2 = dynamic(() => import('./FirstScreenMinimal_2'));
const FirstScreenMinimal_1 = dynamic(() => import('./FirstScreenMinimal_1'));
const FirstScreenPremium = dynamic(() => import('./FirstScreenPremium'));
const FirstScreenEmbossed = dynamic(() => import('./FirstScreenEmbossed'));
const FirstScreenIslamic_1 = dynamic(() => import('./FirstScreenIslamic_1'));
const FirstScreenIslamic_2 = dynamic(() => import('./FirstScreenIslamic_2'));
const FirstScreenIslamic_3 = dynamic(() => import('./FirstScreenIslamic_3'));
const FirstScreenRoyal_1 = dynamic(() => import('./FirstScreenRoyal_1'));

export default function FirstScreen({ eventDetails }) {
	const {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		event_date,
		event_location,
		italic_title,
		event_time,
		optional_description,
	} = eventDetails || {};
	const { design } = useInviteContext();

	useEffect(() => {}, [design]);

	const firstScreenProps = {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		optional_description,
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
			return <FirstScreenDefault {...firstScreenProps} />;
		case 4:
			return <FirstScreenEmbossed {...firstScreenProps} />;
		case 5:
			return <FirstScreenIslamic_1 {...firstScreenProps} />;
		case 6:
			return <FirstScreenIslamic_2 {...firstScreenProps} />;
		case 7:
			return <FirstScreenIslamic_3 {...firstScreenProps} />;
		case 20:
			return <FirstScreenPremium premium_design={0} {...firstScreenProps} />;
		case 21:
			return <FirstScreenPremium premium_design={1} {...firstScreenProps} />;
		case 22:
			return <FirstScreenPremium premium_design={2} {...firstScreenProps} />;
		case 23:
			return <FirstScreenPremium premium_design={3} {...firstScreenProps} />;
		case 24:
			return <FirstScreenPremium premium_design={4} {...firstScreenProps} />;
		case 25:
			return <FirstScreenPremium premium_design={5} {...firstScreenProps} />;
		case 26:
			return <FirstScreenPremium premium_design={6} {...firstScreenProps} />;
		case 27:
			return <FirstScreenPremium premium_design={7} {...firstScreenProps} />;
		case 30:
			return <FirstScreenRoyal_1 {...firstScreenProps} />;
		default:
			return <FirstScreenDefault {...firstScreenProps} />;
	}
}
