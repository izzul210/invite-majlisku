/** @format */

import InviteDetailContainer from '../../component/container/InviteDetailContainer';
import TentativeContainer from './components/TentativeContainer';

export default function TentativeDefault({ activities = [], enable_bahasa }) {
	return (
		<div className='w-full itinerary_activity'>
			<InviteDetailContainer title={enable_bahasa ? 'Tentatif' : ' Tentative'}>
				<TentativeContainer activities={activities} />
			</InviteDetailContainer>
		</div>
	);
}
