/** @format */
import dynamic from 'next/dynamic';
import { initialStates } from '../initalStates';
import React, { useEffect } from 'react';
//Template imports
const FirstScreenDefault = dynamic(() => import('./FirstScreenDefault'));
const FirstScreenMinimal_2 = dynamic(() => import('./FirstScreenMinimal_2'));
const FirstScreenMinimal_1 = dynamic(() => import('./FirstScreenMinimal_1'));
const FirstScreenPremium = dynamic(() => import('./FirstScreenPremium'));
const FirstScreenEmbossed = dynamic(() => import('./FirstScreenEmbossed'));
const FirstScreenIslamic_1 = dynamic(() => import('./FirstScreenIslamic_1'));
const FirstScreenIslamic_2 = dynamic(() => import('./FirstScreenIslamic_2'));
const FirstScreenIslamic_3 = dynamic(() => import('./FirstScreenIslamic_3'));

export default function FirstScreen({ eventDetails }) {
	const {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		event_date,
		event_location,
		italic_title,
		event_time,
	} = eventDetails || {};
	const { design, premium_design } = initialStates;

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
		case 5:
			return <FirstScreenIslamic_1 {...firstScreenProps} />;
		case 6:
			return <FirstScreenIslamic_2 {...firstScreenProps} />;
		case 7:
			return <FirstScreenIslamic_3 {...firstScreenProps} />;
		default:
			return <FirstScreenDefault {...firstScreenProps} />;
	}
}
