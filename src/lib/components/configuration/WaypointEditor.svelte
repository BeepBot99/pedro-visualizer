<script lang="ts">
  import type { Waypoint } from "$lib/pathChains";
  import PointEditor from "$lib/components/configuration/PointEditor.svelte";
  import ButtonUI from "$lib/components/primitives/ButtonUI.svelte";

  interface Props {
    waypoint: Waypoint;
    isStartPoint?: boolean;
    isEndPoint?: boolean;
    onDelete: () => void;
    showDelete: boolean;
  }

  let { waypoint = $bindable(), isStartPoint = false, isEndPoint = false, onDelete, showDelete }: Props = $props();
</script>

<div class="bg-base-300 rounded-lg p-4 my-4 grid grid-cols-3">
  <div class="flex flex-col items-center gap-2">
    {#if !isStartPoint}
      <span>Handle Before</span>
      {#if waypoint.handleBefore}
        <div class="flex gap-2">
          <PointEditor bind:point={waypoint.handleBefore} />
          <ButtonUI onclick={() => delete waypoint.handleBefore} name="Remove Handle Before"
                    Class="bg-error border-base-100! text-base-100 p-1! m-0!">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </ButtonUI>
        </div>
      {:else}
        <ButtonUI onclick={() => waypoint.handleBefore = {x: 72, y: 72}} name="Add Handle Before"
                  Class="bg-base-content text-base-100 p-1! m-0!">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </ButtonUI>
      {/if}
    {/if}
  </div>
  <div class="flex flex-col items-center gap-2">
    <span>Anchor</span>
    <PointEditor bind:point={waypoint.point} />
    <div class="flex gap-2">
      {#if !isStartPoint && !isEndPoint && waypoint.handleBefore && waypoint.handleAfter}
        {#if waypoint.smooth}
          <ButtonUI onclick={() => waypoint.smooth = false} name="Unlock Handles"
                    Class="bg-base-200 border-base-100! text-base-content p-1! m-0!">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </ButtonUI>
        {:else}
          <ButtonUI onclick={() => waypoint.smooth = true} name="Lock Handles"
                    Class="bg-base-200 border-base-100! text-base-content p-1! m-0!">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor" class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="M13.5 10.5V6.75a4.5 4.5 0 1 1 9 0v3.75M3.75 21.75h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H3.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z" />
            </svg>
          </ButtonUI>
        {/if}
      {/if}
      {#if showDelete}
        <ButtonUI onclick={onDelete} name="Remove Waypoint"
                  Class="bg-error border-base-100! text-base-100 p-1! m-0!">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
          </svg>
        </ButtonUI>
      {/if}
    </div>
  </div>
  <div class="flex flex-col items-center gap-2">
    {#if !isEndPoint}
      <span>Handle After</span>
      {#if waypoint.handleAfter}
        <div class="flex gap-2">
          <PointEditor bind:point={waypoint.handleAfter} />
          <ButtonUI onclick={() => delete waypoint.handleAfter} name="Remove Handle After"
                    Class="bg-error border-base-100! text-base-100 p-1! m-0!">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                 stroke="currentColor"
                 class="size-6">
              <path stroke-linecap="round" stroke-linejoin="round"
                    d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
            </svg>
          </ButtonUI>
        </div>
      {:else}
        <ButtonUI onclick={() => waypoint.handleAfter = {x: 72, y: 72}} name="Add Handle After"
                  Class="bg-base-content text-base-100 p-1! m-0!">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
               stroke="currentColor"
               class="size-6">
            <path stroke-linecap="round" stroke-linejoin="round"
                  d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
          </svg>
        </ButtonUI>
      {/if}
    {/if}
  </div>
</div>