/** @format */

import moment from 'moment';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
//Components import
import { TextContainer, ButtonProvider } from './components/eventDetailsComponents';
import WazeButton from './components/button/WazeButton';
import GoogleMapButton from './components/button/GoogleMapButton';

export default function EventDetailsDefault({
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Lelaki: Baju Melayu/Batik\n\nPerempuan: Baju Kurung/Bersesuaian',
	background = 'var(--nude-tint-90, linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #F1BFBE)',
	waze_link = null,
	google_link = null,
}) {
	const { useConvertText } = useInviteFunc();

	let formatted_event_date = moment(event_date).format('dddd, D MMMM YYYY');
	let formatted_time = `${moment.parseZone(event_start).format('h:mm A')} - ${moment
		.parseZone(event_end)
		.format('h:mm A')}`;
	let formatted_event_address = useConvertText(event_address);
	let formatted_event_description = useConvertText(description);

	return (
		<div
			className='w-full flex flex-col items-center justify-center gap-12 py-12 sm:py-20'
			style={{
				background: background,
			}}>
			<div
				className='w-full flex flex-col gap-1 items-center px-5 sm:p-0'
				style={{ maxWidth: '400px' }}>
				<TextContainer>{formatted_event_date}</TextContainer>
				<TextContainer>{formatted_time}</TextContainer>
				<TextContainer>
					<div className='flex flex-col gap-2'>
						{formatted_event_address}
						<div className='flex gap-2'>
							<WazeButton waze_link={waze_link} event_address={event_address} />
							<GoogleMapButton google_link={google_link} event_address={event_address} />
						</div>
					</div>
				</TextContainer>
				<TextContainer>{formatted_event_description}</TextContainer>
			</div>
		</div>
	);
}
