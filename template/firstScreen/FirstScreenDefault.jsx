/** @format */

import { MajliskuIcon } from '../../component/icons/icons';
import { EventTitle_1 } from './components/EventTitle';
import { RsvpHeaderImage } from './components/RsvpHeaderImage';
import { ItalicTitle } from './components/ItalicTitle';
import { DateLocation } from './components/DateLocation';

export default function FirstScreenDefault({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	optional_description = '',
	italic_title = '',
}) {
	return (
		<div
			className='w-full flex flex-col gap-4 justify-center sm:mt-4 items-center px-5 py-12 sm:py-24'
			style={{ minHeight: '100vh', maxWidth: '383px' }}>
			<MajliskuIcon />
			<EventTitle_1>{event_title_1}</EventTitle_1>
			<RsvpHeaderImage rsvp_header_image={rsvp_header_image} curveTopBorder />
			<ItalicTitle>{italic_title}</ItalicTitle>
			{optional_description && <DateLocation>{optional_description}</DateLocation>}
		</div>
	);
}
