/** @format */

import React from 'react';
import { LineLogo } from '../LineLogo';

const DetailsContainer = ({ title, children, theme }) => {
	const { textColor, backgroundColor, lineColor, titleColor, lineHeight } = theme;

	return (
		<>
			<div className='details-container-title' style={{ color: titleColor }}>
				{title}
			</div>
			<LineLogo height={lineHeight} color={lineColor} />
			{children}
		</>
	);
};

export default DetailsContainer;
