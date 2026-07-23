import { whatXiJinpingWants as entry } from "./what-xi-jinping-wants";

const editorialText = [
  ...Object.values(entry.sections).flat(),
  ...entry.turningPoints.flatMap((point) => [point.argument, point.reading]),
  ...entry.timeline.map((item) => item.explanation),
  ...entry.sourceTrail.flatMap((source) => [
    source.context,
    source.limitation ?? "",
  ]),
  entry.unresolvedQuestion,
].join(" ");

describe("What Xi Jinping Wants Notebook ledger", () => {
  it("keeps the founding inquiry deliberately bounded", () => {
    const wordCount = editorialText.trim().split(/\s+/).length;

    expect(wordCount).toBeGreaterThanOrEqual(1800);
    expect(wordCount).toBeLessThanOrEqual(2500);
    expect(entry.turningPoints).toHaveLength(3);
    expect(entry.sourceTrail).toHaveLength(8);
    expect(entry.formats).toHaveLength(3);
  });

  it("preserves format-specific titles, durations, and canonical URLs", () => {
    expect(entry.formats).toEqual([
      expect.objectContaining({
        label: "Listen",
        title: "What Xi Jinping Wants",
        duration: "1 hr 44 min",
        url: expect.stringContaining("podcasts.apple.com"),
      }),
      expect.objectContaining({
        label: "Watch",
        title: "What Americans Need to Understand About China",
        duration: "1:42:37",
        url: "https://www.youtube.com/watch?v=DprKDXRlubw",
      }),
      expect.objectContaining({
        label: "Read",
        title: "What Xi Jinping Wants",
        url: expect.stringContaining("nytimes.com/2026/07/14/"),
      }),
    ]);
  });

  it("keeps corrected timecodes unique and labels interpretation and scenarios", () => {
    const timecodes = entry.turningPoints.map((point) => point.timecode);

    expect(timecodes).toEqual(["00:45:49", "01:03:44", "01:35:16"]);
    expect(new Set(timecodes).size).toBe(timecodes.length);
    expect(entry.turningPoints.map((point) => point.status)).toEqual([
      "interpretation",
      "contested",
      "scenario",
    ]);
  });

  it("does not collapse 2027, 2028, and 2049 into one timetable", () => {
    expect(entry.timeline.map((item) => [item.year, item.status])).toEqual([
      ["2027", "observed"],
      ["2028", "scenario"],
      ["2049", "contested"],
    ]);
    expect(entry.timeline[0].explanation).toContain("does not mean");
    expect(entry.timeline[1].explanation).toContain(
      "not an official timetable"
    );
    expect(entry.timeline[2].explanation).toContain("does not announce");
  });

  it("uses real source links and records review limitations", () => {
    const links = entry.sourceTrail.flatMap((source) => source.links);

    expect(links.length).toBeGreaterThanOrEqual(entry.sourceTrail.length);
    for (const link of links) {
      const url = new URL(link.url);
      expect(url.protocol).toBe("https:");
      expect(url.hostname).not.toContain("example.com");
    }
    expect(entry.limitations.join(" ")).toContain(
      "not accessible in the automated review environment"
    );
  });
});
