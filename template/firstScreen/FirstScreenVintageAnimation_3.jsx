/** @format */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { letterVariants } from '../animationProps';
import Image from 'next/legacy/image';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

const fontColor = '#7590CC';

const TextDetail = ({ children, className }) => {
	return (
		<InviteTextProvider fontFamily='sansPro' color={fontColor} className={className}>
			{children}
		</InviteTextProvider>
	);
};

const TextTitle = ({ children, className }) => {
	return (
		<InviteTextProvider fontFamily='playfair' color='#3C6FD2' className={className}>
			{children}
		</InviteTextProvider>
	);
};

export default function FirstScreenVintage_3({
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
		<div className='w-full  flex justify-center items-center'>
			<div
				className='w-full relative flex justify-center items-center'
				style={{ minHeight: windowWidth < 500 ? windowWidth * 1.77 : 760 }}>
				<Image
					className='h-full z-0'
					src='/vintage-3.png'
					alt='Rustic 1'
					layout='fill'
					quality={50}
					priority
					objectPosition='center'
				/>
				<div
					className='w-full h-full flex justify-center items-center flex-col gap-5 mt-6 z-0 relative'
					style={{ maxWidth: '200px' }}>
					<motion.div variants={childVariants}>
						<TextDetail className='tracking-wider uppercase text-[13px] text-center'>
							{event_title_1}
						</TextDetail>
					</motion.div>
					<motion.div variants={childVariants}>
						<TextTitle className='text-[24px] flex flex-col font-medium text-center whitespace-pre-line tracking-wider uppercase '>
							{italic_title.split('\n').map((char, index) => (
								<motion.span key={char + '-' + index} variants={letterVariants}>
									{char}
								</motion.span>
							))}
						</TextTitle>
					</motion.div>
					{optional_description ? (
						<motion.div variants={childVariants}>
							<TextDetail
								className='text-center tracking-wider text-[13px] uppercase'
								color={fontColor}>
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
