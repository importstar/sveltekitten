<script lang="ts">
	import LoginForm from '$lib/components/login/login-form.svelte';
	import type { PageProps } from './$types';

	let { data }: PageProps = $props();
</script>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
	<LoginForm form={data.form} />
</div>
