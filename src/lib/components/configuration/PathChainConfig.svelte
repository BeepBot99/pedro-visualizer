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
    pathChain.waypoints[0].handleBefore = undefined;
    pathChain.waypoints[0].smooth = false;
    pathChain.startPoint = pathChain.waypoints[0] as StartPoint;
    pathChain.waypoints.shift();
  }

  function removeWaypointFromEnd() {
    pathChain.waypoints[pathChain.waypoints.length - 1].handleAfter = undefined;
    pathChain.waypoints[pathChain.waypoints.length - 1].smooth = false;
    pathChain.endPoint = pathChain.waypoints[pathChain.waypoints.length - 1] as EndPoint;
    pathChain.waypoints.pop();
  }

  function removeWaypointFromMiddle(index: number) {
    pathChain.waypoints.splice(index, 1);
  }
</script>

<div class="m-4 overflow-y-auto h-full flex-1 rounded-xl no-scrollbars">
  <div class="flex items-center justify-center">
  </div>
  <WaypointEditor onAddAfter={() => addWaypointToMiddle(0)} text="Start Point" bind:waypoint={pathChain.startPoint}
                  isStartPoint onDelete={removeWaypointFromStart} showDelete={pathChain.waypoints.length > 0} />
  {#each pathChain.waypoints as _, index}
    <WaypointEditor onAddAfter={() => addWaypointToMiddle(index + 1)} text="Waypoint {index + 1}"
                    bind:waypoint={pathChain.waypoints[index]} onDelete={() => removeWaypointFromMiddle(index)}
                    showDelete={true} />
  {/each}
  <WaypointEditor onAddAfter={addWaypointToEnd} text="End Point" bind:waypoint={pathChain.endPoint} isEndPoint onDelete={removeWaypointFromEnd}
                  showDelete={pathChain.waypoints.length > 0} />
</div>
