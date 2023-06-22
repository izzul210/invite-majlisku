/** @format */

import React from 'react';
import moment from 'moment/moment';
import 'moment/locale/ms-my';
import 'moment/locale/en-ca';
//Data import
import { activitiesData, contactData, wishlistData } from '../hooks/useFakeInviteData';
import { styleProps } from '../hooks/useInviteStylesProps';
//Assets import
import defaultImage from '../../../assets/images/dashboard-image.png';
//Components import
import { FirstScreenWithImage } from '../inviteComponents/firstScreen/FirstScreen';
import { GreetingScreenDefault } from '../inviteComponents/greetingScreen/GreetingScreen';
import { EventDetails } from '../inviteComponents/eventDetails/EventDetail';
import { Tentative } from '../inviteComponents/tentative/Tentative';
import { ContactDetails } from '../inviteComponents/contactDetails/ContactDetails';
import { Wishes } from '../inviteComponents/wishes/Wishes';
import { Calendar } from '../inviteComponents/calendar/Calendar';

const InviteTemplateDefault = ({
	event_title_1 = 'Walimatulurus',
	italic_title = '',
	event_title_2 = 'Izzul Syazwan\n&\nNurul Syafiqah',
	event_address = 'Plaza Alam Sentral,\nShah Alam, Selangor',
	waze_link = null,
	google_link = null,
	event_location = null,
	guest = null,
	event_date = '2022-10-15',
	rsvp_header_image = defaultImage,
	hosts = 'Mohd Rizal bin Johari\n&\nZubaidah binti Mohd Isa',
	event_start = '2022-09-18 11:30',
	event_end = '2022-09-18 15:00',
	event_theme_title = 'Dress Code',
	event_theme_description = 'Lelaki: Baju Melayu/Batik\nPerempuan: Baju Kurung/Bersesuaian',
	top_greeting,
	greeting_1 = 'Dengan segala hormatnya kami\n mempersilakan',
	greeting_2 = 'ke majlis resepsi untuk meraikan majlis kami',
	greeting_title = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato's Sri/ Datin Sri/ Dato'/ Datin/ Tuan/ Puan`,
	malay = false,
	enable_itinerary = false,
	type = 'default',
	first_screen_design = 1,
	greeting_screen_design = 1,
	event_details_design = 1,
	tentative_design = 1,
	contact_design = 1,
	wishes_design = 1,
	calendar_design = 1,
	tentative = activitiesData,
	contacts = contactData,
	wishlist = [],
	enable_gift_registry = false,
	enable_money_gift = false,
	enable_wishes = false,
	onClickRSVP = () => {},
	onClickGiftRegistry = () => {},
	onClickMoneyGifts = () => {},
}) => {
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

	const firstScreenProps = styleProps.find((obj) => obj.id === first_screen_design);
	const greetingScreenProps = styleProps.find((obj) => obj.id === greeting_screen_design);
	const eventDetailsProps = styleProps.find((obj) => obj.id === event_details_design);
	const tentativeProps = styleProps.find((obj) => obj.id === tentative_design);
	const contactProps = styleProps.find((obj) => obj.id === contact_design);
	const wishesProps = styleProps.find((obj) => obj.id === wishes_design);
	const calendarProps = styleProps.find((obj) => obj.id === calendar_design);

	const detailType = type === 'default' ? 'default' : 'minimal';

	return (
		<div className='invite-canvas'>
			<div className='invite-card'>
				<FirstScreenWithImage
					type={type}
					event_title_1={event_title_1}
					italic_title={italic_title}
					event_start={event_start}
					event_end={event_end}
					rsvp_header_image={rsvp_header_image}
					event_date={event_date}
					event_address={event_location}
					theme={firstScreenProps}
				/>
				<GreetingScreenDefault
					type={type}
					theme={greetingScreenProps}
					hosts={hosts}
					guest={guest}
					event_title_2={event_title_2}
					greet_content_1={greeting_1}
					greet_content_2={greeting_2}
					greeting_title={greeting_title}
					enable_gift_registry={enable_gift_registry}
					enable_money_gift={enable_money_gift}
					malay={malay}
					onClickRSVP={onClickRSVP}
					onClickGiftRegistry={onClickGiftRegistry}
					onClickMoneyGifts={onClickMoneyGifts}
				/>
				<EventDetails
					type={type === 'minimal2' ? 'minimal' : 'default'}
					event_date={event_date}
					event_start={event_start}
					event_end={event_end}
					event_address={event_address}
					event_theme_title={event_theme_title}
					event_theme_description={event_theme_description}
					waze_link={waze_link}
					google_link={google_link}
					theme={eventDetailsProps}
				/>
				{enable_itinerary && tentative?.length > 0 ? (
					<Tentative type={detailType} tentative={tentative} theme={tentativeProps} malay={malay} />
				) : null}
				{contacts[0]?.name !== '' || contacts[0]?.phone !== '' ? (
					<ContactDetails
						type={detailType}
						theme={contactProps}
						contacts={contacts}
						malay={malay}
					/>
				) : null}
				{enable_wishes && wishlist?.length > 0 ? (
					<Wishes type={detailType} theme={wishesProps} wishlist={wishlist} malay={malay} />
				) : null}
				<Calendar
					type={detailType}
					theme={calendarProps}
					event_title_2={event_title_2}
					event_start={event_start}
					event_end={event_end}
					event_address={event_address}
					event_date={event_date}
					malay={malay}
				/>
			</div>
		</div>
	);
};

export default InviteTemplateDefault;
