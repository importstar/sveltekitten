<script lang="ts">
	import { Dialog, Label, Separator } from 'bits-ui';
	import X from 'phosphor-svelte/lib/X';
	import type { Snippet } from 'svelte';

	type DialogProps = {
		open?: boolean;
		children?: Snippet;
	};

	let { open = $bindable(false), children }: DialogProps = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Portal>
		<Dialog.Overlay
			class="data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 fixed inset-0 z-50 h-screen w-screen bg-black/80"
		/>
		<Dialog.Content
			class="fixed top-[50%] left-[50%] z-50 mx-auto flex h-screen w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] items-center justify-center"
		>
			{@render children?.()}
			<Dialog.Close
				class="absolute top-5 right-5 btn btn-circle btn-sm"
			>
				<div>
					<X class="size-4" />
					<span class="sr-only">Close</span>
				</div>
			</Dialog.Close>
		</Dialog.Content>
	</Dialog.Portal>
</Dialog.Root>
