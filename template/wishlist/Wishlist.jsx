/** @format */

import dynamic from 'next/dynamic';
import { useInviteContext } from '../inviteContext';
//Template imports
const WishDefault = dynamic(() => import('./WishDefault'));
const WishAccordian = dynamic(() => import('./WishAccordian'));

export default function Wishlist({ wishlist }) {
	const { design, eventDetails } = useInviteContext();
	const { enable_bahasa, enable_wishes } = eventDetails;

	if (!enable_wishes) {
		return null;
	}

	const renderComponent = () => {
		switch (design) {
			case 0:
			case 3:
				return <WishDefault wishlist={wishlist} enable_bahasa={enable_bahasa} />;
			default:
				return <WishAccordian wishlist={wishlist} enable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
}
