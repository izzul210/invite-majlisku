/** @format */

import React from 'react';
import { motion } from 'framer-motion';
//Components import
import { MajliskuMainIcon } from '../../component/icons/icons';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

function GuestOpeningScreen({ onOpen, title, enable_bahasa, isLoading }) {
	return (
		<motion.div
			initial={{ opacity: 1, y: '0%', backgroundColor: '#0E7F6E' }}
			animate={{
				opacity: 1,
				y: '0%',
				backgroundColor: '#0E7F6E',
			}}
			exit={{
				opacity: 1,
				y: '-100%',
			}}
			style={{ minHeight: '100vh' }}
			transition={{ type: 'tween', duration: 0.7 }}
			className='opening-screen flex flex-col justify-between pb-12  items-center justify-center w-full'
			onClick={onOpen}>
			<div></div>
			<div className='flex items-center justify-center gap-12 flex-col'>
				<MajliskuMainIcon />
				{isLoading ? null : (
					<div>
						<InviteTextProvider
							color='#F1BFBE'
							className='uppercase mb-3 lowercase capitalize text-center text-xl'>
							<div style={{ whiteSpace: 'pre-line' }}>{enable_bahasa ? 'Kepada:' : 'To:'}</div>
						</InviteTextProvider>
						<InviteTextProvider
							fontFamily='greatVibes'
							color='#F1BFBE'
							className='uppercase lowercase capitalize text-center text-[34px] sm:text-3xl'>
							<div style={{ whiteSpace: 'pre-line' }}>{title}</div>
						</InviteTextProvider>
					</div>
				)}
			</div>
			{isLoading ? (
				<InviteTextProvider color='#F1BFBE' className='uppercase cursor-pointer pb-[100px]'>
					Loading...
				</InviteTextProvider>
			) : (
				<InviteTextProvider color='#F1BFBE' className='neons uppercase cursor-pointer pb-[100px]'>
					{enable_bahasa ? 'Sila tekan untuk buka' : 'Tap To Open'}
				</InviteTextProvider>
			)}
		</motion.div>
	);
}

export default GuestOpeningScreen;
