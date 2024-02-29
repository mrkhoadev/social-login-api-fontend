'use client';
import Button from "../../../components/Button";
import { handleCallback } from '../../../utils/login';
import React, { useEffect } from 'react';

export default function Auth({ params }) {
	const { provider } = params;

	useEffect(() => {
		(async () => {
			const accessToken = await handleCallback(provider, window.location.href);
			if (accessToken) {
				localStorage.accessToken = accessToken;
				window.location.href = '/';
			}
		})()
	}, [provider]);
	return (
		<>
			<h1>redirecting...</h1>
			<Button onClick={() => (window.location.href = '/')}>Go Home!</Button>
		</>
	);
}
