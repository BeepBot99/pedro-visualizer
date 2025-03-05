<script lang="ts">
  import Timer from "../Timer.svelte";
  import { TimeManager } from "$lib/TimeManager.svelte";

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
