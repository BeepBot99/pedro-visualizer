<script lang="ts">
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import { page } from "$app/state";
	let { children } = $props();
</script>

<Navbar navColor={page.data.color || ''} navTab={page.data.tab || ''} autoId={page.data.auto.id || 0} />
<div class="h-[calc(100dvh-5rem)]">
	<main class="h-full">
		{@render children()}
	</main>
</div>