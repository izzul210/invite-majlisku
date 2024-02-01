/** @format */
import { motion } from 'framer-motion';
import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
//Components import
import RoyalTitle from './components/titles/RoyalTitle';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

const fontColor = '#C3AB64';

const TextDetail = ({ children }) => {
	return (
		<InviteTextProvider
			fontFamily='ebGaramond'
			color={fontColor}
			className='tracking-wider uppercase text-center'>
			{children}
		</InviteTextProvider>
	);
};

export default function FirstScreenRoyal_3({
	event_title_1 = 'Event Title 1',
	optional_description = '',
	italic_title = 'Main Title',
	childVariants,
}) {
	const [windowWidth, setWindowWidth] = useState(0);

	useEffect(() => {
		setWindowWidth(window.innerWidth);

		const handleResize = () => {
			setWindowWidth(window.innerWidth);
		};

		window.addEventListener('resize', handleResize);

		return () => {
			window.removeEventListener('resize', handleResize);
		};
	}, []);

	return (
		<div className='w-full bg-[#FFFDFA] flex justify-center items-center'>
			<div
				className='w-full relative flex justify-center items-center'
				style={{ minHeight: windowWidth < 500 ? windowWidth * 1.8 : 780 }}>
				<Image
					className='h-full z-0'
					src='/royal-3.png'
					alt='Royal 1'
					height
					layout='fill'
					quality={100}
					priority
					// objectFit='cover'
					objectPosition='center'
				/>
				<div
					className='w-full h-full flex justify-center items-center flex-col  z-0 relative'
					style={{ maxWidth: '300px' }}>
					<div className='h-[190px] w-full flex justify-center items-start'>
						<motion.div variants={childVariants}>
							<TextDetail color={fontColor} className='tracking-wide'>
								{event_title_1}
							</TextDetail>
						</motion.div>
					</div>
					<motion.div
						className='h-[140px] w-full  flex justify-center items-center'
						variants={childVariants}>
						<RoyalTitle color={fontColor}>{italic_title}</RoyalTitle>
					</motion.div>
					<div className='h-[245px] w-full  flex justify-center items-end'>
						{optional_description ? (
							<motion.div variants={childVariants}>
								<TextDetail color={fontColor}>
									<div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
										{optional_description}
									</div>
								</TextDetail>
							</motion.div>
						) : null}
					</div>
				</div>
			</div>
		</div>
	);
}
