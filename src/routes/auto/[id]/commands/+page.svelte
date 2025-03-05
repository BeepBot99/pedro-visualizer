<script lang="ts">
  import ButtonUI from "$lib/components/ButtonUI.svelte";
  import NamedCommandEditor from "./NamedCommandEditor.svelte";
  import type { PageProps } from "./$types";
  import { db } from "$lib/db";
  import { liveQuery } from "dexie";

  let { data }: PageProps = $props();

  let commands = liveQuery(() => db.commands.where("autoId").equals(data.id!).toArray());

  async function addCommand() {
    await db.commands.add({
      autoId: data.auto!.id,
      name: "New Command",
      code: "// Enter the code for your command here",
      language: data.auto?.language || "java"
    });
  }
</script>

<div class="bg-base-200 m-2 h-full overflow-y-auto rounded-lg p-4">
  <div class="flex items-center justify-end">
    <ButtonUI onclick={addCommand} Class="bg-primary" name="New named command">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="size-6"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
      </svg>
    </ButtonUI>
  </div>
  {#if $commands}
    {#if $commands.length > 0}
      {#each $commands as command (command.id)}
        <NamedCommandEditor {command} />
      {/each}
    {:else}
      <p class="text-center text-lg sm:text-left">
        No named commands found (yet). Create your first one now!
      </p>
    {/if}
  {:else}
    <p class="text-center text-lg sm:text-left">Loading...</p>
  {/if}
</div>
