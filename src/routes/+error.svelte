<script lang="ts">
	import { page } from '$app/state';
</script>

<div class="flex h-screen w-full">
	{#if page.error}
		<div class="card mx-auto my-auto w-96">
			<div class="card-body text-center">
				<p class="text-5xl font-bold">
					{page.error.code}
				</p>
				<p class="text-sm">
					{page.error.message}
				</p>
			</div>
		</div>
	{/if}
</div>
