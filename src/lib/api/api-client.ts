import { env } from '$env/dynamic/public';
import type { Cookies } from '@sveltejs/kit';
import createClient, { type Middleware } from 'openapi-fetch';
import { browser } from '$app/environment';
import type { paths } from './paths/api';
import { authStore } from '$lib/stores/auth.store';
import { get } from 'svelte/store';

// Define a clear type for the SvelteKit event object for server-side usage.
type ServerEvent = {
	fetch: typeof fetch;
	cookies: Cookies;
};

export function createAuthMiddleware(cookies?: Cookies): Middleware {
	return {
		async onRequest({ request }) {
			let token: string | undefined | null = null;

			if (browser) {
				// --- Client-Side (Browser) ---
				token = get(authStore)?.accessToken;
				console.log('Auth Middleware (Client): Using token from Svelte store.');
			} else {
				// --- Server-Side (SSR) ---
				token = cookies?.get('access_token'); // 👈 Name of your cookie
				console.log('Auth Middleware (Server): Using token from cookies.');
			}

			// If a token exists, add it to the Authorization header.
			if (token) {
				request.headers.set('Authorization', `Bearer ${token}`);
			} else {
				console.log('Auth Middleware: No token found.');
			}
			return request;
		}
	};
}

export function createApiClient(event?: ServerEvent) {
	const client = createClient<paths>({
		baseUrl: env.PUBLIC_API_URL,
		fetch: browser ? fetch : (event?.fetch ?? fetch)
	});

	client.use(createAuthMiddleware(browser ? undefined : event?.cookies));
}

export const apiClient = createApiClient();
