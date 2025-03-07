<script lang="ts">
  import type { Point } from "$lib/pathChains";

  interface Props {
    startPoint: Point;
    controlPoint1: Point;
    controlPoint2: Point;
    endPoint: Point;
  }

  let { startPoint, controlPoint1, controlPoint2, endPoint }: Props = $props();
</script>

<path
  d="M{startPoint.x},{startPoint.y} C {controlPoint1.x},{controlPoint1.y}, {controlPoint2.x},{controlPoint2.y}, {endPoint.x},{endPoint.y}"
  stroke-width="0.5"
  fill="transparent"
  class="pointer-events-none stroke-red-contrast-200"
/>
