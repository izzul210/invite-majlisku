/** @format */
'use client';
import moment from 'moment';
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
const FirstScreenRoyal_2 = dynamic(() => import('./FirstScreenRoyal_2'));
const FirstScreenRoyal_3 = dynamic(() => import('./FirstScreenRoyal_3'));
const FirstScreenRoyal_4 = dynamic(() => import('./FirstScreenRoyal_4'));
const FirstScreenRoyal_5 = dynamic(() => import('./FirstScreenRoyal_5'));
const FirstScreenRoyal_6 = dynamic(() => import('./FirstScreenRoyal_6'));
const FirstScreenRustic_1 = dynamic(() => import('./FirstScreenRustic_1'));
const FirstScreenRustic_2 = dynamic(() => import('./FirstScreenRustic_2'));
const FirstScreenRustic_3 = dynamic(() => import('./FirstScreenRustic_3'));
const FirstScreenVintage_1 = dynamic(() => import('./FirstScreenVintage_1'));
const FirstScreenVintage_2 = dynamic(() => import('./FirstScreenVintage_2'));
const FirstScreenVintage_3 = dynamic(() => import('./FirstScreenVintage_3'));
//Animated template imports
const FirstScreenDefaultAnimation = dynamic(() => import('./FirstScreenDefaultAnimation'));
const FirstScreenIslamicAnimation_1 = dynamic(() => import('./FirstScreenIslamicAnimation_1'));
const FirstScreenIslamicAnimation_2 = dynamic(() => import('./FirstScreenIslamicAnimation_2'));
const FirstScreenIslamicAnimation_3 = dynamic(() => import('./FirstScreenIslamicAnimation_3'));
const FirstScreenPremiumAnimation = dynamic(() => import('./FirstScreenPremiumAnimation'));
const FirstScreenRoyalAnimation_1 = dynamic(() => import('./FirstScreenRoyalAnimation_1'));
const FirstScreenRoyalAnimation_2 = dynamic(() => import('./FirstScreenRoyalAnimation_2'));
const FirstScreenRoyalAnimation_3 = dynamic(() => import('./FirstScreenRoyalAnimation_3'));
const FirstScreenRoyalAnimation_4 = dynamic(() => import('./FirstScreenRoyalAnimation_4'));
const FirstScreenRoyalAnimation_5 = dynamic(() => import('./FirstScreenRoyalAnimation_5'));
const FirstScreenRoyalAnimation_6 = dynamic(() => import('./FirstScreenRoyalAnimation_6'));

export default function FirstScreen({ eventDetails, childVariants }) {
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

	const optionalDescription = optional_description
		? optional_description
		: `${moment(event_date).format('DD.MM.YYYY')}\n ${event_location ? event_location : ''}`;

	const firstScreenProps = {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		optional_description: optionalDescription,
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
			return <FirstScreenIslamicAnimation_1 {...firstScreenProps} childVariants={childVariants} />;
		case 6:
			return <FirstScreenIslamicAnimation_2 {...firstScreenProps} childVariants={childVariants} />;
		case 7:
			return <FirstScreenIslamicAnimation_3 {...firstScreenProps} childVariants={childVariants} />;
		case 20:
			return (
				<FirstScreenPremiumAnimation
					premium_design={0}
					{...firstScreenProps}
					childVariants={childVariants}
				/>
			);
		case 21:
			return (
				<FirstScreenPremiumAnimation
					premium_design={1}
					{...firstScreenProps}
					childVariants={childVariants}
				/>
			);
		case 22:
			return (
				<FirstScreenPremiumAnimation
					premium_design={2}
					{...firstScreenProps}
					childVariants={childVariants}
				/>
			);
		case 23:
			return (
				<FirstScreenPremiumAnimation
					premium_design={3}
					{...firstScreenProps}
					childVariants={childVariants}
				/>
			);
		case 24:
			return (
				<FirstScreenPremiumAnimation
					premium_design={4}
					{...firstScreenProps}
					childVariants={childVariants}
				/>
			);
		case 25:
			return (
				<FirstScreenPremiumAnimation
					premium_design={5}
					{...firstScreenProps}
					childVariants={childVariants}
				/>
			);
		case 26:
			return (
				<FirstScreenPremiumAnimation
					premium_design={6}
					{...firstScreenProps}
					childVariants={childVariants}
				/>
			);
		case 27:
			return (
				<FirstScreenPremiumAnimation
					premium_design={7}
					{...firstScreenProps}
					childVariants={childVariants}
				/>
			);
		case 30:
			return <FirstScreenRoyalAnimation_1 {...firstScreenProps} childVariants={childVariants} />;
		case 31:
			return <FirstScreenRoyalAnimation_2 {...firstScreenProps} childVariants={childVariants} />;
		case 32:
			return <FirstScreenRoyalAnimation_3 {...firstScreenProps} childVariants={childVariants} />;
		case 33:
			return <FirstScreenRoyalAnimation_4 {...firstScreenProps} childVariants={childVariants} />;
		case 34:
			return <FirstScreenRoyalAnimation_5 {...firstScreenProps} childVariants={childVariants} />;
		case 35:
			return <FirstScreenRoyalAnimation_6 {...firstScreenProps} childVariants={childVariants} />;
		case 40:
			return <FirstScreenRustic_1 {...firstScreenProps} childVariants={childVariants} />;
		case 41:
			return <FirstScreenRustic_2 {...firstScreenProps} childVariants={childVariants} />;
		case 42:
			return <FirstScreenRustic_3 {...firstScreenProps} childVariants={childVariants} />;
		case 50:
			return <FirstScreenVintage_1 {...firstScreenProps} childVariants={childVariants} />;
		case 51:
			return <FirstScreenVintage_2 {...firstScreenProps} childVariants={childVariants} />;
		case 52:
			return <FirstScreenVintage_3 {...firstScreenProps} childVariants={childVariants} />;
		case 60:
			return <FirstScreenDefaultAnimation {...firstScreenProps} childVariants={childVariants} />;
		default:
			return <FirstScreenDefault {...firstScreenProps} />;
	}
}
