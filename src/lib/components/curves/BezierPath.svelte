<script lang="ts">
  import type { Waypoint } from "$lib/pathChains";
  import CubicBezierCurve from "$lib/components/curves/CubicBezierCurve.svelte";
  import QuadraticBezierCurve from "$lib/components/curves/QuadraticBezierCurve.svelte";
  import BezierLine from "$lib/components/curves/BezierLine.svelte";

  interface Props {
    startWaypoint: Waypoint;
    endWaypoint: Waypoint;
  }

  let { startWaypoint = $bindable(), endWaypoint = $bindable() }: Props = $props();
</script>

{#if startWaypoint.handleAfter && endWaypoint.handleBefore}
  <CubicBezierCurve
    startPoint={startWaypoint.point}
    controlPoint1={startWaypoint.handleAfter}
    controlPoint2={endWaypoint.handleBefore}
    endPoint={endWaypoint.point}
  />
{:else if startWaypoint.handleAfter}
  <QuadraticBezierCurve
    startPoint={startWaypoint.point}
    controlPoint={startWaypoint.handleAfter}
    endPoint={endWaypoint.point}
  />
{:else if endWaypoint.handleBefore}
  <QuadraticBezierCurve
    startPoint={startWaypoint.point}
    controlPoint={endWaypoint.handleBefore}
    endPoint={endWaypoint.point}
  />
{:else}
  <BezierLine startPoint={startWaypoint.point} endPoint={endWaypoint.point} />
{/if}
