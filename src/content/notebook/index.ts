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
  whatGetsThrough,
]).sort((a, b) => a.ordinal - b.ordinal);

export const publishedNotebookEntries = notebookEntries.filter(
  (entry) => entry.editorialStatus === "published"
);

export const latestNotebookEntry =
  publishedNotebookEntries.at(-1) ??
  (() => {
    throw new Error("At least one published Notebook entry is required");
  })();

export function getPublishedNotebookEntry(
  slug: string
): NotebookEntry | undefined {
  return publishedNotebookEntries.find((entry) => entry.slug === slug);
}
