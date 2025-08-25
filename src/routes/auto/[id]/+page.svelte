<script lang="ts">
  import { onDestroy, onMount, tick } from "svelte";
  import hotkeys from "hotkeys-js";
  import { goto } from "$app/navigation";
  import type { PageProps } from "./$types";
  import { db } from "$lib/db";
  import PathChainDisplay from "./PathChainDisplay.svelte";
  import PathChainTabs from "$lib/components/configuration/PathChainTabs.svelte";
  import PathChainConfig from "$lib/components/configuration/PathChainConfig.svelte";

  let { data }: PageProps = $props();

  let pathChains = $state(data.auto.pathChains);
  let pathChain = $state(pathChains[0]);

  $effect(() => {
    data.auto.pathChains = pathChains;
    db.autos.put($state.snapshot(data.auto));
  });

  onMount(() => {
    hotkeys("esc", () => {
      goto("/");
    });
  });

  onDestroy(hotkeys.unbind);
</script>

<svelte:head>
  <title>{data.auto.name} | Pedro Pathing Visualizer</title>
</svelte:head>

<div class="m-2 flex h-full flex-col gap-2 lg:flex-row max-w-screen">
  {#key pathChain}
    <PathChainDisplay bind:pathChain />
  {/key}
  <div class="bg-base-200 min-w-0 flex-1 rounded-lg h-full flex flex-col">
    <PathChainTabs bind:pathChains bind:pathChain />
    <PathChainConfig bind:pathChain />
  </div>
</div>
