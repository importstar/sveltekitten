<script lang="ts">
	import { pokemonApi } from '$lib/api/pokemon-api';
	import { onMount } from 'svelte';

	async function getPokemons() {
		return pokemonApi
			.get('/pokemon', {
				params: {
					limit: 10,
					offset: 0
				}
			})
			.then((response) => {
				console.log(response);
				return response;
			})
			.catch((error) => {
				console.error('Error fetching pokemons:', error);
			});
	}
</script>

<div>
	{#await getPokemons()}
		loading
	{:then value}
		<p>
			{JSON.stringify(value)}
		</p>
	{/await}
</div>
