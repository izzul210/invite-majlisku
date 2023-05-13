/** @format */

import React from 'react';
//Hooks import
import moment from 'moment';
//Icon import
import { LineLogo } from '../../components/LineLogo';
import { activitiesData } from '../../hooks/useFakeInviteData';

export const Tentative = ({
	malay = false,
	tentative = activitiesData,
	theme = {
		lineHeight: '1px',
		backgroundColor: '#FFFFFF',
		textColor: 'rgba(29, 70, 72, 1)',
		lineColor: 'rgba(152, 162, 179, 1)',
		titleColor: 'rgba(30, 30, 30, 1)',
	},
}) => {
	const { textColor, backgroundColor, lineColor, titleColor, lineHeight } = theme;

	return (
		<div className='tentative-main' style={{ background: backgroundColor }}>
			<div className='tentative-title' style={{ color: titleColor }}>
				{malay ? 'Aturcara' : 'Tentative'}
			</div>
			<LineLogo height={lineHeight} color={lineColor} />
			<div className='tentative-activities'>
				{tentative?.length !== 0 ? (
					<div className='activity-content'>
						{tentative
							.sort(function (a, b) {
								var c = new Date(a.date);
								var d = new Date(b.date);
								return d < c ? 1 : d > c ? -1 : 0;
							})
							.map((activity, index) => {
								return (
									<div key={index}>
										<div className='yes_activity'>
											<div className='activity_detail' style={{ color: textColor }}>
												{activity.title || activity.title !== '' ? (
													<div className='activity_title'>{activity.title}</div>
												) : null}
												<div className='activity_description'>{activity.description}</div>
												<div className='blurryBottom'></div>
											</div>
											<div className='date'>
												<div className='bold'>{moment(activity.date).format('h:mm A')}</div>
											</div>
										</div>
										<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
											<div style={{ width: '94%', height: '1px', background: lineColor }}></div>
										</div>
									</div>
								);
							})}
					</div>
				) : (
					<></>
				)}
			</div>
		</div>
	);
};
