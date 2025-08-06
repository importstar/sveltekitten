export type ApiFetcher = {
	fetch: typeof fetch;
	accessToken?: string | null;
};

export async function apiFetch<T>(
	url: string,
	options: RequestInit = {},
	fetcher: ApiFetcher
): Promise<T> {
	if (!fetcher.fetch) {
		throw new Error('Fetch function is not provided');
	}

	const headers: HeadersInit = {
		'Content-Type': 'application/json',
		...options.headers
	};

	const response = await fetcher.fetch(url, {
		...options,
		headers
	});

	if (!response.ok) {
		throw new Error(`API request failed with status ${response.status}`);
	}

	return (await response.json()) as T;
}
