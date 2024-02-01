/** @format */

export const addressContainer = {
	visible: {
		transition: {
			staggerChildren: 0.3,
			duration: 1,
			delay: 0,
		},
	},
};

export const variants = {
	hidden: { opacity: 0.2, y: '30%', filter: 'blur(20px)' },
	visible: {
		opacity: 1,
		y: '0%',
		filter: 'blur(0px)',
		transition: {
			duration: 1, // Increase this value to make the transition slower
		},
	},
};

export const greetingTitleContainer = {
	visible: {
		transition: {
			staggerChildren: 0.3,
			duration: 1,
			delay: 0,
		},
	},
};

export const letterVariants = {
	hidden: { opacity: 0.2, y: '30%', filter: 'blur(20px)' },
	visible: {
		opacity: 1,
		y: '0%',
		filter: 'blur(0px)',
		transition: {
			duration: 0.5, // Increase this value to make the transition slower
		},
	},
};
