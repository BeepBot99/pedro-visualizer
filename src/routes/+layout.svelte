<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	let { children } = $props();
</script>

<Navbar />
<div class="h-[calc(100dvh-5rem)]">
	<main class="h-full">
		{@render children()}
	</main>
</div>