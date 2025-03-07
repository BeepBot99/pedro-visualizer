<script lang="ts">
  import type { Point } from "$lib/pathChains";

  interface Props {
    startPoint: Point;
    endPoint: Point;
    light?: boolean;
  }

  let { startPoint, endPoint, light = false }: Props = $props();
</script>

<line
  x1={startPoint.x}
  y1={startPoint.y}
  x2={endPoint.x}
  y2={endPoint.y}
  stroke-width={light ? 0.3 : 0.5}
  class="pointer-events-none {light ? 'stroke-red-contrast-300/50' : 'stroke-red-contrast-200'}"
/>
