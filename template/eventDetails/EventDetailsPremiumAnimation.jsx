/** @format */

import moment from 'moment';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
//Event Details components import
import WazeButton from './components/button/WazeButton';
import GoogleMapButton from './components/button/GoogleMapButton';
import ActionButtons from '../buttons/ActionButtons2';
//Components import
import { TextContainer_Premium } from './components/eventDetailsComponents';
import { Ellipse_1 } from '../../component/graphics/graphics';
import { premiumColorTheme } from '../colorThemes';
//Animation props import
import { addressContainer, variants } from '../animationProps';

export default function EventDetailsPremiumAnimation({
	enable_bahasa,
	guest_name = null,
	preview,
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address,
	description,
	premium_design = 0,
	waze_link = null,
	google_link = null,
	//For RSVP
	event_date_deadline = null,
	enable_deadline = false,
	enable_gift_registry = false,
	enable_money_gift = false,
}) {
	const { useConvertText } = useInviteFunc();

	//Extract premium color:
	const { backgroundColor, color, fill } = premiumColorTheme[premium_design];

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
				background: backgroundColor,
				transform: 'translateY(-2%)',
				position: 'relative',
			}}>
			<Ellipse_1
				key='Ellipse_2'
				fill={fill}
				className='ellipse-2'
				width='360'
				height='360'
				stdDeviation='50'
				style={{ position: 'absolute', top: 60, right: -210, zIndex: -1 }}
			/>
			<Ellipse_1
				fill={fill}
				key='Ellipse_1'
				className='ellipse-3'
				width='360'
				height='360'
				stdDeviation='50'
				style={{ position: 'absolute', bottom: -80, left: -270, zIndex: -1 }}
			/>
			<div
				className='w-full flex flex-col gap-1 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<motion.div
					ref={eventDateRef}
					initial='hidden'
					animate={eventDateInView ? 'visible' : 'hidden'}
					className='w-full'
					variants={variants}>
					<TextContainer_Premium color={color}>{formatted_event_date}</TextContainer_Premium>
				</motion.div>
				<motion.div
					ref={timeRef}
					initial='hidden'
					animate={timeInView ? 'visible' : 'hidden'}
					className='w-full'
					variants={variants}>
					<TextContainer_Premium color={color}>{formatted_time}</TextContainer_Premium>
				</motion.div>
				<motion.div
					ref={addressRef}
					initial='hidden'
					animate={adressInView ? 'visible' : 'hidden'}
					className='w-full'
					variants={addressContainer}>
					<TextContainer_Premium color={color}>
						<div className='flex flex-col gap-2'>
							<motion.div className='w-full' variants={variants}>
								{formatted_event_address}
							</motion.div>
							<div className='flex gap-2 mt-2'>
								<motion.div className='w-full' variants={variants}>
									<WazeButton waze_link={waze_link} event_address={event_address} />
								</motion.div>
								<motion.div className='w-full' variants={variants}>
									<GoogleMapButton google_link={google_link} event_address={event_address} />
								</motion.div>
							</div>
						</div>
					</TextContainer_Premium>
				</motion.div>
				{description && (
					<motion.div
						ref={descriptionRef}
						initial='hidden'
						animate={descriptionInView ? 'visible' : 'hidden'}
						className='w-full'
						variants={variants}>
						<TextContainer_Premium color={color}>
							<div style={{ whiteSpace: 'pre-line', lineHeight: 1.5 }}>
								{formatted_event_description}
							</div>
						</TextContainer_Premium>
					</motion.div>
				)}
				<div className='w-full py-6'>
					<ActionButtons
						color={color}
						guest_name={guest_name}
						preview={preview}
						enable_bahasa={enable_bahasa}
						enable_gift_registry={enable_gift_registry}
						enable_money_gift={enable_money_gift}
						enable_deadline={enable_deadline}
						event_date_deadline={event_date_deadline}
					/>
				</div>
			</div>
		</div>
	);
}
