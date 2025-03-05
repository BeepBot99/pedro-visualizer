<script lang="ts">
  import { onMount } from "svelte";
  import hotkeys from "hotkeys-js";
  import { goto } from "$app/navigation";
  import type { PageProps } from "./$types";
  import { TimeManager } from "$lib/TimeManager.svelte";
  import Timer from "../../Timer.svelte";

  let { data }: PageProps = $props();

  onMount(() => {
    hotkeys("[", () => {
      goto(`/auto/${data.id}`);
    });
    hotkeys("]", () => {
      goto(`/auto/${data.id}/commands`);
    });
  });

  const timeManager = new TimeManager();
</script>

<div class="m-2 flex h-full flex-col gap-2 lg:flex-row">
  <div class="relative aspect-square overflow-hidden">
    <picture class="pointer-events-none select-none">
      <source srcset="/images/into-the-deep-field-dark.webp" media="(prefers-color-scheme: dark)" />
      <img class="rounded-lg" src="/images/into-the-deep-field-light.png" alt="Field map" />
    </picture>
    <Timer timer={timeManager} />
  </div>
  <div class="bg-base-200 flex-grow rounded-lg p-4"></div>
</div>
