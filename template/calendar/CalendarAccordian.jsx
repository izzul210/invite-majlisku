/** @format */

import InviteAccordian from '../../component/accordian/InviteAccordian';
import StaticDatePickerLandscape from './components/StaticDatePickerLandscape';

export default function CalendarAccordian({
	event_date,
	location_info,
	event_time,
	event_title,
	enable_bahasa,
}) {
	return (
		<div className='w-full'>
			<InviteAccordian title={enable_bahasa ? 'Kalendar' : 'Calendar'} noBorder>
				<StaticDatePickerLandscape event_date={event_date} />
				<div className='flex items-center justify-center my-4'></div>
			</InviteAccordian>
		</div>
	);
}
