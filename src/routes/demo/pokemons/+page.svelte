<script lang="ts">
	import fastapiClient from '$lib/api/fastapi-client';
	import { onMount } from 'svelte';
	import type { PageProps } from '../pokemon/$types';
	import PokemonList from './pokemon-list.svelte';

	let { data }: PageProps = $props();

	async function getRoot() {
		fastapiClient
			.GET('/')
			.then((response) => {
				console.log('Root response:', response);
			})
			.catch((error) => {
				console.error('Error fetching root:', error);
			});
	}

	onMount(async () => {
		await getRoot();
	});
</script>

<PokemonList />
