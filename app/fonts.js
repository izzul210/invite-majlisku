/** @format */
import { Great_Vibes, Playfair_Display } from 'next/font/google';
import localFont from 'next/font/local';

export const source_sans_pro = localFont({
	src: [
		{
			path: '../public/SourceSansPro/SourceSansPro-Regular.otf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../public/SourceSansPro/SourceSansPro-Black.otf',
			weight: '500',
			style: 'normal',
		},
		{
			path: '../public/SourceSansPro/SourceSansPro-Semibold.otf',
			weight: '600',
			style: 'normal',
		},
		{
			path: '../public/SourceSansPro/SourceSansPro-Bold.otf',
			weight: '700',
			style: 'normal',
		},
	],
	display: 'swap',
	variable: '--font-source-sans-pro',
});

export const lora = localFont({
	src: [
		{
			path: '../public/LoraFamily/Lora-Regular.ttf',
			weight: '400',
			style: 'normal',
		},
		{
			path: '../public/LoraFamily/Lora-Italic.ttf',
			weight: '400',
			style: 'italic',
		},

		{
			path: '../public/LoraFamily/Lora-Bold.ttf',
			weight: '700',
			style: 'normal',
		},
		{
			path: '../public/LoraFamily/Lora-BoldItalic.ttf',
			weight: '700',
			style: 'italic',
		},
	],
	display: 'swap',
	variable: '--font-lora',
});

export const eb_garamond = localFont({
	src: '../public/EBGaramond/EBGaramond-VariableFont_wght.ttf',
	display: 'swap',
	variable: '--font-eb-garamond',
});

export const great_vibes = Great_Vibes({
	weight: ['400'],
	style: 'normal',
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-great-vibes',
});

export const playfair_display = Playfair_Display({
	weight: ['400', '500', '600', '700'],
	subsets: ['latin'],
	display: 'swap',
	variable: '--font-playfair-display',
});
