import {
  fireEvent,
  render,
  screen,
  waitFor,
  within,
} from "@testing-library/react";
import { atlasRelease } from "@/content/atlas";
import { AtlasExplorer } from "./atlas-explorer";

jest.mock("./context-map", () => ({
  ContextMap: ({
    onSelect,
    onError,
    onConsent,
    status,
  }: {
    onSelect: (id: string) => void;
    onError: () => void;
    onConsent: () => void;
    status: "idle" | "loading" | "ready" | "failed";
  }) => (
    <div>
      <p>Mock map status: {status}</p>
      <button onClick={onConsent}>Mock map consent</button>
      <button onClick={() => onSelect("place-shanghai")}>
        Mock map Shanghai
      </button>
      <button
        onClick={() => {
          onConsent();
          onError();
        }}
      >
        Mock map error
      </button>
      {status === "failed" && <p>Map unavailable; use the location list.</p>}
    </div>
  ),
}));

describe("AtlasExplorer", () => {
  beforeEach(() => window.history.replaceState({}, "", "/atlas"));

  it("synchronizes chain, location, lifecycle, and URL state", async () => {
    render(<AtlasExplorer release={atlasRelease!} />);

    await waitFor(() =>
      expect(window.location.search).toContain("chain=rule-to-reach")
    );

    fireEvent.click(
      screen.getByRole("button", { name: /from affected company/i })
    );
    expect(screen.getByText(/acm shanghai and acm korea/i)).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: /mock map shanghai/i }));
    expect(
      screen.getByRole("heading", { name: "Shanghai" })
    ).toBeInTheDocument();

    fireEvent.click(
      screen.getByRole("button", {
        name: /entity list compliance date arrives/i,
      })
    );
    await waitFor(() => {
      expect(window.location.search).toContain("chain=exposure-to-response");
      expect(window.location.search).toContain("place=place-shanghai");
    });
  });

  it("switches chart metrics and exposes the source ledger", () => {
    render(<AtlasExplorer release={atlasRelease!} />);
    fireEvent.click(screen.getByRole("button", { name: /year over year/i }));
    expect(
      screen.getByRole("img", { name: /year-over-year change/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/federal register remains controlling/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: /download snapshot/i })
    ).toHaveAttribute("href", "/data/us-china-hs8486-2024-2025.csv");
  });

  it("preserves evidence access when the map fails", () => {
    render(<AtlasExplorer release={atlasRelease!} />);
    fireEvent.click(screen.getByRole("button", { name: /mock map error/i }));
    expect(
      screen.getByText(/map unavailable; use the location list/i)
    ).toBeInTheDocument();
    expect(
      screen.getByRole("list", { name: /atlas locations/i })
    ).toBeInTheDocument();
  });

  it("never loads the map until the reader consents", () => {
    render(<AtlasExplorer release={atlasRelease!} />);
    expect(screen.getByText(/mock map status: idle/i)).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /mock map consent/i }));
    expect(screen.getByText(/mock map status: loading/i)).toBeInTheDocument();
  });

  it("selects a chart month with the keyboard and exposes snapshot metadata", () => {
    render(<AtlasExplorer release={atlasRelease!} />);
    const month = screen.getByRole("button", { name: /2025-11: \$59\.6m/i });
    fireEvent.focus(month);
    fireEvent.keyDown(month, { key: "Enter" });
    expect(screen.getByText(/2025-11 · \$59\.6m/i)).toBeInTheDocument();

    const federalRegister = screen
      .getByText(
        /89 fr 96790 · semiconductor manufacturing equipment controls/i
      )
      .closest("details")!;
    fireEvent.click(
      within(federalRegister).getByText(
        /89 fr 96790 · semiconductor manufacturing equipment controls/i
      )
    );
    expect(
      within(federalRegister).getByText(/retrieved · vintage/i)
    ).toBeInTheDocument();
    expect(
      within(federalRegister).getByText(/fr-2024-28270/i)
    ).toBeInTheDocument();
  });
});
