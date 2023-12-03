/** @format */

import moment from 'moment';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
//Event Details components import
import WazeButton from './components/button/WazeButton';
import GoogleMapButton from './components/button/GoogleMapButton';
import ActionButtons from '../buttons/ActionButtons';
import RsvpButton from '../buttons/RsvpButton';
import PersonalizedRsvpButton from '../buttons/PersonalizedRsvpButton';
import MoneyGiftButton from '../buttons/MoneyGiftButton';
import GiftRegistryButton from '../buttons/GiftRegistryButton';
//Components import
import { TextContainer_Premium } from './components/eventDetailsComponents';
import { Ellipse_1 } from '../../component/graphics/graphics';
import { premiumColorTheme } from '../colorThemes';

export default function EventDetailsPremium({
	enable_bahasa,
	guest_name = null,
	preview,
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Lelaki: Baju Melayu/Batik\n\nPerempuan: Baju Kurung/Bersesuaian',
	premium_design = 0,
	waze_link = null,
	google_link = null,
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
				<TextContainer_Premium color={color}>{formatted_event_date}</TextContainer_Premium>
				<TextContainer_Premium color={color}>{formatted_time}</TextContainer_Premium>
				<TextContainer_Premium color={color}>
					<div className='flex flex-col gap-2'>
						{formatted_event_address}
						<div className='flex gap-2 mt-2'>
							<WazeButton waze_link={waze_link} event_address={event_address} />
							<GoogleMapButton google_link={google_link} event_address={event_address} />
						</div>
					</div>
				</TextContainer_Premium>
				<TextContainer_Premium color={color}>{formatted_event_description}</TextContainer_Premium>
				<ActionButtons
					color={color}
					guest_name={guest_name}
					preview={preview}
					enable_bahasa={enable_bahasa}
					enable_gift_registry={enable_gift_registry}
					enable_money_gift={enable_money_gift}
				/>
			</div>
		</div>
	);
}
