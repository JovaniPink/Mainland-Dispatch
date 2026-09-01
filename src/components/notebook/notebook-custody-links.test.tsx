import { render, screen } from "@testing-library/react";
import {
  NotebookCompanionLinks,
  NotebookLegacyFragmentNotices,
} from "@/components/notebook/notebook-custody-links";

describe("Notebook custody links", () => {
  it("renders companion and legacy custody as ordinary reachable links", () => {
    render(
      <>
        <NotebookCompanionLinks
          relationships={[
            {
              slug: "companion-entry",
              relation: "companion",
              label: "Companion inquiry",
            },
          ]}
        />
        <NotebookLegacyFragmentNotices
          fragments={[
            {
              id: "legacy-source",
              successorSlug: "companion-entry",
              successorFragment: "moved-source",
              notice: "This source moved without changing its authority.",
            },
          ]}
        />
      </>
    );

    expect(
      screen.getByRole("link", { name: "Companion inquiry" })
    ).toHaveAttribute("href", "/notebook/companion-entry");
    expect(
      screen.getByRole("link", { name: /Open the preserved evidence/i })
    ).toHaveAttribute("href", "/notebook/companion-entry#moved-source");
    expect(document.getElementById("legacy-source")).toBeInTheDocument();
  });
});
