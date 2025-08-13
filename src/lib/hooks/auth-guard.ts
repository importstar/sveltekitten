import { clearCookieTokens } from '$lib/utils/auth';
import type { Handle } from '@sveltejs/kit';
import jwt from 'jsonwebtoken';

export const handleAuthGuard: Handle = async ({ event, resolve }) => {
	const { cookies, route } = event;
	// ดึง refreshtoken จาก cookies
	if (isProtectedRoute(route.id)) {
		const refreshToken = cookies.get('refreshtoken');
		if (isTokenExpired(refreshToken)) {
			clearCookieTokens(cookies);
		}

		// ถ้าไม่มี refreshtoken ให้ redirect ไปหน้า login
		if (!refreshToken) {
			return new Response(null, {
				status: 303,
				headers: { location: '/login' }
			});
		}
	}
	const response = await resolve(event);
	return response;
};

function isProtectedRoute(path: string | null): boolean {
	if (!path) return false;
	return path.split('/').includes('(auth)');
}

function isTokenExpired(token?: string, bufferTime = 300): boolean {
	if (!token) return true;
	// logger.debug('Checking if token is expired:');
	console.log('token', token);
	const { exp } = (jwt.decode(token) as { exp?: number }) || {};
	if (exp) {
		console.log('Token expiration date:', new Date(exp * 1000).toISOString());
	}
	console.log('Current time:', new Date().toISOString());
	console.log('exp', exp, !exp || Date.now() / 1000 >= exp - bufferTime);
	return !exp || Date.now() / 1000 >= exp - bufferTime;
}
