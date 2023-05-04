/**
 * ************** COMPONENT: Hosted By ************************
 *
 * @format
 */

import React from 'react';

export const HostedByCard = ({ hosts, malay }) => {
	return (
		<div className='invite-card-hosted-by'>
			<div className='hosted-by'>{malay ? 'Oleh:' : 'Hosted By:'}</div>
			{hosts?.map((host, index) => (
				<div className='host' key={index}>
					{host}
				</div>
			))}
		</div>
	);
};
