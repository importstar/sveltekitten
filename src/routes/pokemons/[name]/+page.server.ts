import { safeFetch } from '$lib/server/api';
import { client } from '$lib/client/client.gen';
import { pokemonList, pokemonRetrieve } from '$lib/client';
import type { PageServerLoad } from './$types';

export const load = (async ({ params }) => {
	const response = await safeFetch(() =>
		pokemonRetrieve({ client: client, path: { id: params.name } })
	);
	console.log(response.data);
	return { pokemonDetail: response.data };
}) satisfies PageServerLoad;
