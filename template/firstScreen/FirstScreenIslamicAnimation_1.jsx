/** @format */

import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
import { motion } from 'framer-motion';
//Components import
import Bismillah from './components/Bismillah';
import IslamicTitleAnimation from './components/titles/IslamicTitleAnimation';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

const fontColor = '#A98F21';

const TextDetail = ({ children }) => {
	return (
		<InviteTextProvider fontFamily='sansPro' color={fontColor} className='text-sm tracking-wider'>
			{children}
		</InviteTextProvider>
	);
};

export default function FirstScreenIslamic_1({
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
		<div className='w-full bg-[#FFFBF0]  min-h-[100dvh] sm:min-h-[800px]  flex justify-center items-center'>
			<div
				className='w-full relative  flex justify-center items-center'
				style={{ minHeight: windowWidth < 500 ? windowWidth * 1.8 : 780 }}>
				<Image
					className='h-full z-0'
					src='/nikah-12.png'
					alt='Nikah 12'
					layout='fill'
					quality={100}
					priority
					// objectFit='cover'
					objectPosition='center'
				/>
				<div
					className='w-full flex justify-center items-center flex-col gap-12 mt-6 p-5 z-1 relative'
					style={{ maxWidth: '300px' }}>
					<motion.div variants={childVariants}>
						<Bismillah />
					</motion.div>
					<IslamicTitleAnimation
						italic_title={italic_title}
						childVariants={childVariants}
						color={fontColor}
					/>
					<div className='flex flex-col gap-5 text-center uppercase text-xs'>
						<motion.div variants={childVariants}>
							<TextDetail fontFamily='sansPro' color={fontColor}>
								{event_title_1}
							</TextDetail>
						</motion.div>
						{optional_description && (
							<motion.div variants={childVariants}>
								<TextDetail fontFamily='sansPro' color={fontColor}>
									<div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
										{optional_description}
									</div>
								</TextDetail>
							</motion.div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
