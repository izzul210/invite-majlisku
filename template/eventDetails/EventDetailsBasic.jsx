/** @format */

import moment from 'moment';
import { WazeIcon, GoogleMapIcon } from '../../component/icons/icons';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
//Event Details components import
import BasicEventTextProvider from './components/text/BasicEventTextProvider';
import ButtonTextProvider from './components/text/ButtonTextProvider';
import BasicEventButtonProvider from './components/button/BasicEventButtonProvider';
import { GiftIcon, MoneyIcon } from './components/icons/EventDetailsIcons';

export default function EventDetailsDefault({
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Lelaki: Baju Melayu/Batik\n\nPerempuan: Baju Kurung/Bersesuaian',
	waze_link = null,
	google_link = null,
	onClickRSVP = () => {},
	onClickGiftRegistry = () => {},
	onClickMoneyGift = () => {},
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
							<BasicEventButtonProvider>
								<WazeIcon />
							</BasicEventButtonProvider>
							<BasicEventButtonProvider>
								<GoogleMapIcon />
							</BasicEventButtonProvider>
						</div>
					</div>
				</BasicEventTextProvider>
				<BasicEventTextProvider>{formatted_event_description}</BasicEventTextProvider>
			</div>
			<div className='w-full flex flex-col gap-2 items-center px-5'>
				<BasicEventButtonProvider type='primary' onClick={onClickRSVP}>
					<ButtonTextProvider color='#FFF'>RSVP</ButtonTextProvider>
				</BasicEventButtonProvider>
				<BasicEventButtonProvider onClick={onClickGiftRegistry}>
					<GiftIcon />
					<ButtonTextProvider color='#1E1E1E'>BAWA HADIAH</ButtonTextProvider>
				</BasicEventButtonProvider>
				<BasicEventButtonProvider onClick={onClickMoneyGift}>
					<MoneyIcon /> <ButtonTextProvider color='#1E1E1E'>SALAM KAUT</ButtonTextProvider>
				</BasicEventButtonProvider>
			</div>
		</div>
	);
}
