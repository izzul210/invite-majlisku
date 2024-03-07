/** @format */
'use client';
import moment from 'moment';
import dynamic from 'next/dynamic';
import React, { useEffect } from 'react';
import { useInviteContext } from '../inviteContext';
//Animated template imports
const FirstScreenVideoCover = dynamic(() => import('./FirstScreenVideoCover'));
const FirstScreenImageCover = dynamic(() => import('./FirstScreenImageCover'));
const FirstScreenDefaultAnimation = dynamic(() => import('./FirstScreenDefaultAnimation'));
const FirstScreenMinimalAnimation_1 = dynamic(() => import('./FirstScreenMinimalAnimation_1'));
const FirstScreenMinimalAnimation_2 = dynamic(() => import('./FirstScreenMinimalAnimation_2'));
const FirstScreenMinimalAnimation_3 = dynamic(() => import('./FirstScreenMinimalAnimation_3'));
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
const FirstScreenRusticAnimation_1 = dynamic(() => import('./FirstScreenRusticAnimation_1'));
const FirstScreenRusticAnimation_2 = dynamic(() => import('./FirstScreenRusticAnimation_2'));
const FirstScreenRusticAnimation_3 = dynamic(() => import('./FirstScreenRusticAnimation_3'));
const FirstScreenVintageAnimation_1 = dynamic(() => import('./FirstScreenVintageAnimation_1'));
const FirstScreenVintageAnimation_2 = dynamic(() => import('./FirstScreenVintageAnimation_2'));
const FirstScreenVintageAnimation_3 = dynamic(() => import('./FirstScreenVintageAnimation_3'));

export default function FirstScreen({ childVariants }) {
	const { design, eventDetails } = useInviteContext();
	const {
		event_title_1,
		rsvp_header_image,
		rsvp_header_image_file,
		event_date,
		event_location,
		italic_title,
		event_time,
		optional_description,
		enable_cover,
		video_cover_url,
		image_cover_url,
		cover_url,
	} = eventDetails || {};

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
		enable_cover,
		video_cover_url,
		image_cover_url,
		cover_url,
	};

	if (enable_cover && cover_url && cover_url === video_cover_url) {
		return <FirstScreenVideoCover {...firstScreenProps} />;
	} else if (enable_cover && cover_url && cover_url === image_cover_url) {
		return <FirstScreenImageCover {...firstScreenProps} />;
	} else {
		switch (design) {
			case 1:
				return (
					<FirstScreenMinimalAnimation_2 {...firstScreenProps} childVariants={childVariants} />
				);
			case 2:
				return (
					<FirstScreenMinimalAnimation_1 {...firstScreenProps} childVariants={childVariants} />
				);
			case 3:
				return (
					<FirstScreenMinimalAnimation_3 {...firstScreenProps} childVariants={childVariants} />
				);
			case 5:
				return (
					<FirstScreenIslamicAnimation_1 {...firstScreenProps} childVariants={childVariants} />
				);
			case 6:
				return (
					<FirstScreenIslamicAnimation_2 {...firstScreenProps} childVariants={childVariants} />
				);
			case 7:
				return (
					<FirstScreenIslamicAnimation_3 {...firstScreenProps} childVariants={childVariants} />
				);
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
				return <FirstScreenRusticAnimation_1 {...firstScreenProps} childVariants={childVariants} />;
			case 41:
				return <FirstScreenRusticAnimation_2 {...firstScreenProps} childVariants={childVariants} />;
			case 42:
				return <FirstScreenRusticAnimation_3 {...firstScreenProps} childVariants={childVariants} />;
			case 50:
				return (
					<FirstScreenVintageAnimation_1 {...firstScreenProps} childVariants={childVariants} />
				);
			case 51:
				return (
					<FirstScreenVintageAnimation_2 {...firstScreenProps} childVariants={childVariants} />
				);
			case 52:
				return (
					<FirstScreenVintageAnimation_3 {...firstScreenProps} childVariants={childVariants} />
				);
			case 60:
				return <FirstScreenDefaultAnimation {...firstScreenProps} childVariants={childVariants} />;
			default:
				return <FirstScreenDefaultAnimation {...firstScreenProps} />;
		}
	}
}
