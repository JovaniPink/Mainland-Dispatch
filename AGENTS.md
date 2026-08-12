# AGENTS.md

## Purpose

Mainland Dispatch is a Next.js editorial product prototype for contextual China
and US–China coverage. Preserve the Correspondent's Notebook visual identity,
the explicit evidence posture, and the distinction between prototype content and
verified reporting.

## Prerequisites

- Node 22.15 or newer
- npm
- Bootstrap with `npm ci`

## Canonical commands

| Command                    | Purpose                                                          |
| -------------------------- | ---------------------------------------------------------------- |
| `npm run dev`              | Start local development with State Lab inspectors                |
| `npm run lint`             | Run ESLint                                                       |
| `npm run toolchain:check`  | Validate the TypeScript 7 CLI and TypeScript 6 API contract      |
| `npm run typecheck`        | Generate route types and check with the TypeScript 7 CLI         |
| `npm run typecheck:compat` | Generate route types and check with the TypeScript 6 API line    |
| `npm test`                 | Run Jest and Testing Library tests                               |
| `npm run audit:production` | Reject high-severity advisories in deployed dependencies         |
| `npm run audit:toolchain`  | Reject high-severity advisories in the complete dependency graph |
| `npm run build`            | Build and validate the Next.js production artifact               |
| `npm run test-all`         | Run formatting, lint, types, tests, and the production build     |
| `npm run format`           | Format source files with Prettier                                |

## Working rules

- Public pages may consume only `publishedDispatches`; never import all Desk
  records into a public stream, route generator, relation, or saved view.
- Do not change `provenance` from `prototype` to `verified` without replacing
  every sample claim and URL with reviewed source material.
- Keep the Desk out of public navigation. It is a local sandbox, not an
  authenticated CMS.
- Add content through the Zod schemas and preserve the catalog-level uniqueness,
  date-order, chronology, and cross-reference checks.
- XState must own real transition behavior. Do not add states that the interface
  cannot enter or report successful media loading before load/error evidence.
- Preserve click-to-load privacy for third-party embeds.
- Use system font stacks or committed local fonts; production builds must not
  depend on fetching Google Fonts.
- Keep filenames kebab-case and reusable components as named exports.
- Keep TypeScript 7 as the explicit primary CLI and TypeScript 6 as the
  compiler-API compatibility line. Never replace the explicit compiler paths
  with a bare `tsc` or `npx tsc` command.

## Quality gate

Before finishing any change, run `npm run audit:production`,
`npm run audit:toolchain`, and `npm run test-all`. The repository gate fails
closed unless the expected TypeScript majors and both compiler checks pass. For
changes that affect layout, themes, media, Compare, Trace, or the Desk, also
inspect the production build at desktop and mobile widths.
