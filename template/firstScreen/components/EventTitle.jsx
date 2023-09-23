/** @format */

import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';

export const EventTitle_1 = ({ children }) => {
	return <InviteTextProvider className='uppercase font-medium'>{children}</InviteTextProvider>;
};
export const EventTitle_Premium = ({ children, ...props }) => {
	return (
		<InviteTextProvider className='uppercase text-sm font-normal' {...props}>
			{children}
		</InviteTextProvider>
	);
};
export const EventTitle_Playfair = ({ children }) => {
	return (
		<InviteTextProvider fontFamily='playfair' className='uppercase text-lg font-medium'>
			{children}
		</InviteTextProvider>
	);
};
