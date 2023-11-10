/** @format */

import InviteDetailContainer from '../../component/container/InviteDetailContainer';
import StaticDatePickerLandscape from './components/StaticDatePickerLandscape';

export default function CalendarDefault({
	event_date,
	location_info,
	event_time,
	event_title,
	enable_bahasa,
}) {
	return (
		<div className='w-full'>
			<InviteDetailContainer title={enable_bahasa ? 'Kalendar' : 'Calendar'} noBorder>
				<StaticDatePickerLandscape event_date={event_date} />
			</InviteDetailContainer>
		</div>
	);
}
