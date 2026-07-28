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
      screen.getByRole("heading", { name: "Open Models, Closed System?" })
    ).toBeInTheDocument();
    expect(screen.getByText(/notebook inquiry center/i)).toBeInTheDocument();
    expect(screen.getByLabelText("Notebook inquiry")).toHaveValue(
      "open-models-closed-system"
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
    fireEvent.change(screen.getByLabelText("Evidence"), {
      target: { value: "contested" },
    });

    await waitFor(() =>
      expect(window.location.search).toContain("evidence=contested")
    );
    expect(screen.getByText(/of 13 public/i)).toBeInTheDocument();
  });
});
