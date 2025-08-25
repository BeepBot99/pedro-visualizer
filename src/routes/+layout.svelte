<script lang="ts">
  import "../app.css";
  import Navbar from "./Navbar.svelte";
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

<a
  href="#main-content"
  class="absolute top-0 left-0 m-4 -translate-y-96 rounded-md bg-blue-500 p-2 text-white focus:translate-y-0 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:outline-none duration-150"
>
  Skip to content
</a>

<Navbar navColor={page.data.color} />
<div class="h-[calc(100dvh-5rem)]">
  <main class="h-full" id="main-content">
    {@render children()}
  </main>
</div>
