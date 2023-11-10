/** @format */

'use client';
import React, { useEffect, useState } from 'react';
import SplashScreen from '../template/SplashScreen';

export default function Main({ children }) {
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		if (isLoading) return;
	}, [isLoading]);

	return (
		<html lang='en'>
			{isLoading ? (
				<SplashScreen setLoadingAnimation={() => setIsLoading(false)} />
			) : (
				<body>{children}</body>
			)}
		</html>
	);
}
