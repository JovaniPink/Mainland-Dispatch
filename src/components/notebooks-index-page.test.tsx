import { render, screen } from "@testing-library/react";
import NotebooksPage, { metadata } from "@/app/notebooks/page";

describe("Notebooks index", () => {
  it("presents the latest inquiry first and every published Notebook once", () => {
    render(<NotebooksPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Notebooks" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("notebook-index-latest")).toHaveTextContent(
      "July Is Not One Number"
    );
    expect(screen.getAllByTestId("notebook-index-entry")).toHaveLength(7);
    expect(screen.getByText("Who Absorbs the Shock?")).toBeInTheDocument();
  });

  it("publishes canonical and social metadata", () => {
    expect(metadata.alternates).toEqual({
      canonical: "https://mainlanddispatch.com/notebooks",
    });
    expect(metadata.openGraph).toEqual(
      expect.objectContaining({
        url: "https://mainlanddispatch.com/notebooks",
      })
    );
  });
});
