/** @format */
import moment from 'moment';
import Image from 'next/legacy/image';
//Components import
import Bismillah from './components/Bismillah';
import IslamicTitle from './components/titles/IslamicTitle';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';

const fontColor = '#A98F21';

const TextDetail = ({ children }) => {
	return (
		<InviteTextProvider fontFamily='sansPro' color={fontColor} className='tracking-wide'>
			{children}
		</InviteTextProvider>
	);
};

export default function FirstScreenIslamic_3({
	event_title_1 = 'Event Title 1',
	event_date = '2023-10-21',
	event_location = 'Location, City',
	italic_title = 'Main Title',
}) {
	return (
		<div className='w-full bg-[#FFFDFA] min-h-[100vh] sm:min-h-[800px]  flex justify-center items-center'>
			<div className='w-full relative  h-[100vh] sm:min-h-[800px]  flex justify-center items-center'>
				<Image
					className='h-[667px] md:h-[800px] z-0'
					src='/nikah-13.png'
					alt='Nikah 13'
					layout='fill'
					quality={100}
					priority
					// objectFit='cover'
					objectPosition='center'
				/>
				<div
					className='w-full flex justify-center items-center flex-col gap-12 mt-6 p-5 z-0 relative'
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
		</div>
	);
}
