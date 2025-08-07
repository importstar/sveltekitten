import type { Actions } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { zod4 } from 'sveltekit-superforms/adapters';
import { loginSchema } from '$lib/schemas/auth.schema';
import { logger } from '$lib/logger';

export const load = (async () => {
	const form = await superValidate(zod4(loginSchema));

	return { form };
}) satisfies PageServerLoad;

export const actions: Actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod4(loginSchema));

		logger.info({ formData: form.data }, 'Login form data');

		if (!form.valid) {
			return { form };
		}

		return { form };
	}
};
