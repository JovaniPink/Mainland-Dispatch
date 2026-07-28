import {
  resolvePromiseSelection,
  setPromiseSelection,
} from "@/lib/notebook-promise";

const validIds = new Set(["promise-training", "promise-waico"]);

describe("Notebook promise URL state", () => {
  it("resolves valid values and falls back from invalid values", () => {
    expect(
      resolvePromiseSelection({
        search: "?utm_source=reader&promise=promise-waico",
        validIds,
        fallbackId: "promise-training",
      })
    ).toEqual({ selectedId: "promise-waico", invalidValue: false });

    expect(
      resolvePromiseSelection({
        search: "?promise=unknown",
        validIds,
        fallbackId: "promise-training",
      })
    ).toEqual({ selectedId: "promise-training", invalidValue: true });
  });

  it("changes or removes promise state without disturbing UTMs or hashes", () => {
    const href =
      "https://mainlanddispatch.com/notebook/open-models-closed-system?utm_source=reader&promise=bad#what-to-watch";

    expect(setPromiseSelection({ href, promiseId: "promise-waico" })).toBe(
      "/notebook/open-models-closed-system?utm_source=reader&promise=promise-waico#what-to-watch"
    );
    expect(setPromiseSelection({ href, promiseId: null })).toBe(
      "/notebook/open-models-closed-system?utm_source=reader#what-to-watch"
    );
  });
});
