/** @format */

import InviteAccordian from '../../component/accordian/InviteAccordian';
import WishContainer from './components/WishContainer';

export default function WishAccordian({ wishlist = [], enable_bahasa }) {
	return (
		<div className='w-full'>
			<InviteAccordian title={enable_bahasa ? 'Ucapan' : 'Wishes'}>
				<WishContainer wishlist={wishlist} enable_bahasa={enable_bahasa} />
			</InviteAccordian>
		</div>
	);
}
