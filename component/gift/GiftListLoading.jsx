/** @format */

import Skeleton from '@mui/material/Skeleton';

import React from 'react';

function GiftListLoading() {
	return (
		<div className='flex flex-col gap-6 items-center justify-center'>
			{Array.from(new Array(8)).map((_, index) => (
				<div className='w-full max-w-[320px] p-3' key={index}>
					<Skeleton className='w-full' variant='rectangular' height={200} />
					<div className='flex py-4 flex-col gap-2'>
						<Skeleton variant='rounded' sx={{ width: 90 }} />
					</div>
					<Skeleton variant='text' sx={{ fontSize: '18px', width: 120 }} />
				</div>
			))}
		</div>
	);
}

export default GiftListLoading;
