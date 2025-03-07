<script lang="ts">
  import type { PathChain, Waypoint } from "$lib/pathChains";
  import BezierWaypoint from "$lib/components/curves/BezierWaypoint.svelte";
  import BezierPath from "$lib/components/curves/BezierPath.svelte";
  import type { TimeManager } from "$lib/TimeManager.svelte";

  interface Props {
    pathChain: PathChain;
    timer: TimeManager;
    robotVisible: boolean;
  }

  let { pathChain = $bindable(), timer, robotVisible = $bindable() }: Props = $props();

  let waypoints: Waypoint[] = $derived([
    pathChain.startPoint,
    ...pathChain.waypoints,
    pathChain.endPoint
  ]);
</script>

{#each waypoints as waypoint, index (index)}
  {#if index < waypoints.length - 1}
    <BezierPath startWaypoint={waypoint} endWaypoint={waypoints[index + 1]} />
  {/if}
{/each}
{#each waypoints as _waypoint, index (index)}
  <BezierWaypoint bind:waypoint={waypoints[index]} {timer} bind:robotVisible />
{/each}
