/** @format */

import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';

export const DateLocation = ({ children, ...props }) => {
	return (
		<InviteTextProvider
			className='uppercase text-center text-base font-mediun tracking-wide'
			{...props}>
			<div style={{ whiteSpace: 'pre-line' }}>{children}</div>
		</InviteTextProvider>
	);
};

export const DateLocation_Playfair = ({ children, ...props }) => {
	return (
		<InviteTextProvider
			fontFamily='playfair'
			className='uppercase text-center text-base font-mediun tracking-wide'
			{...props}>
			{children}
		</InviteTextProvider>
	);
};

export const DateLocation_Premium = ({ children, fill, fontFamily = 'ebGaramond', ...props }) => {
	return (
		<div className='w-full border-b border-t py-3 my-4' style={{ borderColor: fill }}>
			<InviteTextProvider
				fontFamily={fontFamily}
				className='uppercase text-center text-sm font-normal tracking-wide'
				{...props}>
				{children}
			</InviteTextProvider>
		</div>
	);
};
