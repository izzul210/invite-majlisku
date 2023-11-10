/** @format */

'use client';
import React, { useState } from 'react';
import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';

export default function WishCard({ wish, textColor }) {
	const [showMore, setShowMore] = useState(false);

	return (
		<div className='flex text-start flex-col gap-2'>
			<InviteTextProvider color='#1D4648' className='text-base'>
				{wish.name}
			</InviteTextProvider>
			<InviteTextProvider color='#667085' className='text-sm'>
				{wish?.wish?.length > 100 ? (
					showMore ? (
						<div onClick={() => setShowMore(false)}>
							{wish?.wish} <b> ..show less</b>
						</div>
					) : (
						<div onClick={() => setShowMore(true)}>
							{wish?.wish.substring(0, 100)}...<b>more</b>
						</div>
					)
				) : (
					<div onClick={() => setShowMore(false)}>{wish?.wish}</div>
				)}
			</InviteTextProvider>
		</div>
	);
}
