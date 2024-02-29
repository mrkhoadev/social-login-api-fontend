export const providers = ['google', 'github'];

export const SERVER_URL = process.env.NEXT_PUBLIC_ORIGIN_API;

export const redirectLinks = {
	google: '/api/v1/auth/google',
	github: '/api/v1/auth/github',
};

export const accessLinks = {
	google: '/api/v1/auth/google/callback',
	github: '/api/v1/auth/github/callback',
};
