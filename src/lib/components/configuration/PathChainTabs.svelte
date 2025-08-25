<script lang="ts">
  import Tab from "$lib/components/configuration/Tab.svelte";
  import type { PathChain } from "$lib/pathChains";
  import NewPathChain from "$lib/components/configuration/NewPathChain.svelte";

  interface Props {
    pathChain: PathChain;
    pathChains: PathChain[];
  }

  let { pathChain: currentPathChain = $bindable(), pathChains = $bindable() }: Props = $props();

  let currentIndex = $state(0);

  $effect(() => {
    currentPathChain = pathChains[currentIndex];
  });

  $effect(() => {
    pathChains[currentIndex] = currentPathChain;
  });

  function addNewPathChain(name: string) {
    pathChains.push({
      name,
      startPoint: {
        point: {
          x: 60,
          y: 72
        },
        smooth: false
      },
      waypoints: [],
      endPoint: {
        point: {
          x: 84,
          y: 72
        },
        smooth: false
      }
    });
    currentIndex = pathChains.length - 1;
  }

  function removePathChain(index: number) {
    pathChains.splice(index, 1);
    if (currentIndex >= pathChains.length) {
      currentIndex = pathChains.length - 1;
    }
  }
</script>

<div class="flex gap-2 h-14 p-2 overflow-x-auto no-scrollbars">
  {#key pathChains}
    {#each pathChains as pathChain, index}
      <Tab onSelect={() => currentIndex = index} bind:name={pathChain.name}
           selected={currentIndex === index} onDelete={() => removePathChain(index)}
           showDelete={pathChains.length > 1} />
    {/each}
  {/key}
  <NewPathChain onCreate={addNewPathChain}/>
</div>