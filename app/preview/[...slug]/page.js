/** @format */

import InviteTemplatePreview from '../../../template/InviteTemplatePreview';

export default async function Page({ params }) {
	return (
		<main>
			<InviteTemplatePreview designId={params.slug[0]} userId={params.slug[1]} />
		</main>
	);
}
