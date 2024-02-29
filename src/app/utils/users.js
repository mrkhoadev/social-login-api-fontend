import { SERVER_URL } from '../configs/index';

export async function getUserList(
	accessToken
) {
	const res = await fetch(SERVER_URL + '/api/v1/users/user-list', {
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
export async function getUserDetail(
	accessToken,
	id
) {
	const res = await fetch(SERVER_URL + `/api/v1/users/${id}`, {
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
export async function userEdit(
	accessToken,
	data = {}
) {
	const res = await fetch(SERVER_URL + `/api/v1/users/edit`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(data)
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	return null;
}
export async function userDelete(
	accessToken,
	id
) {
	const res = await fetch(SERVER_URL + `/api/v1/users/delete/${id}`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	return null;
}
export async function userDeleteSelected(
	accessToken,
	data
) {
	const res = await fetch(SERVER_URL + `/api/v1/users/deleteSelected/`, {
		method: 'DELETE',
		headers: {
			'Content-Type': 'application/json',
			Authorization: `Bearer ${accessToken}`,
		},
		body: JSON.stringify(data)
	});
	if (res.ok) {
		const data = await res.json();
		return data;
	}
	return null;
}
