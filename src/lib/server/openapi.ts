// สำหรับ openapi-ts
import { env } from '$env/dynamic/public';
import { createClient } from '@hey-api/client-fetch';
import { error } from '@sveltejs/kit';

export const client = createClient({
	baseUrl: env.PUBLIC_BASE_API_URL
});

export async function handleFetch<T>(callback: () => Promise<T>) {
	try {
		return await callback();
	} catch (err: unknown) {
		error(503, { message: 'Service Unavailable', code: 503 });
	}
}
