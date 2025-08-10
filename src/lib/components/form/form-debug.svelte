<script lang="ts">
	import { dev } from '$app/environment';
	import SuperDebug from 'sveltekit-superforms';

	let { formData } = $props();
</script>

{#if dev}
	<SuperDebug data={formData} />
{/if}
