/** @format */

import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
//Components import
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

const fontColor = '#1D4648';

const TextDetail = ({ children, className }) => {
	return (
		<InviteTextProvider fontFamily='playfair' color={fontColor} className={className}>
			{children}
		</InviteTextProvider>
	);
};

export default function FirstScreenRustic_1({
	event_title_1 = 'Event Title 1',
	optional_description = '',
	italic_title = 'Main Title',
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
				className='w-full relative flex justify-center items-start pt-[210px]'
				style={{ minHeight: windowWidth < 500 ? windowWidth * 1.77 : 780 }}>
				<Image
					className='h-full z-0'
					src='/rustic-1.png'
					alt='Rustic 1'
					height
					layout='fill'
					quality={100}
					priority
					// objectFit='cover'
					objectPosition='center'
				/>
				<div
					className='w-full h-full flex justify-center items-center flex-col gap-5 mt-6 z-0 relative'
					style={{ maxWidth: '200px' }}>
					<TextDetail className='tracking-wide uppercase text-center'>{event_title_1}</TextDetail>
					<TextDetail
						className='text-[24px] font-medium text-center whitespace-pre-line tracking-wider uppercase '
						color={fontColor}>
						{italic_title}
					</TextDetail>
					{optional_description ? (
						<TextDetail className='text-center uppercase' color={fontColor}>
							<div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{optional_description}</div>
						</TextDetail>
					) : null}
				</div>
			</div>
		</div>
	);
}
