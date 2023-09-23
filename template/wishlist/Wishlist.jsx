/** @format */

import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import InviteAccordian from '../../component/accordian/InviteAccordian';
import InviteDetailContainer from '../../component/container/InviteDetailContainer';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import { QuoteIcon } from '../../component/icons/icons';

const WishCard = ({ wish, textColor }) => {
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
};

const WishContainer = ({ wishlist }) => {
	const [page, setPage] = useState(1);
	const wishPerPage = 4;

	const handleChange = (event, value) => {
		setPage(value);
	};

	const wishList = wishlist.slice((page - 1) * wishPerPage, page * wishPerPage);

	return (
		<div className='w-full px-3'>
			<div className='wish-list'>
				{wishList?.length > 0
					? wishList.map((wish, index) => (
							<div key={wish.id} className='border-b py-4 flex gap-3'>
								<div>
									<QuoteIcon />
								</div>
								<WishCard wish={wish} textColor={'rgba(29, 70, 72, 1)'} />
							</div>
					  ))
					: null}
			</div>
			<div className='flex items-center justify-center my-8'>
				<Pagination
					count={Math.ceil(wishlist.length / wishPerPage)}
					page={page}
					onChange={handleChange}
					size='small'
				/>
			</div>
		</div>
	);
};

export function WishAccordian({ wishlist = [], enable_bahasa }) {
	return (
		<div className='w-full'>
			<InviteAccordian title={enable_bahasa ? 'Ucapan' : 'Wishes'}>
				<WishContainer wishlist={wishlist} />
			</InviteAccordian>
		</div>
	);
}

export function WishDefault({ wishlist = [], enable_bahasa }) {
	return (
		<div className='w-full'>
			<InviteDetailContainer title={enable_bahasa ? 'Ucapan' : 'Wishes'}>
				<WishContainer wishlist={wishlist} />
			</InviteDetailContainer>
		</div>
	);
}
