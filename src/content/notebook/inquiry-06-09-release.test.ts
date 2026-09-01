import { publicNotebookEntries } from "@/content/notebook";
import { notebookSourceKnowledgeId } from "@/content/notebook/source-authority";
import { legacyWhatGetsThrough } from "@/content/notebook/what-gets-through-legacy";
import { whatGetsThrough } from "@/content/notebook/what-gets-through";
import { whereDoesOriginChange } from "@/content/notebook/where-does-origin-change";

type Inquiry0609Entry =
  | typeof legacyWhatGetsThrough
  | typeof whatGetsThrough
  | typeof whereDoesOriginChange;

const urls = (entry: Inquiry0609Entry) => [
  ...entry.formats.map((format) => format.url),
  ...("audio" in entry ? [entry.audio.canonicalUrl, entry.audio.mediaUrl] : []),
  ...entry.sourceTrail.flatMap((source) =>
    source.links.map((link) => link.url)
  ),
];

const typedRecords = (entry: Inquiry0609Entry) => [
  ...entry.turningPoints.map((item) => `turning:${item.id}`),
  ...entry.gates.map((item) => `gate:${item.id}`),
  ...entry.claimAudit.map((item) => `claim:${item.id}`),
  ...(entry.variant === "origin-proof" || entry.variant === "circulation-gates"
    ? [
        ...entry.tradeProofs.map((item) => `proof:${item.id}`),
        ...entry.tradePressure.map((item) => `pressure:${item.id}`),
        ...entry.tradeFrames.map((item) => `frame:${item.id}`),
      ]
    : []),
];

describe("Inquiry 06 / Inquiry 09 atomic custody release", () => {
  it("preserves the closed predecessor inventory", () => {
    expect(legacyWhatGetsThrough.sourceTrail).toHaveLength(25);
    expect(urls(legacyWhatGetsThrough)).toHaveLength(45);
    expect(new Set(urls(legacyWhatGetsThrough)).size).toBe(41);
    expect(typedRecords(legacyWhatGetsThrough)).toHaveLength(53);
  });

  it("corrects Inquiry 06 without changing its public identity", () => {
    expect(whatGetsThrough).toMatchObject({
      variant: "circulation-two-domain",
      ordinal: 6,
      slug: "what-gets-through",
      title: "What Gets Through?",
      publishedAt: "2026-08-25",
      updatedAt: "2026-09-01",
      editorialStatus: "corrected",
      reviewState: "source-reviewed",
      readTime: "16 min",
    });
    expect(whatGetsThrough.formats).toHaveLength(1);
    expect(whatGetsThrough.turningPoints).toHaveLength(2);
    expect(whatGetsThrough.gates.map((gate) => gate.domain)).toEqual([
      "culture",
      "memory",
    ]);
    expect(whatGetsThrough.claimAudit).toHaveLength(10);
    expect(whatGetsThrough.sourceTrail).toHaveLength(9);
    expect("tradeProofs" in whatGetsThrough).toBe(false);
    expect("tradePressure" in whatGetsThrough).toBe(false);
    expect("tradeFrames" in whatGetsThrough).toBe(false);
    expect(whatGetsThrough.legacyFragments).toHaveLength(19);
  });

  it("publishes Inquiry 09 with the exact origin-proof contract", () => {
    expect(whereDoesOriginChange).toMatchObject({
      variant: "origin-proof",
      ordinal: 9,
      slug: "where-does-origin-change",
      title: "Where Does Origin Change?",
      publishedAt: "2026-09-01",
      updatedAt: "2026-09-01",
      editorialStatus: "published",
      reviewState: "source-reviewed",
      readTime: "19 min",
    });
    expect(whereDoesOriginChange.formats).toHaveLength(0);
    expect("audio" in whereDoesOriginChange).toBe(false);
    expect(whereDoesOriginChange.turningPoints).toHaveLength(1);
    expect(whereDoesOriginChange.gates).toHaveLength(1);
    expect(whereDoesOriginChange.gates[0].domain).toBe("trade");
    expect(whereDoesOriginChange.tradeProofs).toHaveLength(4);
    expect(whereDoesOriginChange.tradePressure).toHaveLength(11);
    expect(whereDoesOriginChange.tradeFrames).toHaveLength(5);
    expect(whereDoesOriginChange.claimAudit).toHaveLength(21);
    expect(whereDoesOriginChange.sourceTrail).toHaveLength(19);
  });

  it("reconciles legacy and admitted source cohorts without URL loss", () => {
    const predecessorUrls = new Set(urls(legacyWhatGetsThrough));
    const successorUrls = new Set([
      ...urls(whatGetsThrough),
      ...urls(whereDoesOriginChange),
    ]);
    const sourceUnion = new Set([
      ...whatGetsThrough.sourceTrail.map((source) => source.id),
      ...whereDoesOriginChange.sourceTrail.map((source) => source.id),
    ]);
    const recordUnion = new Set([
      ...typedRecords(whatGetsThrough),
      ...typedRecords(whereDoesOriginChange),
    ]);
    const admittedUrls = [
      "https://www.international.gc.ca/trade-commerce/controls-controles/notices-avis/1168.aspx?lang=eng",
      "https://www.eics-scei.gc.ca/report-rapport/Imports_of_electric_vehicles_from_China.htm",
    ];

    expect([...predecessorUrls].every((url) => successorUrls.has(url))).toBe(
      true
    );
    expect(
      [...successorUrls].filter((url) => !predecessorUrls.has(url))
    ).toEqual(admittedUrls);
    expect(sourceUnion.size).toBe(27);
    expect(successorUrls.size).toBe(43);
    expect(recordUnion.size).toBe(56);
  });

  it("shares only the accepted episode source and transcript audit", () => {
    const sourceOverlap = whatGetsThrough.sourceTrail
      .map((source) => source.id)
      .filter((id) =>
        whereDoesOriginChange.sourceTrail.some((source) => source.id === id)
      );
    const claimOverlap = whatGetsThrough.claimAudit
      .map((claim) => claim.id)
      .filter((id) =>
        whereDoesOriginChange.claimAudit.some((claim) => claim.id === id)
      );

    expect(sourceOverlap).toEqual(["notebook-source-gates-episode"]);
    expect(claimOverlap).toEqual(["audit-gates-current-transcript"]);
    expect(
      whatGetsThrough.sourceTrail.find(
        (source) => source.id === sourceOverlap[0]
      )
    ).toBe(
      whereDoesOriginChange.sourceTrail.find(
        (source) => source.id === sourceOverlap[0]
      )
    );
    expect(
      whatGetsThrough.claimAudit.find((claim) => claim.id === claimOverlap[0])
    ).toBe(
      whereDoesOriginChange.claimAudit.find(
        (claim) => claim.id === claimOverlap[0]
      )
    );
  });

  it("keeps moved and shared public knowledge source IDs stable", () => {
    for (const source of whereDoesOriginChange.sourceTrail.filter((item) =>
      item.id.startsWith("notebook-source-gates-")
    )) {
      if (
        source.id.endsWith("notice-1168") ||
        source.id.endsWith("quota-utilization")
      ) {
        continue;
      }
      expect(
        notebookSourceKnowledgeId(whereDoesOriginChange.slug, source.id)
      ).toBe(notebookSourceKnowledgeId(legacyWhatGetsThrough.slug, source.id));
    }
  });

  it("publishes the pair together with reciprocal companions", () => {
    expect(publicNotebookEntries.map((entry) => entry.ordinal)).toEqual([
      1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
    ]);
    expect(whatGetsThrough.relatedNotebooks).toEqual([
      {
        slug: "where-does-origin-change",
        relation: "companion",
        label: "Rules of origin and transshipment proof",
      },
    ]);
    expect(whereDoesOriginChange.relatedNotebooks).toEqual([
      {
        slug: "what-gets-through",
        relation: "companion",
        label: "Culture, attention, and public memory",
      },
    ]);
  });
});
