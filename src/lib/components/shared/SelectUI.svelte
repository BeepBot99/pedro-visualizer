<script lang="ts">
  let { options, value = $bindable(""), name } = $props();
</script>

<select
  bind:value
  class="bg-base-100 w-full rounded-md border-2 focus:outline-none dark:border-neutral-700"
  title={name}
  aria-label={name}
>
  {#each options as option (option)}
    <option value={option}>{option}</option>
  {/each}
</select>
