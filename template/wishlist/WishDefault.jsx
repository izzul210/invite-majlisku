/** @format */

import WishContainer from './components/WishContainer';
import InviteDetailContainer from '../../component/container/InviteDetailContainer';

export default function WishDefault({ wishlist = [], enable_bahasa }) {
	return (
		<div className='w-full'>
			<InviteDetailContainer title={enable_bahasa ? 'Ucapan' : 'Wishes'}>
				<WishContainer wishlist={wishlist} />
			</InviteDetailContainer>
		</div>
	);
}
