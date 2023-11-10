/** @format */
'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { MajliskuLoadingIcon } from '../component/icons/icons';

function SplashScreen({ setLoadingAnimation }) {
	useEffect(() => {
		const timer = setTimeout(() => {
			setLoadingAnimation();
		}, 4000);
		return () => clearTimeout(timer);
	}, []);

	return (
		<motion.div
			initial={{ opacity: 1, filter: 'blur(0)' }}
			animate={{ opacity: 0, filter: 'blur(10px)', transition: { duration: 2, delay: 1 } }}
			className='loading-overlay'>
			<MajliskuLoadingIcon />
		</motion.div>
	);
}

export default SplashScreen;
