import { fireEvent, render, screen } from "@testing-library/react";
import RoutingAroundRiskPage from "@/app/notebook/routing-around-risk/page";

describe("Routing Around Risk Notebook page", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/notebook/routing-around-risk");
  });

  it("renders the thesis, scale correction, timeline, and source trail", () => {
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
    expect(screen.getByText("3.2 million")).toBeInTheDocument();
    expect(screen.getAllByText("Retrieved 2026-08-18")).toHaveLength(24);
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

  it("lets readers filter and inspect corridor evidence without loading tiles", () => {
    render(<RoutingAroundRiskPage />);

    fireEvent.click(screen.getByRole("button", { name: "Arctic hedge" }));
    expect(
      screen.getByRole("button", { name: /Announced Arctic container hedge/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Hormuz energy artery/i })
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", { name: /Announced Arctic container hedge/i })
    );
    expect(screen.getByText("Selected corridor")).toBeInTheDocument();
    expect(
      screen.getAllByText(/schedule is operator-derived/i).length
    ).toBeGreaterThan(0);
    expect(
      screen.queryByTestId("chokepoint-map-container")
    ).not.toBeInTheDocument();
  });

  it("publishes four excluded overstatements and keeps them out of headings", () => {
    render(<RoutingAroundRiskPage />);

    expect(screen.getAllByText("Excluded overstatement")).toHaveLength(4);
    expect(
      screen.queryByRole("heading", {
        name: "NSR container voyages increased from 15 to 23 in 2025.",
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /China is using a portfolio of buffers and workarounds/i,
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
      "The Arctic Institute",
      "PBS · Amanpour & Company",
    ]) {
      expect(
        screen.getAllByText(new RegExp(publisher, "i")).length
      ).toBeGreaterThan(0);
    }
    const evidenceLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("http"));
    expect(evidenceLinks.length).toBeGreaterThan(24);
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
});
