<script lang="ts">
	import '../app.css';
	let { children } = $props();
</script>

<svelte:head>
	<title>SvelteKitten</title>
</svelte:head>

{@render children()}
