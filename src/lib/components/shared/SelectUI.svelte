<script lang="ts">
  let { options, value = $bindable("") } = $props();
</script>

<select
  bind:value
  class="bg-base-100 w-full rounded-md border-2 focus:outline-none dark:border-neutral-700"
>
  {#each options as option (option)}
    <option value={option}>{option}</option>
  {/each}
</select>
