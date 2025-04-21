<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { zodClient } from 'sveltekit-superforms/adapters';
	import { schema } from './example.schema';
	import TextInput from '$lib/components/forms/TextInput.svelte';
	import SuperDebug from 'sveltekit-superforms';

	let { data }: { data: PageData } = $props();

	const form = superForm(data.form, {
		validators: zodClient(schema),
		onResult: ({ result }) => {
			if (result.type === 'success') {
				console.log('Form submitted successfully:', result.data);
			} else {
				console.error('Form submission failed:', result.status);
			}
		}
	});
	const { form: formData, enhance } = form;

	const handlePhoneInput = (event: Event) => {
		if (event.target && event.target instanceof HTMLInputElement) {
			event.target.value = event.target.value.replace(/[^0-9]/g, '');
			$formData.phone = event.target.value;
		}
	};
</script>

<div class="card card-border border-base-content/5 mt-10 rounded shadow">
	<form method="post" use:enhance>
		<div class="card-body">
			<h2 class="card-title">Form Example</h2>
			<TextInput {form} bind:value={$formData.name} name="name" label="ชื่อ" />
			<TextInput {form} bind:value={$formData.email} name="email" label="Email" />
			<TextInput
				{form}
				bind:value={$formData.phone}
				name="phone"
				label="เบอร์โทร"
				oninput={handlePhoneInput}
			/>
			<div class="card-action justify-end">
				<button type="submit" class="btn btn-primary">Submit</button>
			</div>
		</div>
		<SuperDebug data={$formData} />
	</form>
</div>
