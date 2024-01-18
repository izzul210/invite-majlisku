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
		<InviteTextProvider fontFamily='sansPro' color={fontColor} className='tracking-wider'>
			{children}
		</InviteTextProvider>
	);
};

export default function FirstScreenIslamic_3({
	event_title_1 = 'Event Title 1',
	optional_description = '',
	italic_title = 'Main Title',
}) {
	return (
		<div className='w-full bg-[#FFFDFA] min-h-[100vh] sm:min-h-[800px]  flex justify-center items-center'>
			<div className='w-full relative  h-[100vh] sm:min-h-[800px] sm:max-h-[900px]  flex justify-center items-center'>
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
						<TextDetail fontFamily='sansPro' color={fontColor}>
							{event_title_1}
						</TextDetail>
						{optional_description && (
							<TextDetail fontFamily='sansPro' color={fontColor}>
								<div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>
									{optional_description}
								</div>
							</TextDetail>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
