/** @format */

import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';

export default function RoyalTitle({ children, ...props }) {
	return (
		<div className='max-w-[88%] sm:max-w-[300px]'>
			<InviteTextProvider
				fontFamily='ebGaramond'
				className='text-[24px] font-normal text-center whitespace-pre-line tracking-wider uppercase '
				{...props}>
				{children}
			</InviteTextProvider>
		</div>
	);
}
