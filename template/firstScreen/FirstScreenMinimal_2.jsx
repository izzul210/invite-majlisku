/** @format */

import { MajliskuIcon } from '../../component/icons/icons';
import moment from 'moment';
//Parts import
import { EventTitle_Playfair } from './components/EventTitle';
import { RsvpHeaderImage } from './components/RsvpHeaderImage';
import { ItalicTitle_Playfair } from './components/ItalicTitle';
import { DateLocation } from './components/DateLocation';

export default function FirstScreenMinimal_2({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	rsvp_header_image_file = null,
	event_date = '2023-10-21',
	event_location = null,
	italic_title = '',
	event_start = null,
	event_end = null,
}) {
	let rsvpHeaderImage = rsvp_header_image_file
		? URL.createObjectURL(rsvp_header_image_file)
		: rsvp_header_image;

	let formatted_time = event_start
		? `${moment(event_start).format('h:mm A')} - ${moment(event_end).format('h:mm A')}`
		: null;

	return (
		<div
			className='w-full flex flex-col gap-4 justify-center items-center px-5 py-12 sm:py-24'
			style={{ minHeight: '100dvh', maxWidth: '383px' }}>
			<MajliskuIcon />
			<EventTitle_Playfair>{event_title_1}</EventTitle_Playfair>
			<RsvpHeaderImage rsvp_header_image={rsvpHeaderImage} />
			<ItalicTitle_Playfair>{italic_title}</ItalicTitle_Playfair>
			<DateLocation>
				<div className='flex flex-col gap-1'>
					<div>{moment(event_date).format('dddd, D MMMM YYYY')}</div>
					<div>{formatted_time}</div>
					<div>{event_location}</div>
				</div>
			</DateLocation>
		</div>
	);
}
