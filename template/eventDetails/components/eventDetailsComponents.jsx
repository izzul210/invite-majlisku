/** @format */

import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';

//////////Components of EventDetails
export const TextContainer = ({ children, color = '#1D4648' }) => {
	return (
		<InviteTextProvider
			color={color}
			className='w-full uppercase text-sm text-start font-medium py-4 border-b border-gray-300 tracking-wide'>
			{children}
		</InviteTextProvider>
	);
};

export const TextContainer_Premium = ({ children, color = '#F1BFBE' }) => {
	return (
		<InviteTextProvider
			color={color}
			className='w-full uppercase text-sm text-start font-normal py-4 tracking-wide'>
			{children}
		</InviteTextProvider>
	);
};

export const TextContainer2 = ({ children }) => {
	return (
		<InviteTextProvider
			color='#1D4648'
			className='w-full uppercase text-sm text-center font-medium py-3 tracking-wide'>
			{children}
		</InviteTextProvider>
	);
};

export const ButtonProvider = ({ type = null, children }) => {
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

export const ButtonMainProvider = ({ children, type }) => {
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

export const ButtonProvider2 = ({
	children,
	color = '#1E1E1E',
	backgroundColor = 'transparemt',
}) => {
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
