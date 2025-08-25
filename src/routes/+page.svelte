<script lang="ts">
  import AutoCard from "./AutoCard.svelte";
  import { db } from "$lib/db";
  import { liveQuery } from "dexie";
  import ButtonUI from "$lib/components/primitives/ButtonUI.svelte";
  import NewAuto from "./NewAuto.svelte";

  let autos = liveQuery(() => db.autos.toArray());
</script>

<svelte:head>
  <title>Autos | Pedro Pathing Visualizer</title>
</svelte:head>

<div class="bg-base-200 m-2 h-full rounded-lg p-4">
  <div class="flex items-center justify-between">
    <h1 class="text-3xl">Autos</h1>
    <div>
      <ButtonUI Class="border-base-content!" name="Upload auto">
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
            d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5"
          />
        </svg>
      </ButtonUI>
      <NewAuto />
    </div>
  </div>
  <hr class="my-4 rounded-full" />
  <div class="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-5">
    {#if $autos}
      {#if $autos.length > 0}
        {#each $autos as auto (auto.id)}
          <AutoCard {auto} />
        {/each}
      {:else}
        <p class="col-span-full text-center text-lg sm:text-left">
          No autos found (yet). Create your first one now!
        </p>
      {/if}
    {:else}
      <p class="col-span-full text-center text-lg sm:text-left">Loading...</p>
    {/if}
  </div>
</div>
