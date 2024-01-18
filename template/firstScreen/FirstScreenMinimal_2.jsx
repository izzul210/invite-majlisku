/** @format */

import { MajliskuIcon } from '../../component/icons/icons';
//Parts import
import { EventTitle_Playfair } from './components/EventTitle';
import { RsvpHeaderImage } from './components/RsvpHeaderImage';
import { ItalicTitle_Playfair } from './components/ItalicTitle';
import { DateLocation } from './components/DateLocation';

export default function FirstScreenMinimal_2({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	optional_description = '',
	italic_title = '',
}) {
	return (
		<div
			className='w-full min-h-[100vh] sm:min-h-[800px] flex flex-col gap-4 justify-center items-center px-5 py-12 sm:py-24'
			style={{ maxWidth: '383px' }}>
			<MajliskuIcon />
			<EventTitle_Playfair>{event_title_1}</EventTitle_Playfair>
			<RsvpHeaderImage rsvp_header_image={rsvp_header_image} />
			<ItalicTitle_Playfair>{italic_title}</ItalicTitle_Playfair>
			{optional_description && <DateLocation>{optional_description}</DateLocation>}
		</div>
	);
}
