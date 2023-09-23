/** @format */

import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import moment from 'moment';
import { WazeIcon, GoogleMapIcon } from '../../component/icons/icons';
//Hooks import
import { premiumColorTheme } from '../colorThemes';
import { useInviteFunc } from '../../hooks/useInviteFunc';
import { GiftIcon, MoneyGift } from '../../component/icons/icons';
import { Ellipse_1 } from '../../component/graphics/graphics';

//////////Components of EventDetails
const TextContainer = ({ children, color = '#1D4648' }) => {
	return (
		<InviteTextProvider
			color={color}
			className='w-full uppercase text-sm text-start font-medium py-4 border-b border-gray-300 tracking-wide'>
			{children}
		</InviteTextProvider>
	);
};

const TextContainer_Premium = ({ children, color = '#F1BFBE' }) => {
	return (
		<InviteTextProvider
			color={color}
			className='w-full uppercase text-sm text-start font-normal py-4 tracking-wide'>
			{children}
		</InviteTextProvider>
	);
};

const TextContainer2 = ({ children }) => {
	return (
		<InviteTextProvider
			color='#1D4648'
			className='w-full uppercase text-sm text-center font-medium py-3 tracking-wide'>
			{children}
		</InviteTextProvider>
	);
};

const ButtonProvider = ({ type = null, children }) => {
	return (
		<div
			className='w-full font-medium rounded-full py-2 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
			style={
				type === 'primary'
					? { color: 'white', backgroundColor: '#1E1E1E', border: ' 1px solid #1E1E1E' }
					: { color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid #D0D5DD' }
			}>
			{children}
		</div>
	);
};

const ButtonMainProvider = ({ children, type }) => {
	const buttonStyles =
		type === 'primary'
			? { color: 'white', backgroundColor: '#1E1E1E', border: ' 1px solid #1E1E1E' }
			: { color: '#1E1E1E', backgroundColor: 'white', border: ' 1px solid white' };

	return (
		<div
			className='w-full font-medium rounded-full h-[48px] py-2 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
			style={buttonStyles}>
			<InviteTextProvider color={buttonStyles?.color}>{children}</InviteTextProvider>
		</div>
	);
};

const ButtonProvider2 = ({ children, color = '#1E1E1E', backgroundColor = 'transparemt' }) => {
	return (
		<div
			className='w-full font-medium rounded-full h-[48px] py-2 px-8 flex flex-row justify-center items-center gap-2 cursor-pointer'
			style={{
				color: color,
				backgroundColor: backgroundColor,
				border: `1px solid ${color}`,
			}}>
			{children}
		</div>
	);
};

/////////// EventDetails Template
export const EventDetailsDefault = ({
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Lelaki: Baju Melayu/Batik\n\nPerempuan: Baju Kurung/Bersesuaian',
	background = 'var(--nude-tint-90, linear-gradient(0deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.90) 100%), #F1BFBE)',
	waze_link = null,
	google_link = null,
}) => {
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
							<ButtonProvider>
								<WazeIcon />
							</ButtonProvider>
							<ButtonProvider>
								<GoogleMapIcon />
							</ButtonProvider>
						</div>
					</div>
				</TextContainer>
				<TextContainer>{formatted_event_description}</TextContainer>
			</div>
		</div>
	);
};

export const EventDetailsMinimal_2 = ({
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Lelaki: Baju Melayu/Batik\n\nPerempuan: Baju Kurung/Bersesuaian',
	waze_link = null,
	google_link = null,
}) => {
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
				<TextContainer2>
					<div className='flex flex-col gap-2'>
						{formatted_event_address}
						<div className='flex gap-2'>
							<ButtonProvider>
								<WazeIcon />
							</ButtonProvider>
							<ButtonProvider>
								<GoogleMapIcon />
							</ButtonProvider>
						</div>
					</div>
				</TextContainer2>
				<TextContainer2>{formatted_event_description}</TextContainer2>
			</div>
		</div>
	);
};

export const EventDetailsPremium = ({
	event_date = '2023-07-19',
	event_start = '2023-03-30T18:00:52-07:00',
	event_end = '2023-03-30T20:00:52-07:00',
	event_address = '101-5825 Vine St,\nVancouver,\nV6M4A2BC',
	description = 'Lelaki: Baju Melayu/Batik\n\nPerempuan: Baju Kurung/Bersesuaian',
	premium_design = 0,
}) => {
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
};
