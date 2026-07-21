import { DossierSchema, type Dossier } from "./schema";

const seed = {
  slug: "semiconductor-export-controls",
  title: "Semiconductor export controls",
  summary:
    "The running file on US restrictions of advanced chipmaking technology to China: the rules as written, the responses as stated, and the fab-level evidence of what the controls actually change.",
  lastReviewed: "2026-07-21",
  principalEntities: {
    people: ["Gina Raimondo", "Alan Estevez"],
    organizations: [
      "Bureau of Industry and Security",
      "MOFCOM",
      "SMIC",
      "SiCarrier",
      "ASML",
    ],
    places: ["Washington", "Shanghai", "Veldhoven"],
  },
  primaryDocuments: [
    {
      label: "BIS interim final rule (July 2026)",
      url: "https://www.federalregister.gov/bis-interim-rule-2026",
      date: "2026-07-15",
    },
    {
      label: "MOFCOM response statement",
      url: "https://www.mofcom.gov.cn/statement-2026-07",
      date: "2026-07-16",
    },
    {
      label: "October 2022 foundational rule",
      url: "https://www.federalregister.gov/2022-october-rule",
      date: "2022-10-07",
    },
  ],
  claims: [
    {
      text: "The July 2026 rule applies a presumption of denial to sub-14nm logic facilities.",
      status: "implemented",
    },
    {
      text: "China will impose countermeasures targeting US firms in response.",
      status: "officiallyAnnounced",
    },
    {
      text: "Domestic Chinese lithography tools can sustain 7nm-class production at commercial yield.",
      status: "contested",
    },
    {
      text: "Third-country re-export loopholes have been closed by the new rule.",
      status: "reported",
    },
    {
      text: "SMIC is absorbing measurable yield costs from domestic tool substitution.",
      status: "independentlyObserved",
    },
    {
      text: "The 2024 licensing carve-out for legacy nodes remains in force.",
      status: "superseded",
    },
  ],
  unresolvedQuestions: [
    "What yield are domestic lithography tools actually achieving at 7nm-class nodes?",
    "Will announced countermeasures materialize, and against which US firms?",
    "How much re-export volume moved through the now-closed third-country channel?",
    "Does the new license-exception carve-out create a workable compliance path for packaging houses?",
  ],
  traceSlug: "export-controls",
  dispatchIds: ["d-002", "d-003", "d-007", "d-011", "d-012"],
};

export const dossiers: Dossier[] = [DossierSchema.parse(seed)];

export function getDossier(slug: string): Dossier | undefined {
  return dossiers.find((d) => d.slug === slug);
}

export const evidenceStatusLabels: Record<string, string> = {
  reported: "Reported",
  officiallyAnnounced: "Officially announced",
  implemented: "Implemented",
  independentlyObserved: "Independently observed",
  contested: "Contested",
  superseded: "Superseded",
  corrected: "Corrected",
};
