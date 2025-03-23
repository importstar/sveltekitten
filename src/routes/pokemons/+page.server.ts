import type { PageServerLoad } from './$types';
import { client, handleFetch } from '$lib/server/openapi';
import { env } from '$env/dynamic/public';
import { pokemonList, type PaginatedPokemonSummaryList, type PokemonSummary } from '$lib/client';
import { error } from '@sveltejs/kit';
import { apiFetch } from '$lib/server/api';

export const load = (async ({ locals }) => {
	// const response = await safeFetch(() => pokemonList({ client: client }));
	let pokemons: PokemonSummary[] = [];
	const res = await handleFetch(() => pokemonList({ client: client }));
	pokemons = res.data?.results ?? [];
	return {
		pokemons: pokemons
	};
}) satisfies PageServerLoad;
