<script lang="ts">
  import "../app.css";
  import Navbar from "$lib/components/Navbar.svelte";
  import { page } from "$app/state";
  import { onMount } from "svelte";
  import hotkeys from "hotkeys-js";
  let { children } = $props();

  onMount(() => {
    hotkeys.filter = () => {
      return true;
    };
  });
</script>

<Navbar
  navColor={page.data.color}
  navTab={page.data.tab}
  autoId={page.data.id}
/>
<div class="h-[calc(100dvh-5rem)]">
  <main class="h-full">
    {@render children()}
  </main>
</div>
