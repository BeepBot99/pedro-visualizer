<script lang="ts">
  import type { PageProps } from "./$types";

  let { data, children }: PageProps = $props();
</script>

<svelte:head>
  <title>{data.auto?.name} | NextFTC++</title>
</svelte:head>

{@render children()}