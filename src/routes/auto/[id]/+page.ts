import type { PageLoad } from "./$types";
import { goto } from "$app/navigation";

export const load: PageLoad = async ({ params }) => {
  if (/^\d+$/.test(params.id)) return { id: Number(params.id) };
  await goto("/");
};
