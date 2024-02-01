/** @format */
import { motion } from 'framer-motion';
import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';
import { letterVariants } from '../../../animationProps';

export default function RoyalTitleAnimation({
	children,
	childVariants,
	italic_title,
	style,
	...props
}) {
	return (
		<motion.div className='max-w-[88%] sm:max-w-[300px]' style={style} variants={childVariants}>
			<InviteTextProvider
				fontFamily='ebGaramond'
				className='text-[24px] font-normal flex flex-col text-center whitespace-pre-line tracking-wider uppercase '
				{...props}>
				{italic_title.split('\n').map((char, index) => (
					<motion.span key={char + '-' + index} variants={letterVariants}>
						{char}
					</motion.span>
				))}
			</InviteTextProvider>
		</motion.div>
	);
}
