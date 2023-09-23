/** @format */

import React from 'react';
//MUI Import
import Slide from '@mui/material/Slide';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import { Box } from '@mui/material';
//Component import
import CardLoadingState from '../../component/loading/CardLoadingState';
import { BackButton } from '../icons/icons';
import InviteTextProvider from '../textProvider/InviteTextProvider';

const Transition = React.forwardRef(function Transition(props, ref) {
	return <Slide direction='up' ref={ref} {...props} />;
});

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

function ModalProvider({
	isOpen = false,
	handleClose = () => {},
	topBorder = false,
	backButton = false,
	handleBackButton = () => {},
	title = 'Modal',
	loading = false,
	children,

	...props
}) {
	return (
		<Dialog
			open={isOpen}
			onClose={handleClose}
			TransitionComponent={Transition}
			aria-labelledby='dialog-title'
			aria-describedby='dialog-description'
			PaperProps={{
				sx: {
					display: 'flex',
					flexDirection: 'column',
					padding: '0px 0px 24px 0px',
					borderRadius: '8px',
					width: '400px',
					'@media (max-width: 468px)': {
						width: '100%',
					},
				},
			}}
			{...props}>
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
				<div className='px-6'>{children}</div>
			</Box>
		</Dialog>
	);
}

export default ModalProvider;
