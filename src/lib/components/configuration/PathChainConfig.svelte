<script lang="ts">
  import type { EndPoint, PathChain, StartPoint } from "$lib/pathChains";
  import WaypointEditor from "$lib/components/configuration/WaypointEditor.svelte";
  import ButtonUI from "$lib/components/primitives/ButtonUI.svelte";

  interface Props {
    pathChain: PathChain;
  }

  let { pathChain = $bindable() }: Props = $props();

  function addWaypointToEnd() {
    pathChain.waypoints.push(pathChain.endPoint);
    pathChain.waypoints[pathChain.waypoints.length - 1].smooth = true;
    pathChain.endPoint = {
      point: {
        x: 72,
        y: 72
      },
      smooth: false
    };
  }

  function addWaypointToStart() {
    pathChain.waypoints.unshift(pathChain.startPoint);
    pathChain.waypoints[0].smooth = true;
    pathChain.startPoint = {
      point: {
        x: 72,
        y: 72
      },
      smooth: false
    };
  }

  function addWaypointToMiddle(index: number) {
    pathChain.waypoints.splice(index, 0, {
      point: {
        x: 72,
        y: 72
      },
      smooth: true
    });
  }

  function removeWaypointFromStart() {
    pathChain.waypoints[0].handleBefore = undefined
    pathChain.waypoints[0].smooth = false
    pathChain.startPoint = pathChain.waypoints[0] as StartPoint
    pathChain.waypoints.shift()
  }

  function removeWaypointFromEnd() {
    pathChain.waypoints[pathChain.waypoints.length - 1].handleAfter = undefined
    pathChain.waypoints[pathChain.waypoints.length - 1].smooth = false
    pathChain.endPoint = pathChain.waypoints[pathChain.waypoints.length - 1] as EndPoint
    pathChain.waypoints.pop()
  }

  function removeWaypointFromMiddle(index: number) {
    pathChain.waypoints.splice(index, 1)
  }
</script>

<div class="m-4 overflow-y-auto h-full flex-1 rounded-xl no-scrollbars">
  <div class="flex items-center justify-center">
    <ButtonUI onclick={addWaypointToStart} name="Add waypoint to start"
              Class="bg-base-content text-base-100 p-1! m-0!">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor"
           class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </ButtonUI>
  </div>
  <WaypointEditor bind:waypoint={pathChain.startPoint} isStartPoint onDelete={removeWaypointFromStart} showDelete={pathChain.waypoints.length > 0} />
  {#each pathChain.waypoints as _, index}
    <div class="flex items-center justify-center">
      <ButtonUI onclick={() => addWaypointToMiddle(index)} name="Add waypoint to middle"
                Class="bg-base-content text-base-100 p-1! m-0!">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             class="size-4">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
        </svg>
      </ButtonUI>
    </div>
    <WaypointEditor bind:waypoint={pathChain.waypoints[index]} onDelete={() => removeWaypointFromMiddle(index)} showDelete={pathChain.waypoints.length > 0} />
  {/each}
  <div class="flex items-center justify-center">
    <ButtonUI onclick={() => addWaypointToMiddle(pathChain.waypoints.length)} name="Add waypoint to middle"
              Class="bg-base-content text-base-100 p-1! m-0!">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor"
           class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </ButtonUI>
  </div>
  <WaypointEditor bind:waypoint={pathChain.endPoint} isEndPoint onDelete={removeWaypointFromEnd} showDelete={pathChain.waypoints.length > 0} />
  <div class="flex items-center justify-center">
    <ButtonUI onclick={addWaypointToEnd} name="Add waypoint to end"
              Class="bg-base-content text-base-100 p-1! m-0!">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
           stroke="currentColor"
           class="size-4">
        <path stroke-linecap="round" stroke-linejoin="round"
              d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    </ButtonUI>
  </div>
</div>
