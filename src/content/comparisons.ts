import { ComparisonSchema, type Comparison } from "./schema";

const seed = {
  slug: "animation-industry",
  title: "How three sources frame China's animation boom",
  intro:
    "Ne Zha 2's record-breaking run produced coverage on both sides of the Pacific and an official statement from the film administration. The facts barely differ; the framing does.",
  sources: [
    {
      role: "mainland",
      outlet: "Sixth Tone",
      headline:
        "China's domestic animation industry is building franchises beyond Hollywood's orbit",
      url: "https://example.com/prototype/animation-franchises",
      publishedAt: "2026-07-18",
      language: "zh/en",
      framing:
        "An industrial-maturity story: financing structures, studio pipelines, and character IP ownership. Hollywood appears only as a receding benchmark.",
      keyQuote:
        "The question studios ask is no longer whether a film can match Pixar, but whether a character can carry a decade of sequels.",
    },
    {
      role: "us",
      outlet: "The Hollywood Reporter",
      headline:
        "Why Chinese blockbusters still struggle to find US theatrical distribution",
      url: "https://example.com/prototype/cinema-distribution",
      publishedAt: "2026-07-10",
      language: "en",
      framing:
        "A market-access story: the same boom is framed through what it cannot yet do — reach American screens. Success is measured against US distribution economics.",
      keyQuote:
        "For all its domestic scale, no Chinese animated feature has cracked $20 million in North America.",
    },
    {
      role: "primary",
      outlet: "China Film Administration",
      headline: "2026 half-year film market bulletin",
      url: "https://example.com/prototype/film-market-bulletin",
      publishedAt: "2026-07-08",
      language: "zh",
      framing:
        "The raw numbers, plus policy vocabulary: domestic animation described as a 'high-quality development' success, with export ambitions stated but not quantified.",
      keyQuote:
        "Domestic animated features accounted for 31% of half-year box office, a historic high.",
    },
  ],
  sharedFacts: [
    "Ne Zha 2 is the highest-grossing animated film ever released in a single market.",
    "Domestic animation took roughly a third of China's H1 2026 box office.",
    "No recent Chinese animated feature has had a wide US theatrical release.",
    "Major studios are financing multi-film franchise slates for the first time.",
  ],
  differingEmphasis: [
    "Sixth Tone treats US distribution as irrelevant; THR treats it as the test of success.",
    "The official bulletin claims policy credit; neither news outlet engages that claim.",
    "THR assumes diaspora audiences without data; Sixth Tone does not discuss overseas audiences at all.",
    "Only the primary document quantifies market share; both articles round it into narrative.",
  ],
  editorialNotes:
    "None of the three is wrong. The mainland source measures against China's own past, the US source against US market access, and the official bulletin against policy goals. Read together they describe an industry succeeding on the first metric, indifferent to the second, and claimed by the third.",
  relatedDispatchIds: ["d-001", "d-004"],
  provenance: "prototype",
};

export const comparisons: Comparison[] = [ComparisonSchema.parse(seed)];

export function getComparison(slug: string): Comparison | undefined {
  return comparisons.find((c) => c.slug === slug);
}
