<script lang="ts">
	import type { PageData } from './$types';
	import DatePicker from '$lib/components/ui/forms/DatePicker.svelte';
	import SuperDebug, { superForm } from 'sveltekit-superforms';
	import { parseDate, type DateValue } from '@internationalized/date';
	import { today, getLocalTimeZone } from '@internationalized/date';
	import { browser } from '$app/environment';

	let { data }: { data: PageData } = $props();

	const { form: formData } = superForm(data.form);
	let value = $state<DateValue | undefined>();

	$effect(() => {
		value = $formData.dob ? parseDate($formData.dob) : undefined;
	});
</script>

<div class="flex flex-col gap-5">
	<DatePicker
		bind:value
		onValueChange={(v) => {
			if (v) {
				$formData.dob = v.toString();
			} else {
				$formData.dob = '';
			}
		}}
	/>
	<input hidden value={$formData.dob} name="dob" />
	{#if browser}
		<SuperDebug data={$formData} />
	{/if}
</div>
