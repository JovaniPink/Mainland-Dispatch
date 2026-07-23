import { publishedDispatches } from "./dispatches";
import { corpusTransparency } from "./corpus-transparency";

describe("public corpus transparency snapshot", () => {
  it("matches the current publication boundary", () => {
    expect(corpusTransparency.publishedRecords).toBe(
      publishedDispatches.length
    );
    expect(
      corpusTransparency.generalChinaWithheld +
        corpusTransparency.generalChinaRejected
    ).toBe(corpusTransparency.generalChinaCandidates);
    expect(
      corpusTransparency.publishedRecords +
        corpusTransparency.sourceReviewRecords
    ).toBe(corpusTransparency.evidenceReviewedMappings);
  });
});
