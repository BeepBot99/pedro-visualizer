<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<div class="min-h-dvh flex flex-col">
	<Navbar />
	<main class="flex-1 flex flex-col">
		{@render children()}
	</main>
</div>