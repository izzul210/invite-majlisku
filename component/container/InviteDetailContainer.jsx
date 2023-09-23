/** @format */

import InviteTextProvider from '../textProvider/InviteTextProvider';
import InviteLineLogo from '../misc/InviteLineLogo';

function InviteDetailContainer({ title, children }) {
	return (
		<div>
			<div className='mb-1'>
				<InviteTextProvider
					color='#1E1E1E'
					className='uppercase text-center font-semibold text-2xl'>
					{title}
				</InviteTextProvider>
				<InviteLineLogo color='#F1BFBE' height='2px' />
			</div>

			{children}
		</div>
	);
}

export default InviteDetailContainer;
