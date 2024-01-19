/** @format */
import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';
//Components import
import RoyalTitle from './components/titles/RoyalTitle';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

const fontColor = '#A98F21';

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

export default function FirstScreenRoyal_1({
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
		<div className='w-full bg-[#FFFDFA] flex justify-center items-center'>
			<div
				className='w-full relative flex justify-center items-center'
				style={{ minHeight: windowWidth < 500 ? windowWidth * 1.78 : 780 }}>
				<Image
					className='h-full z-0'
					src='/royal-1.png'
					alt='Royal 1'
					height
					layout='fill'
					quality={100}
					priority
					// objectFit='cover'
					objectPosition='center'
				/>
				<div
					className='w-full h-full flex justify-center items-center flex-col gap-12 mt-6 p-5 z-0 relative'
					style={{ maxWidth: '300px' }}>
					<TextDetail color={fontColor} className='tracking-wide'>
						{event_title_1}
					</TextDetail>
					<RoyalTitle color={fontColor}>{italic_title}</RoyalTitle>
					{optional_description ? (
						<TextDetail color={fontColor}>
							<div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{optional_description}</div>
						</TextDetail>
					) : null}
				</div>
			</div>
		</div>
	);
}
