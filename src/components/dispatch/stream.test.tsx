import { render, screen } from "@testing-library/react";
import { Stream } from "./stream";

describe("Stream publication boundary", () => {
  it("renders published entries and excludes review-stage material", () => {
    render(<Stream />);

    expect(
      screen.getByText(/domestic animation industry/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/weibo thread on graduate employment/i)
    ).not.toBeInTheDocument();
    expect(screen.queryByText(/chongqing ev plant/i)).not.toBeInTheDocument();
  });
});
