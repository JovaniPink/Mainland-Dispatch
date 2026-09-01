import { parseMaritimeMapSubset } from "@/content/notebook/maritime-map-subset";
import { legacyRoutingAroundRisk } from "@/content/notebook/routing-around-risk-legacy";

export { legacyRoutingAroundRisk };

const arcticSourceIds = new Set([
  "notebook-source-risk-chnl-2025",
  "notebook-source-risk-rosatom-2025",
  "notebook-source-risk-sea-legend",
  "notebook-source-risk-global-times-sea-legend",
  "notebook-source-risk-zhoushan-departure",
  "notebook-source-risk-nsidc-passage",
  "notebook-source-risk-nsidc-2026",
  "notebook-source-risk-imo-hfo",
  "notebook-source-risk-bellona-permits",
  "notebook-source-risk-bellona-shadow",
  "notebook-source-risk-arctic-podcast",
]);

const sharedSourceIds = [
  "notebook-source-risk-aljazeera",
  "notebook-source-risk-guardian",
] as const;

const arcticClaimIds = new Set([
  "audit-risk-portfolio",
  "audit-risk-arctic-schedule",
  "audit-risk-transit-cargo",
  "audit-risk-container-count",
  "audit-risk-bellona-counts",
]);

const arcticTimelineDates = new Set([
  "2013",
  "2018",
  "2024-07",
  "2025-10",
  "2026-08-11",
  "2026-08-15",
]);

const sourceById = (id: string) => {
  const source = legacyRoutingAroundRisk.sourceTrail.find(
    (candidate) => candidate.id === id
  );
  if (!source) throw new Error(`Missing maritime source ${id}`);
  return source;
};

const sourceIdentity = (id: string) => {
  const { context, limitation, ...identity } = sourceById(id);
  void context;
  void limitation;
  return Object.freeze(identity);
};

export const sharedMaritimeSourceIdentities = Object.freeze(
  Object.fromEntries(
    sharedSourceIds.map((id) => [id, sourceIdentity(id)])
  ) as Record<
    (typeof sharedSourceIds)[number],
    ReturnType<typeof sourceIdentity>
  >
);

const scopedSharedSource = (
  id: (typeof sharedSourceIds)[number],
  context: string,
  limitation: string
) => ({
  ...sharedMaritimeSourceIdentities[id],
  context,
  limitation,
});

export const nonArcticSharedSources = [
  scopedSharedSource(
    "notebook-source-risk-aljazeera",
    "Frames the Arctic proposal against Hormuz and Suez, supporting the non-Arctic conclusion that a seasonal container service does not replace Gulf energy or Suez-scale trade.",
    "The comparison depends partly on operator claims and does not establish a universal portfolio policy, a risk-free corridor, or substitution at equivalent scale."
  ),
  scopedSharedSource(
    "notebook-source-risk-guardian",
    "Connects the Arctic proposal to contemporary Middle East disruption while identifying why the non-Arctic chokepoints retain different energy and container functions.",
    "Launch reporting cannot prove that China has replaced Hormuz or Suez, or that every state-linked carrier follows one route policy."
  ),
];

export const arcticSharedSources = [
  scopedSharedSource(
    "notebook-source-risk-aljazeera",
    "Frames the announced Arctic service as a seasonal hedge and records expert cautions about scale, ice, and Russian administration.",
    "Schedule and transit-time details substantially trace to the operator; the report does not prove arrival, completed transit, reliable repetition, or safe passage."
  ),
  scopedSharedSource(
    "notebook-source-risk-guardian",
    "Reports the Arctic launch proposition alongside environmental, sanctions, insurance, and Russian-governance dependencies.",
    "The report does not establish lower lifecycle impact, voyage completion, reliable service, or Suez-scale capacity."
  ),
];

export const nonArcticFormats = legacyRoutingAroundRisk.formats.filter(
  (format) => format.id !== "format-risk-arctic"
);
export const arcticFormats = legacyRoutingAroundRisk.formats.filter(
  (format) => format.id === "format-risk-arctic"
);

export const nonArcticTurningPoints =
  legacyRoutingAroundRisk.turningPoints.filter(
    (item) => item.id !== "turning-risk-arctic"
  );
export const arcticTurningPoints = legacyRoutingAroundRisk.turningPoints.filter(
  (item) => item.id === "turning-risk-arctic"
);

export const nonArcticClaimAudit = legacyRoutingAroundRisk.claimAudit.filter(
  (item) => !arcticClaimIds.has(item.id)
);
export const arcticClaimAudit = legacyRoutingAroundRisk.claimAudit.filter(
  (item) => arcticClaimIds.has(item.id)
);

export const nonArcticScaleMetrics =
  legacyRoutingAroundRisk.scaleMetrics.filter(
    (metric) =>
      !metric.id.startsWith("scale-risk-nsr-") &&
      metric.id !== "scale-risk-sea-legend"
  );
export const arcticScaleMetrics = legacyRoutingAroundRisk.scaleMetrics.filter(
  (metric) =>
    metric.id.startsWith("scale-risk-nsr-") ||
    metric.id === "scale-risk-sea-legend"
);

export const nonArcticRoutes = legacyRoutingAroundRisk.routes.filter(
  (route) => route.id !== "route-risk-arctic"
);
export const arcticRoutes = legacyRoutingAroundRisk.routes.filter(
  (route) => route.id === "route-risk-arctic"
);

export const nonArcticTimeline = legacyRoutingAroundRisk.timeline.filter(
  (item) => !arcticTimelineDates.has(item.date)
);
export const arcticTimeline = legacyRoutingAroundRisk.timeline.filter((item) =>
  arcticTimelineDates.has(item.date)
);

export const nonArcticSources = [
  ...legacyRoutingAroundRisk.sourceTrail.filter(
    (source) =>
      !arcticSourceIds.has(source.id) &&
      !sharedSourceIds.includes(source.id as (typeof sharedSourceIds)[number])
  ),
  ...nonArcticSharedSources,
];

export const arcticSources = [
  ...legacyRoutingAroundRisk.sourceTrail.filter((source) =>
    arcticSourceIds.has(source.id)
  ),
  ...arcticSharedSources,
];

export const nonArcticPortfolioSubset = parseMaritimeMapSubset({
  id: "non-arctic-portfolio",
  routes: nonArcticRoutes,
  allowedLenses: ["portfolio", "gulf", "red-sea"],
  initialLens: "portfolio",
});

export const arcticRouteSubset = parseMaritimeMapSubset({
  id: "northern-sea-route",
  routes: arcticRoutes,
  allowedLenses: ["arctic"],
  initialLens: "arctic",
});

export const arcticLegacyFragments = [
  "arctic",
  ...Array.from(arcticSourceIds),
].map((id) => ({
  id,
  successorSlug: "the-arctic-is-not-a-shortcut",
  successorFragment: id,
  notice:
    id === "arctic"
      ? "The Northern Sea Route analysis moved to Inquiry 10."
      : "This source record moved to Inquiry 10 with its Arctic evidence context.",
}));
