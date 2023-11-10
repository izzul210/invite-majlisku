/** @format */
'use client';
import React from 'react';
import { useRouter } from 'next/navigation';

export default function Page() {
	const router = useRouter();
	return (
		<div>
			<button onClick={() => router.back()}>Back</button>
			<div>Thank you!</div>
		</div>
	);
}
