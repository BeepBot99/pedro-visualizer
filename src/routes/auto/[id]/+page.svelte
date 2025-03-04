<script lang="ts">
  import { db } from "$lib/db";
  import { liveQuery } from "dexie";
  import type { PageProps } from "./$types";
  import { goto } from "$app/navigation";
  import navColor from "$lib/navColor";
  import Timer from "$lib/components/Timer.svelte";
  import { initialize } from "$lib/components/Timer";

  let { data }: PageProps = $props();

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

  // function toggle(e: KeyboardEvent) {
  //   if (e.code === "Space" || e.key === "KeyK") {
  //     if (paused) play();
  //     else pause();
  //   }
  // }

  // onMount(() => {
  //   document.addEventListener("keydown", toggle);
  // });
  //
  // onDestroy(() => {
  //   document.removeEventListener("keydown", toggle);
  // });
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
        class="pointer-events-none rounded-lg select-none"
        src="https://visualizer.pedropathing.com/fields/intothedeep.webp"
        alt="Field map"
      />
      <Timer />
    </div>
    <div class="bg-base-200 flex-grow rounded-lg p-4"></div>
  </div>
{:else}
  <p class="text-center text-lg sm:text-left">Loading...</p>
{/if}
