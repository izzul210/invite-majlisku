/** @format */

import InviteDetailContainer from '../../component/container/InviteDetailContainer';
import ContactContainer from './components/ContactContainer';

export default function ContactDefault({ contact_info = [], enable_bahasa }) {
	return (
		<div className='w-full'>
			<InviteDetailContainer title={enable_bahasa ? 'Hubungi' : 'Contact'}>
				<ContactContainer contact_info={contact_info} />
			</InviteDetailContainer>
		</div>
	);
}
