import { getCurrentUserDetails } from "$lib/client";
import { logger } from "$lib/logger";
import { constructCookieOptions } from "$lib/shares/cookies";
import type { Handle } from "@sveltejs/kit";
import jwt from 'jsonwebtoken';

function isProtectedRoute(path: string | null): boolean {
  if (!path) return false;
  return path.split('/').includes('(auth)');
}

export const authHandler: Handle = async ({ event, resolve }) => {
  const { route, url, cookies, locals } = event;
  const { client } = locals;

  const isProtected = isProtectedRoute(route.id);

  if (isProtected) {
    const accessToken = cookies.get('access_token');
    const refreshToken = cookies.get('refresh_token');
    const isExpired = isTokenExpired(accessToken);
    client.setConfig({
      headers: {
        Authorization: `Bearer ${accessToken}`,
      }
    })
    console.log('Refresh token expired:', isTokenExpired(refreshToken));
    if (isExpired) {
      logger.debug('Access token expired, delete cookies and redirecting to login');
      // ตรงนี้ควรจะลอง get refresh token และขอ access token ใหม่
      cookies.delete('access_token', constructCookieOptions(0));
      locals.client = client;
      locals.user = undefined;
      if (route.id?.includes('api')) {
        // If it's an API route, return a 401 Unauthorized response
        return new Response(JSON.stringify({ error: 'Unauthorized' }), {
          status: 401,
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } else {
        const redirectUrl = new URL('/login', url);
        redirectUrl.searchParams.set('redirect', url.pathname);
        return Response.redirect(redirectUrl, 302);
      }
    } else {
      const { data } = await getCurrentUserDetails({
        client: client,
      });
      locals.user = data;
    }
  }
  return resolve(event);
}


// This function checks if the JWT token is expired based on its payload and a buffer time
// bufferTime is the time in seconds before expiration to consider the token as expired
function isTokenExpired(token?: string, bufferTime = 300): boolean {
  if (!token) return true;
  // logger.debug('Checking if token is expired:');
  console.log('token', token)
  const { exp } = jwt.decode(token) as { exp?: number } || {};
  if (exp) {
    console.log('Token expiration date:', new Date(exp * 1000).toISOString());
  }
  console.log('Current time:', new Date().toISOString());
  console.log('exp', exp, !exp || Date.now() / 1000 >= exp - bufferTime);
  return !exp || Date.now() / 1000 >= exp - bufferTime;
}
