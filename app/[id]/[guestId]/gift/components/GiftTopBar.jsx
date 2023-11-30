/** @format */

import React from 'react';

function GiftTopBar({ handleBackButton }) {
	return (
		<div className='mt-3 w-full p-6 border-b border-[#E4E7EC]'>
			<button onClick={handleBackButton}>
				<svg
					xmlns='http://www.w3.org/2000/svg'
					width='24'
					height='24'
					viewBox='0 0 24 24'
					fill='none'>
					<path
						d='M7.13095 5.68958L8.19159 6.75022L3.69173 11.2501H23.25V12.7501H3.69187L8.19159 17.2498L7.13095 18.3105L0.820406 12L7.13095 5.68958Z'
						fill='#1D4648'
					/>
				</svg>
			</button>
		</div>
	);
}

export default GiftTopBar;
