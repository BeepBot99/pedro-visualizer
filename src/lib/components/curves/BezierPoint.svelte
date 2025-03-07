<script lang="ts">
  import { onMount } from "svelte";
  import { Draggable } from "gsap/Draggable";
  import { gsap } from "gsap";
  import type { Point } from "$lib/pathChains";
  import type { TimeManager } from "$lib/TimeManager.svelte";

  gsap.registerPlugin(Draggable);

  interface Props {
    point: Point;
    small?: boolean;
    onDrag?: () => void;
    timer: TimeManager;
    robotVisible: boolean;
  }

  let {
    point = $bindable(),
    small = false,
    onDrag = () => {},
    timer,
    robotVisible = $bindable()
  }: Props = $props();

  const startPoint: Point = $state($state.snapshot(point));
  let circleElement: SVGCircleElement;

  let wasPlaying: boolean = false;

  onMount(() => {
    Draggable.create(circleElement, {
      bounds: {
        top: 0,
        left: 0,
        width: 144,
        height: 144
      },
      type: "left,top",
      onDrag() {
        point.x = this.x + startPoint.x;
        point.y = this.y + startPoint.y;
        onDrag.call(this);
      },
      onDragStart: () => {
        robotVisible = false;
        if (!timer.paused) {
          timer.pause();
          wasPlaying = true;
        }
      },
      onDragEnd: () => {
        robotVisible = true;
        if (wasPlaying) {
          timer.play();
          wasPlaying = false;
        } else {
          timer.play();
          setTimeout(timer.pause, 1);
        }
      }
    });
  });

  export function move(offset: Point) {
    if (1.5 <= point.x + offset.x && point.x + offset.x <= 144 - 1.5) {
      point.x += offset.x;
      startPoint.x += offset.x;
    }

    if (1.5 <= point.y + offset.y && point.y + offset.y <= 144 - 1.5) {
      point.y += offset.y;
      startPoint.y += offset.y;
    }
  }
</script>

<circle
  bind:this={circleElement}
  cx={point.x}
  cy={point.y}
  r={small ? 1.5 : 2}
  class="fill-red-contrast-100"
/>
