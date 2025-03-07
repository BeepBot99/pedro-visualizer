<script lang="ts">
  import { onMount } from "svelte";
  import hotkeys from "hotkeys-js";
  import { goto } from "$app/navigation";
  import type { PageProps } from "./$types";
  import { TimeManager } from "$lib/TimeManager.svelte";
  import Timer from "../../Timer.svelte";
  import { gsap } from "gsap";
  import { MotionPathPlugin } from "gsap/MotionPathPlugin";
  import type { PathChain, Point } from "$lib/pathChains";
  import BezierPathChain from "$lib/components/curves/BezierPathChain.svelte";
  import { pathChainToCubicBezierChain } from "$lib/components/bezier";
  type Tween = gsap.core.Tween;

  gsap.registerPlugin(MotionPathPlugin);

  let { data }: PageProps = $props();

  const timeManager = new TimeManager();

  let pathChain: PathChain = $state({
    startPoint: {
      point: {
        x: 24,
        y: 72
      },
      smooth: false,
      handleAfter: {
        x: 48,
        y: 72
      }
    },
    waypoints: [
      {
        point: {
          x: 24,
          y: 24
        },
        handleBefore: {
          x: 0,
          y: 48
        },
        handleAfter: {
          x: 48,
          y: 0
        },
        smooth: true
      }
    ],
    endPoint: {
      point: {
        x: 72,
        y: 48
      },
      handleBefore: {
        x: 60,
        y: 60
      },
      smooth: false
    }
  });

  const cubicBezierChain: Point[] = $derived(pathChainToCubicBezierChain(pathChain));

  let rectangle: SVGRectElement;

  onMount(() => {
    hotkeys("[", () => {
      goto(`/auto/${data.id}`);
    });
    hotkeys("]", () => {
      goto(`/auto/${data.id}/commands`);
    });
    gsap.set(rectangle, {
      xPercent: -50,
      yPercent: -50,
      transformOrigin: "50% 50%",
      x: pathChain.startPoint.point.x,
      y: pathChain.startPoint.point.y
    });
  });

  $effect(() => {
    timeManager.timeline.killTweensOf(rectangle);
    timeManager.timeline.to(
      rectangle,
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
</script>

<div class="m-2 flex h-full flex-col gap-2 lg:flex-row">
  <div class="relative aspect-square overflow-hidden">
    <picture class="pointer-events-none select-none">
      <source srcset="/images/into-the-deep-field-dark.webp" media="(prefers-color-scheme: dark)" />
      <img class="rounded-lg" src="/images/into-the-deep-field-light.png" alt="Field map" />
    </picture>
    <svg class="absolute top-0 left-0 h-full w-full" viewBox="0 0 144 144">
      <BezierPathChain bind:pathChain timer={timeManager} bind:robotVisible />
      <rect
        bind:this={rectangle}
        width="18"
        height="18"
        class="fill-primary z-99 {robotVisible ? '' : 'hidden'}"
      />
    </svg>
    <Timer timer={timeManager} />
  </div>
  <div class="bg-base-200 flex-grow rounded-lg p-4"></div>
</div>
