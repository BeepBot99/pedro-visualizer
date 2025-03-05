<script lang="ts">
  import ButtonUI from "$lib/components/ButtonUI.svelte";
  import { db } from "$lib/db";
  import Modal from "$lib/components/Modal.svelte";
  import InputUI from "$lib/components/InputUI.svelte";
  import SelectUI from "$lib/components/SelectUI.svelte";

  let name = $state("");
  let alliance = $state("Red");
  let language = $state("Kotlin");

  let createModalOpen = $state(false);

  async function createAuto(e: Event) {
    e.preventDefault();
    if (!name) return;
    const id = await db.autos
      .add({
        name,
        alliance: alliance.toLowerCase(),
        language: language.toLowerCase()
      })
      .catch(console.error);
    console.log(`Auto created with id ${id}`);
    closeModal();
  }

  function closeModal() {
    createModalOpen = false;
    name = "";
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

<Modal bind:open={createModalOpen} onclose={closeModal} title="Create Auto">
  <form class="flex flex-col items-center gap-2 md:flex-row" onsubmit={createAuto}>
    <InputUI placeholder="Name" bind:value={name} name="Auto name" />
    <SelectUI options={["Red", "Blue"]} bind:value={alliance} name="Select alliance" />
    <SelectUI options={["Kotlin", "Java"]} bind:value={language} name="Select language"></SelectUI>
    <ButtonUI type="submit" Class="bg-primary w-full" name="Create">Create</ButtonUI>
  </form>
</Modal>
