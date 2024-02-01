/** @format */
'use client';
import dynamic from 'next/dynamic';
import { useInviteContext } from '../inviteContext';
//Template import
const GreetingScreenPremium = dynamic(() => import('./GreetingScreenPremium'));
const GreetingScreenDefaultNoAnimation = dynamic(() =>
	import('./GreetingScreenDefaultNoAnimation')
);
const GreetingScreenDefault = dynamic(() => import('./GreetingScreenDefault'));
const GreetingScreenIslamic_1 = dynamic(() => import('./GreetingScreenIslamic_1'));
const GreetingScreenIslamic_2 = dynamic(() => import('./GreetingScreenIslamic_2'));
const GreetingScreenRoyal = dynamic(() => import('./GreetingScreenRoyal'));
const GreetingScreenRustic = dynamic(() => import('./GreetingScreenRustic'));
const GreetingScreenVintage = dynamic(() => import('./GreetingScreenVintage'));
//Animated Greeting Screen
const GreetingScreenRoyalAnimation = dynamic(() => import('./GreetingScreenRoyalAnimation'));
const GreetingScreenPremiumAnimation = dynamic(() => import('./GreetingScreenPremiumAnimation'));

export default function GreetingScreen({ eventDetails, guest_name = null, preview = false }) {
	const {
		enable_bahasa,
		event_opening_title,
		host_details,
		event_title_2,
		greeting_title,
		greeting_1,
		greeting_2,
		event_date_deadline,
		enable_deadline,
		enable_gift_registry,
		enable_money_gift,
	} = eventDetails || {};
	const { design, premium_design } = useInviteContext();

	const greetingScreenProps = {
		enable_bahasa,
		event_opening_title,
		host_details,
		event_title_2,
		greeting_title,
		greeting_1,
		greeting_2,
		//For RSVP
		event_date_deadline,
		enable_deadline,
		enable_gift_registry,
		enable_money_gift,
		//type
		guest_name,
		preview,
	};

	switch (design) {
		case 5:
		case 7:
			return <GreetingScreenIslamic_1 premium_design={premium_design} {...greetingScreenProps} />;
		case 6:
			return <GreetingScreenIslamic_2 premium_design={premium_design} {...greetingScreenProps} />;
		case 20:
			return <GreetingScreenPremiumAnimation premium_design={0} {...greetingScreenProps} />;
		case 21:
			return <GreetingScreenPremiumAnimation premium_design={1} {...greetingScreenProps} />;
		case 22:
			return <GreetingScreenPremiumAnimation premium_design={2} {...greetingScreenProps} />;
		case 23:
			return <GreetingScreenPremiumAnimation premium_design={3} {...greetingScreenProps} />;
		case 24:
			return <GreetingScreenPremiumAnimation premium_design={4} {...greetingScreenProps} />;
		case 25:
			return <GreetingScreenPremiumAnimation premium_design={5} {...greetingScreenProps} />;
		case 26:
			return <GreetingScreenPremiumAnimation premium_design={6} {...greetingScreenProps} />;
		case 27:
			return <GreetingScreenPremiumAnimation premium_design={7} {...greetingScreenProps} />;
		case 30:
		case 31:
		case 32:
		case 33:
		case 34:
		case 35:
			return <GreetingScreenRoyalAnimation {...greetingScreenProps} />;
		case 40:
		case 41:
		case 42:
			return <GreetingScreenRustic {...greetingScreenProps} />;
		case 50:
		case 51:
		case 52:
			return <GreetingScreenVintage {...greetingScreenProps} />;
		case 60:
			return <GreetingScreenDefault {...greetingScreenProps} />;
		default:
			return (
				<>
					<GreetingScreenDefaultNoAnimation {...greetingScreenProps} />
				</>
			);
	}
}
