import { TraceSchema, type Trace } from "./schema";

const seed = {
  slug: "export-controls",
  title: "The July 2026 export-control expansion",
  intro:
    "A chronological record of the latest semiconductor export-control round: the rule, the reporting on both sides, the official response, and what the evidence shows so far.",
  currentAssessment:
    "The expansion is implemented and legally in force. Its practical effect on Chinese fab capacity is contested: policy announcements are running ahead of observable fab economics, and the first independent evidence (SMIC's earnings guidance) points to substitution costs rather than substitution failure.",
  assessmentStatus: "contested",
  entries: [
    {
      id: "t-01",
      date: "2026-07-15",
      phase: "originalEvent",
      title: "BIS publishes the interim final rule",
      detail:
        "The 212-page rule adds 14 firms to the Entity List and tightens license review for sub-14nm logic facilities to a presumption of denial.",
      sourceLabel: "Federal Register",
      sourceUrl: "https://www.federalregister.gov/bis-interim-rule-2026",
      critical: true,
      dispatchId: "d-007",
    },
    {
      id: "t-02",
      date: "2026-07-15",
      phase: "usReporting",
      title: "US wires report the Entity List additions",
      detail:
        "Reuters leads with the headline count of fourteen firms; three are subsidiaries of already-listed companies, indicating enforcement tightening more than new scope.",
      sourceLabel: "Reuters",
      sourceUrl: "https://www.reuters.com/technology/bis-entity-list-july",
      critical: false,
      dispatchId: "d-002",
    },
    {
      id: "t-03",
      date: "2026-07-16",
      phase: "officialResponse",
      title: "MOFCOM issues formal response",
      detail:
        "The statement revives 'development interests' language absent since 2024 — a measurably wider claim than the standard 'legitimate rights' formulation.",
      sourceLabel: "MOFCOM",
      sourceUrl: "https://www.mofcom.gov.cn/statement-2026-07",
      critical: true,
      dispatchId: "d-003",
    },
    {
      id: "t-04",
      date: "2026-07-17",
      phase: "mainlandReporting",
      title: "Mainland outlets frame the rule as accelerating self-reliance",
      detail:
        "Caixin and Yicai coverage centers domestic toolmakers' order books rather than the restrictions themselves; SiCarrier is named as the principal beneficiary.",
      sourceLabel: "Caixin",
      critical: false,
    },
    {
      id: "t-05",
      date: "2026-07-19",
      phase: "followUpEvidence",
      title: "SMIC earnings call provides first fab-level evidence",
      detail:
        "Capex guidance implies domestic lithography tools are running at materially lower yield: substitution is happening, at a real and quantifiable cost.",
      sourceLabel: "Asianometry",
      sourceUrl: "https://www.youtube.com/watch?v=smic-analysis",
      critical: true,
      dispatchId: "d-011",
    },
    {
      id: "t-06",
      date: "2026-07-21",
      phase: "editorialAssessment",
      title: "Current editorial assessment",
      detail:
        "Both governments' claims outrun the evidence. The rule's force is established; its effectiveness is contested and will be measurable in fab economics over the next two to three quarters, not in statements.",
      critical: false,
      dispatchId: "d-012",
    },
  ],
};

export const traces: Trace[] = [TraceSchema.parse(seed)];

export function getTrace(slug: string): Trace | undefined {
  return traces.find((t) => t.slug === slug);
}

export const phaseLabels: Record<string, string> = {
  originalEvent: "Original event",
  mainlandReporting: "Mainland reporting",
  usReporting: "US reporting",
  officialResponse: "Official response",
  followUpEvidence: "Follow-up evidence",
  editorialAssessment: "Editorial assessment",
};
