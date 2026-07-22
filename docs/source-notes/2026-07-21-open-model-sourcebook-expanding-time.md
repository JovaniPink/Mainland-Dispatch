# Open-model sourcebook intake and chronological expansion

**Received:** 2026-07-21

**Source artifact:** user-supplied `pasted-text.txt`

**SHA-256:** `62b318cfbbeb94d7cb481a2f8068ce5f19fc6d641bbd5d8c97449b561d9cca09`

**Catalog result:** 44 source leads spanning 2006–2026
**Public result:** none; the source-lead inbox is editorial-only

## Editorial decision

The supplied sourcebook contains a large, useful July 2026 link collection, but most of its timeline clusters in 2025–2026. Importing it directly as Dispatches would make the publication more recency-heavy and would overstate how many pages Mainland Dispatch independently reviewed.

This pass therefore introduces a lighter `SourceLead` catalog. A lead can preserve a title, URL, source posture, topics, review state, and next-review date without becoming a public article or a fully written Dispatch.

The catalog starts with the 2006 national science-and-technology plan and moves through:

- Baidu’s 2014 research-lab expansion;
- Made in China 2025 and Deep Speech 2;
- the 2017 national AI development plan in Chinese and translation;
- 2018 strategy and industrial-automation research;
- 2019 governance principles;
- platform, labor, and cultural reporting from 2020–2022;
- China’s 2022 algorithm rules and 2023 generative-AI measures;
- DeepSeek and Qwen technical artifacts from 2024–2025;
- the supplied 2026 research, policy, and model-release package.

## Review-state contract

- `supplied`: present in the user sourcebook but not independently read in this pass.
- `metadata-checked`: canonical identity, date where available, and source type checked.
- `source-read`: substantive page content read during this or the immediately preceding intake.

The sourcebook’s A–D grades are stored only as `claimedGrade`. They record the supplied brief’s assessment; they are not silently converted into Mainland Dispatch verification.

Evidence posture is separate:

- `confirmed`: the source can establish the limited record described in its note;
- `vendor-claim`: first-party technical or performance claim still needing independent comparison;
- `disputed`: a live analytical argument with material counterclaims;
- `pending`: an announced release, proposal, or follow-up event;
- `unverified`: discovery/commentary material that cannot support a factual assertion.

Informal discussion material is not represented as a source lead. It may generate private research questions, but it never enters the tracked evidence catalog.

## Files

- Typed catalog: [`src/content/source-leads.ts`](../../src/content/source-leads.ts)
- Validation schema: [`src/content/schema.ts`](../../src/content/schema.ts)
- Editorial UI: [`src/components/desk/source-lead-inbox.tsx`](../../src/components/desk/source-lead-inbox.tsx)
- Tests: [`src/content/source-leads.test.ts`](../../src/content/source-leads.test.ts)

## Exact stopping point

The first catalog stops at 44 links. It preserves representative sourcebook material and establishes a 2006–2026 spine, but it does not attempt to transcribe every URL from the supplied brief.

The next expansion should begin before 2006 and should include:

1. pre-AI industrial and computing policy;
2. early Chinese internet, search, speech, and mobile-platform history;
3. Chinese-language first-party and technical sources;
4. older U.S.–China scientific-exchange and semiconductor records;
5. non-AI culture and everyday-life backfiles so the link archive remains broader than model competition.

Before promoting a source lead to a Dispatch, verify its canonical URL, byline/date, archival need, claim boundaries, translation lineage, and whether a better primary source exists.
