import { fireEvent, render, screen } from "@testing-library/react";
import { SaveButton } from "./save-button";

describe("SaveButton", () => {
  beforeEach(() => localStorage.clear());

  it("persists and removes a saved dispatch", () => {
    render(<SaveButton id="d-test" />);
    const button = screen.getByRole("button", { name: "Save" });

    fireEvent.click(button);
    expect(screen.getByRole("button", { name: /saved/i })).toHaveAttribute(
      "aria-pressed",
      "true"
    );
    expect(JSON.parse(localStorage.getItem("md-saved") ?? "[]")).toEqual([
      "d-test",
    ]);

    fireEvent.click(screen.getByRole("button", { name: /saved/i }));
    expect(screen.getByRole("button", { name: "Save" })).toHaveAttribute(
      "aria-pressed",
      "false"
    );
  });
});
