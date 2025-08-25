<script lang="ts">
  import ButtonUI from "$lib/components/primitives/ButtonUI.svelte";
  import { db } from "$lib/db";
  import Modal from "$lib/components/primitives/Modal.svelte";
  import InputUI from "$lib/components/primitives/InputUI.svelte";
  import SelectUI from "$lib/components/primitives/SelectUI.svelte";

  let name = $state("");
  let alliance = $state("Red");

  let createModalOpen = $state(false);

  async function createAuto() {
    if (!name) return;
    const id = await db.autos
      .add({
        name,
        alliance: alliance.toLowerCase(),
        pathChains: []
      })
      .catch(console.error);
    console.log(`Auto created with id ${id}`);
    createModalOpen = false;
  }
</script>

<ButtonUI Class="bg-primary" name="New auto" onclick={() => (createModalOpen = true)}>
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

<Modal
  bind:open={createModalOpen}
  onclose={() => (name = "")}
  onenter={createAuto}
  title="Create Auto"
>
  <div class="flex flex-col items-center gap-2 md:flex-row">
    <InputUI
      placeholder="Name"
      bind:value={name}
      name="Auto name"
      onmount={(node: HTMLInputElement) => node.focus()}
    />
    <SelectUI options={["Red", "Blue"]} bind:value={alliance} name="Select alliance" />
    <ButtonUI type="button" onclick={createAuto} Class="bg-primary w-full" name="Create">
      Create
    </ButtonUI>
  </div>
</Modal>
