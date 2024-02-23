/** @format */

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

import { MajliskuIcon } from '../../component/icons/icons';
import { EventTitle_Playfair } from './components/EventTitle';
import { RsvpHeaderImage } from './components/RsvpHeaderImage';

import { ItalicTitle_Playfair_Animation } from './components/ItalicTitle';
import { DateLocation } from './components/DateLocation';

const videoURL =
	'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/videos%2Ftest%2Fblurry-rose.mp4?alt=media&token=94f3152a-301e-4112-8db9-475dc25c9f93';

export default function FirstScreenVideoWithText({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	optional_description = '',
	italic_title = '',
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
		<div className='w-full sm:min-h-[800px]  flex justify-center items-center'>
			<div
				className='w-full relative  flex justify-center items-center'
				style={{ height: '100vh' }}>
				<video
					width='100%'
					height='100%'
					autoPlay
					loop
					muted
					preload='none'
					style={{
						position: 'absolute',
						width: '100%',
						height: '100%',
						objectFit: 'cover',
					}}>
					<source src={videoURL} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
				<div
					style={{
						position: 'absolute',
						top: '0',
						left: '0',
						width: '100%',
						height: '100%',
						backgroundColor: 'rgba(255, 255, 255, 0.4)',
					}}
				/>

				<div
					className='w-full h-full flex justify-center items-center flex-col gap-6 z-0 relative'
					style={{ maxWidth: '300px' }}>
					<motion.div variants={childVariants}>
						<MajliskuIcon />
					</motion.div>
					<motion.div variants={childVariants}>
						<EventTitle_Playfair>{event_title_1}</EventTitle_Playfair>
					</motion.div>

					<ItalicTitle_Playfair_Animation
						italic_title={italic_title}
						childVariants={childVariants}
					/>
					{optional_description && (
						<motion.div variants={childVariants} className='w-full'>
							<DateLocation>{optional_description}</DateLocation>
						</motion.div>
					)}
				</div>
			</div>
		</div>
	);
}
