/** @format */

import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//Components import
import { premiumColorTheme } from '../colorThemes';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteLineLogo from '../../component/misc/InviteLineLogo';
import { MajliskuIconV3, GiftIcon, MoneyGift } from '../../component/icons/icons';
import { Graphic_1, Ellipse_1 } from '../../component/graphics/graphics';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';

//Greeting Components
const HostsText = ({ children, color = '#1D4648' }) => {
	return (
		<InviteTextProvider className='text-sm font-medium uppercase' color={color}>
			{children}
		</InviteTextProvider>
	);
};

const GreetingText = ({ children }) => {
	return <InviteTextProvider className='text-base'>{children}</InviteTextProvider>;
};

const GreetingText_Premium = ({ children, color = '#F1BFBE' }) => {
	return (
		<InviteTextProvider className='text-base' color={color}>
			{children}
		</InviteTextProvider>
	);
};

const GreetingTitle = ({ children, color = '#1E1E1E' }) => {
	return (
		<InviteTextProvider fontFamily='playfair' color={color} className='text-sm font-semibold'>
			{children}
		</InviteTextProvider>
	);
};

const MainTitle = ({ children, color = '#1D4648' }) => {
	return (
		<InviteTextProvider color={color} className='text-xl font-medium uppercase'>
			{children}
		</InviteTextProvider>
	);
};

const ButtonProvider = ({ type = null, children, ...props }) => {
	return (
		<div
			className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
			style={
				type === 'primary'
					? { color: 'white', backgroundColor: '#1E1E1E', border: ' 1px solid #1E1E1E' }
					: { color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #D0D5DD' }
			}
			{...props}>
			{children}
		</div>
	);
};

//////// Greeting Screen Templates
export const GreetingScreenPremium = ({
	enable_bahasa = false,
	host_details = `Simpulan bin Simpulan\n &\n Simpulan binti Simpulan`,
	guest = null,
	event_title_2 = 'Pengantin Lelaki bin Simpulan\n&Pengantin Wanita binti Simpulan',
	greeting_title = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
	greet_content_1 = 'Dengan segala hormatnya kami\n mempersilakan',
	greet_content_2 = 'ke majlis resepsi untuk meraikan majlis',
	premium_design = 0,
}) => {
	const { useConvertText } = useInviteFunc();

	//Extract premium color:
	const { backgroundColor, greetingColor, fill, titleColor } = premiumColorTheme[premium_design];

	let renderHosts = useConvertText(host_details);
	let renderEventTitle = useConvertText(event_title_2);

	return (
		<div
			className='w-full text-center flex flex-col items-center justify-center gap-12 pt-10'
			style={{
				minHeight: '600px',
				background: backgroundColor,
				transform: 'translateY(-1%)',
				position: 'relative',
			}}>
			<Ellipse_1
				fill={fill}
				className='ellipse-2'
				style={{ position: 'absolute', top: -80, right: -40, zIndex: 1 }}
			/>
			<div
				className='w-full flex flex-col gap-6 items-center px-5  bg-white pt-20 rounded-t-full'
				style={{ zIndex: 3 }}>
				<GreetingText_Premium color={greetingColor}>
					Assalamualaikum dan salam sejahtera
				</GreetingText_Premium>
				<HostsText color={titleColor}>{renderHosts}</HostsText>
				<div className='flex flex-col gap-4'>
					<GreetingText_Premium color={greetingColor}>{greet_content_1}</GreetingText_Premium>
					<GreetingTitle color={titleColor}>{greeting_title}</GreetingTitle>
					<GreetingText_Premium color={greetingColor}>{greet_content_2}</GreetingText_Premium>
				</div>
				<div className='flex w-full items-center flex-col pt-8 gap-4'>
					<MainTitle color={titleColor}>{renderEventTitle}</MainTitle>
				</div>
				<div className='w-full flex justify-center' style={{ transform: 'translateY(50%)' }}>
					<Graphic_1 fill={fill} className='graphic-1' width='177' height='177' />
				</div>
			</div>
			<div
				className='w-full h-[90px] z-10'
				style={{ background: backgroundColor, transform: 'translateY(-55%)' }}></div>
		</div>
	);
};

// export const GreetingScreenDefault = ({
// 	enable_bahasa = false,
// 	host_details = `Simpulan bin Simpulan\n &\n Simpulan binti Simpulan`,
// 	guest = null,
// 	event_title_2 = 'Pengantin Lelaki bin Simpulan\n&Pengantin Wanita binti Simpulan',
// 	greeting_title = `Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan`,
// 	greet_content_1 = 'Dengan segala hormatnya kami\n mempersilakan',
// 	greet_content_2 = 'ke majlis resepsi untuk meraikan majlis',
// 	enable_gift_registry = false,
// 	enable_money_gift = false,
// 	onClickRSVP = () => {},
// 	onClickGiftRegistry = () => {},
// 	onClickMoneyGift = () => {},
// }) => {
// 	const { useConvertText } = useInviteFunc();

// 	let renderHosts = useConvertText(host_details);
// 	let renderEventTitle = useConvertText(event_title_2);

// 	return (
// 		<div
// 			className='w-full text-center border-t flex flex-col items-center justify-center gap-12 py-10 sm:py-20'
// 			style={{ minHeight: '600px' }}>
// 			<div
// 				className='w-full flex flex-col gap-4 items-center px-5 sm:p-0'
// 				style={{ maxWidth: '400px' }}>
// 				<InviteLineLogo height='2px' />
// 				<div className='pb-4 border-b-2 w-full border-dotted'>
// 					<HostsText>{renderHosts}</HostsText>
// 				</div>
// 				<div className='flex flex-col gap-4'>
// 					<GreetingText>{greet_content_1}</GreetingText>
// 					<GreetingTitle>{greeting_title}</GreetingTitle>
// 					<GreetingText>{greet_content_2}</GreetingText>
// 				</div>
// 				<div className='flex w-full items-center flex-col gap-4'>
// 					<MajliskuIconV3 />
// 					<MainTitle>{renderEventTitle}</MainTitle>
// 					<MajliskuIconV3 />
// 				</div>
// 			</div>
// 			<div className='w-full flex flex-col gap-2' style={{ maxWidth: '290px' }}>
// 				<ButtonProvider type='primary' onClick={() => onClickRSVP()}>
// 					<InviteTextProvider className='uppercase' color='white'>
// 						RSVP
// 					</InviteTextProvider>
// 				</ButtonProvider>
// 				{enable_gift_registry && (
// 					<ButtonProvider onClick={onClickGiftRegistry}>
// 						<GiftIcon />
// 						<InviteTextProvider className='uppercase'>
// 							{enable_bahasa ? 'Bawa Hadiah' : 'Gift Registry'}
// 						</InviteTextProvider>
// 					</ButtonProvider>
// 				)}
// 				{enable_money_gift && (
// 					<ButtonProvider onClick={onClickMoneyGift}>
// 						<MoneyGift />
// 						<InviteTextProvider className='uppercase'>
// 							{enable_bahasa ? 'Salam Kaut' : 'Money Gift'}
// 						</InviteTextProvider>
// 					</ButtonProvider>
// 				)}
// 			</div>
// 		</div>
// 	);
// };

export const GreetingScreenDefault = ({
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
}) => {
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
};
