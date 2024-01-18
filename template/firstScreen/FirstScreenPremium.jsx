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
	optional_description = '',
	italic_title = '',
	premium_design = 0,
}) {
	//Extract premium color:
	const { backgroundColor, color, fill } = premiumColorTheme[premium_design];

	return (
		<div
			className='w-full  min-h-[100vh] sm:min-h-[800px] flex flex-col gap-1 justify-center items-center p-0 pt-6'
			style={{
				background: backgroundColor,
			}}>
			<MajliskuIcon fill={color} />
			<div className='my-4'>
				<RsvpHeaderImage_Premium fill={fill} rsvp_header_image={rsvp_header_image} curveTopBorder />
			</div>
			<EventTitle_Premium color={color}>{event_title_1}</EventTitle_Premium>
			<ItalicTitle_Playfair color={color}>{italic_title}</ItalicTitle_Playfair>
			{optional_description && (
				<DateLocation_Premium color={color} fill={fill}>
					<div style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }} className='tracking-wider'>
						{optional_description}
					</div>
				</DateLocation_Premium>
			)}
		</div>
	);
}
