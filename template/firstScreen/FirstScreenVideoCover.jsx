/** @format */

import React from 'react';

export default function FirstScreenVideo({ cover_url }) {
	return (
		<div className='w-full flex justify-center items-center'>
			<div
				className='w-full relative  flex justify-center items-center'
				style={{ height: '100vh' }}>
				<video
					width='100%'
					height='100%'
					autoPlay
					controls
					loop
					muted
					playsInline
					preload='none'
					style={{ width: '100%', height: '100%', objectFit: 'cover' }}>
					<source src={cover_url} type='video/mp4' />
					Your browser does not support the video tag.
				</video>
			</div>
		</div>
	);
}
