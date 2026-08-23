import { render, screen } from "@testing-library/react";
import { Masthead } from "@/components/shell/masthead";

describe("Masthead", () => {
  it("uses publication-first navigation and a non-wrapping name", () => {
    render(<Masthead />);

    const name = screen.getByRole("link", { name: "MAINLAND DISPATCH" });
    expect(name).toHaveClass("whitespace-nowrap");
    expect(
      screen.getByRole("navigation", { name: "Primary" })
    ).toBeInTheDocument();
    expect(screen.getAllByRole("link").map((link) => link.textContent)).toEqual(
      ["MAINLAND DISPATCH", "Latest", "Notebooks", "Evidence", "Saved"]
    );
    expect(
      screen.getByText("Understand the argument. Follow the evidence.")
    ).toBeInTheDocument();
  });
});
