# CLAUDE.md — zapier-support-integration

Zapier integration. One Create action ("Create Support Ticket") plus
hidden List Categories / List Priorities searches that drive the
dynamic dropdown fields. Same wire format as every other support
integration repo.

## Layout

- `index.js` — app shell (auth, creates, searches, beforeRequest bearer)
- `authentication/index.js` — custom auth fields, test hits `/lookup/categories`
- `creates/create_ticket.js` — POST `/tickets`
- `searches/list_categories.js` — GET `/lookup/categories` (also exports `fetchLookup` so priorities reuse the helper)
- `searches/list_priorities.js` — GET `/lookup/priorities`

## Mandatory rules

- All API calls go through `z.request` so retries/throttling/logging
  flow through Zapier's runtime.
- Never log the bearer.
- `source_app` is sourced from `authData.app_name` so the Support
  team can filter tickets per Zap.
- Category/priority lookups are HIDDEN searches — they exist only to
  back the dynamic dropdowns; users shouldn't see them as standalone
  Zap steps.
