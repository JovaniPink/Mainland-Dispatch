import { buildNotebookShareUrl, shareActionUrl } from "@/lib/share-url";

describe("Notebook share URLs", () => {
  it("tracks only the first-party return URL with channel-specific UTMs", () => {
    const url = new URL(
      buildNotebookShareUrl({
        path: "/notebook/open-models-closed-system",
        campaign: "open-models-closed-system",
        channel: "linkedin",
        content: "promise-waico",
        promiseId: "promise-waico",
      })
    );

    expect(url.origin).toBe("https://mainlanddispatch.com");
    expect(url.searchParams.get("promise")).toBe("promise-waico");
    expect(url.searchParams.get("utm_campaign")).toBe(
      "open-models-closed-system"
    );
    expect(url.searchParams.get("utm_source")).toBe("linkedin");
    expect(url.searchParams.get("utm_medium")).toBe("social");
    expect(url.searchParams.get("utm_content")).toBe("promise-waico");
  });

  it("keeps share-service tracking outside evidence and canonical URLs", () => {
    const articleUrl = buildNotebookShareUrl({
      path: "/notebook/open-models-closed-system",
      campaign: "open-models-closed-system",
      channel: "email",
      content: "notebook-header",
    });
    const action = shareActionUrl({
      channel: "email",
      url: articleUrl,
      title: "Open Models, Closed System?",
    });

    expect(action).toContain("mailto:");
    expect(decodeURIComponent(action)).toContain(
      "https://mainlanddispatch.com/notebook/open-models-closed-system"
    );
  });

  it("rejects non-Mainland return URLs", () => {
    expect(() =>
      buildNotebookShareUrl({
        path: "https://example.com/article",
        campaign: "open-models-closed-system",
        channel: "copy",
        content: "notebook-header",
      })
    ).toThrow(/must point to Mainland Dispatch/);
  });
});
