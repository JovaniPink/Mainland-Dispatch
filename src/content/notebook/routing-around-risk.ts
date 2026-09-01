import {
  arcticLegacyFragments,
  nonArcticClaimAudit,
  nonArcticFormats,
  nonArcticRoutes,
  nonArcticScaleMetrics,
  nonArcticSources,
  nonArcticTimeline,
  nonArcticTurningPoints,
} from "@/content/notebook/inquiry-04-10-authority";
import { legacyRoutingAroundRisk } from "@/content/notebook/routing-around-risk-legacy";
import { parseMaritimeRiskNotebookEntry } from "@/content/notebook/schema";

export const routingAroundRisk = parseMaritimeRiskNotebookEntry({
  variant: "maritime-risk",
  ordinal: 4,
  slug: "routing-around-risk",
  title: "Routing Around Risk",
  subtitle:
    "China's response to the Hormuz and Red Sea crisis is a portfolio of inventories, pipelines, tanker handoffs, selective passage, and supplier relationships. Every workaround relocates risk rather than removing it.",
  description:
    "A source-audited field guide to China's non-Arctic chokepoint portfolio: oil inventories, bypass pipelines, tanker handoffs, Red Sea exposure, sanctions, and the limits of substitution.",
  thesis:
    "China is not escaping maritime chokepoints. It is distributing exposure across estimated oil inventories, pipeline capacity, offshore cargo handoffs, state-linked shipping, supplier diversity, and selective passage. Those measures buy time and relocate risk; none replaces the energy function of Hormuz or the container scale of Suez.",
  frontPagePreview: {
    finding:
      "China's deepest near-term buffer is estimated crude inventory on land; pipelines, tanker handoffs, passage arrangements, and supplier diversity relocate narrower parts of the exposure.",
    status: "interpretation",
    caveat:
      "Inventory is estimated, pipeline capacity is not realized flow, and reported routing behavior does not establish a universal policy or a risk-free corridor.",
    sourceIds: [
      "notebook-source-risk-eia-security",
      "notebook-source-risk-unctad-suez",
    ],
  },
  publishedAt: "2026-08-18",
  updatedAt: "2026-09-01",
  readTime: "20 min",
  tags: [
    "China",
    "Strait of Hormuz",
    "Red Sea",
    "Energy security",
    "Maritime trade",
  ],
  editorialStatus: "corrected",
  reviewState: "source-reviewed",
  formats: nonArcticFormats,
  turningPoints: nonArcticTurningPoints,
  claimAudit: nonArcticClaimAudit,
  scaleMetrics: nonArcticScaleMetrics,
  routes: nonArcticRoutes,
  timeline: nonArcticTimeline,
  sections: {
    why: [
      "The most seductive version of the story is also the least useful: war constricts one route and a new map replaces the old map. The evidence shows something more consequential. Beijing has spent years building options that work together precisely because none works alone.",
      "That portfolio joins a stock on land, flows through pipelines, cargo handoffs at sea, selective exposure by large state-linked carriers, and supplier relationships. The analytical task is to preserve each instrument's scale and function. Crude barrels, stored barrels, pipeline capacity, and container-trade shares are not interchangeable units.",
    ],
    verdict: [
      "The thesis holds: this is mitigation, not escape. China's estimated crude inventories are the deepest buffer. Saudi and Emirati pipelines move some barrels around Hormuz. Offshore transfers can keep a valuable receiving tanker outside the Gulf. The Red Sea and Hormuz remain political bargaining spaces.",
      "Each move also creates a dependency. Stocks run down. Pipelines have capacity and outlet constraints. Ship-to-ship transfers add handoffs, price, and counterparties. Passage carve-outs can change. Portfolio resilience is real; independence is not.",
    ],
    chokepoints: legacyRoutingAroundRisk.sections.chokepoints,
    portfolio: legacyRoutingAroundRisk.sections.portfolio,
    governance: [
      "Sanctions, procurement, permissiveness, intelligence enablement, and operational command are different propositions. Treasury names PRC-linked procurement networks serving an Iranian missile-propellant producer. AP reports a US assessment that Russia shared potentially useful information while also reporting no evidence that Russia directed Iran's use. The public record supports concern about enablement, not a claim that every shipment or strike followed top-level Chinese or Russian command.",
      "Portfolio passage remains contingent on counterparties, flag and ownership structures, insurance, sanctions exposure, and changing security conditions. A reported company decision, voyage, or cargo handoff cannot establish a universal Chinese policy or a durable route guarantee.",
    ],
    history: [
      legacyRoutingAroundRisk.sections.history[0],
      "China's response belongs to that history. Its novelty is the coordination of stocks, state-linked carriers, pipelines, supplier relationships, and selective passage under centralized policy. The map changes at the margin while old geographic constraints continue to set the price.",
    ],
    changed: [
      "September 1 correction: the Northern Sea Route evidence moved to Inquiry 10, The Arctic Is Not a Shortcut, with its route, points, scale measures, chronology, source identities, and limitations preserved.",
      "Inquiry 04 now uses a non-Arctic portfolio contract for Hormuz, the Gulf of Oman, Saudi and Emirati bypass pipelines, Bab el-Mandeb, and Suez. The map implementation and privacy boundary are shared, but this page exposes only portfolio, Gulf, and Red Sea lenses.",
      "The correction preserves the original URL and publication date. Old Arctic and moved-source fragments remain as accessible notices that point to the exact companion fragments without redirecting the article or duplicating its citations.",
    ],
  },
  sourceTrail: nonArcticSources,
  unresolvedQuestion:
    "Can a portfolio designed to buy weeks or months of resilience become durable without replacing one chokepoint dependency with new capacity, counterparty, and sanctions exposure?",
  limitations: [
    "The war and shipping picture changes daily; this corrected inquiry stops at September 1, 2026.",
    "The interactive map uses schematic corridor geometry, not AIS tracks, navigational routes, live security guidance, or proof of a named vessel's movement.",
    "Reuters' ship-to-ship volumes, company counts, routing guidance, schedules, and margins were not independently reconstructed from proprietary data.",
    "Chinese inventory figures are EIA estimates because China does not publish a complete government-plus-commercial crude-stock series.",
    "Available, nameplate, export, crude, and total-liquids pipeline measures are not interchangeable and do not establish realized crisis throughput.",
    "Northern Sea Route material now belongs to Inquiry 10; compatibility notices preserve predecessor fragments without making Inquiry 04 a duplicate Arctic article.",
  ],
  relatedNotebooks: [
    {
      slug: "the-arctic-is-not-a-shortcut",
      relation: "companion",
      label: "Northern Sea Route constraints",
    },
  ],
  legacyFragments: arcticLegacyFragments,
});
