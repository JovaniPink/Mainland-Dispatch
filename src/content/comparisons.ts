import { ComparisonSchema, type Comparison } from "./schema";

const seed = {
  slug: "open-weight-release-postures",
  title: "How three model releases define openness",
  intro:
    "Meta's Llama releases and Liang Wenfeng's pre-R1 interview use similar ecosystem language from different institutional positions. This comparison separates the artifacts they released from the strategic claims they made about them.",
  sources: [
    {
      role: "mainland",
      outlet: "ChinaTalk / 36Kr",
      headline: "Deepseek: The Quiet Giant Leading China’s AI Race",
      url: "https://www.chinatalk.media/p/deepseek-ceo-interview-with-chinas",
      publishedAt: "2024-11-27",
      language: "en and zh",
      framing:
        "An annotated translation of a founder interview. Liang frames open release as a way to attract talent, accelerate an ecosystem, and make a temporary technical advantage more useful than secrecy would.",
      keyQuote: "Moats created by closed source are temporary.",
    },
    {
      role: "us",
      outlet: "Meta AI",
      headline: "Introducing Llama 3.1: Our most capable models to date",
      url: "https://ai.meta.com/blog/meta-llama-3-1/",
      publishedAt: "2024-07-23",
      language: "en",
      framing:
        "A first-party platform argument. Meta presents model weights, expanded derivative rights, partners, safety tools, and a proposed interface as the foundation of a durable ecosystem.",
      keyQuote: "Llama model weights are available to download.",
    },
    {
      role: "primary",
      outlet: "Meta AI",
      headline: "Meta and Microsoft Introduce the Next Generation of Llama",
      url: "https://ai.meta.com/blog/llama-2/",
      publishedAt: "2023-07-18",
      language: "en",
      framing:
        "The earlier release record. Meta made weights and starting code available under a custom community license, establishing the US precedent against which later openness claims can be checked.",
      keyQuote: "Llama 2 is free for research and commercial use.",
    },
  ],
  sharedFacts: [
    "All three records treat access to model weights as an ecosystem strategy, not only a research disclosure.",
    "Each source is first-party or founder-originated and therefore documents a position more reliably than it proves outcomes.",
    "None of the records makes the associated model unrestricted public-domain software.",
    "Licenses, release artifacts, infrastructure costs, and derivative-use rights must be compared separately.",
  ],
  differingEmphasis: [
    "Llama 2 emphasizes availability for research and most commercial use; Llama 3.1 expands the argument to partners, tools, safety, and distribution.",
    "Liang emphasizes the temporary nature of technical advantage and the recruiting value of an open ecosystem.",
    "Meta labels its strategy open source, while the underlying custom licenses retain conditions that make open weight the more precise cross-release term.",
    "The founder interview describes intent; the Meta release posts provide more directly inspectable product and license artifacts.",
  ],
  editorialNotes:
    "This is a comparison of release posture, not a nationality score or a capability ranking. The sources establish what the organizations published and said. They do not, by themselves, establish adoption, cost per completed task, safety, or the durability of access.",
  relatedDispatchIds: ["d-032", "d-033", "d-034"],
  provenance: "verified",
};

export const comparisons: Comparison[] = [ComparisonSchema.parse(seed)];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
