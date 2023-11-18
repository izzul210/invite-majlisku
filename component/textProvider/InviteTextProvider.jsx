/** @format */
import { source_sans_pro, lora, eb_garamond, great_vibes, playfair_display } from '../../app/fonts';

function InviteTextProvider({ children, fontFamily = 'ebGaramond', color = '#1D4648', className }) {
	/*
    fontFamily = sansPro, lora, poppins
    */

	const familyClass =
		fontFamily === 'ebGaramond'
			? eb_garamond
			: fontFamily === 'sansPro'
			? source_sans_pro
			: fontFamily === 'lora'
			? lora
			: fontFamily === 'greatVibes'
			? great_vibes
			: fontFamily === 'playfair'
			? playfair_display
			: source_sans_pro;

	return (
		<div className={`${familyClass.className} ${className}`} style={{ color: color }}>
			{children}
		</div>
	);
}

export default InviteTextProvider;
