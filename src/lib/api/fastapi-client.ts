import { env } from '$env/dynamic/public';
import type { Cookies } from '@sveltejs/kit';
import createClient, { type Middleware } from 'openapi-fetch';
import { browser } from '$app/environment';
import type { paths } from './paths/api';
import { getAuthToken } from './api-core';

// Define a clear type for the SvelteKit event object for server-side usage.
type ServerEvent = {
	fetch: typeof fetch;
	cookies: Cookies;
};

export function createAuthMiddleware(cookies?: Cookies): Middleware {
	return {
		async onRequest({ request }) {
			const token: string | null = getAuthToken(browser ? undefined : cookies);
			if (token) {
				request.headers.set('Authorization', `Bearer ${token}`);
			} else {
				console.error('[ERR] => Auth Middleware: No token found.');
			}
			return request;
		}
	};
}

export function createFastApiClient(event?: ServerEvent) {
	const client = createClient<paths>({
		baseUrl: env.PUBLIC_API_URL,
		fetch: browser ? fetch : (event?.fetch ?? fetch)
	});

	return client;
}

const fastapiClient = createFastApiClient();

export default fastapiClient;
