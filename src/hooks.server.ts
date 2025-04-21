import { sequence } from '@sveltejs/kit/hooks';
import logHandler from '$lib/hooks/logger.hook';

export const handle = sequence(logHandler);
