import { sourceLeads, SourceLeadCatalogSchema } from "./source-leads";

describe("editorial article-candidate catalog", () => {
  it("holds a chronological article-source inbox", () => {
    expect(sourceLeads).toHaveLength(225);
    const datedYears = sourceLeads
      .map((lead) =>
        String(lead.publicationYear ?? lead.publishedAt?.slice(0, 4))
      )
      .sort();
    expect(datedYears[0]).toBe("2006");
    expect(datedYears.at(-1)).toBe("2026");
    expect(datedYears).not.toContain("undefined");
  });

  it("accounts for the fifth 30-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-05"
    );

    expect(corpus).toHaveLength(30);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(24);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(6);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for the fourth 30-article batch without publishing it", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07-04"
    );

    expect(corpus).toHaveLength(30);
    expect(
      corpus.filter((lead) => lead.disposition === "withheld")
    ).toHaveLength(28);
    expect(
      corpus.filter((lead) => lead.disposition === "rejected")
    ).toHaveLength(2);
    expect(
      corpus.every((lead) => Boolean(lead.decisionReason) && !lead.dispatchId)
    ).toBe(true);
  });

  it("accounts for exactly 88 external article candidates", () => {
    const corpus = sourceLeads.filter(
      (lead) => lead.collectionId === "china-article-corpus-2026-07"
    );

    expect(corpus).toHaveLength(88);
    expect(
      corpus.every(
        (lead) =>
          lead.contentType !== undefined &&
          lead.disposition === "withheld" &&
          Boolean(lead.decisionReason) &&
          !lead.dispatchId
      )
    ).toBe(true);
  });

  it("links drafted candidates only after evidence review", () => {
    const drafted = sourceLeads.filter(
      (lead) => lead.disposition === "drafted"
    );

    expect(drafted).toHaveLength(24);
    expect(
      drafted.every(
        (lead) =>
          lead.reviewState === "evidence-reviewed" &&
          Boolean(lead.reviewedAt) &&
          Boolean(lead.dispatchId)
      )
    ).toBe(true);
    expect(new Set(drafted.map((lead) => lead.dispatchId)).size).toBe(24);
  });

  it("rejects duplicate URLs and invalid review outcomes", () => {
    expect(
      SourceLeadCatalogSchema.safeParse([sourceLeads[0], sourceLeads[0]])
        .success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...sourceLeads[0],
          id: "lead-invalid-withheld",
          disposition: "withheld",
          decisionReason: undefined,
        },
      ]).success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...sourceLeads[0],
          id: "lead-invalid-canonical-check",
          url: "https://www.loc.gov/",
          urlStatus: "publisher-canonical",
          canonicalCheckedAt: undefined,
        },
      ]).success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...sourceLeads[0],
          id: "lead-invalid-draft-link",
          disposition: "drafted",
          dispatchId: "d-invalid",
          reviewState: "source-read",
        },
      ]).success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        sourceLeads.find((lead) => lead.dispatchId === "d-013")!,
        {
          ...sourceLeads.find((lead) => lead.dispatchId === "d-014")!,
          dispatchId: "d-013",
        },
      ]).success
    ).toBe(false);
  });
});
