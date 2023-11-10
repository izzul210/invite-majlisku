/** @format */

import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';
import moment from 'moment';

export default function TentativeContainer({ activities }) {
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
}
