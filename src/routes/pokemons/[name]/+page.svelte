<script lang="ts">
	import type { PageData } from './$types';

	let { data }: { data: PageData } = $props();
	let pokemonDetail = $derived(data.pokemonDetail);
</script>

<div class="flex justify-center mt-10">
	<div class="card bg-base-200 border-base-content/10 card-border w-fit shadow mx-auto">
		<div class="card-body">
			<h2 class="card-title capitalize">
				{pokemonDetail?.name}
			</h2>
			<div class="p-5">
				<img src={pokemonDetail?.sprites.front_default} alt={pokemonDetail?.name} />
			</div>
		</div>
	</div>
</div>
