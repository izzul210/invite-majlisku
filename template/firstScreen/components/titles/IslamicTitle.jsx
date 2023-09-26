/** @format */

import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';

export default function IslamicTitle({ children, ...props }) {
	return (
		<InviteTextProvider
			fontFamily='playfair'
			className='text-xl font-normal text-center whitespace-pre uppercase'
			{...props}>
			{children}
		</InviteTextProvider>
	);
}
