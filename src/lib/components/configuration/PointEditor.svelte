<script lang="ts">
  import type { Point } from "$lib/pathChains";

  interface Props {
    point: Point;
  }

  let { point = $bindable() }: Props = $props();
</script>

<div class="flex">
  <div class="bg-base-100/20 border-base-content/50 border rounded-l-md font-bold font-mono p-1">(</div>
  <input min="0" max="144" placeholder="X" type="number" bind:value={point.x}
         class="bg-base-100/30 border-base-content/50 border font-mono p-1 focus:ring-primary focus:ring-2 outline-none w-[8ch]">
  <div class="bg-base-100/20 border-base-content/50 border font-bold font-mono p-1">,</div>
  <input min="0" max="144" placeholder="Y" type="number" bind:value={point.y}
         class="bg-base-100/30 border-base-content/50 border font-mono p-1 focus:ring-primary focus:ring-2 outline-none w-[8ch]">
  <div class="bg-base-100/20 border-base-content/50 border rounded-r-md font-bold font-mono p-1">)</div>
</div>