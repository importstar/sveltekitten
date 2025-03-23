import { logger } from '$lib/logger';
import type { Handle } from '@sveltejs/kit';

const logHandler = (async ({ event, resolve }) => {
	event.locals.logger = logger;
	const res = await resolve(event);
	return res;
}) satisfies Handle;

export default logHandler;
