/** @format */
import InviteTemplateGuest from '../../../template/InviteTemplateGuest';

export default async function Page({ params }) {
	return (
		<main>
			<InviteTemplateGuest inviteId={params.id} guestId={params.guestId} />
		</main>
	);
}
