<script lang="ts">
  import type { Point, Waypoint } from "$lib/pathChains";
  import BezierLine from "$lib/components/curves/BezierLine.svelte";
  import BezierPoint from "$lib/components/curves/BezierPoint.svelte";
  import { Draggable } from "gsap/Draggable";
  import type { TimeManager } from "$lib/TimeManager.svelte";

  interface Props {
    waypoint: Waypoint;
    timer: TimeManager;
    robotVisible: boolean;
  }

  let { waypoint = $bindable(), timer, robotVisible = $bindable() }: Props = $props();

  let previousControlBezierPoint = $state<BezierPoint>();
  let nextControlBezierPoint = $state<BezierPoint>();

  function translateControlPoints(this: Draggable) {
    previousControlBezierPoint?.move({ x: this.deltaX, y: this.deltaY });
    nextControlBezierPoint?.move({ x: this.deltaX, y: this.deltaY });
  }

  function moveHandleAfter(this: Draggable) {
    if (!waypoint.smooth || !waypoint.handleBefore || !waypoint.handleAfter) return;
    const handleBeforeMagnitude: number = Math.sqrt(
      (waypoint.handleBefore!.x - waypoint.point.x) ** 2 +
        (waypoint.handleBefore!.y - waypoint.point.y) ** 2
    );
    const handleAfterMagnitude: number = Math.sqrt(
      (waypoint.handleAfter!.x - waypoint.point.x) ** 2 +
        (waypoint.handleAfter!.y - waypoint.point.y) ** 2
    );
    const handleBeforeNormalized: Point = {
      x: (waypoint.handleBefore!.x - waypoint.point.x) / handleBeforeMagnitude,
      y: (waypoint.handleBefore!.y - waypoint.point.y) / handleBeforeMagnitude
    };
    const newHandleAfter: Point = {
      x: -handleBeforeNormalized.x * handleAfterMagnitude + waypoint.point.x,
      y: -handleBeforeNormalized.y * handleAfterMagnitude + waypoint.point.y
    };
    nextControlBezierPoint!.move({
      x: newHandleAfter.x - waypoint.handleAfter.x,
      y: newHandleAfter.y - waypoint.handleAfter.y
    });
  }

  function moveHandleBefore(this: Draggable) {
    if (!waypoint.smooth || !waypoint.handleBefore || !waypoint.handleAfter) return;
    const handleAfterMagnitude: number = Math.sqrt(
      (waypoint.handleAfter!.x - waypoint.point.x) ** 2 +
        (waypoint.handleAfter!.y - waypoint.point.y) ** 2
    );
    const handleBeforeMagnitude: number = Math.sqrt(
      (waypoint.handleBefore!.x - waypoint.point.x) ** 2 +
        (waypoint.handleBefore!.y - waypoint.point.y) ** 2
    );
    const handleAfterNormalized: Point = {
      x: (waypoint.handleAfter!.x - waypoint.point.x) / handleAfterMagnitude,
      y: (waypoint.handleAfter!.y - waypoint.point.y) / handleAfterMagnitude
    };
    const newHandleBefore: Point = {
      x: -handleAfterNormalized.x * handleBeforeMagnitude + waypoint.point.x,
      y: -handleAfterNormalized.y * handleBeforeMagnitude + waypoint.point.y
    };
    previousControlBezierPoint!.move({
      x: newHandleBefore.x - waypoint.handleBefore!.x,
      y: newHandleBefore.y - waypoint.handleBefore!.y
    });
  }
</script>

{#if waypoint.handleBefore}
  <BezierLine startPoint={waypoint.handleBefore} endPoint={waypoint.point} light={true} />
  <BezierPoint
    bind:this={previousControlBezierPoint}
    bind:point={waypoint.handleBefore}
    small={true}
    onDrag={moveHandleAfter}
    {timer}
    bind:robotVisible
  />
{/if}
{#if waypoint.handleAfter}
  <BezierLine startPoint={waypoint.point} endPoint={waypoint.handleAfter} light={true} />
  <BezierPoint
    bind:this={nextControlBezierPoint}
    bind:point={waypoint.handleAfter}
    small={true}
    onDrag={moveHandleBefore}
    {timer}
    bind:robotVisible
  />
{/if}
<BezierPoint bind:point={waypoint.point} onDrag={translateControlPoints} {timer} bind:robotVisible />
