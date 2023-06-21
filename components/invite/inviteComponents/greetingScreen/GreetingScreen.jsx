/** @format */

import React from 'react';
//Hooks import
import { useConvert } from '../../hooks/useInviteFunc';
//Icon import
import { MajliskuIconV3, NewGiftIcon, MoneyIcon } from '../../../icons';
import { LineLogo } from '../../components/LineLogo';

export const GreetingScreenDefault = ({
	malay = false,
	hosts = `Mohd Rizal bin JOHARI\n &\n ZUBAIDAH BINTI MOHD ISA`,
	guest = null,
	event_title_2 = 'amirah sakinah binti tan sri acryl sani\n&\nuthman hilmi bin mohamad tarmizi',
	greeting_title,
	top_greeting,
	greet_content_1 = 'Dengan segala hormatnya kami\n mempersilakan',
	greet_content_2 = 'ke majlis resepsi untuk meraikan majlis',
	enable_gift_registry = false,
	enable_money_gift = false,
	theme = {
		lineHeight: '1px',
		backgroundColor: '#fff',
		textColor: '#265b44',
		lineColor: '#265b44',
		titleColor: '#265b44',
		greetingColor: 'rgba(102, 112, 133, 1)',
	},
	onClickRSVP = () => {},
	onClickGiftRegistry = () => {},
	onClickMoneyGifts = () => {},
}) => {
	const { useConvertText } = useConvert();
	const { lineHeight, backgroundColor, textColor, lineColor, titleColor, greetingColor } = theme;

	const greetingColorStyle = greetingColor
		? { color: greetingColor }
		: { color: 'rgba(102, 112, 133, 1)' };

	const textColorStyle = textColor ? { color: textColor } : { color: '#1D4648' };
	const updatedHosts = useConvertText(hosts);
	const updatedTitle = useConvertText(event_title_2);

	return (
		<div className={`greeting-screen`} style={{ background: backgroundColor }}>
			<div className='greeting-section'>
				<div className='greeting-salutation' style={greetingColorStyle}>
					{useConvertText(top_greeting)}
				</div>
				<div className='event-hosts-section' style={textColorStyle}>
					{updatedHosts}
				</div>
				<div className='greeting-salutation' style={greetingColorStyle}>
					{useConvertText(greet_content_1)}
				</div>
				{guest ? (
					<div className='greeting-guest' style={{ borderBottom: `1px solid ${lineColor}` }}>
						{guest}
					</div>
				) : (
					<div className='greeting-public' style={{ fontWeight: 600 }}>
						Ybhg Tun/ Toh Puan/ Tan Sri/ Puan Sri/ Dato’s Sri/ Datin Sri/ Dato’/ Datin/ Tuan/ Puan
					</div>
				)}
				<div className='greeting-salutation' style={greetingColorStyle}>
					{useConvertText(greet_content_2)}
				</div>
			</div>
			<div className='event-title-section' style={{ color: titleColor }}>
				{/* <MajliksuIconV3 fillColor={lineColor} /> */}
				<div className='event-title-text'>{updatedTitle}</div>
				{/* <MajliksuIconV3 fillColor={lineColor} /> */}
			</div>
			<div className='event-action-buttons'>
				<div className='event-rsvp-button' onClick={onClickRSVP}>
					RSVP
				</div>
				{enable_gift_registry ? (
					<div className='event-gift-button' onClick={onClickGiftRegistry}>
						<NewGiftIcon />
						{malay ? 'HADIAH' : 'GIFT REGISTRY'}
					</div>
				) : null}
				{enable_money_gift ? (
					<div className='event-money-button' onClick={onClickMoneyGifts}>
						<MoneyIcon />
						{malay ? 'SALAM KAUT' : 'MONEY GIFT'}
					</div>
				) : null}
			</div>
		</div>
	);
};
