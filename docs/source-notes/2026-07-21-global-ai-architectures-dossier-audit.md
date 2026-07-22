# Global AI architectures dossier — editorial audit

**Received:** 2026-07-21

**Disposition:** research intake, not publication copy

**Catalog change:** 12 source leads added; 56 total
**Public result:** none; every new item remains inside the editorial Desk

## Editorial judgment

The supplied draft contains a strong question: whether Chinese open-weight model
makers are turning constrained centralized distribution into broader ecosystem
distribution. That question fits Mainland Dispatch. The draft's current answer,
however, is too certain for the evidence it cites.

The publishable version should not be framed as a civilizational contest between
an inherently open China and an inherently closed United States. It should examine
several overlapping markets whose leaders, licenses, costs, and constraints differ:

1. model development and training;
2. hosted inference;
3. downloadable weights and self-hosting;
4. developer tools and production workloads;
5. chips, electricity, data centers, and robotics;
6. safety rules, political controls, and state access.

The clean Mainland Dispatch thesis is therefore a question, not a verdict:

> When model capability becomes easier to distribute, where does economic and
> political control move next—compute, hosting, tooling, energy, or standards?

## Claim audit

### Supported with explicit scope

- **Open weights change distribution.** Qwen, DeepSeek, and Kimi artifacts can be
  downloaded or served by multiple providers. Each license and release still needs
  individual review; `open weights` must not be silently rewritten as `open source`.
- **Long advertised context is not the same as reliable retrieval.** The 2023
  _Lost in the Middle_ paper demonstrates positional retrieval failures on its
  evaluated tasks. It does not establish that every model fails beyond 32,000 tokens.
- **Qwen offered a million-token product.** Qwen's November 2024 post makes that
  first-party claim and also acknowledges instability and inference cost in real
  long-sequence applications. Both statements belong together.
- **The CSIS foreign-policy benchmark found model differences.** Its simulated
  crisis results support a model-behavior finding within that benchmark. They do
  not establish a fixed Chinese national character, and CSIS notes overlap with
  non-Chinese models in parts of the analysis.
- **Cross-cultural public-opinion simulation has demographic blind spots.** The
  cited 2025 paper supports specific findings for ANES and Zuobiao tasks and finds
  overgeneralization across the evaluated models.
- **China dominated 2024 renewable-capacity additions.** IRENA reports that China
  contributed almost 64% of global additions. The record does not show that AI data
  centers caused those additions.
- **China also commissioned substantial coal capacity.** CREA and Global Energy
  Monitor report 78 GW in 2025. That fact should not be fused into an AI-energy
  causal claim without load, location, and grid evidence.

### Attribution required

- **Distillation:** Anthropic's 2026 report provides detailed allegations, traffic
  counts, and attribution methods involving DeepSeek, Moonshot, and MiniMax. Until
  independently corroborated, Mainland Dispatch should write “Anthropic says,” not
  “developer testing proves.” Model self-identification is not proof of a training
  pipeline.
- **DeepSeek training economics:** company papers can establish disclosed methods
  and reported training runs. They cannot by themselves establish total laboratory
  R&D cost or an apples-to-apples cost advantage over an undisclosed competitor.
- **Bias and censorship:** model-output audits can establish repeatable behavior
  under a documented protocol. They require model version, hosting path, system
  prompt, sampling settings, dates, complete prompts, and repeated trials before
  supporting causal claims about base data or reinforcement learning.

### Hold from publication

- The document-extraction cost table has no named dataset, provider, hardware,
  prompt, sampling parameters, currency date, repetitions, or reproducible output.
- The developer-utilization matrix is synthesis presented as measurement. It needs
  survey or telemetry evidence for every row.
- “Developer loyalty is nonexistent,” “switching requires only an API key,” and
  “virtually zero security friction” are absolutes contradicted by migration,
  evaluation, compliance, and operational differences.
- The claim that reasoning models generate a hidden internal token explosion needs
  model-specific documentation. Some systems expose reasoning tokens, some summarize
  them, and provider billing practices differ.
- The 671B/84 GB/1-bit sentence confuses a theoretical bit count with a deployable
  memory requirement. Quantization format, runtime overhead, KV cache, CPU offload,
  active experts, throughput target, and fidelity all matter.
- The 8×H200 and `$25/hour` assertion needs a dated provider quote and a reproducible
  serving configuration.
- The Casado statistic is not “80% of startups.” His reported clarification narrows
  it to roughly 80% of the 20–30% of applicants using open models—an anecdotal pitch
  sample, not a population estimate.
- Claims about U.S. intelligence pressure, NOBUS preservation, inevitable open-model
  victory, or Chinese robotics domination are hypotheses. They cannot be written as
  established mechanisms.
- The multilingual paper finds no consistent language-policy signal and similar
  performance across six Chinese models and 18 tested languages. That is narrower
  than “absolutely no evidence of systemic suppression or bias.”

## Recommended story architecture

### Working title

**Open Weights, Closed Questions**

### Deck

Chinese model makers are widening access to capable weights. That does not make
intelligence free—and it may move power from model APIs into chips, hosting,
electricity, tooling, and standards.

### Sections

1. **What is actually open?** Compare weights, code, data, licenses, and hosted APIs.
2. **Who pays for inference?** Separate training expense, serving cost, utilization,
   energy, and end-to-end task cost.
3. **What adoption can we observe?** Use downloads, provider traffic, repository
   derivatives, and disclosed production cases; keep VC anecdotes labeled.
4. **What do evaluations measure?** Put LMArena, long-context tests, foreign-policy
   simulations, and cultural studies beside their methodological limits.
5. **Where control moves next.** Examine accelerators, clouds, grids, deployment
   tooling, export controls, licenses, and robotics without declaring a winner.

Each section should use the publication's existing evidence rhythm:

```text
CLAIM → RECORD → COUNTEREVIDENCE → WHAT REMAINS UNKNOWN
```

## Added records

This pass added:

- _Lost in the Middle_;
- the Chinese-language-model language-policy study;
- Qwen's official million-token post;
- two CSIS analyses;
- the cross-cultural public-opinion paper;
- IRENA renewable-capacity data;
- CREA/GEM coal-capacity reporting;
- LMArena methodology context;
- Anthropic's distillation allegation;
- the Qwen-Robot product lead;
- one informal discussion prompt, excluded from the tracked evidence catalog.

## Exact stopping point

The draft has been decomposed into claims and 12 additional source leads. It has
not been converted into a public Dossier or Dispatch. Before drafting publication
copy, the next pass must obtain:

1. reproducible sources for both benchmark tables;
2. primary licenses and model cards for every named open-weight family;
3. provider invoices or dated pricing snapshots for cost-per-task comparisons;
4. a primary record for the Casado clarification;
5. independent evidence addressing Anthropic's distillation allegations;
6. region- and facility-level evidence before connecting power additions to AI;
7. a durable Qwen-Robot release page, repositories, licenses, and evaluation protocol.

Informal discussion remains outside the tracked evidence catalog and never
serves as factual evidence.
