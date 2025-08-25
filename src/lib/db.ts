import Dexie, { type EntityTable } from "dexie";
import type { PathChain } from "./pathChains";

export interface Auto {
  id: number;
  name: string;
  alliance: string;
  pathChains: PathChain[];
}

export const db = new Dexie("AutosDatabase") as Dexie & {
  autos: EntityTable<Auto, "id">;
};

db.version(1).stores({
  autos: "++id, name, alliance"
});