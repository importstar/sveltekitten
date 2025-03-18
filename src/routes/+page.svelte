<div class="wrapper">
	<h1 class="title">SvelteKitten</h1>
  <a href="/pokemons" class="btn btn-primary mt-5">
    Pokemon Example
  </a>
</div>

<style lang="postcss">
	@reference "tailwindcss/theme";
	@plugin "daisyui";
	.wrapper {
		@apply flex w-full flex-col items-center justify-center px-4 py-2 h-screen;
	}

	.title {
		@apply from-primary bg-gradient-to-r from-5% to-pink-500 to-40% bg-clip-text text-6xl font-bold text-transparent mx-auto w-fit;
	}
</style>
