import { notFound } from "next/navigation";
import { whatXiJinpingWants } from "@/content/notebook/what-xi-jinping-wants";
import type { NotebookEntry } from "@/content/notebook/schema";
import { requirePublicNotebookEntry } from "./notebook-route";

jest.mock("next/navigation", () => ({
  notFound: jest.fn(() => {
    throw new Error("NEXT_NOT_FOUND");
  }),
}));

describe("Notebook route publication guard", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("returns published and corrected entries", () => {
    const corrected = {
      ...whatXiJinpingWants,
      editorialStatus: "corrected" as const,
    };

    expect(requirePublicNotebookEntry(whatXiJinpingWants)).toBe(
      whatXiJinpingWants
    );
    expect(requirePublicNotebookEntry(corrected)).toBe(corrected);
    expect(notFound).not.toHaveBeenCalled();
  });

  it("routes draft entries through the not-found boundary", () => {
    const draft = {
      ...whatXiJinpingWants,
      editorialStatus: "draft" as const,
    } satisfies NotebookEntry;

    expect(() => requirePublicNotebookEntry(draft)).toThrow("NEXT_NOT_FOUND");
    expect(notFound).toHaveBeenCalledTimes(1);
  });
});
