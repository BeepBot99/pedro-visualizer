import type { LayoutLoad } from "./$types";
import { goto } from "$app/navigation";
import { db } from "$lib/db";

export const load: LayoutLoad = async ({ params }) => {
  if (!/^\d+$/.test(params.id)) {
    await goto("/");
    return;
  }
  const auto = await db.autos.get(Number(params.id));
  if (!auto) {
    await goto("/");
    return;
  }
  return {
    auto,
    id: Number(params.id),
    color: auto.alliance
  };
};
