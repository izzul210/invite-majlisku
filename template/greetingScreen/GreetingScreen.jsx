/** @format */
'use client';
import dynamic from 'next/dynamic';
import { useInviteContext } from '../inviteContext';
//Template import
const GreetingScreenPremium = dynamic(() => import('./GreetingScreenPremium'));
const GreetingScreenDefaultNoAnimation = dynamic(() =>
	import('./GreetingScreenDefaultNoAnimation')
);
const GreetingScreenIslamic_1 = dynamic(() => import('./GreetingScreenIslamic_1'));
const GreetingScreenIslamic_2 = dynamic(() => import('./GreetingScreenIslamic_2'));

export default function GreetingScreen({ eventDetails, guest_name = null }) {
	const {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
	} = eventDetails || {};
	const { design, premium_design } = useInviteContext();

	const greetingScreenProps = {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
		guest_name,
	};

	switch (design) {
		case 3:
			return <GreetingScreenPremium premium_design={premium_design} {...greetingScreenProps} />;
		case 5:
		case 7:
			return <GreetingScreenIslamic_1 premium_design={premium_design} {...greetingScreenProps} />;
		case 6:
			return <GreetingScreenIslamic_2 premium_design={premium_design} {...greetingScreenProps} />;
		case 20:
			return <GreetingScreenPremium premium_design={0} {...greetingScreenProps} />;
		case 21:
			return <GreetingScreenPremium premium_design={1} {...greetingScreenProps} />;
		case 22:
			return <GreetingScreenPremium premium_design={2} {...greetingScreenProps} />;
		case 23:
			return <GreetingScreenPremium premium_design={3} {...greetingScreenProps} />;
		case 24:
			return <GreetingScreenPremium premium_design={4} {...greetingScreenProps} />;
		case 25:
			return <GreetingScreenPremium premium_design={5} {...greetingScreenProps} />;
		case 26:
			return <GreetingScreenPremium premium_design={6} {...greetingScreenProps} />;
		case 27:
			return <GreetingScreenPremium premium_design={7} {...greetingScreenProps} />;
		default:
			return (
				<>
					<GreetingScreenDefaultNoAnimation {...greetingScreenProps} />
				</>
			);
	}
}
