import { env } from '$env/dynamic/public';

interface FetchResponse<T = unknown> {
	data?: T;
	error?: string;
	response?: Response;
}

export async function apiFetch<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<FetchResponse<T>> {
	const url = `${env.PUBLIC_BASE_API_URL}${endpoint}`;
	const defaultHeaders = {
		'Content-Type': 'application/json'
	};

	const config: RequestInit = {
		headers: { ...defaultHeaders, ...options.headers },
		...options
	};

	try {
		const res = await fetch(url, config);
		if (!res.ok) {
			const data = await res.json();
			return { error: data.detail, response: res };
		}
		const data = await res.json();
		return { data, response: res };
	} catch (err: unknown) {
		console.error('API Fetch Error:', err);
		return {
			error: err instanceof Error ? err.message : 'Failed to fetch data',
			response: new Response(null, { status: 503 })
		};
	}
}

export async function safeFetch<T>(callback: () => Promise<T>) {
	try {
		return await callback();
	} catch (err: unknown) {
		console.error('API Error:', err);
		return {
      data: undefined,
			error: err instanceof Error ? err.message : 'An unknown error occurred',
			response: new Response(null, { status: 503 })
		};
	}
}

// สำหรับ openapi-ts
import { createClient } from '@hey-api/client-fetch';

export const client = createClient({
	baseUrl: env.PUBLIC_BASE_API_URL
});
