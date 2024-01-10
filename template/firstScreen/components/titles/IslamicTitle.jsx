/** @format */

import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';

export default function IslamicTitle({ children, ...props }) {
	return (
		<div className='max-w-[88%] sm:max-w-[300px]'>
			<InviteTextProvider
				fontFamily='playfair'
				className='text-xl font-normal text-center whitespace-pre-line  uppercase '
				{...props}>
				{children}
			</InviteTextProvider>
		</div>
	);
}
