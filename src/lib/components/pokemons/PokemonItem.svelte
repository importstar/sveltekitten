<script lang="ts">
	let { name, href }: { name: string; href: string } = $props();
</script>

<div class="card bg-base-200 sahdow-sm card-border w-full">
	<div class="card-body">
		<div class="flex justify-between">
			<h3 class="card-title capitalize">
				{name}
			</h3>
			<a {href} class="btn btn-primary" target="_blank"> See API </a>
		</div>
	</div>
</div>
