<script lang="ts">
	import SuperDebug, { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import * as Card from '../ui/card';
	import * as Form from '../ui/form';
	import { loginSchema } from '$lib/schemas/auth.schema';
	import { zod4Client } from 'sveltekit-superforms/adapters';
	import { Input } from '../ui/input';
	import { Button } from '../ui/button';
	import { LoaderCircle } from 'lucide-svelte';
	import { dev } from '$app/environment';

	type LoginFormProps = {
		form: SuperValidated<Infer<typeof loginSchema>>;
	};

	let { form: superform }: LoginFormProps = $props();

	const form = superForm(superform, {
		validators: zod4Client(loginSchema)
	});

	const { form: formData, enhance, submitting } = form;
</script>

<Card.Root class="mx-auto w-full max-w-sm">
	<Card.Header>
		<Card.Title class="text-center text-2xl">Login</Card.Title>
	</Card.Header>
	<Card.Content>
		<form class="grid gap-4" method="POST" use:enhance>
			<Form.Field {form} name="email">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Email</Form.Label>
						<Input
							{...props}
							type="email"
							placeholder="Enter your email"
							bind:value={$formData.email}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>
			<Form.Field {form} name="password">
				<Form.Control>
					{#snippet children({ props })}
						<Form.Label>Password</Form.Label>
						<Input
							{...props}
							type="password"
							placeholder="Enter your password"
							bind:value={$formData.password}
						/>
					{/snippet}
				</Form.Control>
				<Form.FieldErrors />
			</Form.Field>

			<Button type="submit" disabled={$submitting}>
				{#if $submitting}
					<LoaderCircle class="animate-spin" />
				{/if}
				Login
			</Button>
		</form>

		{#if dev}
			<div class="my-4">
				<SuperDebug data={$formData} />
			</div>
		{/if}
	</Card.Content>
</Card.Root>
