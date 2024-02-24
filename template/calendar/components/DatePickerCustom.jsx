/** @format */

'use client';
import React from 'react';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import moment from 'moment';

export default function DatePickerCustom({ event_date }) {
	if (!event_date) return null;
	return (
		<LocalizationProvider dateAdapter={AdapterMoment}>
			<DateCalendar
				defaultValue={event_date ? moment(event_date) : moment('2021-01-01')}
				readOnly
				sx={{
					'& .MuiPickersDay-root.Mui-selected': {
						backgroundColor: 'black',
						color: 'white',
						borderRadius: '0',
					},
					'& .MuiPickersCalendarHeader-label': {
						textTransform: 'uppercase', // Uppercase the text
						color: '#1D4648',
						fontWeight: 400,
						fontSize: 15,
					},
				}}
			/>
		</LocalizationProvider>
	);
}
