/** @format */

import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import DialogTitle from '@mui/material/DialogTitle';
//Component import
import CardLoadingState from '../../component/loading/CardLoadingState';
import { BackButton } from '../icons/icons';

const CloseButton = () => (
	<svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
		<path
			fillRule='evenodd'
			clipRule='evenodd'
			d='M7.99908 9.29904L14.699 16L16 14.701L9.29827 8L16 1.30087L14.7008 0L7.99908 6.70097L1.29918 0L0 1.30087L6.6999 8L0 14.6991L1.29918 16L7.99908 9.29904Z'
			fill='#1D4648'
		/>
	</svg>
);

export default function SwipeableTemporaryDrawer({
	isOpen = false,
	disableSwipeToClose = false,
	handleClose = () => {},
	topBorder = false,
	backButton = false,
	handleBackButton = () => {},
	title = 'Modal',
	loading = false,
	children,
	padding = '24px',
	...props
}) {
	const iOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent);

	return (
		<SwipeableDrawer
			anchor='bottom'
			open={isOpen}
			onClose={disableSwipeToClose ? () => {} : handleClose}
			onOpen={() => {}}
			disableBackdropTransition={!iOS}
			disableDiscovery={iOS}
			PaperProps={{
				sx: {
					zIndex: 200,
					borderTopRightRadius: 15,
					borderTopLeftRadius: 15,
				},
			}}>
			<CardLoadingState loadingState={loading} />
			<Box>
				<DialogTitle
					id='dialog-title'
					sx={{
						padding: '24px',
						borderBottom: topBorder ? '1px solid #E4E7EC' : 'none',
						position: 'sticky',
						top: 0,
						backgroundColor: 'white',
						zIndex: 999,
					}}>
					{backButton ? (
						<div className='w-full flex justify-between'>
							<button
								className='cursor-pointer'
								onClick={() => {
									handleBackButton();
								}}>
								<BackButton />
							</button>
							<div
								className='cursor-pointer ml-8'
								onClick={() => {
									handleClose();
								}}>
								<CloseButton />
							</div>
						</div>
					) : (
						<div className='w-full flex justify-end'>
							<div
								className='cursor-pointer ml-8'
								onClick={() => {
									handleClose();
								}}>
								<CloseButton />
							</div>
						</div>
					)}
				</DialogTitle>
				<div className='w-full flex justify-center items-center pb-12'>
					<div
						style={{ paddingRight: padding, paddingLeft: padding }}
						className='px-6 w-full max-w-[400px]'>
						{children}
					</div>
				</div>
			</Box>
		</SwipeableDrawer>
	);
}
