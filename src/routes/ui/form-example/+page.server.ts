import { superValidate } from 'sveltekit-superforms';
import type { PageServerLoad } from './$types';
import { exampleSchema } from './example.schema';
import { valibot } from 'sveltekit-superforms/adapters';
import type { Actions } from '@sveltejs/kit';

export const load = (async () => {
	const form = await superValidate(valibot(exampleSchema));
	return {
		form
	};
}) satisfies PageServerLoad;

export const actions = {
	default: async (context) => {
		const { request } = context;
		const form = await superValidate(request, valibot(exampleSchema));
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
