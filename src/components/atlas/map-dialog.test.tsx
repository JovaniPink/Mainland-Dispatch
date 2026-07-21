import { fireEvent, render, screen } from "@testing-library/react";
import { atlasRelease } from "@/content/atlas";
import { MapDialog } from "./map-dialog";

jest.mock("./context-map", () => ({
  ContextMap: () => <div>Mock ContextMap mounted</div>,
}));

const places = atlasRelease!.places.slice(0, 2);
const relations = atlasRelease!.relations.slice(0, 1);

function props() {
  return {
    open: false,
    status: "closed" as const,
    places,
    relations,
    selectedId: null,
    onSelect: jest.fn(),
    onReady: jest.fn(),
    onFatal: jest.fn(),
    onDegraded: jest.fn(),
    onRetry: jest.fn(),
    onClose: jest.fn(),
  };
}

describe("MapDialog", () => {
  beforeEach(() => {
    HTMLDialogElement.prototype.showModal = function showModal() {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function close() {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
  });

  it("does not mount MapLibre content before consent", () => {
    const initial = props();
    const { rerender } = render(<MapDialog {...initial} />);
    expect(
      screen.queryByText("Mock ContextMap mounted")
    ).not.toBeInTheDocument();

    rerender(<MapDialog {...initial} open status="loading" />);
    expect(screen.getByText("Mock ContextMap mounted")).toBeInTheDocument();
    expect(screen.getByText(/loading geographic context/i)).toBeInTheDocument();
  });

  it("keeps location controls available in failed state and exposes retry and close", () => {
    const handlers = props();
    render(<MapDialog {...handlers} open status="failed" />);

    expect(
      screen.getByRole("list", { name: /geographic context locations/i })
    ).toBeInTheDocument();
    expect(
      screen.getByText(/geographic view unavailable/i)
    ).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: /retry map/i }));
    expect(handlers.onRetry).toHaveBeenCalledTimes(1);
    fireEvent.click(
      screen.getByRole("button", { name: /close geographic context/i })
    );
    expect(handlers.onClose).toHaveBeenCalledTimes(1);
  });

  it("closes on cancel and returns focus to the opener", () => {
    const handlers = props();
    const { rerender } = render(
      <>
        <button type="button">Open map</button>
        <MapDialog {...handlers} />
      </>
    );
    const opener = screen.getByRole("button", { name: /open map/i });
    opener.focus();
    rerender(
      <>
        <button type="button">Open map</button>
        <MapDialog {...handlers} open status="loading" />
      </>
    );

    const dialog = screen.getByRole("dialog", { hidden: true });
    fireEvent(dialog, new Event("cancel", { cancelable: true }));
    expect(handlers.onClose).toHaveBeenCalledTimes(1);
    expect(screen.getByRole("button", { name: /open map/i })).toHaveFocus();
  });
});
