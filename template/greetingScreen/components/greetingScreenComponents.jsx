/** @format */
import React from 'react';
import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';

export const HostsText = ({ children, color = '#1D4648' }) => {
	return (
		<InviteTextProvider className='text-sm font-medium uppercase' color={color}>
			{children}
		</InviteTextProvider>
	);
};

export const GreetingText = ({ children }) => {
	return <InviteTextProvider className='text-base'>{children}</InviteTextProvider>;
};

export const GreetingText_Premium = ({ children, color = '#F1BFBE' }) => {
	return (
		<InviteTextProvider className='text-base' color={color}>
			{children}
		</InviteTextProvider>
	);
};

export const GreetingTitle = ({ children, color = '#1E1E1E' }) => {
	return (
		<InviteTextProvider fontFamily='playfair' color={color} className='text-sm font-semibold'>
			{children}
		</InviteTextProvider>
	);
};

export const MainTitle = ({ children, color = '#1D4648' }) => {
	return (
		<InviteTextProvider color={color} className='text-xl font-medium uppercase'>
			{children}
		</InviteTextProvider>
	);
};

export const ButtonProvider = ({ type = null, children, ...props }) => {
	return (
		<div
			className='w-full font-medium rounded-full py-4 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
			style={
				type === 'primary'
					? { color: 'white', backgroundColor: '#1E1E1E', border: ' 1px solid #1E1E1E' }
					: { color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #D0D5DD' }
			}
			{...props}>
			{children}
		</div>
	);
};