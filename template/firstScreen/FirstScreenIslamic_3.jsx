/** @format */
import moment from 'moment';
//Components import
import Bismillah from './components/Bismillah';
import IslamicTitle from './components/titles/IslamicTitle';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
//Bg import
import Nikah_13 from '../../public/images/templates/nikah-13.png';

const fontColor = '#A98F21';

const TextDetail = ({ children }) => {
	return (
		<InviteTextProvider fontFamily='sansPro' color={fontColor} className='tracking-wide'>
			{children}
		</InviteTextProvider>
	);
};

export default function FirstScreenIslamic_2({
	event_title_1 = 'Event Title 1',
	event_date = '2023-10-21',
	event_location = 'Location, City',
	italic_title = 'Main Title',
}) {
	return (
		<div
			className='w-full min-h-[700px] md:min-h-[800px] flex justify-center items-center'
			style={{
				backgroundColor: '#F3F3F3',
				backgroundImage: `url(${Nikah_13.src})`,
				backgroundSize: 'cover',
				backgroundPosition: 'center',
			}}>
			<div
				className='w-full flex justify-center items-center flex-col gap-12 mt-6 p-5'
				style={{ maxWidth: '300px' }}>
				<Bismillah />
				<IslamicTitle color={fontColor}>{italic_title}</IslamicTitle>
				<div className='flex flex-col gap-5 text-center uppercase text-xs'>
					<TextDetail fontFamily='sansPro' color={fontColor} className='tracking-wide'>
						{event_title_1}
					</TextDetail>
					<TextDetail fontFamily='sansPro' color={fontColor}>
						<div className='flex flex-col gap-2'>
							<div>{moment(event_date).format('DD.MM.YYYY')}</div>
							<div>{event_location}</div>
						</div>
					</TextDetail>
				</div>
			</div>
		</div>
	);
}
