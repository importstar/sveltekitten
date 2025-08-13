<script lang="ts">
	import { get } from 'svelte/store';
	import type { PageProps } from './$types';
	import { authStore } from '$lib/stores/auth.store';

	let { data }: PageProps = $props();
</script>

<div>Home after login</div>
<div>
	accessToken: {get(authStore).accessToken}
</div>
