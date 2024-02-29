import { SERVER_URL, accessLinks, redirectLinks } from '../configs/index';

export const handleGetRedirect = async (
	provider
) => {
	const res = await fetch(`${SERVER_URL}${redirectLinks[provider]}`);
	if (res.ok) {
		const { data } = await res.json();
		const { urlRedirect } = data.result;
		return urlRedirect;
	}
	return '';
};

export const handleCallback = async (
	provider,
	thisUrl
) => {
	const queryParams = thisUrl.slice(thisUrl.indexOf('?') + 1);
	const res = await fetch(`https://social-login-api-fontend.vercel.app${accessLinks[provider]}?${queryParams}`);
	if (res.ok) {
		const { data: { accessToken } } = await res.json();
		return accessToken;
	}
	return '';
};
