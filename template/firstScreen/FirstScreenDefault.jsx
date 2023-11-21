/** @format */

import { MajliskuIcon } from '../../component/icons/icons';
import moment from 'moment';
import { EventTitle_1 } from './components/EventTitle';
import { RsvpHeaderImage } from './components/RsvpHeaderImage';
import { ItalicTitle } from './components/ItalicTitle';
import { DateLocation } from './components/DateLocation';

export default function FirstScreenDefault({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	rsvp_header_image_file = null,
	event_date = '2023-10-21',
	event_location = null,
	italic_title = '',
}) {
	let rsvpHeaderImage = rsvp_header_image_file
		? URL.createObjectURL(rsvp_header_image_file)
		: rsvp_header_image;

	return (
		<div
			className='w-full flex flex-col gap-4 justify-center sm:mt-4 items-center px-5 py-12 sm:py-24'
			style={{ minHeight: '100dvh', maxWidth: '383px' }}>
			<MajliskuIcon />
			<EventTitle_1>{event_title_1}</EventTitle_1>
			<RsvpHeaderImage rsvp_header_image={rsvpHeaderImage} curveTopBorder />
			<ItalicTitle>{italic_title}</ItalicTitle>
			<DateLocation>
				<div className='flex flex-col gap-2'>
					<div>{moment(event_date).format('DD.MM.YYYY')}</div>
					<div>{event_location}</div>
				</div>
			</DateLocation>
		</div>
	);
}
