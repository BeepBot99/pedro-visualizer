<script lang="ts">
  import ButtonUI from "$lib/components/ButtonUI.svelte";
  import hotkeys from "hotkeys-js";

  let {
    open = $bindable(false),
    children,
    onclose = () => {},
    onenter = () => {},
    title
  } = $props();

  $effect(() => {
    if (open) {
      hotkeys("esc", () => {
        open = false;
        onclose();
      });
      hotkeys("enter", () => onenter());
    } else {
      hotkeys.unbind("esc");
      hotkeys.unbind("enter");
      onclose();
    }
  });
</script>

{#if open}
  <div
    class="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4"
    onclick={() => {
      open = false;
      onclose();
    }}
    role="presentation"
  >
    <div
      class="bg-base-200 w-full rounded-lg p-4 sm:w-auto"
      onclick={(e) => e.stopPropagation()}
      role="presentation"
    >
      <div class="flex items-center justify-between">
        <h2 class="text-xl">{title}</h2>
        <ButtonUI
          name="Close modal"
          onclick={() => {
            open = false;
            onclose();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="size-6"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
          </svg>
        </ButtonUI>
      </div>
      <hr class="my-2 rounded-full" />
      {@render children()}
    </div>
  </div>
{/if}
