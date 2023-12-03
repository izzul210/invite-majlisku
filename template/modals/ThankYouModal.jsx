/** @format */

'use client';
import Link from 'next/link';
import React, { useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import moment from 'moment';
//Components import
import ModalProvider from '../../component/drawer/DrawerProvider';
import InviteTextProvider from '../../component/textProvider/InviteTextProvider';
import ButtonProvider from '../../component/button/ButtonProvider';
import AddToCalendar from '../calendar/components/AddToCalendar';
//Icons import
import { AttendingIcon, GiftIcon, MoneyGift, MajliskuWhiteIcon } from '../../component/icons/icons';

export default function ThankYouModal({
	guestName = null,
	isOpen,
	handleClose,
	event_date,
	enable_bahasa = false,
	eventDetails,
	status = 'attending',
}) {
	const pathname = usePathname();
	//Title Text
	const thankyouText = enable_bahasa ? 'Terima kasih kerana membalas!' : 'Thank you for the RSVP!';
	const attendingText = enable_bahasa
		? `Kami menanti kehadiran${guestName ? `, ${guestName}` : ' anda'}`
		: `We're looking forward to seeing you there${guestName ? `, ${guestName}` : ''}`;
	const notattendingText = enable_bahasa
		? `Maafkan kami atas kesulitan. Semoga DAPAT berjumpa lagi${guestName ? `, ${guestName}` : ''}`
		: `WE'RE SORRY TO HEAR THAT.  HOPE WE MEET AGAIN SOMEDAY${guestName ? `, ${guestName}` : ''}`;
	const maybeText = enable_bahasa
		? `KAMI MENANTI keputusan${guestName ? `, ${guestName}` : ' anda'}`
		: `WE'rE LOOKING FORWARD TO your response${guestName ? `, ${guestName}` : ''}`;

	return (
		<ModalProvider topBorder isOpen={isOpen} handleClose={handleClose}>
			<div className='w-full flex flex-col items-center'>
				{/***** Page Container ***/}
				<div className='w-full max-w-2xl flex flex-col gap-6 py-6 mt-4'>
					<div className='w-full items-center flex flex-col gap-6'>
						<AttendingIcon width={36} height={36} />
						<InviteTextProvider className='uppercase text-[20px] font-medium text-center'>
							{thankyouText}
						</InviteTextProvider>
						{status === 'attending' ? (
							<>
								<InviteTextProvider className='uppercase text-[16px] font-normal text-center'>
									{attendingText}
								</InviteTextProvider>
								<div className='py-2 border-t border-b w-full'>
									<InviteTextProvider className='uppercase text-[14px] font-medium text-center'>
										{moment(event_date).format('dddd, D MMMM YYYY')}
									</InviteTextProvider>
								</div>
							</>
						) : status === 'notattending' ? (
							<InviteTextProvider className='uppercase text-[16px] font-normal text-center'>
								{notattendingText}
							</InviteTextProvider>
						) : (
							<InviteTextProvider className='uppercase text-[16px] font-normal text-center'>
								{maybeText}
							</InviteTextProvider>
						)}
					</div>

					<div className='flex flex-col gap-6'>
						<div className='flex flex-col gap-3'>
							{status === 'attending' ? (
								<AddToCalendar
									enable_bahasa={enable_bahasa}
									address={eventDetails?.location_info?.address}
									start_time={eventDetails?.event_time?.start}
									end_time={eventDetails?.event_time?.end}
									event_date={eventDetails?.event_date}
									event_title={`${eventDetails?.event_title_1} ${eventDetails?.italic_title}`}
								/>
							) : null}
							<Link href={`${pathname}/gift`}>
								<ButtonProvider className='w-full uppercase'>
									<GiftIcon /> {enable_bahasa ? 'Bawa Hadiah' : 'Gift Registry'}
								</ButtonProvider>
							</Link>
							<Link href='https://majlisku.com' target='_blank'>
								<ButtonProvider type='primary' className='w-full uppercase'>
									<MajliskuWhiteIcon />
									{enable_bahasa ? 'Cipta undangan anda' : 'Create your invitation'}
								</ButtonProvider>
							</Link>
						</div>
					</div>
				</div>
			</div>
		</ModalProvider>
	);
}

const MajliskuButtonIcon = () => (
	<svg xmlns='http://www.w3.org/2000/svg' width='25' height='24' viewBox='0 0 25 24' fill='white'>
		<g clip-path='url(#clip0_2066_2692)'>
			<path
				d='M24.2684 11.845C23.3565 11.4727 22.7554 10.8269 22.1197 10.1424L21.9775 9.98984C21.4941 9.47215 21.0879 9.05718 20.699 8.68392C19.385 7.42376 17.9856 7.02099 16.4197 7.45427C16.1821 7.52038 15.9546 7.59869 15.713 7.68311C15.6866 7.69226 15.6612 7.70142 15.6348 7.71057C16.0481 5.62861 15.6571 3.01574 13.353 1.63353C12.8473 1.33044 12.3578 0.976495 11.8836 0.63374C11.6317 0.451683 11.3718 0.263523 11.1108 0.0845174C11.0417 0.0377318 10.8143 -0.0588906 10.6883 0.0519709C10.5888 0.13944 10.5512 0.275728 10.5238 0.396761C10.4974 0.512707 10.4781 0.630689 10.4588 0.745618C10.4233 0.958188 10.3888 1.15855 10.3197 1.34366C10.2222 1.602 10.0892 1.85627 9.96023 2.1024C9.89625 2.22547 9.83126 2.34752 9.77135 2.4716C8.91733 4.21691 8.68478 5.82999 9.05949 7.40443C9.11636 7.64243 9.17932 7.87432 9.24634 8.11944C9.25447 8.14893 9.26259 8.17843 9.27071 8.20792C5.89625 7.35561 3.14022 8.69307 0.661423 10.2767L0.500977 10.3784L0.635021 10.5126C0.828979 10.7069 1.01989 10.8971 1.20979 11.0863C1.65051 11.5246 2.06584 11.9386 2.48219 12.3668C2.68935 12.5803 2.89549 12.8041 3.09453 13.0207C3.41136 13.3665 3.73936 13.7235 4.08767 14.051C5.47584 15.3539 7.18998 15.6733 8.70407 14.9196C8.02979 16.5134 8.19125 17.744 9.23009 19.0988C9.68097 19.6867 10.2202 20.2145 10.7411 20.7261C10.932 20.9133 11.1291 21.1055 11.3179 21.2987C11.911 21.9019 12.2999 22.5325 12.5061 23.2241C12.5375 23.3278 12.5914 23.4143 12.6553 23.515C12.6848 23.5607 12.7163 23.6106 12.7477 23.6675L12.9366 24.0011L13.028 23.6289C13.0636 23.4834 13.091 23.3502 13.1184 23.221C13.1702 22.9688 13.2149 22.7511 13.2991 22.5569C13.6444 21.7605 14.0181 20.9143 14.4527 20.0976C15.259 18.5831 15.453 17.1806 15.0448 15.8106C15.0113 15.6977 14.9625 15.5929 14.9158 15.4922C14.8955 15.4485 14.8752 15.4048 14.8559 15.36L14.8082 15.2481L14.4192 15.3204L14.4213 15.4495C14.4223 15.5116 14.4213 15.5746 14.4213 15.6377C14.4213 15.777 14.4192 15.9214 14.4355 16.0669C14.5594 17.206 14.4466 18.2038 14.0902 19.1171C13.811 19.8331 13.5165 20.5481 13.2321 21.2408C13.1417 21.4605 13.0524 21.6781 12.964 21.8947C12.9214 21.8408 12.8798 21.7859 12.8361 21.73C12.6015 21.4259 12.3578 21.1116 12.0785 20.8238C11.8592 20.597 11.6145 20.3915 11.3778 20.1942C11.1758 20.0243 10.9666 19.8494 10.7736 19.6602C10.2984 19.1934 9.80791 18.7093 9.40374 18.1804C8.81984 17.4145 8.46442 15.7424 9.55505 14.5881C9.86274 14.2626 10.2161 13.9748 10.5594 13.6961C10.6883 13.5913 10.8122 13.4906 10.9331 13.3889C12.8726 14.3765 14.993 14.7691 17.7917 14.6613C20.2837 14.5657 22.4162 13.7286 24.3101 12.1033L24.5 11.9406L24.2684 11.846V11.845ZM12.702 13.4337C11.9658 13.2394 11.3159 13.036 10.8183 12.5112L10.7025 12.3891L10.5929 12.5163C10.5086 12.6139 10.4284 12.7095 10.3492 12.8041C10.1816 13.0034 10.0242 13.1926 9.85157 13.3655C9.27376 13.9442 8.53449 14.3673 7.52509 14.6948C6.82441 14.9227 6.16028 14.6481 5.72565 14.3775C5.2697 14.0938 4.81781 13.7266 4.38216 13.2842C4.11915 13.0177 3.8663 12.7258 3.62157 12.4441C3.00212 11.7301 2.36338 10.9947 1.44639 10.5025C1.49615 10.478 1.54388 10.4546 1.59161 10.4302C1.86782 10.294 2.10646 10.176 2.35119 10.061L2.46086 10.0092C3.65203 9.44774 4.88381 8.86699 6.22527 8.68697C7.54744 8.51101 8.82288 8.75308 10.1247 9.4274C10.1816 9.4569 10.2364 9.47012 10.3126 9.48843C10.3512 9.49758 10.3979 9.50877 10.4568 9.52504L10.7432 9.60437L10.6396 9.32468C10.6172 9.26569 10.601 9.2128 10.5858 9.16499C10.5543 9.06532 10.5279 8.97989 10.4741 8.90157C9.58755 7.6109 9.39359 6.12291 9.88305 4.35421C10.0953 3.58632 10.405 2.82758 10.7046 2.09528C10.8173 1.81864 10.9341 1.53385 11.0438 1.25111C13.2514 2.37905 14.7797 3.63107 15.1027 5.96832C15.2519 7.04947 14.7401 7.89059 14.2456 8.70426C14.1775 8.81614 14.0882 8.91784 13.9948 9.02565C13.9196 9.11109 13.8424 9.20059 13.7734 9.29721C13.7155 9.3796 13.7023 9.47419 13.6911 9.55759C13.6871 9.58505 13.684 9.61251 13.6779 9.63895L13.6241 9.87186L13.8577 9.82203C13.881 9.81694 13.9064 9.81389 13.9308 9.81084C14.0069 9.80169 14.0933 9.79151 14.1715 9.73964C14.406 9.58403 14.6396 9.4213 14.866 9.26263C15.2692 8.9809 15.6866 8.69002 16.1141 8.43677C17.3987 7.67396 18.7046 7.82347 19.7932 8.85784C20.1557 9.20263 20.4939 9.59115 20.8198 9.96645L20.9681 10.1363C21.6018 10.8666 22.2547 11.6202 23.189 12.1064L22.5726 12.3902C21.8912 12.7044 21.1864 13.0289 20.4898 13.3401C18.6305 14.1711 16.6919 14.3623 14.73 13.9066C14.5208 13.8578 14.3116 13.811 14.1024 13.7642C13.6424 13.6615 13.1661 13.5547 12.7041 13.4327L12.702 13.4337Z'
				fill='yellow'
			/>
		</g>
		<defs>
			<clipPath id='clip0_2066_2692'>
				<rect width='24' height='24' fill='white' transform='translate(0.5)' />
			</clipPath>
		</defs>
	</svg>
);
