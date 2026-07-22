import { sourceLeads, SourceLeadCatalogSchema } from "./source-leads";

describe("editorial source lead catalog", () => {
  it("holds a large chronological inbox without creating public Dispatches", () => {
    expect(sourceLeads).toHaveLength(139);
    const datedYears = sourceLeads
      .map((lead) =>
        String(lead.publicationYear ?? lead.publishedAt?.slice(0, 4))
      )
      .sort();
    expect(datedYears[0]).toBe("2006");
    expect(datedYears.at(-1)).toBe("2026");
    expect(new Set(datedYears).size).toBeGreaterThanOrEqual(12);
    expect(datedYears).not.toContain("undefined");
  });

  it("keeps Hacker News leads in commentary-only posture", () => {
    const hackerNews = sourceLeads.filter(
      (lead) => lead.publisher === "Hacker News"
    );
    expect(hackerNews).toHaveLength(13);
    expect(
      hackerNews.every(
        (lead) =>
          lead.contentType === "discussion" &&
          lead.claimedGrade === "D" &&
          lead.evidenceStatus === "unverified" &&
          lead.hnStoryId
      )
    ).toBe(true);
  });

  it("preserves HN discovery snapshots without treating popularity as verification", () => {
    const suppliedBatch = sourceLeads.filter((lead) => lead.hnSnapshot);
    expect(suppliedBatch).toHaveLength(60);
    expect(
      suppliedBatch.every(
        (lead) =>
          lead.hnStoryId &&
          lead.reviewState === "supplied" &&
          lead.evidenceStatus === "unverified"
      )
    ).toBe(true);
  });

  it("preserves the complete 288–316 point intake as review-only records", () => {
    const batch = sourceLeads.filter((lead) =>
      [
        "29658342",
        "48740971",
        "30658886",
        "14785084",
        "17453554",
        "28036847",
        "18629735",
        "17192639",
        "20736573",
        "19877499",
        "18515909",
        "16978342",
        "28640964",
        "9308048",
        "21004297",
        "17215966",
        "19493033",
        "10129110",
        "14210032",
        "22607236",
        "9034673",
        "26678946",
        "6905786",
        "21584337",
        "13379095",
        "15529944",
        "13459623",
        "18935888",
        "24129861",
        "19611848",
      ].includes(lead.hnStoryId ?? "")
    );

    expect(batch).toHaveLength(30);
    expect(batch.every((lead) => lead.reviewState === "supplied")).toBe(true);
  });

  it("distinguishes supplied leads from sources read in this workflow", () => {
    expect(
      sourceLeads.some(
        (lead) =>
          lead.sourceOrigin === "user-sourcebook" &&
          lead.reviewState === "supplied"
      )
    ).toBe(true);
    expect(
      sourceLeads.some(
        (lead) =>
          lead.sourceOrigin === "web-research" &&
          lead.reviewState === "source-read"
      )
    ).toBe(true);
  });

  it("rejects duplicate URLs and invalid review chronology", () => {
    expect(
      SourceLeadCatalogSchema.safeParse([sourceLeads[0], sourceLeads[0]])
        .success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...sourceLeads[0],
          id: "lead-invalid-review-date",
          nextReviewAt: "2005-01-01",
        },
      ]).success
    ).toBe(false);
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...sourceLeads[0],
          id: "lead-missing-publication-year",
          publishedAt: undefined,
          publicationYear: undefined,
        },
      ]).success
    ).toBe(false);
    const withoutDiscussion = sourceLeads.find((lead) => !lead.hnStoryId)!;
    expect(
      SourceLeadCatalogSchema.safeParse([
        {
          ...withoutDiscussion,
          hnSnapshot: { points: 1, comments: 1, capturedAt: "2026-07-22" },
        },
      ]).success
    ).toBe(false);
  });
});
