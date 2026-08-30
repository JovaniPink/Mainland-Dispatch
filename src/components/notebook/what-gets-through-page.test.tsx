import { fireEvent, render, screen } from "@testing-library/react";
import sitemap from "@/app/sitemap";
import WhatGetsThroughPage, {
  generateMetadata,
} from "@/app/notebook/what-gets-through/page";
import { whatGetsThrough as entry } from "@/content/notebook/what-gets-through";

describe("What Gets Through Notebook page", () => {
  it("renders the thesis-first reader and accessible three-gate figure", () => {
    render(<WhatGetsThroughPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "What Gets Through?" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("working-thesis")).toHaveTextContent(
      /rules of origin.*networked attention.*national-security law/i
    );
    const figure = screen.getByRole("figure", {
      name: /three gates that shape circulation/i,
    });
    expect(figure).toHaveTextContent("Trade");
    expect(figure).toHaveTextContent("Culture");
    expect(figure).toHaveTextContent("Memory");
    expect(figure).toHaveTextContent(/not morally equivalent/i);
    for (const gate of entry.gates) {
      expect(figure).toHaveTextContent(gate.subject);
    }
    expect(figure).toHaveTextContent("Contested");
    expect(figure).toHaveTextContent("Observed");
    expect(figure).toHaveTextContent("Official position");
  });

  it("publishes corrections, the source trail, and an Inquiry 05 link", () => {
    render(<WhatGetsThroughPage />);

    expect(screen.getAllByText("Corrected").length).toBeGreaterThan(0);
    expect(
      screen.getAllByText("Excluded overstatement").length
    ).toBeGreaterThan(0);
    expect(
      screen.getByRole("heading", { name: /source trail and review boundary/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Read Inquiry 05" })
    ).toHaveAttribute("href", "/notebook/who-absorbs-the-shock");
  });

  it("shows why a Canadian route is not yet a US customs finding", () => {
    render(<WhatGetsThroughPage />);

    const proofFigure = screen.getByRole("figure", {
      name: /a route is not a ruling/i,
    });
    expect(proofFigure).toHaveTextContent("Canadian market entry");
    expect(proofFigure).toHaveTextContent("USMCA origin claim");
    expect(proofFigure).toHaveTextContent("Not publicly established");
    expect(proofFigure).toHaveTextContent(
      /chronology does not prove one hidden cause/i
    );
    expect(proofFigure).toHaveTextContent("01 JUL 2026");
    expect(proofFigure).toHaveTextContent("25 AUG 2026");
    expect(proofFigure).toHaveTextContent(
      /five records are answering five different questions/i
    );
    expect(proofFigure).toHaveTextContent("Hudson's episode framing");
    expect(proofFigure).toHaveTextContent("The Section 338 action");
    expect(proofFigure).toHaveTextContent("The aggregate counter-reading");
    expect(proofFigure).toHaveTextContent(/what remains open/i);
  });

  it("keeps Simplecast private until consent and exposes every audio state", () => {
    const { container } = render(<WhatGetsThroughPage />);

    expect(container.querySelector("audio, source")).toBeNull();
    expect(
      screen.getByText(/No publisher transcript available/)
    ).toBeInTheDocument();
    fireEvent.click(
      screen.getByRole("button", {
        name: `Load external audio: ${entry.formats[0].title}`,
      })
    );
    expect(container.querySelector("audio")).toBeInTheDocument();
    expect(container.querySelector("source")).toHaveAttribute(
      "src",
      entry.audio.mediaUrl
    );
    expect(screen.getByText("Audio state: loading.")).toBeInTheDocument();

    fireEvent.canPlay(container.querySelector("audio")!);
    expect(screen.getByText("Now available")).toBeInTheDocument();
    expect(screen.getByText("Audio state: playing.")).toBeInTheDocument();

    fireEvent.error(container.querySelector("audio")!);
    expect(screen.getByText("Audio could not be loaded")).toBeInTheDocument();
    expect(screen.getByText("Audio state: failure.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Retry audio" }));
    expect(container.querySelector("audio")).toBeInTheDocument();
    expect(screen.getByText("Audio state: loading.")).toBeInTheDocument();

    fireEvent.click(screen.getByRole("button", { name: "Unload audio" }));
    expect(container.querySelector("audio, source")).toBeNull();
    expect(screen.getByText("Audio state: poster.")).toBeInTheDocument();
  });

  it("publishes canonical article metadata, JSON-LD citations, and sitemap entry", () => {
    const { container } = render(<WhatGetsThroughPage />);
    const metadata = generateMetadata();
    expect(metadata.alternates).toEqual({
      canonical: "https://mainlanddispatch.com/notebook/what-gets-through",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "https://mainlanddispatch.com/notebook/what-gets-through",
      publishedTime: "2026-08-25T00:00:00.000Z",
    });
    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLd).toBeInTheDocument();
    expect(jsonLd?.textContent).toContain("citation");
    expect(jsonLd?.textContent).toContain(entry.sourceTrail[0].links[0].url);
    expect(sitemap().map((item) => item.url)).toContain(
      "https://mainlanddispatch.com/notebook/what-gets-through"
    );
    expect(sitemap().map((item) => item.url)).toContain(
      "https://mainlanddispatch.com/notebook/who-absorbs-the-shock"
    );
  });

  it("renders Inquiry 06 in ASCII US English", () => {
    const { container } = render(<WhatGetsThroughPage />);
    expect(container.textContent).not.toMatch(/[^\x00-\x7F]/);
  });
});
