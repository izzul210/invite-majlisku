/** @format */

'use client';
import React, { useState } from 'react';
import { Pagination } from '@mui/material';
import WishCard from './WishCard';
import { QuoteIcon } from '../../../component/icons/icons';
import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';

export default function WishContainer({ wishlist, enable_bahasa }) {
	const [page, setPage] = useState(1);
	const wishPerPage = 4;

	const handleChange = (event, value) => {
		setPage(value);
	};

	const wishList = wishlist.slice((page - 1) * wishPerPage, page * wishPerPage);

	return (
		<div className='w-full px-3'>
			{wishList?.length > 0 ? (
				<>
					<div className='wish-list'>
						{wishList.map((wish, index) => (
							<div key={wish.id} className='border-b py-4 flex gap-3'>
								<div>
									<QuoteIcon />
								</div>
								<WishCard wish={wish} textColor={'rgba(29, 70, 72, 1)'} />
							</div>
						))}
					</div>

					<div className='flex items-center justify-center my-8'>
						<Pagination
							count={Math.ceil(wishlist.length / wishPerPage)}
							page={page}
							onChange={handleChange}
							size='small'
						/>
					</div>
				</>
			) : (
				<div className='pt-4 pb-8'>
					<InviteTextProvider color='#667085' className='text-[16px] text-center'>
						{enable_bahasa
							? 'Hantarkan ucapan anda kepada tuan rumah'
							: 'Be the first to send lovely wish to your beloved host'}
					</InviteTextProvider>
				</div>
			)}
		</div>
	);
}
