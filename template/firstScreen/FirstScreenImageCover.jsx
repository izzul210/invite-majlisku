/** @format */

import React from 'react';
import Image from 'next/legacy/image';

export default function FirstScreenVideo({ cover_url }) {
	return (
		<div className='w-full flex justify-center items-center'>
			<div
				className='w-full relative  flex justify-center items-center'
				style={{ height: '100vh' }}>
				<Image
					className='h-full z-0'
					src={cover_url}
					alt='Royal 1'
					layout='fill'
					quality={50}
					priority
					objectFit='cover'
				/>
			</div>
		</div>
	);
}
