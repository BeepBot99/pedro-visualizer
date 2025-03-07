<script lang="ts">
  import type { Point } from "$lib/pathChains";

  interface Props {
    startPoint: Point;
    controlPoint: Point;
    endPoint: Point;
  }

  let { startPoint, controlPoint, endPoint }: Props = $props();
</script>

<path
  d="M{startPoint.x},{startPoint.y} Q {controlPoint.x},{controlPoint.y}, {endPoint.x},{endPoint.y}"
  stroke-width="0.5"
  fill="transparent"
  class="pointer-events-none stroke-red-contrast-200"
/>
