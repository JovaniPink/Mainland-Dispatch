import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import sitemap from "@/app/sitemap";
import { publishedNotebookEntries } from "@/content/notebook";
import { siteUrl } from "@/lib/seo";
import {
  NOTEBOOK_FIVE_AUDIO_AUDIT_STORAGE_KEY,
  NotebookFiveAudioAudit,
} from "./notebook-five-audio-audit";

const passages = [
  "Episode's definition of the first shock",
  "Mechanism behind the second shock",
  "Who benefits and who loses",
  "Germany and destination exposure",
  "Tariffs, industrial policy, and coordination",
  "AI and software",
];

const claimBoundaries = [
  "Must separate the speakers' framing from the historical labor literature",
  "Must separate saving, property, policy, productivity, imports, currency, and exports",
  "Must distinguish consumers, input users, firms, workers, places, and governments",
  "Must not convert a guest argument into settled causal attribution",
  "Must identify the target problem and the intervention's own costs",
  'May support a scenario question only, not an observed "third shock"',
];

describe("NotebookFiveAudioAudit", () => {
  beforeEach(() => localStorage.clear());

  it("renders the six commissioned passages and their fixed claim boundaries", () => {
    const { container } = render(<NotebookFiveAudioAudit />);

    expect(
      screen.getByRole("heading", { name: "Notebook Five audio audit" })
    ).toBeInTheDocument();
    expect(screen.getByText(/The China Shock 2\.0/)).toBeInTheDocument();

    for (const passage of passages) {
      expect(screen.getByRole("group", { name: passage })).toBeInTheDocument();
    }
    for (const boundary of claimBoundaries) {
      expect(screen.getByText(boundary)).toBeInTheDocument();
    }

    expect(container.querySelector("audio, iframe, source")).toBeNull();
    expect(container.querySelector('a[href^="http"]')).toBeNull();
  });

  it("remains absent from the public Notebook registry and sitemap", () => {
    expect(publishedNotebookEntries.map((entry) => entry.slug)).not.toContain(
      "who-absorbs-the-shock"
    );
    expect(sitemap().map((entry) => entry.url)).not.toContain(
      `${siteUrl}/notebook/who-absorbs-the-shock`
    );
  });

  it("captures a normalized exact span from a separately operated player", () => {
    render(<NotebookFiveAudioAudit />);

    const elapsed = screen.getByRole("textbox", {
      name: "Player elapsed time",
    });
    fireEvent.change(elapsed, { target: { value: "12:34" } });
    fireEvent.click(
      screen.getByRole("button", {
        name: "Capture start for Mechanism behind the second shock",
      })
    );

    expect(
      screen.getByRole("textbox", {
        name: "Start time for Mechanism behind the second shock",
      })
    ).toHaveValue("12:34");

    fireEvent.change(elapsed, { target: { value: "13:02" } });
    fireEvent.click(
      screen.getByRole("button", {
        name: "Capture end for Mechanism behind the second shock",
      })
    );

    expect(
      screen.getByRole("textbox", {
        name: "End time for Mechanism behind the second shock",
      })
    ).toHaveValue("13:02");
    expect(screen.getByText("Exact span · 12:34–13:02")).toBeInTheDocument();
  });

  it("rejects capture times beyond the publisher runtime", () => {
    render(<NotebookFiveAudioAudit />);

    fireEvent.change(
      screen.getByRole("textbox", { name: "Player elapsed time" }),
      { target: { value: "66:00" } }
    );
    fireEvent.click(
      screen.getByRole("button", {
        name: "Capture start for Episode's definition of the first shock",
      })
    );

    expect(screen.getByRole("alert")).toHaveTextContent(
      "Enter a time from 00:00 through 1:05:30"
    );
  });

  it("persists an audit draft locally and restores it on the next mount", async () => {
    const { unmount } = render(<NotebookFiveAudioAudit />);

    fireEvent.change(
      screen.getByRole("textbox", {
        name: "Speaker attribution for AI and software",
      }),
      { target: { value: "Brad Setser" } }
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: "Attributed paraphrase for AI and software",
      }),
      { target: { value: "A scenario about future software competition." } }
    );
    fireEvent.change(
      screen.getByRole("textbox", {
        name: "Claim-boundary assessment for AI and software",
      }),
      {
        target: {
          value:
            "Keep this conditional; the episode does not establish an observed labor shock.",
        },
      }
    );
    fireEvent.change(
      screen.getByRole("combobox", { name: "Audit state for AI and software" }),
      { target: { value: "audited" } }
    );

    await waitFor(() =>
      expect(
        localStorage.getItem(NOTEBOOK_FIVE_AUDIO_AUDIT_STORAGE_KEY)
      ).toContain("Brad Setser")
    );

    unmount();
    const stored = localStorage.getItem(NOTEBOOK_FIVE_AUDIO_AUDIT_STORAGE_KEY);
    localStorage.setItem(NOTEBOOK_FIVE_AUDIO_AUDIT_STORAGE_KEY, ` ${stored}`);
    render(<NotebookFiveAudioAudit />);

    expect(
      screen.getByRole("textbox", {
        name: "Speaker attribution for AI and software",
      })
    ).toHaveValue("Brad Setser");
    expect(
      screen.getByRole("textbox", {
        name: "Attributed paraphrase for AI and software",
      })
    ).toHaveValue("A scenario about future software competition.");
    expect(
      screen.getByRole("combobox", { name: "Audit state for AI and software" })
    ).toHaveValue("audited");
  });
});
