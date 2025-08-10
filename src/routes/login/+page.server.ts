import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { message, superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas/auth.schema';
import { logger, sanitize } from '$lib/logger';
import { createCookieOptions } from '$lib/utils/cookies';

export const load = (async () => {
	const form = await superValidate(zod4(loginSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request, locals, cookies }) => {
		const { fastapiClient } = locals;

		const form = await superValidate(request, zod4(loginSchema));

		logger.info({ formData: form.data }, 'Login form data');

		if (!form.valid) {
			return { form };
		}

		const result = await fastapiClient.POST('/auth/login', {
			body: {
				email: form.data.email,
				password: form.data.password
			}
		});

		logger.info(sanitize({ result: result, res: result.response }), 'Login Result');

		if (result.data) {
			cookies.set(
				'access_token',
				result.data.access_token,
				createCookieOptions({ maxAge: 60 * 10 })
			);
			cookies.set(
				'refresh_token',
				result.data.refresh_token,
				createCookieOptions({ maxAge: 60 * 60 * 24 * 30 })
			);
		} else {
			logger.error({ error: result.error }, 'Login failed');
			return message(form, {
				type: 'error',
				text: 'Login failed. Please check your credentials and try again.',
				// description: result.error.detail?.join(', ')
			});
		}

		return { form };
	}
};
