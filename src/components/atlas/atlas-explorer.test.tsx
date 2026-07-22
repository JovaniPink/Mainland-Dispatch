import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { atlasRelease, getAtlasRelease } from "@/content/atlas";
import { AtlasExplorer } from "./atlas-explorer";

jest.mock("./map-dialog", () => ({
  MapDialog: ({
    open,
    status,
    onFatal,
    onDegraded,
    onRetry,
    onClose,
  }: {
    open: boolean;
    status: string;
    onFatal: () => void;
    onDegraded: () => void;
    onRetry: () => void;
    onClose: () => void;
  }) =>
    open ? (
      <div role="dialog" aria-label="Mock geographic context">
        <p>Mock map status: {status}</p>
        <button onClick={onFatal}>Mock fatal map</button>
        <button onClick={onDegraded}>Mock degraded map</button>
        <button onClick={onRetry}>Mock retry map</button>
        <button onClick={onClose}>Mock close map</button>
      </div>
    ) : null,
}));

describe("AtlasExplorer", () => {
  beforeEach(() => window.history.replaceState({}, "", "/atlas"));

  it("renders the complete four-step chain and synchronizes step query state", async () => {
    render(<AtlasExplorer release={atlasRelease!} />);

    expect(screen.getAllByText("December package")).toHaveLength(2);
    expect(
      screen.getByText("24 equipment types + 3 software tools")
    ).toBeInTheDocument();
    expect(
      screen.getByText("140 additions + 14 modifications")
    ).toBeInTheDocument();
    expect(
      screen.getByText("December 31 limited compliance")
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /december package/i })
    ).toHaveAttribute("aria-current", "step");

    fireEvent.click(screen.getByRole("button", { name: /140 additions/i }));
    await waitFor(() => {
      expect(window.location.search).toContain("step=step-rule-entities");
    });
    expect(
      screen.getByRole("heading", { name: /140 additions/i })
    ).toBeInTheDocument();
    expect(screen.getAllByText("Regulatory reach").length).toBeGreaterThan(0);
  });

  it("shows quantitative evidence only for the referenced trade step", () => {
    render(<AtlasExplorer release={atlasRelease!} />);
    expect(
      screen.queryByRole("img", { name: /monthly value/i })
    ).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /from listed parties to trade movement/i,
      })
    );
    fireEvent.click(
      screen.getByRole("button", { name: /hs 8486 monthly exports/i })
    );
    expect(
      screen.getByRole("img", { name: /monthly value/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /download snapshot/i })
    ).toHaveAttribute("href", "/data/us-china-hs8486-2024-2025.csv");

    fireEvent.click(screen.getByRole("button", { name: /year over year/i }));
    expect(
      screen.getByRole("img", { name: /year-over-year change/i })
    ).toBeInTheDocument();
  });

  it("gives the corporate chain neither chart nor map affordance", () => {
    render(<AtlasExplorer release={atlasRelease!} />);
    fireEvent.click(
      screen.getByRole("button", { name: /from affected company/i })
    );

    expect(
      screen.getByRole("heading", { name: /acm shanghai and acm korea/i })
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /explore geographic context/i })
    ).not.toBeInTheDocument();
    expect(
      screen.queryByRole("img", { name: /monthly value/i })
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(/no geographic relation asserted/i)
    ).toBeInTheDocument();
  });

  it("does not mount the optional map before consent and keeps the diagram after failure", () => {
    render(<AtlasExplorer release={atlasRelease!} />);
    fireEvent.click(screen.getByRole("button", { name: /140 additions/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
    expect(screen.getAllByText("Regulatory reach").length).toBeGreaterThan(0);

    fireEvent.click(
      screen.getByRole("button", { name: /explore geographic context/i })
    );
    expect(screen.getByText(/mock map status: loading/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /mock fatal map/i }));
    expect(screen.getByText(/mock map status: failed/i)).toBeInTheDocument();
    expect(screen.getAllByText("Regulatory reach").length).toBeGreaterThan(0);
    fireEvent.click(screen.getByRole("button", { name: /mock retry map/i }));
    expect(screen.getByText(/mock map status: loading/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /mock close map/i }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("filters the source ledger to the selected step and selected observation", () => {
    render(<AtlasExplorer release={atlasRelease!} />);
    expect(
      screen.getByText(/commerce strengthens semiconductor export controls/i)
    ).toBeInTheDocument();
    expect(
      screen.getByText(/mofcom response to the december 2/i)
    ).toBeInTheDocument();
    expect(screen.queryByText(/asml 2024 form 20-f/i)).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /from listed parties to trade movement/i,
      })
    );
    fireEvent.click(
      screen.getByRole("button", { name: /hs 8486 monthly exports/i })
    );
    expect(screen.getAllByText(/un comtrade preview/i).length).toBeGreaterThan(
      0
    );
    expect(screen.queryByText(/asml 2024 form 20-f/i)).not.toBeInTheDocument();
  });

  it("renders the culture case with source-backed relations and no invented series", async () => {
    const cultureRelease = getAtlasRelease("rural-creator-platform-chain")!;
    window.history.replaceState(
      {},
      "",
      "/atlas?case=rural-creator-platform-chain"
    );
    render(<AtlasExplorer release={cultureRelease} />);

    expect(
      screen.getByRole("heading", {
        name: /from pastoral image to managed brand/i,
      })
    ).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /monthly value/i })).toBeNull();

    fireEvent.click(
      screen.getByRole("button", { name: /management and commerce/i })
    );
    expect(
      screen.getAllByText(/creator management and brand operations/i)
    ).toHaveLength(2);
    expect(
      screen.getByText(/li ziqi's rural fantasy and the platform economy/i)
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(window.location.search).toContain(
        "case=rural-creator-platform-chain"
      );
      expect(window.location.search).toContain("step=step-managed-brand");
    });
  });

  it("renders the open-model ledger as a non-geographic release-state case", async () => {
    const openModelRelease = getAtlasRelease("open-model-release-ledger")!;
    window.history.replaceState(
      {},
      "",
      "/atlas?case=open-model-release-ledger"
    );
    render(<AtlasExplorer release={openModelRelease} />);

    expect(
      screen.getByRole("heading", {
        name: /a release is a stack of separate evidence/i,
      })
    ).toBeInTheDocument();
    expect(screen.queryByRole("img", { name: /monthly value/i })).toBeNull();
    expect(screen.queryByText(/map view/i)).not.toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /weights and license require direct artifact evidence/i,
      })
    );
    expect(screen.getAllByText(/kimi k3 launch/i).length).toBeGreaterThan(0);
    expect(
      screen.getByText(/meta and microsoft introduce llama 2/i)
    ).toBeInTheDocument();
    await waitFor(() => {
      expect(window.location.search).toContain(
        "case=open-model-release-ledger"
      );
      expect(window.location.search).toContain(
        "step=step-release-weights-license"
      );
    });
  });
});
