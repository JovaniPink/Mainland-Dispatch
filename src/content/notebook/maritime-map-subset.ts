import { z } from "zod";
import {
  NotebookMaritimeRouteSchema,
  type NotebookMaritimeRoute,
} from "@/content/notebook/schema";
import type {
  ChokepointLens,
  ChokepointMapInput,
} from "@/machines/chokepoint-map-machine";

const ChokepointLensSchema = z.enum(["portfolio", "gulf", "red-sea", "arctic"]);

function routesForLens(
  routes: NotebookMaritimeRoute[],
  lens: ChokepointLens
): NotebookMaritimeRoute[] {
  if (lens === "portfolio") return routes;
  if (lens === "gulf") {
    return routes.filter(
      (route) => route.lens === "gulf" || route.lens === "portfolio"
    );
  }
  return routes.filter((route) => route.lens === lens);
}

export const MaritimeMapSubsetSchema = z
  .object({
    id: z.enum(["non-arctic-portfolio", "northern-sea-route"]),
    routes: z.array(NotebookMaritimeRouteSchema).min(1),
    allowedLenses: z.array(ChokepointLensSchema).min(1),
    initialLens: ChokepointLensSchema,
  })
  .superRefine((subset, ctx) => {
    const routeIds = subset.routes.map((route) => route.id);
    if (new Set(routeIds).size !== routeIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "subset route IDs must be unique",
        path: ["routes"],
      });
    }
    const pointIds = subset.routes.flatMap((route) =>
      route.points.map((point) => point.id)
    );
    if (new Set(pointIds).size !== pointIds.length) {
      ctx.addIssue({
        code: "custom",
        message: "subset point IDs must be unique",
        path: ["routes"],
      });
    }
    if (new Set(subset.allowedLenses).size !== subset.allowedLenses.length) {
      ctx.addIssue({
        code: "custom",
        message: "allowed lenses must be unique",
        path: ["allowedLenses"],
      });
    }
    if (!subset.allowedLenses.includes(subset.initialLens)) {
      ctx.addIssue({
        code: "custom",
        message: "initial lens must be allowed",
        path: ["initialLens"],
      });
    }
    subset.allowedLenses.forEach((lens, index) => {
      if (routesForLens(subset.routes, lens).length === 0) {
        ctx.addIssue({
          code: "custom",
          message: "allowed lens must resolve at least one subset route",
          path: ["allowedLenses", index],
        });
      }
    });
    const reachableRouteIds = new Set(
      subset.allowedLenses.flatMap((lens) =>
        routesForLens(subset.routes, lens).map((route) => route.id)
      )
    );
    subset.routes.forEach((route, index) => {
      if (!reachableRouteIds.has(route.id)) {
        ctx.addIssue({
          code: "custom",
          message:
            "every subset route must be reachable through an allowed lens",
          path: ["routes", index],
        });
      }
    });
  });

export type MaritimeMapSubset = z.infer<typeof MaritimeMapSubsetSchema>;

export function parseMaritimeMapSubset(value: unknown): MaritimeMapSubset {
  return MaritimeMapSubsetSchema.parse(value);
}

export function buildChokepointMapInput(
  subset: MaritimeMapSubset
): ChokepointMapInput {
  return {
    routeIds: subset.routes.map((route) => route.id),
    routeIdsByLens: Object.fromEntries(
      subset.allowedLenses.map((lens) => [
        lens,
        routesForLens(subset.routes, lens).map((route) => route.id),
      ])
    ),
    pointIdsByRoute: Object.fromEntries(
      subset.routes.map((route) => [
        route.id,
        route.points.map((point) => point.id),
      ])
    ),
    allowedLenses: subset.allowedLenses,
    initialLens: subset.initialLens,
  };
}
