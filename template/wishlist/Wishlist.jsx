/** @format */

import dynamic from 'next/dynamic';
import { initialStates } from '../initalStates';
//Template imports
const WishDefault = dynamic(() => import('./WishDefault'));
const WishAccordian = dynamic(() => import('./WishAccordian'));

export default function Wishlist({ eventDetails, wishlist }) {
	const { enable_bahasa } = eventDetails;
	const { design } = initialStates;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <WishDefault wishlist={wishlist} enable_bahasa={enable_bahasa} />;
			default:
				return <WishAccordian wishlist={wishlist} enable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
}
