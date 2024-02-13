/** @format */

import InviteAccordian from '../../component/accordian/InviteAccordian';
import DatePickerCustom from './components/DatePickerCustom';
import AddToCalendar from './components/AddToCalendar';

export default function CalendarAccordian({
	event_date,
	location_info,
	event_time,
	event_title,
	enable_bahasa,
}) {
	return (
		<div className='w-full'>
			<InviteAccordian title={enable_bahasa ? 'Kalendar' : 'Calendar'}>
				<DatePickerCustom event_date={event_date} />
				<div className='flex items-center justify-center my-4'>
					<AddToCalendar
						enable_bahasa={enable_bahasa}
						event_title={event_title}
						start_time={event_time?.start}
						end_time={event_time?.end}
						address={location_info?.address}
						event_date={event_date}
					/>
				</div>
			</InviteAccordian>
		</div>
	);
}
