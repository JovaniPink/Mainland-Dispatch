import { render, screen } from "@testing-library/react";
import { atlasRelease } from "@/content/atlas";
import { SignalTeaser } from "./signal-teaser";

describe("SignalTeaser", () => {
  it("renders configuration-driven chains with shareable links", () => {
    render(<SignalTeaser release={atlasRelease!} />);
    expect(
      screen.getByRole("heading", { name: /signals together/i })
    ).toBeInTheDocument();
    for (const chain of atlasRelease!.chains) {
      expect(
        screen.getByRole("link", { name: new RegExp(chain.title, "i") })
      ).toHaveAttribute("href", `/atlas?chain=${chain.slug}`);
    }
  });
});
