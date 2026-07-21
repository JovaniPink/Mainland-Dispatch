import { act, fireEvent, render, screen } from "@testing-library/react";
import { dispatches } from "@/content/dispatches";
import { MediaFacade } from "./media-facade";

describe("MediaFacade", () => {
  const prototypeVideo = dispatches.find((item) => item.kind === "video")!;

  afterEach(() => {
    jest.useRealTimers();
  });

  it("loads no iframe before consent and uses the local prototype path", () => {
    jest.useFakeTimers();
    const { container } = render(<MediaFacade dispatch={prototypeVideo} />);

    expect(container.querySelector("iframe")).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: /load external media/i })
    );
    expect(screen.getByText(/preparing media/i)).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();

    act(() => jest.advanceTimersByTime(500));
    expect(screen.getByText(/prototype media surface/i)).toBeInTheDocument();
    expect(container.querySelector("iframe")).toBeNull();
  });
});
