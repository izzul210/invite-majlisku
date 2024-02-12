/** @format */

import { MajliskuIcon } from '../../component/icons/icons';
import { motion } from 'framer-motion';
import { EventTitle_Playfair } from './components/EventTitle';
import { RsvpHeaderImage } from './components/RsvpHeaderImage';
import { ItalicTitle_Playfair_Animation } from './components/ItalicTitle';
import { DateLocation } from './components/DateLocation';

export default function FirstScreenMinimalAnimation_1({
	event_title_1 = 'Event Title 1',
	rsvp_header_image = '',
	optional_description = '',
	italic_title = '',
	childVariants,
}) {
	return (
		<div
			className='w-full min-h-[100vh] sm:min-h-[800px] flex flex-col gap-4 justify-center items-center px-5 py-12 sm:py-24'
			style={{ maxWidth: '383px' }}>
			<motion.div variants={childVariants}>
				<MajliskuIcon />
			</motion.div>
			<div className='border-b  text-center border-t w-full py-3 border-gray-300'>
				<motion.div variants={childVariants}>
					<EventTitle_Playfair>{event_title_1}</EventTitle_Playfair>
				</motion.div>
			</div>
			<motion.div variants={childVariants}>
				<RsvpHeaderImage border rsvp_header_image={rsvp_header_image} />
			</motion.div>
			<ItalicTitle_Playfair_Animation italic_title={italic_title} childVariants={childVariants} />
			{optional_description && (
				<div className='border-b border-t w-full py-3 border-gray-300'>
					<motion.div variants={childVariants} className='w-full'>
						<DateLocation>{optional_description}</DateLocation>
					</motion.div>
				</div>
			)}
		</div>
	);
}
