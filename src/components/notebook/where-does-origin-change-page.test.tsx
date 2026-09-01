import { render, screen } from "@testing-library/react";
import WhereDoesOriginChangePage from "@/app/notebook/where-does-origin-change/page";

describe("Where Does Origin Change Notebook page", () => {
  it("renders the proof ladder, quota boundary, companion, and source trail", () => {
    render(<WhereDoesOriginChangePage />);

    expect(
      screen.getByRole("heading", {
        level: 1,
        name: "Where Does Origin Change?",
      })
    ).toBeInTheDocument();
    expect(screen.getByText("15,603")).toBeInTheDocument();
    expect(screen.getByText("33,397")).toBeInTheDocument();
    expect(
      screen.getByRole("link", {
        name: "Culture, attention, and public memory",
      })
    ).toHaveAttribute("href", "/notebook/what-gets-through");
    expect(screen.getAllByText(/^Retrieved 2026-/)).toHaveLength(19);
  });

  it("has no audio player or media-consent surface", () => {
    render(<WhereDoesOriginChangePage />);

    expect(screen.queryByText(/Load publisher audio/i)).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /audio/i })
    ).not.toBeInTheDocument();
    expect(document.querySelector("audio, iframe")).not.toBeInTheDocument();
  });
});
