import { browser } from '$app/environment';
import { logger } from '$lib/logger';
import { QueryClient } from '@tanstack/svelte-query';

export async function load() {
	const queryClient = new QueryClient({
		defaultOptions: {
			queries: {
				enabled: browser
			}
		}
	});
	return { queryClient };
}
