import { z } from "zod";
import { dispatches, isPublicDispatch } from "./dispatches";
import { comparisons } from "./comparisons";
import { traces } from "./traces";
import { dossiers } from "./dossiers";
import {
  ComparisonSchema,
  DispatchSchema,
  DossierSchema,
  TraceSchema,
} from "./schema";

function addDuplicateIssues(
  values: string[],
  label: string,
  ctx: z.RefinementCtx
) {
  const seen = new Set<string>();
  for (const value of values) {
    if (seen.has(value)) {
      ctx.addIssue({
        code: "custom",
        message: `duplicate ${label}: ${value}`,
      });
    }
    seen.add(value);
  }
}

export const ContentCatalogSchema = z
  .object({
    dispatches: z.array(DispatchSchema),
    comparisons: z.array(ComparisonSchema),
    traces: z.array(TraceSchema),
    dossiers: z.array(DossierSchema),
  })
  .superRefine((catalog, ctx) => {
    addDuplicateIssues(
      catalog.dispatches.map((item) => item.id),
      "dispatch id",
      ctx
    );
    addDuplicateIssues(
      catalog.dispatches.map((item) => item.slug),
      "dispatch slug",
      ctx
    );
    addDuplicateIssues(
      catalog.comparisons.map((item) => item.slug),
      "comparison slug",
      ctx
    );
    addDuplicateIssues(
      catalog.traces.map((item) => item.slug),
      "trace slug",
      ctx
    );
    addDuplicateIssues(
      catalog.dossiers.map((item) => item.slug),
      "dossier slug",
      ctx
    );

    const byId = new Map(catalog.dispatches.map((item) => [item.id, item]));
    const publicIds = new Set(
      catalog.dispatches.filter(isPublicDispatch).map((item) => item.id)
    );
    const traceSlugs = new Set(catalog.traces.map((item) => item.slug));

    const requireDispatch = (id: string, owner: string, publicOnly = false) => {
      if (!byId.has(id)) {
        ctx.addIssue({
          code: "custom",
          message: `${owner} references missing dispatch ${id}`,
        });
      } else if (publicOnly && !publicIds.has(id)) {
        ctx.addIssue({
          code: "custom",
          message: `${owner} exposes non-public dispatch ${id}`,
        });
      }
    };

    for (const dispatch of catalog.dispatches) {
      if (dispatch.sourceDate > dispatch.curatedAt) {
        ctx.addIssue({
          code: "custom",
          message: `${dispatch.id} is curated before its source date`,
        });
      }
      if (dispatch.curatedAt > dispatch.updatedAt) {
        ctx.addIssue({
          code: "custom",
          message: `${dispatch.id} is updated before it was curated`,
        });
      }
      addDuplicateIssues(
        dispatch.relatedDispatchIds,
        `${dispatch.id} relation`,
        ctx
      );
      for (const id of dispatch.relatedDispatchIds) {
        if (id === dispatch.id) {
          ctx.addIssue({
            code: "custom",
            message: `${dispatch.id} cannot relate to itself`,
          });
        }
        requireDispatch(id, dispatch.id);
      }
    }

    for (const comparison of catalog.comparisons) {
      addDuplicateIssues(
        comparison.sources.map((source) => source.role),
        `${comparison.slug} source role`,
        ctx
      );
      for (const id of comparison.relatedDispatchIds) {
        requireDispatch(id, comparison.slug, true);
      }
    }

    for (const trace of catalog.traces) {
      addDuplicateIssues(
        trace.entries.map((entry) => entry.id),
        `${trace.slug} entry id`,
        ctx
      );
      for (let index = 1; index < trace.entries.length; index += 1) {
        if (trace.entries[index - 1].date > trace.entries[index].date) {
          ctx.addIssue({
            code: "custom",
            message: `${trace.slug} entries must be chronological`,
          });
        }
      }
      for (const entry of trace.entries) {
        if (entry.dispatchId)
          requireDispatch(entry.dispatchId, trace.slug, true);
      }
    }

    for (const dossier of catalog.dossiers) {
      for (const id of dossier.dispatchIds) {
        requireDispatch(id, dossier.slug, true);
      }
      if (dossier.traceSlug && !traceSlugs.has(dossier.traceSlug)) {
        ctx.addIssue({
          code: "custom",
          message: `${dossier.slug} references missing trace ${dossier.traceSlug}`,
        });
      }
    }
  });

/** Parsed at import time from the root layout, so broken content fails builds. */
export const catalog = ContentCatalogSchema.parse({
  dispatches,
  comparisons,
  traces,
  dossiers,
});

export const isPrototypeCatalog = [
  ...catalog.dispatches,
  ...catalog.comparisons,
  ...catalog.traces,
  ...catalog.dossiers,
].some((item) => item.provenance === "prototype");
