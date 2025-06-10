// สำหรับ openapi-ts
import { env } from '$env/dynamic/public';
import { createClient } from '@hey-api/client-fetch';

export const client = createClient({
	baseUrl: env.PUBLIC_BASE_API_URL
});
