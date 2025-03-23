import { error } from '@sveltejs/kit';

interface FetchResponse<T = unknown> {
	data?: T;
	error?: string;
	response?: Response;
	status?: number;
	headers?: Headers;
}

export async function apiFetch<T>(
	endpoint: string,
	options: RequestInit = {}
): Promise<FetchResponse<T>> {
	// Default headers
	const defaultHeaders = {
		'Content-Type': 'application/json'
	};

	const config: RequestInit = {
		headers: { ...defaultHeaders, ...options.headers },
		...options
	};

	try {
		const res = await fetch(endpoint, config);

		// Handle non-OK response
		if (!res.ok) {
			const contentType = res.headers.get('Content-Type') || '';
			const data = contentType.includes('application/json')
				? await res.json()
				: { detail: 'An error occurred' }; // Default error message for non-JSON responses

			return { error: data.detail, response: res, status: res.status };
		}

		const data = await res.json(); // Assuming API always returns JSON when successful
		return { data, response: res, status: res.status, headers: res.headers };
	} catch (err: unknown) {
		error(503, 'Cannot connect to server');
	}
}
