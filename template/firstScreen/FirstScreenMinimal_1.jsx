/** @format */

import { MajliskuIcon } from '../../component/icons/icons';
//Parts import
import { EventTitle_Playfair } from './components/EventTitle';
import { RsvpHeaderImage } from './components/RsvpHeaderImage';
import { ItalicTitle_Playfair } from './components/ItalicTitle';
import { DateLocation } from './components/DateLocation';

export default function FirstScreenMinimal_1({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	optional_description = '',
	italic_title = '',
}) {
	return (
		<div
			className='w-full flex flex-col gap-4 justify-center items-center px-5 py-12 sm:py-24'
			style={{ minHeight: '100vh', maxWidth: '383px' }}>
			<MajliskuIcon />
			<div className='border-b  text-center border-t w-full py-4 border-gray-300'>
				<EventTitle_Playfair>{event_title_1}</EventTitle_Playfair>
			</div>

			<RsvpHeaderImage rsvp_header_image={rsvp_header_image} />
			<ItalicTitle_Playfair>{italic_title}</ItalicTitle_Playfair>
			{optional_description && (
				<div className='border-b border-t w-full py-4 border-gray-300'>
					<DateLocation>{optional_description}</DateLocation>
				</div>
			)}
		</div>
	);
}
