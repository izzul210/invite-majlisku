/** @format */

'use client';
import React, { createContext, useContext } from 'react';

export const InviteContext = createContext(null);

export function useInviteContext() {
	return useContext(InviteContext);
}
