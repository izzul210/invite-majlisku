/** @format */

import InviteAccordian from '../../component/accordian/InviteAccordian';
import ContactContainer from './components/ContactContainer';

export default function ContactAccordian({ contact_info = [], enable_bahasa }) {
	return (
		<div className='w-full'>
			<InviteAccordian title={enable_bahasa ? 'Hubungi' : 'Contact'}>
				<ContactContainer contact_info={contact_info} />
			</InviteAccordian>
		</div>
	);
}
