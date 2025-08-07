import { createApiClient } from './api';

export const pokemonApi = createApiClient({
	fetchInstance: fetch,
	baseUrl: 'https://pokeapi.co/api/v2/'
});
