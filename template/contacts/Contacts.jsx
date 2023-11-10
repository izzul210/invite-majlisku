/** @format */
import dynamic from 'next/dynamic';
import { initialStates } from '../initalStates';
//Template imports
const ContactDefault = dynamic(() => import('./ContactDefault'));
const ContactAccordian = dynamic(() => import('./ContactAccordian'));

export default function Contacts({ eventDetails }) {
	const { contact_info, enable_bahasa } = eventDetails;
	const { design } = initialStates;

	const renderComponent = () => {
		switch (design) {
			case 0:
				return <ContactDefault contact_info={contact_info} emable_bahasa={enable_bahasa} />;
			default:
				return <ContactAccordian contact_info={contact_info} emable_bahasa={enable_bahasa} />;
		}
	};

	return renderComponent();
}
