import { act, fireEvent, render, screen } from "@testing-library/react";
import { dispatches } from "@/content/dispatches";
import { DispatchSchema, type Dispatch } from "@/content/schema";
import { MediaFacade } from "./media-facade";

describe("MediaFacade", () => {
  const article = dispatches.find((item) => item.id === "d-034")!;
  const verifiedVideo = DispatchSchema.parse({
    ...article,
    kind: "video",
    provider: "youtube",
    embedId: "privacy-test",
    duration: "01:00",
    captions: ["en"],
  }) as Extract<Dispatch, { kind: "video" }>;

  afterEach(() => {
    jest.useRealTimers();
  });

  it("creates a verified external iframe only after consent", () => {
    const { container } = render(<MediaFacade dispatch={verifiedVideo} />);

    expect(container.querySelector("iframe")).toBeNull();
    fireEvent.click(
      screen.getByRole("button", { name: /load external media/i })
    );
    const iframe = container.querySelector("iframe");
    expect(iframe).toHaveAttribute(
      "src",
      "https://www.youtube-nocookie.com/embed/privacy-test?autoplay=1"
    );
    act(() => iframe?.dispatchEvent(new Event("load")));
    expect(container.querySelector("iframe")).not.toBeNull();
  });
});
