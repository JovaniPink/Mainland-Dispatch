import { fireEvent, render, screen } from "@testing-library/react";
import DominanceIsADashboardPage from "@/app/notebook/dominance-is-a-dashboard/page";
import { dominanceIsADashboard as entry } from "@/content/notebook/dominance-is-a-dashboard";

describe("Dominance Is a Dashboard Notebook page", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/notebook/dominance-is-a-dashboard");
  });

  it("renders the inquiry, dashboard, demographics, and history", () => {
    render(<DominanceIsADashboardPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Dominance Is a Dashboard, Not a Crown",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("figure", {
        name: /Paired indicators of scale and reach/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("figure", {
        name: /Where production concentrates in China/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("figure", {
        name: /Two age structures, two population trajectories/i,
      })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("time")).toHaveLength(10);
    expect(screen.getByText("RMB 1.99%")).toBeInTheDocument();
    expect(screen.getByText("USD 57.13%")).toBeInTheDocument();
  });

  it("shows non-additive and methodology boundaries beside the graphics", () => {
    render(<DominanceIsADashboardPage />);

    expect(screen.getByText(/no overall score/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        /cannot be compared across cards because the units differ/i
      )
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        /age bands align the visual question, not the statistical systems/i
      )
    ).toBeInTheDocument();
    expect(screen.getAllByText(/Do not overread:/)).toHaveLength(8);
  });

  it("publishes corrections without displaying excluded allegations as headings", () => {
    render(<DominanceIsADashboardPage />);

    expect(screen.getAllByText("Corrected").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Excluded overstatement")).toHaveLength(3);
    expect(
      screen.queryByRole("heading", {
        name: "Aging guarantees that China’s rise will soon reverse.",
      })
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: /China leads in electric vehicles, battery cells/i,
      })
    ).toBeInTheDocument();
  });

  it("renders all twenty-three source stops with clean outbound links", () => {
    render(<DominanceIsADashboardPage />);

    expect(screen.getAllByText("Retrieved 2026-08-14")).toHaveLength(23);
    const evidenceLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("http"));
    expect(evidenceLinks.length).toBeGreaterThan(23);
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

  it("does not request NPR audio until the reader consents", () => {
    const { container } = render(<DominanceIsADashboardPage />);

    expect(container.querySelector("audio")).not.toBeInTheDocument();
    expect(
      screen.getByText(/Publisher transcript available/)
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", {
        name: `Load external audio: ${entry.formats[0].title}`,
      })
    );
    expect(container.querySelector("audio")).toBeInTheDocument();
    expect(container.querySelector("source")?.getAttribute("src")).toBe(
      entry.audio.mediaUrl
    );
  });
});
