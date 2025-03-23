import { client } from '$lib/client/client.gen';
import { pokemonRetrieve } from '$lib/client';
import type { PageServerLoad } from './$types';
import { handleFetch } from '$lib/server/openapi';

export const load = (async ({ params }) => {
	const response = await handleFetch(() =>
		pokemonRetrieve({ client: client, path: { id: params.name } })
	);
	return { pokemonDetail: response.data };
}) satisfies PageServerLoad;
