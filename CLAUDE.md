# CLAUDE.md

@AGENTS.md

> Claude Code and other AI agents should follow `AGENTS.md` for all project rules. Key locked facts: canonical domain `https://beachhousemoving.xyz` (`.com` not owned), SAB (no street address in public UI), quote-first CTA, owner-only Resend email in v1.1 (customer confirmation = v2), testimonials gated by `FLAGS.SHOW_TESTIMONIALS`.

## Conventions

- When a change alters rendered copy or links on neighborhood/county/service pages, set that record's `updatedAt` (or bump `CONTENT_REVISION` in `content.ts` for template-wide changes) in the same PR. Sitemap `lastmod` must never claim freshness that didn't happen.
- Stat sweeps include all *.md — living docs get corrected values; dated snapshots get a superseded header, never silent rewrites.
