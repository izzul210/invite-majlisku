/** @format */

import React, { useState, useEffect } from 'react';
import Image from 'next/legacy/image';

const videoURL =
	'https://firebasestorage.googleapis.com/v0/b/myweddingapp-25712.appspot.com/o/videos%2Ftest%2Fblurry-rose.mp4?alt=media&token=94f3152a-301e-4112-8db9-475dc25c9f93';

export default function FirstScreenVideo({}) {
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
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
					<source src={videoURL} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	);
}
