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
import { belowHalfIsNotGone } from "@/content/notebook/below-half-is-not-gone";
import { whereDoesOriginChange } from "@/content/notebook/where-does-origin-change";
import { theArcticIsNotAShortcut } from "@/content/notebook/the-arctic-is-not-a-shortcut";

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

    const entriesBySlug = new Map(entries.map((entry) => [entry.slug, entry]));
    const isPublic = (entry: NotebookEntry) =>
      entry.editorialStatus === "published" ||
      entry.editorialStatus === "corrected";

    entries.forEach((entry, entryIndex) => {
      const relationships = entry.relatedNotebooks ?? [];
      const fragments = entry.legacyFragments ?? [];

      assertUnique(
        relationships.map((relationship) => relationship.slug),
        [entryIndex, "relatedNotebooks"],
        "related Notebook targets must be unique"
      );
      assertUnique(
        fragments.map((fragment) => fragment.id),
        [entryIndex, "legacyFragments"],
        "legacy fragment IDs must be unique"
      );
      assertUnique(
        fragments.map(
          (fragment) =>
            `${fragment.successorSlug}#${fragment.successorFragment}`
        ),
        [entryIndex, "legacyFragments"],
        "legacy fragment successor targets must be unique"
      );

      relationships.forEach((relationship, relationshipIndex) => {
        const target = entriesBySlug.get(relationship.slug);
        if (!target) {
          ctx.addIssue({
            code: "custom",
            message: "related Notebook target must exist",
            path: [entryIndex, "relatedNotebooks", relationshipIndex, "slug"],
          });
          return;
        }
        const reciprocal = target.relatedNotebooks?.some(
          (candidate) =>
            candidate.relation === "companion" && candidate.slug === entry.slug
        );
        if (!reciprocal) {
          ctx.addIssue({
            code: "custom",
            message: "companion relationships must be reciprocal",
            path: [entryIndex, "relatedNotebooks", relationshipIndex],
          });
        }
        if (isPublic(entry) && !isPublic(target)) {
          ctx.addIssue({
            code: "custom",
            message: "public Notebook cannot link to a non-public successor",
            path: [entryIndex, "relatedNotebooks", relationshipIndex],
          });
        }
      });

      fragments.forEach((fragment, fragmentIndex) => {
        const successor = entriesBySlug.get(fragment.successorSlug);
        if (!successor) {
          ctx.addIssue({
            code: "custom",
            message: "legacy-fragment successor must exist",
            path: [entryIndex, "legacyFragments", fragmentIndex],
          });
          return;
        }
        if (isPublic(entry) && !isPublic(successor)) {
          ctx.addIssue({
            code: "custom",
            message: "public Notebook cannot link to a non-public successor",
            path: [entryIndex, "legacyFragments", fragmentIndex],
          });
        }
      });
    });
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
  belowHalfIsNotGone,
  whereDoesOriginChange,
  theArcticIsNotAShortcut,
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
