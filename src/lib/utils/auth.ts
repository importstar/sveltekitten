import type { Cookies } from '@sveltejs/kit';
import { createCookieOptions } from './cookies';

export function clearCookieTokens(cookies: Cookies) {
	cookies.delete('access_token', createCookieOptions({ maxAge: 0 }));
	cookies.delete('refresh_token', createCookieOptions({ maxAge: 0 }));
}
