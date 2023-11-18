/** @format */

import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';
import { useInviteFunc } from '../../../hooks/useInviteFunc';

export const ItalicTitle = ({ children, ...props }) => {
	const { useConvertText } = useInviteFunc();
	return (
		<InviteTextProvider fontFamily='greatVibes' className='text-center text-5xl' {...props}>
			{useConvertText(children)}
		</InviteTextProvider>
	);
};

export const ItalicTitle_Playfair = ({ children, ...props }) => {
	const { useConvertText } = useInviteFunc();
	return (
		<InviteTextProvider
			fontFamily='playfair'
			className='text-3xl text-center uppercase my-4'
			{...props}>
			{useConvertText(children)}
		</InviteTextProvider>
	);
};
