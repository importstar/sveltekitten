<script lang="ts">
	import { setLocale, getLocale } from '$lib/paraglide/runtime';
	import { m } from '$lib/paraglide/messages.js';
	import { Button } from '$lib/components/ui/button';

	let currentLang = $derived.by(() => getLocale());
</script>

<h1>{m.hello_world({ name: 'SvelteKit User' })}</h1>
<div>
	<Button variant={currentLang === 'en' ? 'default' : 'outline'} onclick={() => setLocale('en')}>
		EN
	</Button>
	<Button variant={currentLang === 'th' ? 'default' : 'outline'} onclick={() => setLocale('th')}>
		TH
	</Button>
</div>
<p>
	If you use VSCode, install the <a
		href="https://marketplace.visualstudio.com/items?itemName=inlang.vs-code-extension"
		target="_blank">Sherlock i18n extension</a
	> for a better i18n experience.
</p>
