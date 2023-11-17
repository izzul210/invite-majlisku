/** @format */

import React from 'react';
import InviteTextProvider from '../component/textProvider/InviteTextProvider';

const TextProvider = ({ children }) => {
	return (
		<InviteTextProvider fontFamily='sansPro' className='text-[12px]' color='#98A2B3'>
			{children}
		</InviteTextProvider>
	);
};

function Footnote() {
	return (
		<div className='w-full flex flex-col gap-2 items-center justify-center bg-[#1E1E1E] p-5'>
			<TextProvider>Send e-invite and manage guestlist for FREE with Majlisku</TextProvider>
			<TextProvider>
				© 2022{' '}
				<a href='https://majlisku.com' target='_blank'>
					Majlisku.com
				</a>
			</TextProvider>
			<TextProvider>by Izzul Syahmi & Izzul Syazwan </TextProvider>
		</div>
	);
}

export default Footnote;
