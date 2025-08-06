<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.svg';
	import { env } from '$env/dynamic/public';
	import { QueryClientProvider } from '@tanstack/svelte-query';

	let { children, data } = $props();
</script>

<svelte:head>
	<link rel="icon" href={favicon} />
	<title>
		{env.PUBLIC_APP_TITLE}
	</title>
</svelte:head>

<QueryClientProvider client={data.queryClient}>
	{@render children?.()}
</QueryClientProvider>
