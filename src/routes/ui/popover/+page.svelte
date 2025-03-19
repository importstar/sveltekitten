<script lang="ts">
	import type { PageData } from './$types';
	import Popover from '$lib/components/ui/Popover.svelte';

	let { data }: { data: PageData } = $props();
</script>

<div class="flex flex-col items-center">
	<div>
		<h1 class="title mb-10">Popover</h1>
	</div>
	<div>
		<Popover sideOffset={10} triggerClass="btn-primary">
			{#snippet trigger()}
				Open
			{/snippet}
			<div class="card bg-base-300 w-full shadow">
				<div class="card-body">
					<h2 class="card-title">Popover</h2>
					<p class="card-text">This is a popover component.</p>
				</div>
			</div>
		</Popover>
	</div>
</div>
