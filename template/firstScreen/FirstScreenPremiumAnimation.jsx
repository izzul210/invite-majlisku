/** @format */

import { MajliskuIcon } from '../../component/icons/icons';
import { motion } from 'framer-motion';
//Parts import
import { premiumColorTheme } from '../colorThemes';
import { EventTitle_Premium } from './components/EventTitle';
import { RsvpHeaderImage_Premium } from './components/RsvpHeaderImage';
import { ItalicTitle_Playfair, ItalicTitle_Playfair_Animation } from './components/ItalicTitle';
import { DateLocation_Premium } from './components/DateLocation';

export default function FirstScreenPremiumAnimation({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	optional_description = '',
	italic_title = '',
	premium_design = 0,
	childVariants,
}) {
	//Extract premium color:
	const { backgroundColor, color, fill } = premiumColorTheme[premium_design];

	return (
		<div
			className='w-full  min-h-[100vh] sm:min-h-[800px] flex flex-col gap-1 justify-center items-center p-0 pt-6'
			style={{
				background: backgroundColor,
			}}>
			<motion.div variants={childVariants}>
				<MajliskuIcon fill={color} />
			</motion.div>
			<motion.div className='my-4' variants={childVariants}>
				<RsvpHeaderImage_Premium fill={fill} rsvp_header_image={rsvp_header_image} curveTopBorder />
			</motion.div>
			<motion.div variants={childVariants}>
				<EventTitle_Premium color={color}>{event_title_1}</EventTitle_Premium>
			</motion.div>
			<ItalicTitle_Playfair_Animation
				color={color}
				fill={fill}
				italic_title={italic_title}
				childVariants={childVariants}
			/>
			{optional_description && (
				<motion.div variants={childVariants} className='w-full'>
					<DateLocation_Premium color={color} fill={fill}>
						<div style={{ whiteSpace: 'pre-line', lineHeight: 1.6 }} className='tracking-wider'>
							{optional_description}
						</div>
					</DateLocation_Premium>
				</motion.div>
			)}
		</div>
	);
}
