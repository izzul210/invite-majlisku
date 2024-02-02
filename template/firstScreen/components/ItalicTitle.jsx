/** @format */
import { motion } from 'framer-motion';
import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';
import { useInviteFunc } from '../../../hooks/useInviteFunc';
import { letterVariants } from '../../animationProps';

export const ItalicTitle = ({ children, ...props }) => {
	const { useConvertText } = useInviteFunc();
	return (
		<InviteTextProvider fontFamily='greatVibes' className='text-center text-5xl' {...props}>
			{useConvertText(children)}
		</InviteTextProvider>
	);
};

export const ItalicTitle_Playfair = ({ children, ...props }) => {
	const { useConvertText } = useInviteFunc();
	return (
		<InviteTextProvider
			fontFamily='playfair'
			className='text-3xl text-center uppercase my-4 px-2'
			{...props}>
			{useConvertText(children)}
		</InviteTextProvider>
	);
};

export const ItalicTitle_Playfair_Animation = ({ italic_title, childVariants, ...props }) => {
	return (
		<motion.div className='w-full' variants={childVariants}>
			<InviteTextProvider
				fontFamily='playfair'
				className='text-3xl text-center uppercase my-4 flex flex-col px-2'
				{...props}>
				{italic_title.split('\n').map((char, index) => (
					<motion.span key={char + '-' + index} variants={letterVariants}>
						{char}
					</motion.span>
				))}
			</InviteTextProvider>
		</motion.div>
	);
};
