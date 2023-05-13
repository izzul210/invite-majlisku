/** @format */

import React from 'react';
//Styling import
//Icon import
import { WhatsappIcon, PhoneIcon } from '../../../icons';
//Components import
import { LineLogo } from '../../components/LineLogo';
import { contactData } from '../../hooks/useFakeInviteData';

export const ContactDetails = ({
	malay = false,
	contacts = contactData,
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
		<div className='contact-main' style={{ background: backgroundColor }}>
			<div className='contact-title' style={{ color: titleColor }}>
				{malay ? 'Hubungi' : 'Contact'}
			</div>
			<LineLogo height={lineHeight} color={lineColor} />
			<div className='contact-list'>
				{contacts?.length > 0
					? contacts.map((contact, index) => (
							<div
								key={index}
								className='contact-card'
								style={{ borderBottom: `1px solid ${lineColor}` }}>
								<div className='contact-info' style={{ color: textColor }}>
									<div className='contact-name'>{contact.name}</div>
									<div className='contact-phone'>{contact.phone}</div>
								</div>
								<div className='contact-action'>
									<a
										href={`https://wa.me/6${contact?.phone}`}
										target='_blank'
										rel='noreferrer'
										className='contact'>
										<WhatsappIcon width='22px' height='22px' />
									</a>
									<a
										href={`tel:${contact?.phone
											.replace(/^0/, '+60 ')
											.replace(/(\d{2})(\d{3})(\d{3})/, '$1-$2 $3')}`}
										rel='noreferrer'>
										<PhoneIcon width='22px' height='22px' fillColor='#1E1E1E' />
									</a>
								</div>
							</div>
					  ))
					: null}
			</div>
		</div>
	);
};
