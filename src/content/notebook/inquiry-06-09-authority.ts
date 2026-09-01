import { legacyWhatGetsThrough } from "@/content/notebook/what-gets-through-legacy";

function requireById<T extends { id: string }>(
  records: readonly T[],
  id: string
): T {
  const record = records.find((candidate) => candidate.id === id);
  if (!record) throw new Error(`Missing Inquiry 06 custody record: ${id}`);
  return record;
}

const cultureClaimIds = new Set([
  "audit-gates-current-transcript",
  "audit-gates-niulai-start",
  "audit-gates-niulai-surge",
  "audit-gates-niulai-odyssey",
  "audit-gates-niulai-makers",
  "audit-gates-vigils-charge",
  "audit-gates-unlawful-means",
  "audit-gates-verdict-scope",
  "audit-gates-sentencing",
  "audit-gates-rights-position",
]);

const tradeClaimIds = new Set([
  "audit-gates-usmca-article",
  "audit-gates-canada-transshipment",
  "audit-gates-ev-quota",
  "audit-gates-tariff-cause",
  "audit-gates-cpa-scale",
  "audit-gates-value-added",
  "audit-gates-production-fraud",
  "audit-gates-article-trigger",
  "audit-gates-review-timing",
  "audit-gates-countertariff-timing",
  "audit-gates-current-transcript",
  "audit-gates-prior-quote-dates",
  "audit-gates-tariff-currency",
  "audit-gates-report-estimates",
  "audit-gates-brookings-nuance",
  "audit-gates-enabler-label",
  "audit-gates-china-intent",
  "audit-gates-drop-off-warning",
  "audit-gates-china-trade-growth",
]);

const cultureSourceIds = new Set([
  "notebook-source-gates-episode",
  "notebook-source-gates-ap-niulai",
  "notebook-source-gates-sina-box-office",
  "notebook-source-gates-guardian-niulai",
  "notebook-source-gates-judgment",
  "notebook-source-gates-doj-nsl",
  "notebook-source-gates-hksar-verdict",
  "notebook-source-gates-hrw",
  "notebook-source-gates-un-experts",
]);

const tradeSourceIds = new Set([
  "notebook-source-gates-episode",
  "notebook-source-gates-yu-prior",
  "notebook-source-gates-white-house-transshipment",
  "notebook-source-gates-ustr-origin",
  "notebook-source-gates-usmca-3210",
  "notebook-source-gates-canada-ev",
  "notebook-source-gates-white-house-canada",
  "notebook-source-gates-brookings",
  "notebook-source-gates-canada-china-cycle",
  "notebook-source-gates-canada-origin-measures",
  "notebook-source-gates-usmca-2026",
  "notebook-source-gates-cpa-monitor",
  "notebook-source-gates-fed-mexico",
  "notebook-source-gates-canada-countermeasures",
  "notebook-source-gates-canada-negotiations",
  "notebook-source-gates-trump-warning",
  "notebook-source-gates-canada-trade",
]);

export const initiatingEpisodeSource = Object.freeze(
  requireById(
    legacyWhatGetsThrough.sourceTrail,
    "notebook-source-gates-episode"
  )
);

const legacyTranscriptAudit = requireById(
  legacyWhatGetsThrough.claimAudit,
  "audit-gates-current-transcript"
);

export const sharedTranscriptAudit = Object.freeze({
  ...legacyTranscriptAudit,
  assessment:
    "The current Hudson page and Simplecast record provide a description and embedded audio, not a transcript. Earlier episode records cannot be substituted for episode 195 or used to manufacture its wording.",
  sourceIds: ["notebook-source-gates-episode"],
});

export const cultureTurningPoints = legacyWhatGetsThrough.turningPoints.filter(
  (point) => point.id !== "turning-gates-trade"
);
export const tradeTurningPoint = requireById(
  legacyWhatGetsThrough.turningPoints,
  "turning-gates-trade"
);
export const cultureGates = legacyWhatGetsThrough.gates.filter(
  (gate) => gate.domain !== "trade"
);
export const tradeGate = requireById(legacyWhatGetsThrough.gates, "gate-trade");
export const cultureClaimAudit = legacyWhatGetsThrough.claimAudit
  .filter((claim) => cultureClaimIds.has(claim.id))
  .map((claim) =>
    claim.id === sharedTranscriptAudit.id ? sharedTranscriptAudit : claim
  );
export const tradeClaimAudit = legacyWhatGetsThrough.claimAudit
  .filter((claim) => tradeClaimIds.has(claim.id))
  .map((claim) =>
    claim.id === sharedTranscriptAudit.id ? sharedTranscriptAudit : claim
  );
export const cultureSources = legacyWhatGetsThrough.sourceTrail.filter(
  (source) => cultureSourceIds.has(source.id)
);
export const tradeSources = legacyWhatGetsThrough.sourceTrail.filter((source) =>
  tradeSourceIds.has(source.id)
);

export const legacyTradeProofs = legacyWhatGetsThrough.tradeProofs;
export const legacyTradePressure = legacyWhatGetsThrough.tradePressure;
export const legacyTradeFrames = legacyWhatGetsThrough.tradeFrames;

export const movedTradeSourceIds = legacyWhatGetsThrough.sourceTrail
  .filter(
    (source) =>
      tradeSourceIds.has(source.id) && source.id !== initiatingEpisodeSource.id
  )
  .map((source) => source.id);

export const inquiry06LegacyFragments = [
  {
    id: "trade",
    successorSlug: "where-does-origin-change",
    successorFragment: "trade",
    notice:
      "The rules-of-origin analysis moved to Inquiry 09 so its legal proof gates remain distinct from culture and public memory.",
  },
  ...movedTradeSourceIds.map((id) => ({
    id,
    successorSlug: "where-does-origin-change",
    successorFragment: id,
    notice:
      "This source moved to the origin-proof companion without changing its public evidence identity.",
  })),
  {
    id: "transshipment-proof-title",
    successorSlug: "where-does-origin-change",
    successorFragment: "transshipment-proof-title",
    notice:
      "The four-gate proof figure moved to the origin-proof companion inquiry.",
  },
  {
    id: "transshipment-proof-note",
    successorSlug: "where-does-origin-change",
    successorFragment: "transshipment-proof-note",
    notice:
      "The proof-boundary note moved with the origin-proof figure and its citations.",
  },
] as const;
