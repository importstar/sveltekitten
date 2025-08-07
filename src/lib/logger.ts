import { dev } from '$app/environment';
import { browser } from '$app/environment';
import pino from 'pino';

// Convert undefined values to null for JSON serialization
export const sanitize = (obj: unknown): unknown => {
	if (obj === null || typeof obj !== 'object') {
		return obj;
	}

	if (Array.isArray(obj)) {
		return obj.map((item) => sanitize(item));
	}

	const result: Record<string, unknown> = {};
	for (const key of Object.keys(obj as Record<string, unknown>)) {
		const value = (obj as Record<string, unknown>)[key];
		result[key] = value === undefined ? null : sanitize(value);
	}
	return result;
};

// Create different logger configurations for server and browser
const createLogger = () => {
	if (browser) {
		return pino({
			level: dev ? 'debug' : 'info',
			browser: {
				asObject: true
			}
		});
	} else {
		// Server logger - with pretty printing in development
		return pino({
			level: dev ? 'debug' : 'info',
			transport: dev
				? {
						target: 'pino-pretty',
						options: {
							colorize: true,
							translateTime: 'SYS:yyyy-mm-dd HH:MM:ss',
							ignore: 'pid,hostname'
						}
					}
				: undefined
		});
	}
};

export const logger = createLogger();
