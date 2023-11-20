/** @format */
import dynamic from 'next/dynamic';
import { useInviteContext } from '../InviteContext';
//Template imports
const TentativeDefault = dynamic(() => import('./TentativeDefault'));
const TentativeAccordian = dynamic(() => import('./TentativeAccordian'));

export default function Tentative({ eventDetails, itinerary }) {
	const { enable_bahasa } = eventDetails || {};
	const { design } = useInviteContext();

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <TentativeDefault activities={itinerary} enable_bahasa={enable_bahasa} />;
			default:
				return <TentativeAccordian activities={itinerary} enable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
}
