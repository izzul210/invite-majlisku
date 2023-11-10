/** @format */

'use client';
import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import WishCard from './WishCard';
import { QuoteIcon } from '../../../component/icons/icons';

export default function WishContainer({ wishlist }) {
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
}
