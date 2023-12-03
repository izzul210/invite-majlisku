/** @format */

import React from 'react';
import { SendingLetterIcon } from '../icons/icons';

function ButtonProvider({
	isLoading = false,
	actualButton = false,
	className = '',
	children,
	...props
}) {
	const buttonStyles = {
		color: 'white',
		backgroundColor: '#1E1E1E',
		border: ' 1px solid #1E1E1E',
	};

	return (
		<button
			className={`${
				isLoading ? 'cursor-not-allowed opacity-40' : ''
			} flex py-4 px-8 gap-2 whitespace-nowrap items-center justify-center rounded-full border border-gray-300 cursor-pointer font-medium text-sm ${className}`}
			style={{ fontFamily: 'Lora', fontWeight: 500, ...buttonStyles }}
			{...props}>
			{isLoading ? (
				<div className='flex gap-2 items-center'>
					<SendingLetterIcon />
					<span>Sending..</span>
				</div>
			) : (
				<>{children}</>
			)}
		</button>
	);
}

export default ButtonProvider;
