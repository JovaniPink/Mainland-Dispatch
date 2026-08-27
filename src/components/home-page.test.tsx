import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";

describe("edition front page", () => {
  it("leads with the latest inquiry and its reviewed evidence preview", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "What Gets Through?" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Read the inquiry" })
    ).toHaveAttribute("href", "/notebook/what-gets-through");
    expect(
      screen.getByRole("link", { name: "Examine the sources" })
    ).toHaveAttribute("href", "/notebook/what-gets-through#sources");

    const preview = screen.getByTestId("latest-evidence-preview");
    expect(within(preview).getByText("Interpretation")).toBeInTheDocument();
    expect(within(preview).getAllByRole("link")).toHaveLength(3);
  });

  it("shows exactly two previous inquiries before the Archive and mission statement", () => {
    render(<HomePage />);

    const previous = screen.getByTestId("previous-inquiries");
    expect(within(previous).getAllByRole("article")).toHaveLength(2);
    expect(
      within(previous).getByText("Who Absorbs the Shock?")
    ).toBeInTheDocument();
    expect(
      within(previous).getByText("Routing Around Risk")
    ).toBeInTheDocument();

    const archive = screen.getByTestId("home-archive-preview");
    expect(within(archive).getAllByRole("article")).toHaveLength(3);
    const mission = screen.getByRole("heading", {
      name: "Concern begins the inquiry. It does not decide the conclusion.",
    });
    expect(
      archive.compareDocumentPosition(mission) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
