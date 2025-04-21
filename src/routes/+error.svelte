<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex h-screen w-full">
	{#if page.error}
		<div class="card mx-auto my-auto w-96">
			<div class="card-body text-center">
				<p class="mb-1 text-5xl font-bold">
					{page.error.code}
				</p>
				<p class="text-2xl">
					{page.error.message}
				</p>
			</div>
		</div>
	{/if}
</div>
