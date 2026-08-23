import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { ArchiveExplorer } from "./archive-explorer";

describe("ArchiveExplorer publication boundary and views", () => {
  beforeEach(() => {
    window.history.replaceState({}, "", "/archive");
  });

  it("renders only public reviewed records", () => {
    render(<ArchiveExplorer />);

    expect(screen.getByText("13 of 13 public")).toBeInTheDocument();
    expect(
      screen.getByText(/liang wenfeng described deepseek's playbook/i)
    ).toBeInTheDocument();
    expect(
      screen.queryByText(/who’s afraid of chinese models/i)
    ).not.toBeInTheDocument();
  });

  it("switches between timeline and relationship views", () => {
    render(<ArchiveExplorer />);

    fireEvent.click(screen.getByRole("button", { name: "Time" }));
    expect(screen.getByText(/see coverage accumulate/i)).toBeInTheDocument();
    expect(screen.getAllByText(/record/i).length).toBeGreaterThan(0);

    fireEvent.click(screen.getByRole("button", { name: "Relationships" }));
    expect(
      screen.getByRole("heading", {
        name: "Dominance Is a Dashboard, Not a Crown",
      })
    ).toBeInTheDocument();
    expect(screen.getByText(/notebook inquiry center/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Notebook inquiry")).toHaveValue(
      "dominance-is-a-dashboard"
    );

    fireEvent.change(screen.getByLabelText("Notebook inquiry"), {
      target: { value: "what-xi-jinping-wants" },
    });
    expect(
      screen.getByRole("heading", { name: "What Xi Jinping Wants" })
    ).toBeInTheDocument();
  });

  it("filters by evidence status and writes shareable URL state", async () => {
    render(<ArchiveExplorer />);

    await waitFor(() =>
      expect(screen.getByText("13 of 13 public")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole("button", { name: /^Filters/ }));
    fireEvent.change(screen.getByLabelText("Evidence"), {
      target: { value: "contested" },
    });

    await waitFor(() =>
      expect(window.location.search).toContain("evidence=contested")
    );
    expect(screen.getByText(/of 13 public/i)).toBeInTheDocument();
  });

  it("keeps search and views visible while the machine owns the filter panel", async () => {
    render(<ArchiveExplorer />);

    await waitFor(() =>
      expect(screen.getByText("13 of 13 public")).toBeInTheDocument()
    );
    expect(screen.getByLabelText("Search")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Records" })).toBeInTheDocument();

    const filters = screen.getByRole("button", { name: "Filters (0)" });
    expect(filters).toHaveAttribute("aria-expanded", "false");
    fireEvent.click(filters);
    expect(filters).toHaveAttribute("aria-expanded", "true");
    expect(screen.getByTestId("archive-filter-panel")).toHaveAttribute(
      "data-state",
      "open"
    );
    expect(window.location.search).not.toContain("filterPanel");

    fireEvent.keyDown(window, { key: "Escape" });
    expect(filters).toHaveAttribute("aria-expanded", "false");
    expect(screen.getByTestId("archive-filter-panel")).toHaveAttribute(
      "data-state",
      "closed"
    );
  });

  it("shows removable applied filters outside the panel", async () => {
    render(<ArchiveExplorer />);

    await waitFor(() =>
      expect(screen.getByText("13 of 13 public")).toBeInTheDocument()
    );
    fireEvent.click(screen.getByRole("button", { name: "Filters (0)" }));
    fireEvent.change(screen.getByLabelText("Evidence"), {
      target: { value: "contested" },
    });
    fireEvent.change(screen.getByLabelText("Search"), {
      target: { value: "China" },
    });

    expect(
      screen.getByRole("button", { name: "Filters (2)" })
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", { name: "Remove Evidence: Contested" })
    );
    expect(screen.getByLabelText("Evidence")).toHaveValue("all");
    expect(screen.getByLabelText("Search")).toHaveValue("China");

    fireEvent.click(screen.getByRole("button", { name: "Clear all filters" }));
    expect(screen.getByLabelText("Search")).toHaveValue("");
    expect(
      screen.queryByRole("button", { name: /^Remove / })
    ).not.toBeInTheDocument();
  });

  it("uses compact source records with native editorial-note disclosures", () => {
    render(<ArchiveExplorer />);

    expect(
      screen.getAllByRole("group", { name: "Editorial note" })
    ).toHaveLength(13);
    expect(screen.getAllByRole("button", { name: /^Save/ })).toHaveLength(13);
    expect(screen.getAllByText("Contested").length).toBeGreaterThan(0);
  });
});
