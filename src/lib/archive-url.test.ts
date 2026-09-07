import { parseArchiveUrl, serializeArchiveUrl } from "./archive-url";
import { latestNotebookEntry } from "@/content/notebook";

it("round-trips all existing parameters and unrelated link context", () => {
  const url = new URL(
    "https://mainlanddispatch.com/archive?view=relationships&inquiry=the-arctic-is-not-a-shortcut&focus=d-034&q=China&vertical=technology&kind=article&evidence=contested&publisher=ChinaFile&place=China&year=2016&campaign=reading#sources"
  );
  const parsed = parseArchiveUrl(url);
  expect(parsed.notice).toBe("");
  const restored = parseArchiveUrl(
    new URL(serializeArchiveUrl(url, parsed.context), url)
  );
  expect(restored.context).toEqual(parsed.context);
  expect(serializeArchiveUrl(url, parsed.context)).toContain(
    "campaign=reading"
  );
  expect(serializeArchiveUrl(url, parsed.context)).toContain("#sources");
});

it("rejects unknown or private selections with visible fallback information", () => {
  const parsed = parseArchiveUrl(
    new URL(
      "https://mainlanddispatch.com/archive?inquiry=private&focus=private&year=1800&view=invalid"
    )
  );
  expect(parsed.context.inquirySlug).toBe(latestNotebookEntry.slug);
  expect(parsed.context.focusId).toBe("");
  expect(parsed.context.year).toBe("all");
  expect(parsed.notice).not.toBe("");
});
