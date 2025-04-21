import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { schema } from './example.schema';
import type { Actions } from '@sveltejs/kit';
import { zod } from 'sveltekit-superforms/adapters';

export const load = (async () => {
	const form = await superValidate(zod(schema));
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async (context) => {
		const { request } = context;
		const form = await superValidate(request, zod(schema));
		if (!form.valid) {
			return { form, errors: form.errors };
		}
		// Handle the form submission
		// For example, save the data to a database or send an email
		console.log('Form data:', form.data);
		// You can also redirect or return a success message
		return {
			form,
			success: true,
			message: 'Form submitted successfully!'
		};
	}
} satisfies Actions;
