<script lang="ts">
  import Timer from "./Timer.svelte";
  import BezierPathChain from "$lib/components/curves/BezierPathChain.svelte";
  import { TimeManager } from "$lib/TimeManager.svelte.js";
  import type { PathChain, Point } from "$lib/pathChains";
  import { pathChainToCubicBezierChain } from "$lib/bezier";
  import { onMount } from "svelte";
  import { gsap } from "gsap";
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";

  gsap.registerPlugin(MotionPathPlugin);

  const timeManager = new TimeManager();

  interface Props {
    pathChain: PathChain;
  }

  let { pathChain = $bindable() }: Props = $props();
  const cubicBezierChain: Point[] = $derived(pathChainToCubicBezierChain(pathChain));

  let robot: SVGImageElement;

  onMount(() => {
    gsap.set(robot, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "50% 50%",
      x: pathChain.startPoint.point.x,
      y: pathChain.startPoint.point.y
    });
  });

  $effect(() => {
    timeManager.timeline.killTweensOf(robot);
    timeManager.timeline.to(
      robot,
      {
        motionPath: {
          path: $state.snapshot(cubicBezierChain),
          type: "cubic",
          alignOrigin: [0.5, 0.5],
          fromCurrent: false
        },
        duration: 3,
        ease: "sine.inOut"
      },
      0
    );
  });

  let robotVisible = $state(true);

  let hoveringOverRobot = $state(false);

  function onSvgMouseMove(e: MouseEvent) {
    const r = robot.getBoundingClientRect();
    hoveringOverRobot = e.clientX >= r.left && e.clientX <= r.right
      && e.clientY >= r.top && e.clientY <= r.bottom;
  }

  function onSvgMouseLeave() {
    hoveringOverRobot = false;
  }
</script>

<div class="relative aspect-square overflow-hidden">
  <picture class="pointer-events-none select-none">
    <source srcset="/images/into-the-deep-field-dark.webp" media="(prefers-color-scheme: dark)" />
    <img class="rounded-lg" src="/images/into-the-deep-field-light.png" alt="Field map" />
  </picture>
  <svg role="region" onmousemove={onSvgMouseMove} onmouseleave={onSvgMouseLeave}
       class="absolute top-0 left-0 h-full w-full" viewBox="0 0 144 144">
    <BezierPathChain bind:pathChain timer={timeManager} bind:robotVisible />
<!--    <rect-->
<!--      bind:this={robot}-->
<!--      width="18"-->
<!--      height="18"-->
<!--      class="fill-primary z-99 {robotVisible ? hoveringOverRobot ? 'opacity-50' : '' : 'hidden'} pointer-events-none"-->
<!--    />-->
    <image bind:this={robot} href="/images/robot.png" width="18" height="18"
           class="z-99 {robotVisible ? hoveringOverRobot ? 'opacity-80' : '' : 'hidden'} pointer-events-none" />
  </svg>
  <Timer timer={timeManager} />
</div>