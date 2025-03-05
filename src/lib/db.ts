import Dexie, { type EntityTable } from "dexie";

interface Auto {
  id: number;
  name: string;
  alliance: string;
  language: string;
}

interface NamedCommand {
  autoId: number;
  id: number;
  name: string;
  code: string;
  language: string;
}

const db = new Dexie("AutosDatabase") as Dexie & {
  autos: EntityTable<Auto, "id">;
  commands: EntityTable<NamedCommand, "id">;
};

db.version(1).stores({
  autos: "++id, name, alliance"
});

db.version(2).stores({
  autos: "++id, name, alliance",
  commands: "++id, autoId"
});

export type { Auto };
export type { NamedCommand };
export { db };
