/** @format */

import React, { useState, useEffect } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import moment from 'moment';
//Component import
import InviteAccordian from '../../component/accordian/InviteAccordian';
import InviteDetailContainer from '../../component/container/InviteDetailContainer';

export function StaticDatePickerLandscape({ event_date }) {
	const [value, setValue] = useState(event_date);

	useEffect(() => {
		setValue(event_date);
	}, [event_date]);

	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DateCalendar defaultValue={event_date ? moment(event_date) : moment()} readOnly />
		</LocalizationProvider>
	);
}

export function CalendarAccordian({
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

export function CalendarDefault({
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
