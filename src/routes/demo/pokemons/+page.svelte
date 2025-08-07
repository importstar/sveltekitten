<script lang="ts">
	import type { PageProps } from '../pokemon/$types';
	import PokemonList from './pokemon-list.svelte';

	let { data }: PageProps = $props();
</script>

<PokemonList />
