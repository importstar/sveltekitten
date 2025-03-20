import type { PageServerLoad } from './$types';
import { superValidate } from 'sveltekit-superforms';
import { valibot } from 'sveltekit-superforms/adapters';
import { schema } from '$lib/schemas/dob.schema';

export const load = (async () => {
	const form = await superValidate(valibot(schema));
	return { form };
}) satisfies PageServerLoad;
