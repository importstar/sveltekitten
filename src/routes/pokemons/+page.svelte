<script lang="ts">
	import type { PageData } from './$types';
	import PokemonItem from '$lib/components/pokemons/PokemonItem.svelte';

	let { data }: { data: PageData } = $props();
</script>

<ol class="space-y-2 m-10">
	{#each data.pokemons as item}
		<li>
			<PokemonItem name={item.name} href={item.url} />
		</li>
	{/each}
</ol>
