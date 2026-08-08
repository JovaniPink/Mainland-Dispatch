import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OpenModelsClosedSystemPage from "@/app/notebook/open-models-closed-system/page";
import { NotebookAudioFacade } from "@/components/notebook/notebook-audio-facade";
import { WhatToWatch } from "@/components/notebook/what-to-watch";
import { openModelsClosedSystem as entry } from "@/content/notebook/open-models-closed-system";

describe("Open Models, Closed System Notebook", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/notebook/open-models-closed-system");
  });

  it("renders the complete inquiry, corrections, and evidence labels", () => {
    render(<OpenModelsClosedSystemPage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Open Models, Closed System?",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: "What Xi actually proposed" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Noul as a state-capacity and information-quality test",
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Wang and Deng as a transnational research pipeline",
      })
    ).toBeInTheDocument();
    expect(screen.getAllByText("Corrected").length).toBeGreaterThan(0);
    expect(screen.getAllByText("Officially announced").length).toBeGreaterThan(
      0
    );
    expect(screen.queryByText(/Hitler advocating/i)).not.toBeInTheDocument();
    expect(
      screen.queryByText(/every Chinese AI product is built on stolen/i)
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(/DeepSeek has become obsolete/i)
    ).not.toBeInTheDocument();
    expect(
      screen.getByRole("heading", {
        name: "Wang and Deng were the first PRC nationals to receive Fields Medals.",
      })
    ).toBeInTheDocument();
  });

  it("displays all thirteen clean source stops", () => {
    render(<OpenModelsClosedSystemPage />);

    expect(screen.getAllByText(/Retrieved 2026-07-28/)).toHaveLength(13);
    const sourceLinks = screen
      .getAllByRole("link")
      .filter((link) => link.getAttribute("href")?.startsWith("http"));
    expect(sourceLinks.length).toBeGreaterThan(13);
    for (const link of sourceLinks) {
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

  it("changes only the selected watch record and preserves incoming UTMs", async () => {
    window.history.replaceState(
      {},
      "",
      "/notebook/open-models-closed-system?utm_source=newsletter&promise=promise-waico"
    );
    render(<WhatToWatch entry={entry} />);

    await waitFor(() =>
      expect(
        screen.getByRole("heading", {
          name: "WAICO institution and governance output",
        })
      ).toBeInTheDocument()
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: /Open-model capability and license evidence/,
      })
    );

    await waitFor(() => {
      expect(window.location.search).toContain("promise=promise-open-models");
      expect(window.location.search).toContain("utm_source=newsletter");
    });
    expect(
      screen.getByText(/Stanford’s synthesis places Chinese models/)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/The signing and declared headquarters establish/)
    ).not.toBeInTheDocument();
  });

  it("preserves baselines and renders an explicit dated no-change review", () => {
    render(<WhatToWatch entry={entry} />);

    expect(screen.getByText("No verified change")).toBeInTheDocument();
    expect(screen.getByText("Reviewed 2026-08-08")).toBeInTheDocument();
    expect(screen.getByText("Exact baseline")).toBeInTheDocument();
    expect(screen.getByText("Baseline supporting records")).toBeInTheDocument();
    expect(
      screen.getByText(/The original baseline remains intact/)
    ).toBeInTheDocument();
  });

  it("renders dated updates with their own status and source boundary", () => {
    const updatedEntry = JSON.parse(JSON.stringify(entry)) as typeof entry;
    updatedEntry.watchItems[0].updateState = {
      state: "verified-change",
      reviewedAt: "2026-07-29",
      updates: [
        {
          id: "update-training-program",
          date: "2026-07-29",
          status: "officiallyAnnounced",
          summary:
            "A named training program was announced; participation and completion remain unverified.",
          sourceIds: ["notebook-source-xi-waic-address"],
        },
      ],
    };

    render(<WhatToWatch entry={updatedEntry} />);

    expect(
      screen.getByText(
        "A named training program was announced; participation and completion remain unverified."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("2026-07-29")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Update source: Ministry of Foreign Affairs of the People’s Republic of China ↗"
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Baseline supporting records")).toBeInTheDocument();
    expect(screen.queryByText("No verified change")).not.toBeInTheDocument();
  });

  it("removes invalid promise state while preserving unrelated query state", async () => {
    window.history.replaceState(
      {},
      "",
      "/notebook/open-models-closed-system?utm_source=newsletter&promise=not-real"
    );
    render(<WhatToWatch entry={entry} />);

    await waitFor(() => {
      expect(window.location.search).toBe("?utm_source=newsletter");
    });
    expect(
      screen.getByRole("heading", {
        name: "5,000 AI training opportunities",
      })
    ).toBeInTheDocument();
  });

  it("includes a valid selected record in first-party share URLs", async () => {
    window.history.replaceState(
      {},
      "",
      "/notebook/open-models-closed-system?promise=promise-waico&utm_source=reader"
    );
    render(<OpenModelsClosedSystemPage />);

    const linkedInLinks = screen.getAllByRole("link", { name: "linkedin" });
    await waitFor(() => {
      expect(linkedInLinks[0].getAttribute("href")).toContain(
        "promise%3Dpromise-waico"
      );
    });
  });

  it("cannot initialize audio before consent and exposes failure and retry", () => {
    const { container } = render(
      <NotebookAudioFacade title={entry.formats[0].title} audio={entry.audio} />
    );

    expect(container.querySelector("audio")).not.toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: /Load external audio:/ })
    );
    const audio = container.querySelector("audio");
    expect(audio).toBeInTheDocument();

    fireEvent.error(audio!);
    expect(screen.getByText("Audio could not be loaded")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry audio" }));
    expect(container.querySelector("audio")).toBeInTheDocument();
  });
});
