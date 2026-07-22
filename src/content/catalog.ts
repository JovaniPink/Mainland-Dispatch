import { z } from "zod";
import { dispatches, isPublicDispatch } from "./dispatches";
import { comparisons } from "./comparisons";
import { traces } from "./traces";
import { dossiers } from "./dossiers";
import { atlasReleases } from "./atlas";
import { sourceLeads } from "./source-leads";
import {
  AtlasReleaseSchema,
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
    atlasReleases: z.array(AtlasReleaseSchema),
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
    addDuplicateIssues(
      catalog.atlasReleases.map((item) => item.slug),
      "atlas release slug",
      ctx
    );

    const byId = new Map(catalog.dispatches.map((item) => [item.id, item]));
    const publicIds = new Set(
      catalog.dispatches.filter(isPublicDispatch).map((item) => item.id)
    );
    const traceSlugs = new Set(catalog.traces.map((item) => item.slug));
    const dossierSlugs = new Set(catalog.dossiers.map((item) => item.slug));
    const sourceLeadsById = new Map(sourceLeads.map((item) => [item.id, item]));

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

    for (const release of catalog.atlasReleases) {
      const sourceIds = new Set(release.sources.map((item) => item.id));
      const placeIds = new Set(release.places.map((item) => item.id));
      const relationIds = new Set(release.relations.map((item) => item.id));
      const eventIds = new Set(release.events.map((item) => item.id));
      const chainSlugs = new Set(release.chains.map((item) => item.slug));
      const seriesIds = new Set(release.series.map((item) => item.id));

      if (release.dossierSlug && !dossierSlugs.has(release.dossierSlug)) {
        ctx.addIssue({
          code: "custom",
          message: `${release.slug} references missing dossier ${release.dossierSlug}`,
        });
      }

      for (const id of release.relatedDispatchIds) {
        requireDispatch(id, release.slug, true);
      }

      addDuplicateIssues(
        release.sources.map((item) => item.id),
        `${release.slug} source id`,
        ctx
      );

      for (const source of release.sources) {
        if (!source.sourceLeadId) continue;
        const lead = sourceLeadsById.get(source.sourceLeadId);
        if (!lead) {
          ctx.addIssue({
            code: "custom",
            message: `${release.slug} source ${source.id} references missing lead ${source.sourceLeadId}`,
          });
        } else if (lead.reviewState !== "source-read") {
          ctx.addIssue({
            code: "custom",
            message: `${release.slug} source ${source.id} exposes lead ${source.sourceLeadId} before source review`,
          });
        } else if (lead.url !== source.canonicalUrl) {
          ctx.addIssue({
            code: "custom",
            message: `${release.slug} source ${source.id} does not preserve the reviewed canonical URL`,
          });
        }
      }
      addDuplicateIssues(
        release.places.map((item) => item.id),
        `${release.slug} place id`,
        ctx
      );
      addDuplicateIssues(
        release.relations.map((item) => item.id),
        `${release.slug} relation id`,
        ctx
      );
      addDuplicateIssues(
        release.events.map((item) => item.id),
        `${release.slug} event id`,
        ctx
      );
      addDuplicateIssues(
        release.chains.map((item) => item.id),
        `${release.slug} chain id`,
        ctx
      );
      addDuplicateIssues(
        release.chains.map((item) => item.slug),
        `${release.slug} chain slug`,
        ctx
      );
      addDuplicateIssues(
        release.chains.flatMap((item) => item.steps.map((step) => step.id)),
        `${release.slug} step id`,
        ctx
      );
      addDuplicateIssues(
        release.series.map((item) => item.id),
        `${release.slug} series id`,
        ctx
      );

      const requireAtlasRef = (
        values: string[],
        valid: Set<string>,
        label: string
      ) => {
        for (const value of values) {
          if (!valid.has(value)) {
            ctx.addIssue({
              code: "custom",
              message: `${release.slug} ${label} references missing ${value}`,
            });
          }
        }
      };

      for (let index = 1; index < release.events.length; index += 1) {
        if (release.events[index - 1].date > release.events[index].date) {
          ctx.addIssue({
            code: "custom",
            message: `${release.slug} events must be chronological`,
          });
        }
      }

      for (const place of release.places) {
        requireAtlasRef(place.sourceIds, sourceIds, `${place.id} source`);
      }

      for (const relation of release.relations) {
        requireAtlasRef(
          [relation.from, relation.to],
          placeIds,
          `${relation.id} endpoint`
        );
        requireAtlasRef(relation.sourceIds, sourceIds, `${relation.id} source`);
      }

      for (const event of release.events) {
        requireAtlasRef(event.sourceIds, sourceIds, `${event.id} source`);
        requireAtlasRef(event.placeIds, placeIds, `${event.id} place`);
        requireAtlasRef(event.chainSlugs, chainSlugs, `${event.id} chain`);
      }

      for (const chain of release.chains) {
        for (const step of chain.steps) {
          requireAtlasRef(step.sourceIds, sourceIds, `${chain.id} step source`);
          requireAtlasRef(step.placeIds, placeIds, `${chain.id} step place`);
          requireAtlasRef(step.eventIds, eventIds, `${chain.id} step event`);
          requireAtlasRef(
            step.relationIds,
            relationIds,
            `${chain.id} step relation`
          );
          requireAtlasRef(step.seriesIds, seriesIds, `${chain.id} step series`);
          for (const relationId of step.relationIds) {
            const relation = release.relations.find(
              (item) => item.id === relationId
            );
            if (
              relation &&
              (!step.placeIds.includes(relation.from) ||
                !step.placeIds.includes(relation.to))
            ) {
              ctx.addIssue({
                code: "custom",
                message: `${chain.id} ${step.id} must include both endpoints for ${relation.id}`,
              });
            }
          }
        }
      }

      for (const series of release.series) {
        requireAtlasRef(series.sourceIds, sourceIds, `${series.id} source`);
        for (let index = 1; index < series.observations.length; index += 1) {
          if (
            series.observations[index - 1].month >=
            series.observations[index].month
          ) {
            ctx.addIssue({
              code: "custom",
              message: `${series.id} observations must be chronological and unique`,
            });
          }
        }
        for (const observation of series.observations) {
          requireAtlasRef(
            observation.sourceIds,
            sourceIds,
            `${series.id} observation source`
          );
        }
        for (const annotation of series.annotations) {
          requireAtlasRef(
            [annotation.eventId],
            eventIds,
            `${series.id} annotation event`
          );
        }
      }
    }
  });

/** Parsed at import time from the root layout, so broken content fails builds. */
export const catalog = ContentCatalogSchema.parse({
  dispatches,
  comparisons,
  traces,
  dossiers,
  atlasReleases,
});

export const isPrototypeCatalog = [
  ...catalog.dispatches,
  ...catalog.comparisons,
  ...catalog.traces,
  ...catalog.dossiers,
  ...catalog.atlasReleases,
].some((item) => item.provenance === "prototype");
