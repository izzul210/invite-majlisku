/** @format */

import React from 'react';

function ButtonProvider({
	type = 'default',
	actualButton = false,
	className = '',
	children,
	...props
}) {
	let buttonStyles;

	if (type === 'default') {
		buttonStyles = {
			color: '#1E1E1E',
			backgroundColor: 'white',
			border: ' 1px solid #D0D5DD',
		};
	} else if (type === 'primary') {
		buttonStyles = {
			color: 'white',
			backgroundColor: '#1E1E1E',
			border: ' 1px solid #1E1E1E',
		};
	}

	return (
		<button
			className={`flex py-4 px-8 gap-2 items-center justify-center rounded-full border border-gray-300 cursor-pointer font-medium text-sm ${className}`}
			style={{ fontFamily: 'Lora', fontWeight: 500, ...buttonStyles }}
			{...props}>
			{children}
		</button>
	);
}

export default ButtonProvider;
