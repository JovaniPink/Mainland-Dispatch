import { z } from "zod";
import { openModelsClosedSystem } from "@/content/notebook/open-models-closed-system";
import { dominanceIsADashboard } from "@/content/notebook/dominance-is-a-dashboard";
import {
  NotebookEntrySchema,
  type NotebookEntry,
} from "@/content/notebook/schema";
import { whatXiJinpingWants } from "@/content/notebook/what-xi-jinping-wants";
import { routingAroundRisk } from "@/content/notebook/routing-around-risk";
import { whatGetsThrough } from "@/content/notebook/what-gets-through";
import { whoAbsorbsTheShock } from "@/content/notebook/who-absorbs-the-shock";
import { julyIsNotOneNumber } from "@/content/notebook/july-is-not-one-number";

const NotebookRegistrySchema = z
  .array(NotebookEntrySchema)
  .min(1)
  .superRefine((entries, ctx) => {
    const assertUnique = (
      values: Array<string | number>,
      path: (string | number)[],
      message: string
    ) => {
      if (new Set(values).size !== values.length) {
        ctx.addIssue({ code: "custom", message, path });
      }
    };

    assertUnique(
      entries.map((entry) => entry.slug),
      [],
      "Notebook slugs must be unique"
    );
    assertUnique(
      entries.map((entry) => entry.ordinal),
      [],
      "Notebook ordinals must be unique"
    );
  });

export function parseNotebookRegistry(value: unknown): NotebookEntry[] {
  return NotebookRegistrySchema.parse(value);
}

export const notebookEntries = parseNotebookRegistry([
  whatXiJinpingWants,
  openModelsClosedSystem,
  dominanceIsADashboard,
  routingAroundRisk,
  whoAbsorbsTheShock,
  whatGetsThrough,
  julyIsNotOneNumber,
]).sort((a, b) => a.ordinal - b.ordinal);

export function isPublicNotebookEntry(entry: NotebookEntry): boolean {
  return (
    entry.editorialStatus === "published" ||
    entry.editorialStatus === "corrected"
  );
}

export const publicNotebookEntries = notebookEntries.filter(
  isPublicNotebookEntry
);

export const latestNotebookEntry =
  publicNotebookEntries.at(-1) ??
  (() => {
    throw new Error("At least one public Notebook entry is required");
  })();

export const newestNotebookRevision =
  publicNotebookEntries
    .map((entry) => entry.updatedAt)
    .sort()
    .at(-1) ??
  (() => {
    throw new Error("At least one public Notebook revision is required");
  })();

export function getPublicNotebookEntry(
  slug: string
): NotebookEntry | undefined {
  return publicNotebookEntries.find((entry) => entry.slug === slug);
}
