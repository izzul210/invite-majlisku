/** @format */

import moment from 'moment';
import { WazeIcon, GoogleMapIcon } from '../../component/icons/icons';
//Hooks import
import { useInviteFunc } from '../../hooks/useInviteFunc';
//Components import
import {
	TextContainer,
	TextContainer_Premium,
	TextContainer2,
	ButtonProvider,
	ButtonMainProvider,
	ButtonProvider2,
} from './components/eventDetailsComponents';
import { Ellipse_1 } from '../../component/graphics/graphics';
import { premiumColorTheme } from '../colorThemes';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
//Icons import
import { GiftIcon, MoneyGift } from '../../component/icons/icons';

export default function EventDetailsPremium({
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Lelaki: Baju Melayu/Batik\n\nPerempuan: Baju Kurung/Bersesuaian',
	premium_design = 0,
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
			className='w-full flex flex-col items-center justify-center gap-12 pb-12 sm:py-20'
			style={{
				background: backgroundColor,
				transform: 'translateY(-10%)',
				position: 'relative',
			}}>
			<Ellipse_1
				key='Ellipse_2'
				fill={fill}
				className='ellipse-2'
				width='360'
				height='360'
				stdDeviation='50'
				style={{ position: 'absolute', top: 60, right: -200, zIndex: 1 }}
			/>
			<Ellipse_1
				fill={fill}
				key='Ellipse_1'
				className='ellipse-3'
				width='360'
				height='360'
				stdDeviation='50'
				style={{ position: 'absolute', bottom: -80, left: -270, zIndex: 1 }}
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
							<ButtonProvider2 color={color}>
								<WazeIcon fill={color} />
							</ButtonProvider2>
							<ButtonProvider2 color={color}>
								<GoogleMapIcon fill={color} />
							</ButtonProvider2>
						</div>
					</div>
				</TextContainer_Premium>
				<TextContainer_Premium color={color}>{formatted_event_description}</TextContainer_Premium>
				<div className='py-8 w-full flex flex-col gap-2 '>
					<ButtonMainProvider
						type={
							premium_design === 1 || premium_design === 6 || premium_design === 7
								? 'primary'
								: 'secondary'
						}>
						RSVP
					</ButtonMainProvider>
					<ButtonProvider2 color={color}>
						<GiftIcon fill={color} />
						<InviteTextProvider color={color} className='uppercase'>
							Bawah Hadiah
						</InviteTextProvider>
					</ButtonProvider2>
					<ButtonProvider2 color={color}>
						<MoneyGift fill={color} />
						<InviteTextProvider color={color} className=' uppercase'>
							Salam Kaut
						</InviteTextProvider>
					</ButtonProvider2>
				</div>
			</div>
		</div>
	);
}
