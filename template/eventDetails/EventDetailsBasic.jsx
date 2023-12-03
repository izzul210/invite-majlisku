/** @format */

import moment from 'moment';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
//Event Details components import
import ActionButtons from '../buttons/ActionButtons';
import BasicEventTextProvider from './components/text/BasicEventTextProvider';
import WazeButton from './components/button/WazeButton';
import GoogleMapButton from './components/button/GoogleMapButton';

export default function EventDetailsDefault({
	enable_bahasa,
	guest_name = null,
	preview,
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Lelaki: Baju Melayu/Batik\n\nPerempuan: Baju Kurung/Bersesuaian',
	waze_link = null,
	google_link = null,
	enable_gift_registry = false,
	enable_money_gift = false,
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
				background: '#FFFDFA',
			}}>
			<div
				className='w-full flex flex-col gap-1 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<BasicEventTextProvider>{formatted_event_date}</BasicEventTextProvider>
				<BasicEventTextProvider>{formatted_time}</BasicEventTextProvider>
				<BasicEventTextProvider>
					<div className='flex flex-col gap-4'>
						{formatted_event_address}
						<div className='flex gap-2'>
							<WazeButton waze_link={waze_link} event_address={event_address} />
							<GoogleMapButton google_link={google_link} event_address={event_address} />
						</div>
					</div>
				</BasicEventTextProvider>
				<BasicEventTextProvider>{formatted_event_description}</BasicEventTextProvider>
			</div>
			<ActionButtons
				preview={preview}
				guest_name={guest_name}
				enable_bahasa={enable_bahasa}
				enable_gift_registry={enable_gift_registry}
				enable_money_gift={enable_money_gift}
			/>
		</div>
	);
}
