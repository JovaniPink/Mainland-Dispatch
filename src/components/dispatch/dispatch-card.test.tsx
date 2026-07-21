import { render, screen } from "@testing-library/react";
import { DispatchCard } from "./dispatch-card";
import { dispatches } from "@/content/dispatches";

describe("DispatchCard", () => {
  const video = dispatches.find((d) => d.kind === "video")!;

  it("renders title, metadata, and both dates", () => {
    render(<DispatchCard dispatch={video} />);
    expect(screen.getByRole("link", { name: video.title })).toHaveAttribute(
      "href",
      `/dispatch/${video.slug}`
    );
    expect(screen.getByText(/editorial note/i)).toBeInTheDocument();
    expect(screen.getByText(/published .* · curated/i)).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`Video · ${video.source}`, "i"))
    ).toBeInTheDocument();
  });

  it("shows duration in the meta line for timed media", () => {
    render(<DispatchCard dispatch={video} />);
    expect(screen.getAllByText(new RegExp(video.duration))).not.toHaveLength(0);
  });
});
