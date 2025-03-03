<script lang="ts">
  let { children, name, Class = "", ...props } = $props();
</script>

<button aria-label={name} title={name} {...props} type="button" class="outline-base-content m-0.5 cursor-pointer rounded-md border-2 border-transparent p-2 transition duration-150 hover:opacity-85 focus-visible:outline-2 active:translate-y-0.5 active:scale-95 active:opacity-75 {Class}">
  {@render children()}
</button>