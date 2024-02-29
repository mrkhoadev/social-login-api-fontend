import { SERVER_URL } from '../configs/index';

export default async function getProfile(
	accessToken
) {
	const res = await fetch(SERVER_URL + '/api/v1/auth/profile', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	if (res.ok) {
		const { data } = await res.json();
		return data;
	}
	return null;
}
