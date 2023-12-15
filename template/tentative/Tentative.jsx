/** @format */
import dynamic from 'next/dynamic';
import { useInviteContext } from '../inviteContext';
//Template imports
const TentativeDefault = dynamic(() => import('./TentativeDefault'));
const TentativeAccordian = dynamic(() => import('./TentativeAccordian'));

export default function Tentative({ eventDetails, itinerary }) {
	const { enable_bahasa, enable_itinerary } = eventDetails || {};
	const { design } = useInviteContext();

	const renderComponent = () => {
		if (!enable_itinerary) {
			return null;
		}

		if (!itinerary || itinerary.length === 0) {
			return null;
		}

		switch (design) {
			case 0:
			case 3:
				return <TentativeDefault activities={itinerary} enable_bahasa={enable_bahasa} />;
			default:
				return <TentativeAccordian activities={itinerary} enable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
}
