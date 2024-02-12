/** @format */

'use client';
import React, { createContext, useContext } from 'react';

export const InviteContext = createContext(null);

////To pass design_theme to the rest of components

export function useInviteContext() {
	return useContext(InviteContext);
}
