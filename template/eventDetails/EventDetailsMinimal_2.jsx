/** @format */

import moment from 'moment';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
//Components import
import { TextContainer2 } from './components/eventDetailsComponents';
import WazeButton from './components/button/WazeButton';
import GoogleMapButton from './components/button/GoogleMapButton';

export default function EventDetailsMinimal_2({
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address,
	description,
	waze_link = null,
	google_link = null,
}) {
	const { useConvertText } = useInviteFunc();

	let formatted_event_date = moment(event_date).format('dddd, D MMMM YYYY');
	let formatted_time = `${moment(event_start).format('h:mm A')} - ${moment(event_end).format(
		'h:mm A'
	)}`;
	let formatted_event_address = useConvertText(event_address);
	let formatted_event_description = useConvertText(description);

	return (
		<div
			className='w-full flex flex-col items-center justify-center gap-12 py-12 sm:py-20'
			style={{
				background:
					'var(--nude-tint-90, linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #F1BFBE)',
			}}>
			<div
				className='w-full flex flex-col gap-0 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<TextContainer2>{formatted_event_date}</TextContainer2>
				<TextContainer2>{formatted_time}</TextContainer2>
				<TextContainer2>{formatted_event_address}</TextContainer2>
				<TextContainer2>
					<div className='flex gap-2'>
						<WazeButton waze_link={waze_link} event_address={event_address} />
						<GoogleMapButton google_link={google_link} event_address={event_address} />
					</div>
				</TextContainer2>
				{description && description !== '' ? (
					<TextContainer2>{formatted_event_description}</TextContainer2>
				) : null}
			</div>
		</div>
	);
}
