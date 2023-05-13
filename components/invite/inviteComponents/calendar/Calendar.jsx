/** @format */

import React, { useState, useEffect } from 'react';
//Libraries import
import moment from 'moment';
import { AddToCalendarButton } from 'add-to-calendar-button-react';
//MUI import
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
import TextField from '@mui/material/TextField';
import { createTheme, ThemeProvider } from '@mui/material/styles';
//Icon import
import { LineLogo } from '../../components/LineLogo';

export const Calendar = ({
	event_title_2 = 'Izzul Syazwan\n & \nNurul Syafiqah',
	event_date = '2023-07-19',
	event_address = 'Plaza Alam Sentral,\nShah Alam, Selangor',
	event_start = '2022-09-18 12:30',
	event_end = '2022-09-18 15:00',
	malay = false,
	theme = {
		lineHeight: '1px',
		backgroundColor: '#FFFFFF',
		textColor: 'rgba(29, 70, 72, 1)',
		lineColor: 'rgba(152, 162, 179, 1)',
		titleColor: 'rgba(30, 30, 30, 1)',
	},
}) => {
	const { textColor, backgroundColor, lineColor, titleColor, lineHeight } = theme;

	return (
		<div className='calendar-main' style={{ background: backgroundColor }}>
			<div className='calendar-top'>
				<div className='calendar-title' style={{ color: titleColor }}>
					{malay ? 'Kalendar' : 'Calendar'}
				</div>
				<LineLogo height={lineHeight} color={lineColor} />
			</div>

			<div className='calendar-details'>
				<StaticDatePickerLandscape event_date={event_date} backgroundColor={backgroundColor} />
			</div>
			<AddToCalendar
				event_title_2={event_title_2}
				event_date={event_date}
				event_address={event_address}
				startTime={event_start}
				endTime={event_end}
			/>
		</div>
	);
};

const theme = createTheme({
	components: {
		// Name of the component ⚛️
		MuiPickerStaticWrapper: {
			styleOverrides: {
				// Name of the slot
				root: {
					backgroundColor: 'none',
				},
				content: {
					background: 'none',
				},
			},
		},
	},
});

export function StaticDatePickerLandscape({ event_date, backgroundColor }) {
	const [value, setValue] = useState(event_date);

	useEffect(() => {
		setValue(event_date);
	}, [event_date]);

	return (
		<LocalizationProvider dateAdapter={AdapterMoment} sx={{ bgcolor: 'none' }}>
			<ThemeProvider theme={theme}>
				<StaticDatePicker
					onChange={() => {}}
					displayStaticWrapperAs='desktop'
					fixedWeekNumber={true}
					value={value}
					renderInput={(params) => <TextField {...params} />}
				/>
			</ThemeProvider>
		</LocalizationProvider>
	);
}

export const AddToCalendar = ({
	startTime,
	endTime,
	event_title_2,
	event_date,
	event_address,
	enable_bahasa = false,
}) => {
	return (
		<div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
			<AddToCalendarButton
				buttonStyle='flat'
				trigger='click'
				label={enable_bahasa ? 'Simpan di Kalendar' : 'Save to Calendar'}
				name={event_title_2 ? event_title_2 : `The Wedding`}
				startDate={moment(event_date).format('YYYY-MM-DD')}
				endDate={moment(event_date).format('YYYY-MM-DD')}
				startTime={moment(startTime).format('HH:mm')}
				endTime={moment(endTime).format('HH:mm')}
				location={event_address}
				options={['Apple', 'Google']}
				timeZone='Asia/Singapore'
				iCalFileName='Reminder-Event'></AddToCalendarButton>
		</div>
	);
};
