import timer from "$lib/timer.svelte";

function initialize() {
  timer.fromTo(
    ".slider",
    {
      value: 0
    },
    {
      value: 1,
      duration: 1,
      ease: "none"
    },
    0
  );
}

export { initialize };
