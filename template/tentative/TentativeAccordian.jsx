/** @format */

import TentativeContainer from './components/TentativeContainer';
import InviteAccordian from '../../component/accordian/InviteAccordian';

export default function TentativeAccordian({ activities = [], enable_bahasa }) {
	return (
		<div className='w-full itinerary_activity'>
			<InviteAccordian title={enable_bahasa ? 'Tentatif' : ' Tentative'}>
				<TentativeContainer activities={activities} />
			</InviteAccordian>
		</div>
	);
}
