import { render, screen, within } from "@testing-library/react";
import HomePage from "@/app/page";

describe("edition front page", () => {
  it("orients a new reader before presenting the latest inquiry", () => {
    render(<HomePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Contemporary China, examined in public.",
      })
    ).toBeInTheDocument();

    const introduction = screen.getByTestId("home-introduction");
    const entryPoints = within(introduction).getByTestId("home-entry-points");
    const entryLinks = within(entryPoints).getAllByRole("link");
    expect(entryLinks.map((link) => link.getAttribute("href"))).toEqual([
      "/notebook/below-half-is-not-gone",
      "/notebooks",
      "/archive",
    ]);
    expect(
      within(entryPoints).getByRole("link", { name: /Latest inquiry/ })
    ).toHaveAttribute("href", "/notebook/below-half-is-not-gone");
    expect(
      within(entryPoints).getByRole("link", { name: /Notebook index/ })
    ).toHaveAttribute("href", "/notebooks");
    expect(
      within(entryPoints).getByRole("link", { name: /Evidence archive/ })
    ).toHaveAttribute("href", "/archive");

    const latest = screen.getByTestId("latest-inquiry");
    expect(
      introduction.compareDocumentPosition(latest) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
    expect(
      within(latest).getByRole("heading", {
        level: 2,
        name: "Below Half Is Not Gone",
      })
    ).toBeInTheDocument();
    expect(
      within(latest).getByRole("link", { name: "Read Inquiry 08" })
    ).toHaveAttribute("href", "/notebook/below-half-is-not-gone");
    expect(
      within(latest).getByRole("link", { name: "Examine the sources" })
    ).toHaveAttribute("href", "/notebook/below-half-is-not-gone#sources");

    const preview = screen.getByTestId("latest-evidence-preview");
    expect(within(preview).getByText("Interpretation")).toBeInTheDocument();
    expect(within(preview).getAllByRole("link")).toHaveLength(2);
  });

  it("balances exactly two previous inquiries with three Archive records", () => {
    render(<HomePage />);

    const previous = screen.getByTestId("previous-inquiries");
    expect(within(previous).getAllByRole("article")).toHaveLength(2);
    expect(
      within(previous).getByText("What Gets Through?")
    ).toBeInTheDocument();
    expect(
      within(previous).getByText("July Is Not One Number")
    ).toBeInTheDocument();

    const archive = screen.getByTestId("home-archive-preview");
    expect(within(archive).getAllByRole("article")).toHaveLength(3);
    expect(
      previous.compareDocumentPosition(archive) &
        Node.DOCUMENT_POSITION_FOLLOWING
    ).toBeTruthy();
  });
});
