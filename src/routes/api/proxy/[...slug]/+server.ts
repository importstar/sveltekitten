import { env } from '$env/dynamic/private';
import { logger, sanitize } from '$lib/logger';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { clearCookieTokens, setAuthTokens } from '$lib/utils/auth';

const handler: RequestHandler = async ({ request, cookies, params, fetch }) => {
	const path = params.slug;
	const accessToken = cookies.get('access_token');
	const API_ENDPOINT = `${env.BACKEND_API_URL}/${path}`;

	logger.debug(`${params.slug}`);
	logger.info(`[API Proxy] Forwarding request to: [${request.method}] ${API_ENDPOINT}`);

	const makeApiRequest = (token?: string) => {
		// start with incoming headers
		const headers = new Headers(request.headers);

		// clean up hop-by-hop / auto headers
		headers.delete('host');
		headers.delete('content-length');

		// Auth: prefer explicit token param, else cookie token
		if (token) {
			headers.set('authorization', `Bearer ${token}`);
		} else {
			headers.delete('authorization');
		}

		return fetch(API_ENDPOINT, {
			method: request.method,
			headers,
			body: request.body,
			// @ts-ignore
			duplex: 'half'
		});
	};

	try {
		// 1. first attempt to fetch the API
		const response = await makeApiRequest(accessToken);
		// 2. check 401 Unauthorized response then try create new access token with refresh token
		if (response.status === 401 && accessToken) {
			logger.warn(`[API Proxy] Unauthorized request, trying to refresh access token.`);
			const refreshToken = cookies.get('refresh_token');
			if (!refreshToken) {
				throw new Error('No refresh token available');
			}

			// 3. ขอ access token ใหม่จาก API ด้วย refresh token
			const refreshResponse = await fetch(`${env.BACKEND_API_URL}/auth/refresh`, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${refreshToken}`
				}
			});

			if (refreshResponse.ok) {
				const newTokenData = await refreshResponse.json();
				setAuthTokens(cookies, newTokenData.access_token, newTokenData.refresh_token);
				// ยิง request ซ้ำอีกครั้งด้วย access token ใหม่
				return makeApiRequest(newTokenData.access_token);
			} else {
				// ถ้า refresh token ไม่ถูกต้อง ให้ลบ token ทั้งหมด
				logger.warn(`[API Proxy] Refresh token expired or invalid, clearing cookies.`);
				clearCookieTokens(cookies);
			}
		}
		// จากนั้นก็คืนค่า response เดิมออกไปซึ่งอาจจะเป็น 200 หรือ 401
		return response;
	} catch (err) {
		logger.error(
			sanitize({
				error: err
			}),
			`[API Proxy] Error fetching from API: [${request.method}] ${API_ENDPOINT}`
		);
		throw error(502, `Bad Gateway: Could not connect to API service. Please try again later.`);
	}
};

export const GET = handler;
export const POST = handler;
export const PUT = handler;
export const DELETE = handler;
export const PATCH = handler;
