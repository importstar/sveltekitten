import { superValidate } from 'sveltekit-superforms/server';
import { schema } from '$lib/schemas/dob.schema';
import { zod } from 'sveltekit-superforms/adapters';

export const load = async () => {
	const form = await superValidate(zod(schema));
	return { form };
};

export const actions = {
	default: async ({ request }) => {
		const form = await superValidate(request, zod(schema));
	}
};
