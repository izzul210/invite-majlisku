/** @format */

import Image from 'next/legacy/image';
import { Graphic_1, Ellipse_1 } from '../../../component/graphics/graphics';

export const RsvpHeaderImage = ({ rsvp_header_image, curveTopBorder = false }) => {
	return (
		<div style={{ width: '100%', height: 'auto' }}>
			<Image
				priority
				src={rsvp_header_image}
				alt='rsvp_header_image'
				layout='responsive'
				width={280}
				height={322}
				style={{
					borderTopLeftRadius: curveTopBorder ? 160 : 0,
					borderTopRightRadius: curveTopBorder ? 160 : 0,
				}}
				placeholder='blur'
				blurDataURL='data:...'
			/>
		</div>
	);
};

export const RsvpHeaderImage_Premium = ({ rsvp_header_image, fill, curveTopBorder = false }) => {
	return (
		<div
			style={{
				position: 'relative',
			}}>
			<Ellipse_1
				width='400'
				height='490'
				fill={fill}
				className='ellipse-1'
				style={{ position: 'absolute', top: -90, right: -40, zIndex: 1 }}
			/>
			<Graphic_1
				className='graphic-1'
				fill={fill}
				style={{ position: 'absolute', top: 100, left: 120, zIndex: 1 }}
			/>
			<div style={{ width: '220px', height: 'auto', position: 'relative', zIndex: 3 }}>
				<Image
					priority
					src={rsvp_header_image}
					alt='rsvp_header_image'
					layout='responsive'
					width={280}
					height={322}
					style={{
						borderTopLeftRadius: curveTopBorder ? 105 : 0,
						borderTopRightRadius: curveTopBorder ? 105 : 0,
					}}
					blurDataURL='data:...'
					placeholder='blur'
				/>
			</div>
		</div>
	);
};
