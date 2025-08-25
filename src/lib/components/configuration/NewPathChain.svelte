<script lang="ts">
  import ButtonUI from "$lib/components/primitives/ButtonUI.svelte";
  import Modal from "$lib/components/primitives/Modal.svelte";
  import InputUI from "$lib/components/primitives/InputUI.svelte";

  interface Props {
    onCreate: (name: string) => void;
  }

  let { onCreate }: Props = $props();

  let modalOpen = $state(false);
  let name = $state("");

  function createPathChain() {
    if (name) {
      onCreate(name);
      modalOpen = false;
      name = "";
    }
  }
</script>

<ButtonUI onclick={() => modalOpen = true} name="New PathChain"
          Class="bg-base-content text-base-100 flex items-center justify-center size-9 p-0!">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
       stroke="currentColor"
       class="size-6">
    <path stroke-linecap="round" stroke-linejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
  </svg>
</ButtonUI>

<Modal bind:open={modalOpen} title="New PathChain" onenter={createPathChain} onclose={() => name = ""}>
  <InputUI Class="my-4" placeholder="Name" name="PathChain Name" bind:value={name}
           onmount={(node: HTMLInputElement) => node.focus()} />
  <ButtonUI onclick={createPathChain} Class="bg-primary w-full" name="Create">
    Create
  </ButtonUI>
</Modal>