import type { PageServerLoad } from './$types';
import { client, handleFetch } from '$lib/server/openapi';
import { pokemonList, type PokemonSummary } from '$lib/client';

export const load = (async () => {
	let pokemons: PokemonSummary[] = [];
	const res = await handleFetch(() => pokemonList({ client: client }));
	pokemons = res.data?.results ?? [];
	return {
		pokemons: pokemons
	};
}) satisfies PageServerLoad;
