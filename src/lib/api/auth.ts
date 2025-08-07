import { browser } from '$app/environment';
import { authStore } from '$lib/stores/auth.store';
import type { Cookies } from '@sveltejs/kit';
import { get } from 'svelte/store';

export function getAuthToken(cookies?: Cookies): string | null {
	let token: string | null = null;
	if (browser) {
		token = get(authStore)?.accessToken || null;
	} else {
		token = cookies?.get('access_token') || null;
	}
	return token ? JSON.parse(token) : null;
}
