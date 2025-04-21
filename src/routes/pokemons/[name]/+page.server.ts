import { client } from '$lib/client/client.gen';
import { pokemonRetrieve, type PokemonDetail } from '$lib/client';
import type { PageServerLoad } from './$types';
import { handleFetch } from '$lib/server/openapi';
import { error } from '@sveltejs/kit';

export const load = (async ({ params }) => {
	const response = await handleFetch(() =>
		pokemonRetrieve({ client: client, path: { id: params.name } })
	);
	if (response.response.status === 404 || response.data === undefined) {
		error(404, {
			message: `Sorry not found ${params.name} in this Pokédex 😔`,
			code: 404
		});
	}
	let pokemonDetail: PokemonDetail = response.data;
	return { pokemonDetail };
}) satisfies PageServerLoad;
