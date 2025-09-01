<script lang="ts">
  import type { Waypoint } from "$lib/pathChains";
  import PointEditor from "$lib/components/configuration/PointEditor.svelte";
  import ButtonUI from "$lib/components/primitives/ButtonUI.svelte";
  import gsap from "gsap";
  import { tick } from "svelte";

  interface Props {
    waypoint: Waypoint;
    isStartPoint?: boolean;
    isEndPoint?: boolean;
    onDelete: () => void;
    showDelete: boolean;
    text: string;
    onAddAfter: () => void;
  }

  let {
    waypoint = $bindable(),
    isStartPoint = false,
    isEndPoint = false,
    onDelete,
    showDelete,
    text,
    onAddAfter
  }: Props = $props();

  let expanded = $state(false);
  let expandedArrow = $state(false);

  let collapsible = $state<HTMLDivElement>() as HTMLDivElement;

  async function collapse() {
    expandedArrow = false;
    await tick();
    const tl = gsap.timeline();
    tl.to(collapsible, {
      height: 0,
      duration: 0.5,
      ease: "power3.out"
    });
    tl.add(() => {
      expanded = false;
      tick();
    });
  }

  async function expand() {
    expanded = true;
    expandedArrow = true;
    await tick();
    gsap.from(collapsible, {
      height: 0,
      duration: 0.5,
      ease: "power3.out"
    });
  }
</script>

<div class="bg-base-300 rounded-lg p-4 pb-0 my-2">
  <div class="flex items-center justify-between border-b-1 border-b-base-content/20 pb-2">
    <div class="flex items-center gap-2">
      {#if expandedArrow}
        <ButtonUI onclick={collapse} name="Collapse Waypoint">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        </ButtonUI>
      {:else}
        <ButtonUI onclick={expand} name="Expand Waypoint">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor" class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </ButtonUI>
      {/if}
      <span class="text-lg">{text}</span>
    </div>
    {#if showDelete}
      <ButtonUI onclick={onDelete} name="Remove Waypoint"
                Class="text-error p-1! m-0!">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
             stroke="currentColor"
             class="size-6">
          <path stroke-linecap="round" stroke-linejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
      </ButtonUI>
    {/if}
  </div>
  {#if expanded}
    <div bind:this={collapsible}
         class="overflow-y-hidden flex flex-col justify-end border-b-1 border-b-base-content/20">
      {#if !isStartPoint}

        <div class="flex justify-between items-center my-4">
          <span>Handle Before</span>
          {#if waypoint.handleBefore}
            <div class="flex gap-2">
              <ButtonUI onclick={() => delete waypoint.handleBefore} name="Remove Handle Before"
                        Class="text-error p-1! m-0!">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor"
                     class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </ButtonUI>
              <PointEditor bind:point={waypoint.handleBefore} />
            </div>
          {:else}
            <ButtonUI onclick={() => waypoint.handleBefore = {x: 72, y: 72}} name="Add Handle Before"
                      Class="p-1!">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor"
                   class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </ButtonUI>
          {/if}
        </div>
      {/if}
      <div class="flex justify-between items-center my-4">
        <span>Anchor</span>
        <PointEditor bind:point={waypoint.point} />
      </div>
      {#if !isEndPoint}
        <div class="flex justify-between items-center my-4">
          <span>Handle After</span>
          {#if waypoint.handleAfter}
            <div class="flex gap-2">
              <ButtonUI onclick={() => delete waypoint.handleAfter} name="Remove Handle After"
                        Class="text-error p-1! m-0!">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                     stroke="currentColor"
                     class="size-6">
                  <path stroke-linecap="round" stroke-linejoin="round"
                        d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
                </svg>
              </ButtonUI>
              <PointEditor bind:point={waypoint.handleAfter} />
            </div>
          {:else}
            <ButtonUI onclick={() => waypoint.handleAfter = {x: 72, y: 72}} name="Add Handle After"
                      Class="p-1!">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                   stroke="currentColor"
                   class="size-6">
                <path stroke-linecap="round" stroke-linejoin="round"
                      d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </ButtonUI>
          {/if}
        </div>
      {/if}
    </div>
  {/if}
  <div class="flex items-center justify-center">
    <ButtonUI onclick={onAddAfter} Class="m-4 border-base-content! hover:bg-base-content/10" name="Add Waypoint After">Add Waypoint After</ButtonUI>
  </div>
</div>