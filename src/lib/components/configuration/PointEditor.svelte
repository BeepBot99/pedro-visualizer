<script lang="ts">
  import type { Point } from "$lib/pathChains";

  interface Props {
    point: Point;
  }

  let { point = $bindable() }: Props = $props();
</script>

<div class="flex">
  <div class="font-bold font-mono p-2">(</div>
  <input min="0" max="144" placeholder="X" type="number" bind:value={point.x}
         class="border-b-base-content/20 bg-transparent border-b font-mono border-0 focus:ring-primary w-[8ch]">
  <div class="font-bold font-mono p-2">,</div>
  <input min="0" max="144" placeholder="Y" type="number" bind:value={point.y}
         class="border-b-base-content/20 bg-transparent border-b font-mono border-0 focus:ring-primary w-[8ch]">
  <div class="font-bold font-mono p-2">)</div>
</div>