<script lang="ts">
  let { Class = "", value = $bindable(""), type = "text", name, ...props } = $props();
</script>

<input
  {type}
  bind:value
  class="{Class} bg-base-100 w-full rounded-md border-2 focus:outline-none dark:border-neutral-700"
  {...props}
  title={name}
  aria-label={name}
/>
