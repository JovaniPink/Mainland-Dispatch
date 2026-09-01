import { fireEvent, render, screen } from "@testing-library/react";
import RoutingAroundRiskPage from "@/app/notebook/routing-around-risk/page";

describe("Routing Around Risk Notebook page", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/notebook/routing-around-risk");
  });

  it("renders the corrected non-Arctic scale, timeline, and source trail", () => {
    render(<RoutingAroundRiskPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "Routing Around Risk" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("figure", {
        name: /A scale comparison without a false conversion/i,
      })
    ).toBeInTheDocument();
    expect(screen.getByText("20.9 million")).toBeInTheDocument();
    expect(screen.queryByText("3.2 million")).not.toBeInTheDocument();
    expect(screen.getAllByText(/^Retrieved 2026-08-/)).toHaveLength(17);
    expect(screen.getByText("Current through 01 SEP 2026")).toBeInTheDocument();
    expect(screen.getByText("The Tanker War begins")).toBeInTheDocument();
  });

  it("keeps the external basemap behind explicit reader consent", () => {
    render(<RoutingAroundRiskPage />);

    expect(
      screen.queryByTestId("chokepoint-map-container")
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: "Load interactive map" })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/requests map tiles from OpenFreeMap/i)
    ).toBeInTheDocument();
  });

  it("exposes only non-Arctic lenses and evidence without loading tiles", () => {
    render(<RoutingAroundRiskPage />);

    expect(
      screen.queryByRole("button", { name: "Arctic hedge" })
    ).not.toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Hormuz" }));
    expect(
      screen.getByRole("button", { name: /Hormuz energy artery/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", {
        name: /Scheduled Arctic container hedge/i,
      })
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Hormuz energy artery/i })
    );
    expect(screen.getByText("Selected corridor")).toBeInTheDocument();
    expect(screen.getAllByText(/schematic corridor/i).length).toBeGreaterThan(
      0
    );
    expect(
      screen.queryByTestId("chokepoint-map-container")
    ).not.toBeInTheDocument();
  });

  it("keeps the non-Arctic claim audit bounded", () => {
    render(<RoutingAroundRiskPage />);

    expect(screen.getAllByText("Excluded overstatement")).toHaveLength(1);
    expect(
      screen.queryByRole("heading", {
        name: /Sea Legend operates a proven weekly/i,
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /Hormuz carried about one fifth/i,
      })
    ).toBeInTheDocument();
  });

  it("renders clean requested sources and strong media links", () => {
    render(<RoutingAroundRiskPage />);

    for (const publisher of [
      "Reuters",
      "Al Jazeera",
      "The Guardian",
      "The Washington Post",
      "Council on Foreign Relations",
      "PBS · Amanpour & Company",
    ]) {
      expect(
        screen.getAllByText(new RegExp(publisher, "i")).length
      ).toBeGreaterThan(0);
    }
    const evidenceLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("http"));
    expect(evidenceLinks.length).toBeGreaterThan(14);
    for (const link of evidenceLinks) {
      const href = link.getAttribute("href") ?? "";
      if (
        href.includes("linkedin.com/sharing") ||
        href.includes("bsky.app/intent")
      ) {
        continue;
      }
      expect(href).not.toContain("utm_");
    }
  });

  it("preserves all twelve moved fragments as ordinary companion links", () => {
    render(<RoutingAroundRiskPage />);

    expect(document.getElementById("arctic")).toBeInTheDocument();
    expect(
      document.getElementById("notebook-source-risk-nsidc-passage")
    ).toBeInTheDocument();
    expect(
      screen.getAllByRole("link", { name: "Open the preserved evidence" })
    ).toHaveLength(12);
    expect(
      screen.getByRole("link", { name: "Northern Sea Route constraints" })
    ).toHaveAttribute("href", "/notebook/the-arctic-is-not-a-shortcut");
  });
});
