/** @format */

import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';
//Components import
import RoyalTitle from './components/titles/RoyalTitle';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

const fontColor = '#C3AB64';

const TextDetail = ({ children }) => {
	return (
		<InviteTextProvider
			fontFamily='ebGaramond'
			color={fontColor}
			className='tracking-wider text-[12px] uppercase text-center'>
			{children}
		</InviteTextProvider>
	);
};

export default function FirstScreenRoyal_4({
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
					src='/royal-4.png'
					alt='Royal 1'
					height
					layout='fill'
					quality={100}
					priority
					// objectFit='cover'
					objectPosition='center'
				/>
				<div
					className='w-full h-full flex justify-center items-center flex-col gap-3 z-0 relative'
					style={{ maxWidth: '300px', paddingTop: 155 }}>
					<motion.div variants={childVariants}>
						<TextDetail color={fontColor} className='tracking-wide'>
							{event_title_1}
						</TextDetail>
					</motion.div>
					<motion.div variants={childVariants} className='w-full flex justify-center'>
						<RoyalTitle color={fontColor}>{italic_title}</RoyalTitle>
					</motion.div>
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
	);
}
