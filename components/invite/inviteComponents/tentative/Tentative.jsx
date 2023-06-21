/** @format */

import React from 'react';
//Hooks import
import moment from 'moment';
//Components import
import AccordianProvider from '../../components/accordian/AccordianProvider';
import DetailsContainer from '../../components/DetailsContainer/DetailsContainer';
import { activitiesData } from '../../hooks/useFakeInviteData';

export const Tentative = ({
	type = 'default',
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

	const checkLastChild = (index) => {
		if (index === tentative.length - 1) {
			return true;
		} else {
			return false;
		}
	};

	// return (
	// 	<div className='tentative-main' style={{ background: backgroundColor }}>
	// 		<div className='tentative-title' style={{ color: titleColor }}>
	// 			{malay ? 'Aturcara' : 'Tentative'}
	// 		</div>
	// 		<LineLogo height={lineHeight} color={lineColor} />
	// 		<div className='tentative-activities'>
	// 			{tentative?.length !== 0 ? (
	// 				<div className='activity-content'>
	// 					{tentative
	// 						.sort(function (a, b) {
	// 							var c = new Date(a.date);
	// 							var d = new Date(b.date);
	// 							return d < c ? 1 : d > c ? -1 : 0;
	// 						})
	// 						.map((activity, index) => {
	// 							return (
	// 								<div key={index}>
	// 									<div className='yes_activity'>
	// 										<div className='activity_detail' style={{ color: textColor }}>
	// 											{activity.title || activity.title !== '' ? (
	// 												<div className='activity_title'>{activity.title}</div>
	// 											) : null}
	// 											<div className='activity_description'>{activity.description}</div>
	// 											<div className='blurryBottom'></div>
	// 										</div>
	// 										<div className='date'>
	// 											<div className='bold'>{moment(activity.date).format('h:mm A')}</div>
	// 										</div>
	// 									</div>
	// 									<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
	// 										<div style={{ width: '94%', height: '1px', background: lineColor }}></div>
	// 									</div>
	// 								</div>
	// 							);
	// 						})}
	// 				</div>
	// 			) : (
	// 				<></>
	// 			)}
	// 		</div>
	// 	</div>
	// );

	if (type === 'default') {
		return (
			<div
				className='tentative-main tentative-default-container'
				style={{ background: backgroundColor }}>
				<DetailsContainer title={malay ? 'ATURCARA' : 'TENTATIVE'} theme={theme}>
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
											<>
												<div className='yes_activity' key={index}>
													<div className='activity_detail' style={{ color: textColor }}>
														{activity.title || activity.title !== '' ? (
															<div className='activity_title'>{activity.title}</div>
														) : null}
														<div className='activity_description'>{activity.description}</div>
													</div>
													<div className='date'>
														<div className='bold'>{moment(activity.date).format('h:mm A')}</div>
													</div>
												</div>
												<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
													<div
														style={{
															width: '94%',
															height: '1px',
															background: 'rgba(228, 231, 236, 1)',
														}}></div>
												</div>
											</>
										);
									})}
							</div>
						) : (
							<></>
						)}
					</div>
				</DetailsContainer>
			</div>
		);
	} else {
		return (
			<div
				className='tentative-main tentative-accordian-container'
				style={{ background: backgroundColor }}>
				<AccordianProvider title={malay ? 'ATURCARA' : 'TENTATIVE'} theme={theme}>
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
											<>
												<div className='yes_activity' key={index}>
													<div className='activity_detail' style={{ color: textColor }}>
														{activity.title || activity.title !== '' ? (
															<div className='activity_title'>{activity.title}</div>
														) : null}
														<div className='activity_description'>{activity.description}</div>
													</div>
													<div className='date'>
														<div className='bold'>{moment(activity.date).format('h:mm A')}</div>
													</div>
												</div>
												{checkLastChild(index) ? null : (
													<div style={{ display: 'flex', justifyContent: 'flex-end' }}>
														<div
															style={{
																width: '94%',
																height: '1px',
																background: 'rgba(228, 231, 236, 1)',
															}}></div>
													</div>
												)}
											</>
										);
									})}
							</div>
						) : (
							<></>
						)}
					</div>
				</AccordianProvider>
			</div>
		);
	}
};
