/** @format */

'use client';
import React, { useState, useEffect } from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

export default function StaticDatePickerLandscape({ event_date }) {
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
