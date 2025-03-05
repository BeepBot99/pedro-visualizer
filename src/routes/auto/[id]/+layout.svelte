<script lang="ts">
  import type { PageProps } from "./$types";
  import hotkeys from "hotkeys-js";
  import { onDestroy } from "svelte";
  import { afterNavigate, goto } from "$app/navigation";

  let { data, children }: PageProps = $props();

  onDestroy(hotkeys.unbind);

  afterNavigate(() => {
    hotkeys("esc", () => {
      goto("/");
    });
  });
</script>

<svelte:head>
  <title>{data.auto?.name} | NextFTC++</title>
</svelte:head>

{@render children()}
