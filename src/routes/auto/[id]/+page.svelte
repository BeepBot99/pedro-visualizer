<script lang="ts">
  import { db } from "$lib/db";
  import { liveQuery } from "dexie";
  import type { PageProps } from "./$types";
  import { goto } from "$app/navigation";
  import navColor from "$lib/navColor";
  import ButtonUI from "$lib/components/shared/ButtonUI.svelte";
  import { gsap } from "gsap";
  import { onDestroy, onMount } from "svelte";

  let { data }: PageProps = $props();

  let animation: gsap.core.Tween;

  let paused = $state(true);
  let sliderValue = $state(0);
  let timerAtBottom = $state(true);

  let auto = liveQuery(() => db.autos.get(data.id as number));
  auto.subscribe({
    next: (result) => {
      if (typeof result === "undefined") {
        goto("/");
        return;
      }
      navColor.set(result.alliance === "red" ? "border-b-error" : "border-b-primary");
      setTimeout(initialize, 200);
    }
  });

  function initialize() {
    animation = gsap.fromTo(
      ".slider",
      {
        value: 0
      },
      {
        value: 1,
        duration: 5,
        paused: true,
        repeat: -1,
        ease: "none"
      }
    );
  }

  function pause() {
    paused = true;
    if (animation) animation.pause();
  }

  function play() {
    paused = false;
    if (animation) animation.play(animation.progress() * 5);
  }

  function toggle(e: KeyboardEvent) {
    if (e.code === "Space" || e.key === "KeyK") {
      if (paused) play();
      else pause();
    }
  }

  onMount(() => {
    document.addEventListener("keydown", toggle);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", toggle);
  });

  function setProgress() {
    pause();
    animation.progress(sliderValue);
  }

  function sendToTop() {
    const tl = gsap.timeline();
    tl.to("#timer", {
      y: 48,
      duration: 0.25,
      ease: "power1.in"
    });
    tl.add(() => {
      timerAtBottom = false;
    });
    tl.set("#timer", {
      y: -48
    });
    tl.to("#timer", {
      y: 0,
      duration: 0.25,
      ease: "power1.out"
    });
  }

  function sendToBottom() {
    const tl = gsap.timeline();
    tl.to("#timer", {
      y: -48,
      duration: 0.25,
      ease: "power1.in"
    });
    tl.add(() => {
      timerAtBottom = true;
    });
    tl.set("#timer", {
      y: 48
    });
    tl.to("#timer", {
      y: 0,
      duration: 0.25,
      ease: "power1.out"
    });
  }
</script>

<svelte:head>
  {#if $auto}
    <title>{$auto.name} | NextFTC++</title>
  {:else}
    <title>Loading... | NextFTC++</title>
  {/if}
</svelte:head>

{#if $auto}
  <div class="m-2 flex h-full flex-col gap-2 md:flex-row">
    <div class="relative aspect-square overflow-hidden">
      <img
        class="pointer-events-none rounded-lg"
        src="https://visualizer.pedropathing.com/fields/intothedeep.webp"
        alt="Field map"
      />
      <div
        id="timer"
        class="bg-base-100/20 hover:bg-base-100/30 absolute {timerAtBottom
          ? 'bottom-0'
          : 'top-0'} transition-bg flex h-12 w-full items-center rounded-b-lg duration-150"
      >
        {#if paused}
          <ButtonUI onclick={play} name="Play">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="stroke-success size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
              />
            </svg>
          </ButtonUI>
        {:else}
          <ButtonUI onclick={pause} name="Pause">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="stroke-success size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 5.25v13.5m-7.5-13.5v13.5"
              />
            </svg>
          </ButtonUI>
        {/if}
        <input
          bind:value={sliderValue}
          type="range"
          min="0"
          max="1"
          step="0.000001"
          class="slider h-full w-full flex-1 appearance-none focus:outline-none"
          oninput={setProgress}
        />
        {#if timerAtBottom}
          <ButtonUI onclick={sendToTop} name="Bring timer to top" Class="bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
              />
            </svg>
          </ButtonUI>
        {:else}
          <ButtonUI onclick={sendToBottom} name="Bring timer to bottom" Class="bg-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
              class="size-6"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3"
              />
            </svg>
          </ButtonUI>
        {/if}
      </div>
    </div>
    <div class="bg-base-200 flex-grow rounded-lg p-4"></div>
  </div>
{:else}
  <p class="text-center text-lg sm:text-left">Loading...</p>
{/if}
