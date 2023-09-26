/** @format */

import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';

export default function BasicEventTextProvider({ children, color = '#667085' }) {
	return (
		<InviteTextProvider
			color={color}
			className='w-full uppercase text-[15px] text-start font-normal py-4 tracking-wide'>
			{children}
		</InviteTextProvider>
	);
}
