import { render, screen } from "@testing-library/react";
import { DispatchCard } from "./dispatch-card";
import { dispatches } from "@/content/dispatches";
import { DispatchSchema, type Dispatch } from "@/content/schema";

describe("DispatchCard", () => {
  const article = dispatches.find((d) => d.id === "d-034")!;
  const video = DispatchSchema.parse({
    ...article,
    kind: "video",
    provider: "youtube",
    embedId: "privacy-test",
    duration: "01:00",
    captions: ["en"],
  }) as Extract<Dispatch, { kind: "video" }>;

  it("renders title, metadata, and both dates", () => {
    render(<DispatchCard dispatch={video} />);
    expect(screen.getByRole("link", { name: video.title })).toHaveAttribute(
      "href",
      `/dispatch/${video.slug}`
    );
    expect(screen.getByText(/editorial note/i)).toBeInTheDocument();
    expect(screen.getByText(/published .* · curated/i)).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`Video · ${video.canonicalSource.publisher}`, "i")
      )
    ).toBeInTheDocument();
  });

  it("shows duration in the meta line for timed media", () => {
    render(<DispatchCard dispatch={video} />);
    expect(screen.getAllByText(new RegExp(video.duration))).not.toHaveLength(0);
  });
});
