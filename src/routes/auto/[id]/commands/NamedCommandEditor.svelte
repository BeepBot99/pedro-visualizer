<script lang="ts">
  import ButtonUI from "$lib/components/ButtonUI.svelte";
  import InputUI from "$lib/components/InputUI.svelte";
  import { db } from "$lib/db";
  import { onMount } from "svelte";
  import { CodeJar } from "@novacbn/svelte-codejar";
  import hljs from "highlight.js/lib/core";
  import java from "highlight.js/lib/languages/java";
  import kotlin from "highlight.js/lib/languages/kotlin";

  hljs.registerLanguage("java", java);
  hljs.registerLanguage("kotlin", kotlin);

  const highlight = (code, syntax) =>
    hljs.highlight(code, {
      language: syntax
    }).value;

  let { command } = $props();

  let code = $state(command.code);

  let renaming = $state(false);

  let name = $state(command.name);
  function deleteCommand() {
    db.commands.delete(command.id);
  }

  function renameCommand() {
    db.commands
      .where("id")
      .equals(command.id)
      .modify((command) => {
        command.name = name;
      });
  }

  function editCode() {
    db.commands
      .where("id")
      .equals(command.id)
      .modify((command) => {
        command.code = code;
      });
  }

  onMount(() => {
    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      import("highlight.js/styles/atom-one-dark.min.css");
    } else {
      import("highlight.js/styles/atom-one-light.min.css");
    }
  });
</script>

<div class="bg-base-300 my-2 rounded-lg p-4">
  <div class="flex items-center justify-between">
    {#if renaming}
      <InputUI
        bind:value={name}
        type="text"
        Class="text-2xl"
        fullWidth={false}
        placeholder="Command name"
        name="Command name"
        onclick={(e: Event) => e.stopPropagation()}
        onblur={() => (renaming = false)}
        onkeyup={(e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === "Escape") renaming = false;
        }}
        oninput={renameCommand}
        onmount={(node) => node.focus()}
      />
    {:else}
      <button
        type="button"
        aria-label="Rename command"
        onclick={() => (renaming = true)}
        class="cursor-pointer border-2 border-transparent px-3 py-2 text-2xl select-none"
      >
        {name}
      </button>
    {/if}
    <div>
      <ButtonUI
        Class="border-error! text-error"
        name="Delete named command"
        onclick={(e: Event) => {
          e.stopPropagation();
          deleteCommand();
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
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
          />
        </svg>
      </ButtonUI>
    </div>
  </div>
  <div class="border-base-content/50 my-2 ml-4 rounded-lg border-1 p-4 shadow-lg">
    <CodeJar tab="  " on:change={editCode} syntax={command.language} {highlight} bind:value={code} />
  </div>
</div>
