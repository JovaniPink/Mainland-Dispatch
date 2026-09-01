import { parseNotebookRegistry } from "@/content/notebook";
import { whatXiJinpingWants } from "@/content/notebook/what-xi-jinping-wants";
import { NotebookEntrySchema } from "@/content/notebook/schema";

type MutableEntry = Record<string, unknown>;

function entry(overrides: MutableEntry = {}): MutableEntry {
  return {
    ...JSON.parse(JSON.stringify(whatXiJinpingWants)),
    ...overrides,
  } as MutableEntry;
}

describe("Season Zero companion and fragment foundation", () => {
  it("retains optional companion and legacy-fragment contracts", () => {
    const result = NotebookEntrySchema.parse(
      entry({
        relatedNotebooks: [
          {
            slug: "companion-entry",
            relation: "companion",
            label: "Companion inquiry",
          },
        ],
        legacyFragments: [
          {
            id: "legacy-source",
            successorSlug: "companion-entry",
            successorFragment: "moved-source",
            notice: "This evidence moved to the companion inquiry.",
          },
        ],
      })
    );

    expect(result.relatedNotebooks).toEqual([
      {
        slug: "companion-entry",
        relation: "companion",
        label: "Companion inquiry",
      },
    ]);
    expect(result.legacyFragments).toHaveLength(1);
  });

  it("requires companion relationships to be reciprocal", () => {
    const first = entry({
      ordinal: 91,
      slug: "first-entry",
      relatedNotebooks: [
        {
          slug: "second-entry",
          relation: "companion",
          label: "Second entry",
        },
      ],
    });
    const second = entry({ ordinal: 92, slug: "second-entry" });

    expect(() => parseNotebookRegistry([first, second])).toThrow(
      "companion relationships must be reciprocal"
    );
  });

  it("rejects repeated relation targets and legacy fragments", () => {
    const first = entry({
      ordinal: 91,
      slug: "first-entry",
      relatedNotebooks: [
        {
          slug: "second-entry",
          relation: "companion",
          label: "Second entry",
        },
        {
          slug: "second-entry",
          relation: "companion",
          label: "Repeated target",
        },
      ],
      legacyFragments: [
        {
          id: "old-source",
          successorSlug: "second-entry",
          successorFragment: "new-source",
          notice: "Moved.",
        },
        {
          id: "old-source",
          successorSlug: "second-entry",
          successorFragment: "other-source",
          notice: "Repeated old fragment.",
        },
      ],
    });
    const second = entry({
      ordinal: 92,
      slug: "second-entry",
      relatedNotebooks: [
        {
          slug: "first-entry",
          relation: "companion",
          label: "First entry",
        },
      ],
    });

    expect(() => parseNotebookRegistry([first, second])).toThrow();
  });

  it("rejects public companion or fragment links to a non-public successor", () => {
    const first = entry({
      ordinal: 91,
      slug: "first-entry",
      relatedNotebooks: [
        {
          slug: "second-entry",
          relation: "companion",
          label: "Second entry",
        },
      ],
      legacyFragments: [
        {
          id: "old-source",
          successorSlug: "second-entry",
          successorFragment: "new-source",
          notice: "Moved.",
        },
      ],
    });
    const second = entry({
      ordinal: 92,
      slug: "second-entry",
      editorialStatus: "draft",
      relatedNotebooks: [
        {
          slug: "first-entry",
          relation: "companion",
          label: "First entry",
        },
      ],
    });

    expect(() => parseNotebookRegistry([first, second])).toThrow(
      "public Notebook cannot link to a non-public successor"
    );
  });

  it("requires every successor slug to resolve in the registry", () => {
    const first = entry({
      ordinal: 91,
      slug: "first-entry",
      legacyFragments: [
        {
          id: "old-source",
          successorSlug: "missing-entry",
          successorFragment: "new-source",
          notice: "Moved.",
        },
      ],
    });

    expect(() => parseNotebookRegistry([first])).toThrow(
      "legacy-fragment successor must exist"
    );
  });
});
