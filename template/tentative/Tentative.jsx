/** @format */

import moment from 'moment';
import InviteDetailContainer from '../../component/container/InviteDetailContainer';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import InviteAccordian from '../../component/accordian/InviteAccordian';

const TentativeContainer = ({ activities }) => {
	return (
		<div className='py-2'>
			{activities?.map((activity, index) => {
				return (
					<div className='yes_activity' key={index}>
						<div className='date'>
							<InviteTextProvider color='#98A2B3' className='font-normal text-sm'>
								{moment(activity.date).format('h:mm A')}
							</InviteTextProvider>
						</div>
						<div className='activity_detail'>
							<InviteTextProvider className='activity_title font-medium text-sm'>
								{activity.title}
							</InviteTextProvider>
							<InviteTextProvider className='activity_description  font-normal text-sm'>
								{activity.description}
							</InviteTextProvider>
						</div>
					</div>
				);
			})}
		</div>
	);
};

export function TentativeAccordian({ activities = [], enable_bahasa }) {
	return (
		<div className='w-full itinerary_activity'>
			<InviteAccordian title={enable_bahasa ? 'Tentatif' : ' Tentative'}>
				<TentativeContainer activities={activities} />
			</InviteAccordian>
		</div>
	);
}

export function TentativeDefault({ activities = [], enable_bahasa }) {
	return (
		<div className='w-full itinerary_activity'>
			<InviteDetailContainer title={enable_bahasa ? 'Tentatif' : ' Tentative'}>
				<TentativeContainer activities={activities} />
			</InviteDetailContainer>
		</div>
	);
}
