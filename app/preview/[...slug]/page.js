/** @format */

import InviteTemplatePreview from '../../../template/InviteTemplatePreview';

//id: eEBYP8ZKknVPcN6G601Mv073Kg13

export default async function Page({ params }) {
	return (
		<main>
			<InviteTemplatePreview designId={params.slug[0]} userId={params.slug[1]} />
		</main>
	);
}
