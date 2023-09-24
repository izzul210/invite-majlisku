/** @format */

import { MajliskuIcon } from '../../component/icons/icons';
import moment from 'moment';
//Assets import
import LetterPress_2 from '../../assets/images/letterpress_2.png';
//Parts import
import { EventTitle_Premium } from './components/EventTitle';
import { ItalicTitle_Playfair } from './components/ItalicTitle';
import { DateLocation_Playfair } from './components/DateLocation';

export default function FirstScreenEmbossed({
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
			className='w-full flex justify-center items-center'
			style={{
				minHeight: '700px',
				backgroundColor: '#F3F3F3',
				backgroundImage: `url(${LetterPress_2.src})`,
				backgroundSize: 'cover',
				backgroundPositionX: 'center',
			}}>
			<div
				className='w-full flex justify-center items-center flex-col gap-4  p-5'
				style={{ maxWidth: '300px' }}>
				<MajliskuIcon />
				<EventTitle_Premium color='#1D4648'>{event_title_1}</EventTitle_Premium>
				<ItalicTitle_Playfair>{italic_title}</ItalicTitle_Playfair>
				<DateLocation_Playfair>
					<div className='flex flex-col gap-2'>
						<div>{moment(event_date).format('DD.MM.YYYY')}</div>
						<div>{event_location}</div>
					</div>
				</DateLocation_Playfair>
			</div>
		</div>
	);
}
