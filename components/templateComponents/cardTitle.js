/**
 * ************** COMPONENT: Card Title ************************
 *
 * @format
 */
import React from 'react';
//Icons
import { MajliskuIcon } from '../icons';

export const CardTitle = ({ dashboardImage, eventTitle1 }) => {
	return (
		<div className='invite-card-top'>
			<MajliskuIcon />
			<div className='event-title-1'>{eventTitle1}</div>
			<div className='header-image'>
				<img src={dashboardImage}></img>
			</div>
		</div>
	);
};
