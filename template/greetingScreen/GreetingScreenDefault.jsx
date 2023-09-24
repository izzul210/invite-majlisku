/** @format */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import { MajliskuIconV3, GiftIcon, MoneyGift } from '../../component/icons/icons';
import {
	HostsText,
	GreetingText,
	GreetingText_Premium,
	GreetingTitle,
	MainTitle,
	ButtonProvider,
} from './components/greetingScreenComponents';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';

export default function GreetingScreenDefault({
	enable_bahasa = false,
	host_details = `Simpulan bin Simpulan\n &\n Simpulan binti Simpulan`,
	guest = null,
	event_title_2 = 'Pengantin Lelaki bin Simpulan\n&Pengantin Wanita binti Simpulan',
	greeting_title = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
	greet_content_1 = 'Dengan segala hormatnya kami\n mempersilakan',
	greet_content_2 = 'ke majlis resepsi untuk meraikan majlis',
	enable_gift_registry = false,
	enable_money_gift = false,
	onClickRSVP = () => {},
	onClickGiftRegistry = () => {},
	onClickMoneyGift = () => {},
}) {
	const { useConvertText } = useInviteFunc();
	const [ref, inView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.5, // Defines at what percentage of the component's height the animation should start
		}) || [];

	let renderHosts = useConvertText(host_details);
	let renderEventTitle = useConvertText(event_title_2);

	const container = {
		visible: {
			transition: {
				staggerChildren: 0.7,
				duration: 2,
				delay: 1,
			},
		},
	};

	const variants = {
		hidden: { opacity: 0.2, transform: 'translateY(30%)', filter: 'blur(20px)' },
		visible: {
			opacity: 1,
			transform: 'translateY(0%)',
			filter: 'blur(0px)',
		},
	};

	return (
		<div
			className='w-full text-center border-t flex flex-col items-center justify-center gap-12 py-10 sm:py-20'
			style={{ minHeight: '600px' }}>
			<motion.div
				ref={ref}
				initial='hidden'
				variants={container}
				animate={inView ? 'visible' : 'hidden'}
				className='w-full flex flex-col gap-4 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<motion.div className='w-full' variants={variants}>
					<InviteLineLogo height='2px' />
					<div className='pb-4 border-b-2 w-full border-dotted'>
						<HostsText>{renderHosts}</HostsText>
					</div>
				</motion.div>
				<motion.div className='flex flex-col gap-4' variants={variants}>
					<motion.div className='w-full' variants={variants}>
						<GreetingText>{greet_content_1}</GreetingText>
					</motion.div>
					<motion.div className='w-full' variants={variants}>
						<GreetingTitle>{greeting_title}</GreetingTitle>
					</motion.div>
					<motion.div className='w-full' variants={variants}>
						<GreetingText>{greet_content_2}</GreetingText>
					</motion.div>
				</motion.div>
				<motion.div className='flex w-full items-center flex-col gap-4' variants={variants}>
					<MajliskuIconV3 />
					<MainTitle>{renderEventTitle}</MainTitle>
					<MajliskuIconV3 />
				</motion.div>
				<motion.div className='w-full flex flex-row justify-center' variants={variants}>
					<div
						className='w-full flex flex-col gap-2'
						style={{ maxWidth: '290px' }}
						variants={variants}>
						<ButtonProvider type='primary' onClick={() => onClickRSVP()}>
							<InviteTextProvider className='uppercase' color='white'>
								RSVP
							</InviteTextProvider>
						</ButtonProvider>

						{enable_gift_registry && (
							<ButtonProvider onClick={onClickGiftRegistry}>
								<GiftIcon />
								<InviteTextProvider className='uppercase'>
									{enable_bahasa ? 'Bawa Hadiah' : 'Gift Registry'}
								</InviteTextProvider>
							</ButtonProvider>
						)}

						{enable_money_gift && (
							<ButtonProvider onClick={onClickMoneyGift}>
								<MoneyGift />
								<InviteTextProvider className='uppercase'>
									{enable_bahasa ? 'Salam Kaut' : 'Money Gift'}
								</InviteTextProvider>
							</ButtonProvider>
						)}
					</div>
				</motion.div>
			</motion.div>
		</div>
	);
}
