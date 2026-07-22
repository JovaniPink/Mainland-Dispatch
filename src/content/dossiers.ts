import { DossierSchema, type Dossier } from "./schema";

const seed = {
  slug: "open-model-release-record",
  title: "Open-model release record",
  summary:
    "A bounded record of what selected US and Chinese model developers released, licensed, and claimed about open-weight strategy. It separates inspectable artifacts from founder narratives and future promises.",
  lastReviewed: "2026-07-22",
  principalEntities: {
    people: ["Liang Wenfeng", "Mark Zuckerberg"],
    organizations: ["DeepSeek", "Meta", "Microsoft", "Moonshot AI"],
    places: ["China", "United States"],
  },
  primaryDocuments: [
    {
      label: "Meta announcement and release record for Llama 2",
      url: "https://ai.meta.com/blog/llama-2/",
      date: "2023-07-18",
    },
    {
      label: "Meta announcement and release record for Llama 3.1",
      url: "https://ai.meta.com/blog/meta-llama-3-1/",
      date: "2024-07-23",
    },
    {
      label:
        "ChinaTalk annotated translation of Liang Wenfeng's 36Kr interview",
      url: "https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas",
      date: "2024-11-27",
    },
    {
      label: "Moonshot AI Kimi K3 announcement",
      url: "https://www.kimi.com/blog/kimi-k3",
      date: "2026-07-20",
    },
  ],
  claims: [
    {
      text: "Meta released Llama 2 weights and starting code under a custom community license for research and most commercial use.",
      status: "implemented",
    },
    {
      text: "Meta expanded its open-model ecosystem pitch with Llama 3.1, including partners, safety tools, derivative-model permissions, and a proposed stack interface.",
      status: "implemented",
    },
    {
      text: "Liang Wenfeng described open releases as part of DeepSeek's talent, research, and ecosystem strategy in a 2024 founder interview.",
      status: "reported",
    },
    {
      text: "Moonshot AI says it will release Kimi K3 artifacts on July 27, 2026.",
      status: "officiallyAnnounced",
    },
    {
      text: "Open-weight availability alone establishes lower cost per successful task or broader real-world adoption.",
      status: "contested",
    },
  ],
  unresolvedQuestions: [
    "Do Kimi K3's promised artifacts and license appear on July 27 in the form described?",
    "Which license restrictions materially constrain commercial deployment or derivative models across these releases?",
    "How do serving cost, hardware requirements, and cost per completed task compare under reproducible workloads?",
    "Will weights, code, and documentation remain available and maintained over time?",
  ],
  traceSlug: "open-model-release-chronology",
  dispatchIds: ["d-032", "d-033", "d-034"],
  provenance: "verified",
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
