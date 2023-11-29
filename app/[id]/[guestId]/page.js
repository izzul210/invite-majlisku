/** @format */

import moment from 'moment';
import InviteTemplateGuest from '../../../template/InviteTemplateGuest';

const API = 'https://asia-southeast1-myweddingapp-25712.cloudfunctions.net/user';

export default async function Page({ params }) {
	return (
		<main>
			<InviteTemplateGuest inviteId={params.id} guestId={params.guestId} />
		</main>
	);
}
