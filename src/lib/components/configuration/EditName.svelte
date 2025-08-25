<script lang="ts">
  import ButtonUI from "$lib/components/primitives/ButtonUI.svelte";
  import Modal from "$lib/components/primitives/Modal.svelte";
  import InputUI from "$lib/components/primitives/InputUI.svelte";

  interface Props {
    name: string;
  }

  let { name = $bindable() }: Props = $props();

  let newName = $state(name);

  $effect(() => {
    newName = name;
  });

  let modalOpen = $state(false);

  function editName(e: Event) {
    e.stopPropagation();
    if (newName) {
      modalOpen = false;
      name = newName;
    }
  }
</script>

<ButtonUI onclick={() => modalOpen = true} name="Edit Name"
          Class="text-base-content/80">
  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor"
       class="size-4">
    <path stroke-linecap="round" stroke-linejoin="round"
          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125" />
  </svg>
</ButtonUI>

<Modal bind:open={modalOpen} title="Edit Name" onenter={editName} onclose={() => newName = name}>
  <InputUI Class="my-4" placeholder="Name" name="PathChain Name" bind:value={newName}
           onmount={(node: HTMLInputElement) => node.focus()} />
  <ButtonUI onclick={editName} Class="bg-primary w-full" name="Confirm">
    Confirm
  </ButtonUI>
</Modal>