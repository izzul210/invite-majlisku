/** @format */

// app/providers.jsx
'use client';

import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React from 'react';

export function Providers(props) {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			{props.children}
			{<ReactQueryDevtools initialIsOpen={false} />}
		</QueryClientProvider>
	);
}
