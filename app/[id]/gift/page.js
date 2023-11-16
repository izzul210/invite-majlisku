/** @format */
import React from 'react';
import GiftPage from './GiftPage';
//Components import
import InviteTextProvider from '../../../component/textProvider/InviteTextProvider';

export default function Page({ params }) {
	return <GiftPage inviteId={params.id} />;
}
