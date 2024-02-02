/** @format */
import { motion } from 'framer-motion';
import InviteTextProvider from '../../../../component/textProvider/InviteTextProvider';
import { letterVariants } from '../../../animationProps';

export default function IslamicTitle({ childVariants, italic_title, children, ...props }) {
	return (
		<motion.div className='max-w-[88%] sm:max-w-[300px]' variants={childVariants}>
			<InviteTextProvider
				fontFamily='playfair'
				className='text-xl font-normal flex flex-col text-center whitespace-pre-line  uppercase '
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
