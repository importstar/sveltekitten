import { sequence } from '@sveltejs/kit/hooks';
import logHandler from '$lib/server/hooks/logger.hook';

export const handle = sequence(logHandler);
