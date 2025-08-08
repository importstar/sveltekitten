export interface CookieOptions {
	path?: string;
	maxAge?: number;
	secure?: boolean;
	httpOnly?: boolean;
	sameSite?: 'strict' | 'lax' | 'none';
	domain?: string;
}

export function createCookieOptions(options: CookieOptions = {}) {
	return {
		path: options?.path ?? '/',
		maxAge: options?.maxAge ?? 60 * 30, // 30 นาที (วินาที)
		secure: options?.secure ?? true,
		httpOnly: options?.httpOnly ?? true,
		sameSite: options?.sameSite ?? 'strict',
		domain: options?.domain ?? undefined
	};
}
