# AGENTS.md

Small single-package Next.js app (not a monorepo): `app/` routes, `components/ui/` shadcn components, `components/theme-provider.tsx`, `hooks/`, `lib/` (mostly empty scaffolding). `CLAUDE.md` is just `@AGENTS.md`.

## Commands (npm, no lockfile alternatives)

- `npm run dev` — dev server
- `npm run lint` — eslint (flat config, `eslint.config.mjs`, next core-web-vitals + ts rules)
- `npm run typecheck` — `tsc --noEmit`
- `npm run format` — Prettier `--write` over `**/*.{ts,tsx}`
- `npm run build` — production build

There is **no test runner** — don't invent `npm test`. Verify with `npm run lint && npm run typecheck && npm run build`.

## Quirks that will bite you

- **Next.js is 16.4.3 — much newer than your training data.** Read the relevant guide in `node_modules/next/dist/docs/` (`01-app/...`) before writing Next.js code; APIs and conventions differ from older App Router knowledge.
- **The `<!-- BEGIN:nextjs-agent-rules -->` block below is machine-managed** by `next dev` (`node_modules/next/dist/server/lib/generate-agent-files.js`). Don't edit or delete it — edits are reverted/re-added on next `next dev`; keep it intact in commits.
- **Prettier style is non-default** (`.prettierrc`): no semicolons, double quotes, LF endings, Tailwind class sorting via `prettier-plugin-tailwindcss`. Match it by hand or run `npm run format` on files you touched only.
- **Tailwind v4** — no `tailwind.config.*`; config lives in `app/globals.css` (`@theme`). Prettier's plugin reads `tailwindStylesheet` pointing there.
- **shadcn**: `npx shadcn@latest add <component>` (style `base-nova`, RSC, lucide) writes to `components/ui/`; imports use the `@/*` alias mapped to the repo root (`tsconfig.json`).
- **No CI workflows and no pre-commit hooks** exist — nothing runs checks for you automatically.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
