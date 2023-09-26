/** @format */
import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';

export default function ButtonTextProvider({ children, ...props }) {
	return (
		<InviteTextProvider fontFamily='lora' className='tracking-wide' {...props}>
			{children}
		</InviteTextProvider>
	);
}
