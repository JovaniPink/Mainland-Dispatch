import type { Metadata } from "next";
import { NotebookReaderShell } from "@/components/notebook/notebook-reader";
import {
  NotebookSectionHeading,
  NotebookSourceTrail,
} from "@/components/notebook/notebook-components";
import { requireEditorialDesk } from "@/lib/editorial-desk";

export const metadata: Metadata = {
  title: "Inquiry 11 draft preview",
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
  alternates: { canonical: null },
  openGraph: null,
  twitter: null,
};

export default async function WhoControlsTheModelPreview() {
  requireEditorialDesk();
  const { whoControlsTheModel: draft, whoControlsTheModelWordCount: words } =
    await import("@/content/notebook/who-controls-the-model");
  const sourceLinks = (ids: string[]) =>
    ids.map((id) => {
      const index = draft.sourceTrail.findIndex((source) => source.id === id);
      return (
        <a
          key={id}
          href={`#${id}`}
          className="mr-3 text-sm text-signal underline underline-offset-4"
          aria-label={`Source ${index + 1}: ${draft.sourceTrail[index].title}`}
        >
          [{index + 1}]
        </a>
      );
    });
  return (
    <NotebookReaderShell
      preview
      ordinal={draft.ordinal}
      title={draft.title}
      subtitle={draft.subtitle}
      thesis={draft.thesis}
      draftUpdatedAt={draft.draftUpdatedAt}
      readTime={`${Math.ceil(words / 220)} min read`}
      tags={draft.tags}
      editorialLabel="Unpublished draft"
      sections={[
        ...draft.sections.map(
          (section) => [section.id, section.title] as const
        ),
        ["source-trail", "Sources and review"],
      ]}
      readingRule="Provider allegations, official responses, and our interpretation are distinct. This local Desk preview is not a published Notebook."
    >
      <aside
        className="border border-signal p-5"
        aria-label="Draft review status"
      >
        <h2 className="font-serif text-xl">Draft for editorial review</h2>
        <p className="mt-2 text-sm text-ink-muted">
          {words.toLocaleString("en-US")} words. Evidence cutoff:{" "}
          {draft.evidenceCutoff}. No publication date assigned.
        </p>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-sm">
          {draft.limitations.map((limit) => (
            <li key={limit}>{limit}</li>
          ))}
        </ul>
      </aside>
      {draft.sections.map((section, index) => (
        <section key={section.id} className="space-y-6">
          <NotebookSectionHeading id={section.id} eyebrow={section.eyebrow}>
            {section.title}
          </NotebookSectionHeading>
          <div className="max-w-[70ch] space-y-5 text-lg leading-[1.65] text-ink">
            {section.paragraphs.map((paragraph, paragraphIndex) => (
              <p key={paragraphIndex}>
                {paragraph.text}{" "}
                <span className="whitespace-nowrap">
                  {sourceLinks(paragraph.sourceIds)}
                </span>
              </p>
            ))}
          </div>
          {index === 0 && (
            <figure
              className="border border-rule bg-paper-warm/30 p-4 sm:p-6"
              aria-labelledby="access-schematic-caption"
            >
              <figcaption
                id="access-schematic-caption"
                className="font-serif text-xl"
              >
                The alleged access path, and the provider&apos;s response
              </figcaption>
              <p className="mt-2 text-sm text-ink-muted">
                Conceptual sequence, not a network reconstruction. The first two
                steps are alleged routing; the final two are Anthropic&apos;s
                account of observation and enforcement.
              </p>
              <ol className="mt-5 grid gap-4 sm:grid-cols-2">
                {draft.accessSteps.map((step) => (
                  <li
                    key={step.label}
                    className="min-w-0 border-l-2 border-signal pl-4"
                  >
                    <h3 className="font-mono text-sm">{step.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed">
                      {step.detail}
                    </p>
                    {sourceLinks(step.sourceIds)}
                  </li>
                ))}
              </ol>
            </figure>
          )}
          {index === 2 && (
            <div
              className="max-w-full overflow-x-auto border border-rule p-3"
              tabIndex={0}
              role="region"
              aria-label="Reported cases table, horizontally scrollable on small screens"
            >
              <table className="w-full min-w-[640px] text-left text-sm leading-relaxed">
                <caption className="mb-4 text-left font-serif text-xl">
                  Reported activity is not demonstrated deployment
                </caption>
                <thead>
                  <tr>
                    {[
                      "Case",
                      "Reported activity",
                      "Attribution strength",
                      "Demonstrated outcome / limit",
                    ].map((label) => (
                      <th
                        key={label}
                        scope="col"
                        className="border-b border-rule p-3 align-top"
                      >
                        {label}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {draft.cases.map((item) => (
                    <tr key={item.id}>
                      <th
                        scope="row"
                        className="border-b border-rule p-3 align-top"
                      >
                        {item.label}
                        {sourceLinks(item.sourceIds)}
                      </th>
                      <td className="border-b border-rule p-3 align-top">
                        {item.activity}
                      </td>
                      <td className="border-b border-rule p-3 align-top">
                        {item.attribution}
                      </td>
                      <td className="border-b border-rule p-3 align-top">
                        {item.outcome}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      ))}
      <section className="space-y-6">
        <NotebookSectionHeading id="source-trail" eyebrow="Research custody">
          Sources and unresolved claims
        </NotebookSectionHeading>
        <NotebookSourceTrail
          headingId="draft-source-records"
          sources={draft.sourceTrail}
        />
        <details className="border border-rule p-4">
          <summary className="cursor-pointer font-serif text-xl">
            Claim decisions and remaining review
          </summary>
          <dl className="mt-4 space-y-5">
            {draft.claimAudit.map((claim) => (
              <div key={claim.id} id={claim.id}>
                <dt className="font-semibold">
                  {claim.decision}: {claim.claim}
                </dt>
                <dd className="mt-1 text-sm leading-relaxed">
                  {claim.assessment} {sourceLinks(claim.sourceIds)}
                </dd>
              </div>
            ))}
          </dl>
        </details>
      </section>
    </NotebookReaderShell>
  );
}
