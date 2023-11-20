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

export default function GreetingScreen({ eventDetails }) {
	const {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
		event_date,
	} = eventDetails || {};
	const { design, premium_design } = useInviteContext();

	const handleOnClickGift = () => {};
	const handleOnClickMoneyGift = () => {};

	const greetingScreenProps = {
		enable_bahasa,
		host_details,
		event_title_2,
		greeting_title,
		greet_content_1,
		greet_content_2,
		enable_gift_registry,
		enable_money_gift,
	};

	switch (design) {
		case 3:
			return <GreetingScreenPremium premium_design={premium_design} {...greetingScreenProps} />;
		case 5:
		case 7:
			return <GreetingScreenIslamic_1 premium_design={premium_design} {...greetingScreenProps} />;
		case 6:
			return <GreetingScreenIslamic_2 premium_design={premium_design} {...greetingScreenProps} />;
		default:
			return (
				<>
					<GreetingScreenDefaultNoAnimation
						{...greetingScreenProps}
						onClickGiftRegistry={handleOnClickGift}
						onClickMoneyGift={handleOnClickMoneyGift}
					/>
				</>
			);
	}
}
