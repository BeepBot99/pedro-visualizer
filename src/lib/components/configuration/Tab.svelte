<script lang="ts">
  import ButtonUI from "$lib/components/primitives/ButtonUI.svelte";
  import type { PathChain } from "$lib/pathChains";
  import EditName from "$lib/components/configuration/EditName.svelte";

  interface Props {
    selected: boolean;
    name: string;
    onSelect: () => void;
    onDelete: () => void;
    showDelete: boolean;
  }

  let { selected, name = $bindable(), onSelect, onDelete, showDelete }: Props = $props();
</script>

<div
  onclick={onSelect}
  onkeyup={onSelect}
  tabindex="0"
  role="button"
  class="{selected ? 'bg-base-200 border-2 border-base-300 border-b-0' : 'bg-base-300 cursor-pointer'} rounded-md basis-0 flex-1 min-w-45 max-w-100 flex items-center justify-between p-2 pr-1">
  <span class="whitespace-nowrap overflow-hidden text-ellipsis">{name}</span>
  <div class="flex">
    <EditName bind:name />
    {#if showDelete}
      <ButtonUI
        Class="text-base-content/80"
        name="Delete PathChain"
        onclick={(e: Event) => {
        e.stopPropagation();
        onDelete();
      }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="size-4"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </ButtonUI>
    {/if}
  </div>
</div>
