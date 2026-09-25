# Prompt Deck Token Replacements

When implementing the prompt deck, replace each token with the value below.
Confirm each replacement in plain text when applied.

| Token | Replace with |
|-------|--------------|
| `<<OWNER_FULL_NAME>>` | Joshua B McGrew |
| `<<REVIEW_COUNT>>` | 11 |
| `<<LEGAL_NAME>>` | Beach House Moving LLC |
| `<<DURATIONS_OK>>` | Pricing starts at $195/hr for 2 movers + truck, plus drive time (PRICING.hourlyRate / RATE_LINE, owner-confirmed 2026-09-25; was $165). Fuel-included wording unchanged pending owner answer (PRICING-PAGE-PLAN C2). Docs follow production. |

> `<<REVIEW_COUNT>>` value 11 (canonical source: TESTIMONIALS.length — corrected 2026-07-19).

## Usage rules

- Apply replacements anywhere a token appears (copy, metadata, schema, JSX via `content.ts`, etc.).
- Do not invent alternate values for these tokens.
- After replacing a token in code or content, state plainly which token was replaced and what it became.
