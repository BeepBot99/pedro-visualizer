<script lang="ts">
  import { onMount } from "svelte";

  let {
    Class = "",
    value = $bindable(""),
    type = "text",
    name,
    fullWidth = true,
    onmount = () => {},
    ...props
  } = $props();

  let element: HTMLInputElement;

  onMount(() => {
    onmount(element);
  });
</script>

<input
  {type}
  bind:this={element}
  bind:value
  class="{Class} bg-base-100 {fullWidth
    ? 'w-full'
    : ''} rounded-md border-2 focus:outline-none dark:border-neutral-700"
  {...props}
  title={name}
  aria-label={name}
/>
