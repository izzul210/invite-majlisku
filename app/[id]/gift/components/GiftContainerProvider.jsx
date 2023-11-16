/** @format */

import React from 'react';

function GiftContainerProvider({ children }) {
	return (
		<div className='w-full flex flex-col items-center'>
			<div className='w-full max-w-lg'>{children}</div>
		</div>
	);
}

export default GiftContainerProvider;
