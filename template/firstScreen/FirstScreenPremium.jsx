/** @format */

import { MajliskuIcon } from '../../component/icons/icons';
import moment from 'moment';
//Parts import
import { premiumColorTheme } from '../colorThemes';
import { EventTitle_Premium } from './components/EventTitle';
import { RsvpHeaderImage_Premium } from './components/RsvpHeaderImage';
import { ItalicTitle_Playfair } from './components/ItalicTitle';
import {
	DateLocation,
	DateLocation_Playfair,
	DateLocation_Premium,
} from './components/DateLocation';

export default function FirstScreenPremium({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	rsvp_header_image_file = null,
	event_date = '2023-10-21',
	event_location = null,
	italic_title = '',
	premium_design = 0,
}) {
	let rsvpHeaderImage = rsvp_header_image_file
		? URL.createObjectURL(rsvp_header_image_file)
		: rsvp_header_image;

	//Extract premium color:
	const { backgroundColor, color, fill } = premiumColorTheme[premium_design];

	return (
		<div
			className='w-full flex flex-col gap-1 justify-center items-center p-0 pt-6'
			style={{ minHeight: '700px', background: backgroundColor }}>
			<MajliskuIcon fill={color} />
			<div className='my-4'>
				<RsvpHeaderImage_Premium fill={fill} rsvp_header_image={rsvpHeaderImage} curveTopBorder />
			</div>
			<EventTitle_Premium color={color}>{event_title_1}</EventTitle_Premium>
			<ItalicTitle_Playfair color={color}>{italic_title}</ItalicTitle_Playfair>
			<DateLocation_Premium color={color} fill={fill}>
				<div className='flex flex-row items-center justify-center gap-2'>
					<div>{moment(event_date).format('DD.MM.YYYY')}</div>
					<svg
						xmlns='http://www.w3.org/2000/svg'
						width='8'
						height='8'
						viewBox='0 0 8 8'
						fill='none'>
						<path
							d='M8 4C7.56001 4.06589 6.52446 4.28606 5.56433 5.14102C4.35592 6.21776 4.06993 7.58538 3.99922 8C3.8515 7.4777 3.43037 6.25472 2.28167 5.23101C1.40797 4.45319 0.50442 4.135 0 4C0.469849 3.89072 1.6044 3.55806 2.61324 2.51667C3.55137 1.54761 3.88136 0.480514 3.99922 0C4.13121 0.50462 4.44863 1.43511 5.23276 2.319C6.26989 3.48734 7.5003 3.87304 8 3.99839V4Z'
							fill={fill}
						/>
					</svg>
					<div>{event_location}</div>
				</div>
			</DateLocation_Premium>
		</div>
	);
}
