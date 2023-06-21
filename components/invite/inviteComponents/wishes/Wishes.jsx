/** @format */

import React, { useState } from 'react';
//MUI import
import { Pagination } from '@mui/material';
//Data import
import { wishlistData } from '../../hooks/useFakeInviteData';
import AccordianProvider from '../../components/accordian/AccordianProvider';
import DetailsContainer from '../../components/DetailsContainer/DetailsContainer';
//Styling import
//Icon import
import { QuoteIcon } from '../../../icons';

export const Wishes = ({
	type = 'default',
	malay = false,
	wishlist = wishlistData,
	theme = {
		lineHeight: '1px',
		backgroundColor: '#FFFFFF',
		textColor: 'rgba(29, 70, 72, 1)',
		lineColor: 'rgba(152, 162, 179, 1)',
		titleColor: 'rgba(30, 30, 30, 1)',
	},
}) => {
	const { textColor, backgroundColor, lineColor, titleColor, lineHeight } = theme;
	const [page, setPage] = useState(1);
	const wishPerPage = 4;

	const handleChange = (event, value) => {
		setPage(value);
	};

	const wishList = wishlist.slice((page - 1) * wishPerPage, page * wishPerPage);

	// return (
	// 	<div className='wish-main' style={{ background: backgroundColor }}>
	// 		<div className='wish-title' style={{ color: titleColor }}>
	// 			{malay ? 'Ucapan' : 'Wishes'}
	// 		</div>
	// 		<LineLogo height={lineHeight} color={lineColor} />
	// 		<div className='wish-list'>
	// 			{wishList?.length > 0
	// 				? wishList.map((wish, index) => (
	// 						<div
	// 							key={index}
	// 							className='wish-card'
	// 							style={{ borderBottom: `1px solid ${lineColor}` }}>
	// 							<div>
	// 								<QuoteIcon />
	// 							</div>
	// 							<WishCard wish={wish} textColor={textColor} />
	// 						</div>
	// 				  ))
	// 				: null}
	// 		</div>
	// 		<div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
	// 			<Pagination
	// 				count={Math.ceil(wishlist.length / wishPerPage)}
	// 				page={page}
	// 				onChange={handleChange}
	// 				size='small'
	// 			/>
	// 		</div>
	// 	</div>
	// );
	if (type === 'default') {
		return (
			<div className='wish-main wish-default-container' style={{ background: backgroundColor }}>
				<DetailsContainer title={malay ? 'UCAPAN' : 'WISHES'} theme={theme}>
					<div className='wish-list'>
						{wishList?.length > 0
							? wishList.map((wish, index) => (
									<div
										key={index}
										className='wish-card'
										style={{ borderBottom: `1px solid rgba(228, 231, 236, 1)` }}>
										<div>
											<QuoteIcon />
										</div>
										<WishCard wish={wish} textColor={textColor} />
									</div>
							  ))
							: null}
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
						<Pagination
							count={Math.ceil(wishlist.length / wishPerPage)}
							page={page}
							onChange={handleChange}
							size='small'
						/>
					</div>
				</DetailsContainer>
			</div>
		);
	} else {
		return (
			<div className='wish-main wish-accordian-container' style={{ background: backgroundColor }}>
				<AccordianProvider title={malay ? 'UCAPAN' : 'WISHES'} theme={theme}>
					<div className='wish-list'>
						{wishList?.length > 0
							? wishList.map((wish, index) => (
									<div
										key={index}
										className='wish-card'
										style={{ borderBottom: `1px solid rgba(228, 231, 236, 1)` }}>
										<div>
											<QuoteIcon />
										</div>
										<WishCard wish={wish} textColor={textColor} />
									</div>
							  ))
							: null}
					</div>
					<div style={{ display: 'flex', justifyContent: 'center', marginTop: 20 }}>
						<Pagination
							count={Math.ceil(wishlist.length / wishPerPage)}
							page={page}
							onChange={handleChange}
							size='small'
						/>
					</div>
				</AccordianProvider>
			</div>
		);
	}
};

export const WishCard = ({ wish, textColor }) => {
	const [showMore, setShowMore] = useState(false);

	return (
		<div className='wish-detail' style={{ color: textColor }}>
			<div className='wish-name'>{wish.name}</div>
			<div className='wish-text'>
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
			</div>
		</div>
	);
};
