import type { PageLoad } from "../../../../.svelte-kit/types/src/routes";
import { goto } from "$app/navigation";
import type { Auto } from "$lib/db";
import { db } from "$lib/db";

export const load: PageLoad = async ({ params }) => {
  if (!/^\d+$/.test(params.id)) {
    await goto("/");
    return null as { auto: Auto, id: number, color: string };
  }

  const auto = await db.autos.get(Number(params.id));
  if (!auto) {
    await goto("/");
    return null as { auto: Auto, id: number, color: string };
  }

  if (auto.pathChains.length === 0) {
    auto.pathChains.push({
      startPoint: {
        point: {
          x: 60,
          y: 72
        },
        smooth: false
      },
      waypoints: [],
      endPoint: {
        point: {
          x: 84,
          y: 72
        },
        smooth: false
      },
      name: "myPathChain"
    });
  }

  return {
    auto,
    id: Number(params.id),
    color: auto.alliance
  };
};
