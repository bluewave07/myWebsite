# Portfolio Redesign — Design Spec

**Date:** 2026-09-12
**Author:** Abdulkadir Akyurt (with Claude)
**Status:** Draft — pending user review

---

## Purpose

The current portfolio (`abdulkadirakyurt.com`) reads as a template demo rather than
a professional's site: a Spline 3D solar-system hero, a cursor sparkle-trail
effect, and background particles dominate the first impression, while the real
substance (shipped projects, technical writing) is presented as generic
icon/tag cards.

Goal: rebuild the front-of-site experience so it reads as professional,
modern, and credible to the primary audience — **people evaluating Abdulkadir
for work** (employers, clients, collaborators) — without losing the personal
brand identity (name, hexagon "A" mark, pink→purple accent) or the existing
content systems (articles, project case studies) already built.

## Non-goals

- Not rebuilding the article/blog data layer (`lib/articles.ts`,
  `/articles/[slug]`) — it works and is actively used by the medium-bot
  pipeline. Only its *presentation* on the homepage changes (curated preview
  instead of a full tabbed wall).
- Not rebuilding `/projects/[slug]` — content is restructured (case-study
  framing) but the route and general layout pattern stay.
- Not touching `medium-bot` or its generation pipeline.
- Not introducing a CMS or making content editable outside code — this stays
  a code-authored personal site.

## Audience & Positioning

Primary audience: people deciding whether to hire, contract, or collaborate
with Abdulkadir. Secondary: QA/automation peers reading his writing.

Draft one-line positioning (to confirm in review):

> "QA Engineer & Test Automation Specialist — I build the tools that make
> quality possible, from resilient test frameworks to AI-powered engineering
> automation."

This leans on real, verifiable substance (he built two real automation
systems — medium-bot, x-bot) rather than a generic "passionate QA engineer"
line.

## Visual System

- **Theme:** Dark, high-contrast, restrained — near-black background
  (`#0a0a0d`-ish) instead of the current `#121212`/`#080810` mix, off-white
  text, generous whitespace. Same overall register as Linear/Vercel's own
  marketing sites: confident, quiet, not flashy.
- **Accent color:** One accent, not a gradient-everywhere treatment. Use the
  purple end of the current brand pair (`#4a2fbd`-family) as the single
  accent for links, buttons, and small highlights. The pink (`#aa367c`) is
  retired from primary UI use but can stay as a secondary tint in the hexagon
  mark gradient, since that mark is already a recognizable asset.
- **Typography:** One typeface family doing both headings and body (replacing
  the current forced Poppins/Karla pairing), at a few confident weights.
  Category/tag labels use a monospace face for a technical accent (nods to
  the QA/automation identity without being a gimmick). Exact font choice is
  an implementation-time decision (Google Fonts, self-hosted via `next/font`
  as today), not fixed here.
- **Motion:** CSS-only, subtle (hover states, fade/slide-in on scroll at
  most). No WebGL/3D library, no canvas particle system, no custom cursor.

## Page Structure

Single page, same anchor-navigation pattern as today (`#hero`, `#expertise`,
`#work`, `#writing`, `#contact`), so the existing Navbar pattern is reused
structurally.

### 1. Hero
Name, role, the one-line positioning statement, and two CTAs ("View my work",
"Get in touch"). Background: a lightweight CSS gradient/mesh, no 3D scene, no
particle canvas — fast first paint.

### 2. Expertise
Short, grouped list (not an icon grid): e.g. **Test Automation**
(Playwright, Cypress, CI integration), **AI-Assisted Engineering**
(Claude API integration, agentic pipelines), **Tooling & Infra** (Next.js,
Netlify, DNS/deployment). Each item: a one-line description, no filler.

### 3. Selected Work
2–3 case-study cards, each structured as **Problem → What was built → Stack
→ Outcome**, using only verifiable, qualitative outcome language (no
invented metrics):

- **Medium Bot** — an AI content pipeline that researches topics live,
  writes articles, and publishes them straight to this site.
- **X Automation Bot** — scheduled AI-drafted posting to X via the API.
- **Donau Schüler Eltern e.V. website** *(proposed addition — confirm in
  review)* — a real client project: migrated a nonprofit association's site
  to a modern Next.js stack with a custom domain, HTTPS, and hardened
  security headers. Demonstrates client-facing, full-stack delivery beyond
  personal tooling.

Each card links to its existing `/projects/[slug]` detail page (restyled to
match, not rebuilt).

### 4. Writing
A curated preview of the 3 most recent articles (pulled from the existing
`getAllArticles()`), not the current full category-tabbed wall. A single
"See all articles" link goes to a (new, simple) `/articles` index page —
today there is no such index; articles are only reachable via the homepage
tabs or direct link, which won't exist anymore once the tabs are gone. This
index page is a small necessary addition, not a redesign of article data.

### 5. Contact
Keep the existing Formspree-backed form. Drop the hardcoded `LEGACY` Medium
article list currently baked into `Projects.tsx` — it's dead content
unrelated to contact.

### 6. Footer
Simplified: name/mark, social links, copyright. No change in substance from
today, restyled to match.

## Component Changes

**Removed** (and their dependencies uninstalled):
- `components/Banner.tsx` (Spline scene host)
- `components/ui/splite.tsx`, `components/SolarSystem.tsx`
- `components/ui/magic-cursor.tsx` (+ its keyframes/classes in `globals.css`)
- `@splinetool/react-spline`, `@splinetool/runtime`,
  `@tsparticles/engine`, `@tsparticles/react`, `@tsparticles/slim`

**Rewritten:**
- `components/Navbar.tsx` — simplified link set, same anchor pattern
- `components/Hero.tsx` (replaces `Banner.tsx`)
- `components/Expertise.tsx` (replaces `Skills.tsx`)
- `components/SelectedWork.tsx` + `components/WritingPreview.tsx` (replace
  the single tabbed `Projects.tsx`, which mixed articles and projects)
- `components/Contact.tsx` — restyled, Formspree logic unchanged
- `components/Footer.tsx` — restyled

**Kept as-is (data layer, restyled where they render):**
- `lib/articles.ts`, `lib/projects.ts`
- `app/articles/[slug]/page.tsx`, `app/projects/[slug]/page.tsx` (restyled)
- `components/Logo.tsx` (hexagon "A" mark)

**New:**
- `app/articles/page.tsx` — simple index listing all articles (needed once
  the homepage no longer exposes the full list via tabs)

## Content Needed From User (surfaced during spec review)

1. Approve or edit the one-line positioning statement above.
2. Confirm whether to include the Donau e.V. site as a third case study.
3. Any real, specific outcome the user wants stated for medium-bot/x-bot
   (otherwise the case studies stay qualitative — what was built and why —
   with no invented numbers).

## Testing / Verification

No test suite exists for this project (confirmed prior to this spec). Verification is:
- `npm run build` succeeds (static export)
- Manual check via `npm run dev` in a browser: desktop + mobile widths,
  light/dark OS preference (site is dark-only, so confirm no light-mode
  regressions), and that removed dependencies leave no dangling imports
- Confirm bundle size drops (removed 3D/particle libraries) — informal
  sanity check via build output, not a hard budget

## Rollout

Implemented directly on `main` in the `Claude Web Clone test 1` /
`myWebsite-main` working copies (both kept in sync, as established
practice this session), committed incrementally per component, pushed to
`bluewave07/myWebsite`. Netlify deploys are currently paused (team credit
exhaustion, resets ~2026-09-18) — changes will queue on GitHub and go live
automatically once deploys resume, or can be checked locally via
`npm run dev` in the meantime.
