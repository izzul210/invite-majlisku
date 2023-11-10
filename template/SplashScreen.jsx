/** @format */
'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { MajliskuLoadingIcon } from '../component/icons/icons';

function SplashScreen() {
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
