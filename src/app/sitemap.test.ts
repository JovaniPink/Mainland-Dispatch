import sitemap from "./sitemap";

describe("sitemap", () => {
  it("registers the public Notebooks index", () => {
    expect(sitemap()).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          url: "https://mainlanddispatch.com/notebooks",
        }),
      ])
    );
  });
});
