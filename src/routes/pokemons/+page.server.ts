import type { PageServerLoad } from './$types';
import { client } from '$lib/client/client.gen';
import { safeFetch } from '$lib/api';
import { pokemonList } from '$lib/client';

export const load = (async () => {
	const response = await safeFetch(() => pokemonList({ client: client }));
	return {
		pokemons: response.data?.results ?? []
	};
}) satisfies PageServerLoad;
