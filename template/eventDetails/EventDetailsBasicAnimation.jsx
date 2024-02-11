/** @format */

import moment from 'moment';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
//Event Details components import
import ActionButtons from '../buttons/ActionButtons';
import BasicEventTextProvider from './components/text/BasicEventTextProvider';
import WazeButton from './components/button/WazeButton';
import GoogleMapButton from './components/button/GoogleMapButton';
//Animation const import
import { addressContainer, variants } from '../animationProps';

export default function EventDetailsBasicAnimation({
	enable_bahasa,
	guest_name = null,
	preview,
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address,
	description,
	waze_link = null,
	google_link = null,
	//For RSVP
	event_date_deadline = null,
	enable_deadline = false,
	enable_gift_registry = false,
	enable_money_gift = false,
	inviteId,
}) {
	const { useConvertText } = useInviteFunc();

	let formatted_event_date = moment(event_date).format('dddd, D MMMM YYYY');
	let formatted_time = `${moment(event_start).format('h:mm A')} - ${moment(event_end).format(
		'h:mm A'
	)}`;
	let formatted_event_address = useConvertText(event_address);
	let formatted_event_description = useConvertText(description);

	const [eventDateRef, eventDateInView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	const [timeRef, timeInView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	const [addressRef, adressInView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	const [descriptionRef, descriptionInView] =
		useInView({
			triggerOnce: true, // Animation occurs only once when component comes into view
			threshold: 0.8, // Defines at what percentage of the component's height the animation should start
		}) || [];

	return (
		<div
			className='w-full flex flex-col items-center justify-center gap-12 py-12 sm:py-20'
			style={{
				background: '#FFFDFA',
			}}>
			<div
				className='w-full flex flex-col gap-1 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<motion.div
					ref={eventDateRef}
					initial='hidden'
					animate={eventDateInView ? 'visible' : 'hidden'}
					className='w-full'
					variants={variants}>
					<BasicEventTextProvider>{formatted_event_date}</BasicEventTextProvider>
				</motion.div>
				<motion.div
					ref={timeRef}
					initial='hidden'
					animate={timeInView ? 'visible' : 'hidden'}
					className='w-full'
					variants={variants}>
					<BasicEventTextProvider>{formatted_time}</BasicEventTextProvider>
				</motion.div>
				<motion.div
					ref={addressRef}
					initial='hidden'
					animate={adressInView ? 'visible' : 'hidden'}
					className='w-full'
					variants={addressContainer}>
					<BasicEventTextProvider>
						<div className='flex flex-col gap-4'>
							<motion.div className='w-full' variants={variants}>
								{formatted_event_address}
							</motion.div>
							<div className='flex gap-2'>
								<motion.div className='w-full' variants={variants}>
									<WazeButton waze_link={waze_link} event_address={event_address} />
								</motion.div>
								<motion.div className='w-full' variants={variants}>
									<GoogleMapButton google_link={google_link} event_address={event_address} />
								</motion.div>
							</div>
						</div>
					</BasicEventTextProvider>
				</motion.div>
				{description && (
					<motion.div
						ref={descriptionRef}
						initial='hidden'
						animate={descriptionInView ? 'visible' : 'hidden'}
						className='w-full'
						variants={variants}>
						<BasicEventTextProvider>{formatted_event_description}</BasicEventTextProvider>
					</motion.div>
				)}
			</div>
			<ActionButtons
				inviteId={inviteId}
				preview={preview}
				guest_name={guest_name}
				enable_bahasa={enable_bahasa}
				enable_gift_registry={enable_gift_registry}
				enable_money_gift={enable_money_gift}
				enable_deadline={enable_deadline}
				event_date_deadline={event_date_deadline}
			/>
		</div>
	);
}
