/** @format */

import React from 'react';

function InputTextProvider({ icon, error = false, ...props }) {
	return (
		<div
			className={`border-2 ${
				error ? 'border-red-500' : ''
			} rounded-md py-3 px-4 w-full flex flex-row items-center gap-2`}>
			{icon && <div>{icon}</div>}
			<input
				{...props}
				className={`w-full appearance-none border-none bg-transparent focus:outline-none ${props.className}`}
				style={{
					fontFamily: 'EB Garamond',
				}}
			/>
		</div>
	);
}

export default InputTextProvider;
