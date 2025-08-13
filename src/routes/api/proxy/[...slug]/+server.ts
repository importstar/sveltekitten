import { env } from '$env/dynamic/private';
import { logger, sanitize } from '$lib/logger';
import { error } from '@sveltejs/kit';
import type { RequestHandler } from './$types';

const handler: RequestHandler = async ({ request, cookies, params, fetch }) => {
	const path = params.slug;
	const API_ENDPOINT = `${env.BACKEND_API_URL}/${path}`;

	const accessToken = cookies.get('access_token') || null;

	const headers = new Headers({
		'Content-Type': request.headers.get('Content-Type') || 'application/json'
	});

	if (accessToken) {
		headers.set('Authorization', `Bearer ${accessToken}`);
	}

	logger.info(`[API Proxy] Forwarding request to: [${request.method}] ${API_ENDPOINT}`);

	try {
		const response = await fetch(API_ENDPOINT, {});
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
