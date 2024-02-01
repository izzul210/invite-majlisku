/** @format */
import { motion } from 'framer-motion';
import { MajliskuIcon } from '../../component/icons/icons';
import { EventTitle_1 } from './components/EventTitle';
import { RsvpHeaderImage } from './components/RsvpHeaderImage';
import { ItalicTitle } from './components/ItalicTitle';
import { DateLocation } from './components/DateLocation';

export default function FirstScreenDefaultAnimation({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	optional_description = '',
	italic_title = '',
	childVariants,
}) {
	return (
		<div
			className='w-full min-h-[100vh] sm:min-h-[800px] flex flex-col gap-4 justify-center sm:mt-4 items-center px-5 py-12 sm:py-24'
			style={{ maxWidth: '383px' }}>
			<MajliskuIcon />
			<motion.div variants={childVariants}>
				<EventTitle_1>{event_title_1}</EventTitle_1>
			</motion.div>
			<motion.div variants={childVariants}>
				<RsvpHeaderImage rsvp_header_image={rsvp_header_image} curveTopBorder />
			</motion.div>
			<motion.div variants={childVariants}>
				<ItalicTitle>{italic_title}</ItalicTitle>
			</motion.div>
			<motion.div variants={childVariants}>
				{optional_description && <DateLocation>{optional_description}</DateLocation>}
			</motion.div>
		</div>
	);
}
