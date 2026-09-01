import { fireEvent, render, screen } from "@testing-library/react";
import sitemap from "@/app/sitemap";
import WhatGetsThroughPage, {
  generateMetadata,
} from "@/app/notebook/what-gets-through/page";
import { whatGetsThrough as entry } from "@/content/notebook/what-gets-through";

describe("What Gets Through corrected Notebook page", () => {
  it("renders the thesis-first reader and accessible two-gate figure", () => {
    render(<WhatGetsThroughPage />);

    expect(
      screen.getByRole("heading", { level: 1, name: "What Gets Through?" })
    ).toBeInTheDocument();
    expect(screen.getByTestId("working-thesis")).toHaveTextContent(
      /networked attention.*national-security law/i
    );
    const figure = screen.getByRole("figure", {
      name: /two gates that shape circulation/i,
    });
    expect(figure).not.toHaveTextContent("Trade");
    expect(figure).toHaveTextContent("Culture");
    expect(figure).toHaveTextContent("Memory");
    expect(figure).toHaveTextContent(/not morally equivalent/i);
  });

  it("renders all moved-fragment notices and the reciprocal companion", () => {
    const { container } = render(<WhatGetsThroughPage />);

    for (const fragment of entry.legacyFragments ?? []) {
      expect(container.querySelector(`#${fragment.id}`)).toBeInTheDocument();
      expect(
        container.querySelector(
          `#${fragment.id} a[href="/notebook/${fragment.successorSlug}#${fragment.successorFragment}"]`
        )
      ).toBeInTheDocument();
    }
    expect(
      screen.getByRole("link", {
        name: "Rules of origin and transshipment proof",
      })
    ).toHaveAttribute("href", "/notebook/where-does-origin-change");
  });

  it("retains zero-request audio consent and every audio state", () => {
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
    expect(container.querySelector("source")).toHaveAttribute(
      "src",
      entry.audio.mediaUrl
    );
    expect(screen.getByText("Audio state: loading.")).toBeInTheDocument();

    fireEvent.canPlay(container.querySelector("audio")!);
    expect(screen.getByText("Audio state: playing.")).toBeInTheDocument();
    fireEvent.error(container.querySelector("audio")!);
    expect(screen.getByText("Audio state: failure.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Retry audio" }));
    expect(screen.getByText("Audio state: loading.")).toBeInTheDocument();
    fireEvent.click(screen.getByRole("button", { name: "Unload audio" }));
    expect(container.querySelector("audio, source")).toBeNull();
  });

  it("publishes canonical metadata, deduplicated JSON-LD citations, and both sitemap entries", () => {
    const { container } = render(<WhatGetsThroughPage />);
    const metadata = generateMetadata();
    expect(metadata.alternates).toEqual({
      canonical: "https://mainlanddispatch.com/notebook/what-gets-through",
    });
    expect(metadata.openGraph).toMatchObject({
      type: "article",
      url: "https://mainlanddispatch.com/notebook/what-gets-through",
      publishedTime: "2026-08-25T00:00:00.000Z",
      modifiedTime: "2026-09-01T00:00:00.000Z",
    });
    const jsonLd = container.querySelector(
      'script[type="application/ld+json"]'
    );
    expect(jsonLd).toBeInTheDocument();
    const payload = JSON.parse(jsonLd!.textContent!);
    expect(new Set(payload.citation).size).toBe(payload.citation.length);
    expect(sitemap().map((item) => item.url)).toEqual(
      expect.arrayContaining([
        "https://mainlanddispatch.com/notebook/what-gets-through",
        "https://mainlanddispatch.com/notebook/where-does-origin-change",
      ])
    );
  });

  it("renders Inquiry 06 in ASCII US English", () => {
    const { container } = render(<WhatGetsThroughPage />);
    expect(container.textContent).not.toMatch(/[^\x00-\x7F]/);
  });
});
