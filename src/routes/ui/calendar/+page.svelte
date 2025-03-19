<script lang="ts">
	import type { PageData } from './$types';
	import Calendar from '$lib/components/ui/Calendar.svelte';

	let { data }: { data: PageData } = $props();
</script>

<Calendar />
