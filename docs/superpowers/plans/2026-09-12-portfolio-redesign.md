# Portfolio Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the current template-feeling homepage (Spline 3D hero, cursor sparkle trail, particle background, tabbed articles-and-projects wall) with a restrained, professional, single-accent-color design built around the site's real substance: the person's expertise, two shipped project case studies, and curated writing.

**Architecture:** Same Next.js App Router / static export site. No new routes except a small `/articles` index. Six components are rewritten from scratch (Navbar, Hero, Expertise, SelectedWork, WritingPreview, Contact, Footer), five files are deleted outright (Banner, SolarSystem, splite, space-stars, spotlight, magic-cursor, the old Projects.tsx), and the project data shape (`lib/projects.ts`) is simplified from a multi-section "architecture diagram" card to a four-part case-study shape (Problem / What was built / Stack / Outcome).

**Tech Stack:** Next.js 16 (App Router, static export), TypeScript, Tailwind CSS v4, `next/font/google` (Space Grotesk + Inter + JetBrains Mono, replacing Poppins/Karla), `lucide-react` (already installed — used for the Expertise section's icons). Scroll-reveal motion uses the existing `fadeIn`/`fadeUp` CSS keyframes, not a JS animation library — `framer-motion` and `@tsparticles/*` are removed in Task 6 as unused dead dependencies.

**Spec:** `docs/superpowers/specs/2026-09-12-portfolio-redesign-design.md`

## Global Constraints

- No WebGL/3D library, no canvas particle system, no custom cursor — CSS/Framer-Motion only for motion.
- One accent color for interactive UI (a violet in the `#4a2fbd` family); the pink (`#aa367c`) is retired from primary UI, kept only in the existing hexagon "A" mark gradient.
- One typeface family for headings+body (not the current forced two-Google-fonts pairing); a monospace face is used only for small tag/label text.
- No invented metrics in project case studies — outcome text stays qualitative.
- `lib/articles.ts`, `/articles/[slug]/page.tsx` data logic is not rebuilt, only restyled.
- This project has no test suite (confirmed before writing the spec). Every task's verification is `npm run build` succeeding, plus the step's own manual-check note. There is no `pytest`/`jest` equivalent to run here — do not invent one.
- Netlify deploys are currently paused (team credit exhaustion). Every commit should still be pushed to `main` as normal — it will deploy automatically once the pause lifts. Use `npm run dev` locally to see changes in the meantime.

---

## Design Tokens (used by every task below)

Add to `app/globals.css`, replacing the current `--bg` / `--bg2` / `--gradient` block:

```css
:root {
  --bg: #0a0a0d;
  --bg-elevated: #131316;
  --text: #f5f5f7;
  --text-muted: #9a9aa2;
  --accent: #7b61ff;
  --accent-dim: rgba(123, 97, 255, 0.14);
  --border: rgba(255, 255, 255, 0.08);
}
```

Fonts (set up in Task 2, referenced by every later task as CSS variables):
- `--font-display` → Space Grotesk (headings)
- `--font-sans` → Inter (body)
- `--font-mono` → JetBrains Mono (tags/labels)

---

### Task 1: Remove the cursor sparkle effect

**Files:**
- Delete: `components/ui/magic-cursor.tsx`
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: nothing new — this is pure removal. Confirms the removal pattern (delete file → remove import/usage → remove tied CSS → build) used by later tasks.

- [ ] **Step 1: Delete the magic cursor component**

```bash
rm "components/ui/magic-cursor.tsx"
```

- [ ] **Step 2: Remove its import and usage from the root layout**

In `app/layout.tsx`, remove this line:
```tsx
import { MagicCursor } from "@/components/ui/magic-cursor";
```
and remove this line from inside `<body>`:
```tsx
<MagicCursor />
```

- [ ] **Step 3: Remove the tied CSS from globals.css**

In `app/globals.css`, delete this whole block (the `--mouse-sparkles-glow-rgb` variable, both `.mouse-sparkles-*` rules, and the three `@keyframes fall-N` blocks that only those rules use):

```css
/* ── Magic cursor ─────────────────────────────────────────────────────────── */
:root {
  --mouse-sparkles-glow-rgb: 239 42 201;
}

.mouse-sparkles-star {
  position: fixed;
  pointer-events: none;
  z-index: 99999;
  width: 1em;
  height: 1em;
}

.mouse-sparkles-glow-point {
  position: fixed;
  pointer-events: none;
  z-index: 99998;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: rgb(var(--mouse-sparkles-glow-rgb) / 0.7);
  box-shadow: 0 0 6px 2px rgb(var(--mouse-sparkles-glow-rgb) / 0.4);
  transform: translate(-50%, -50%);
}

@keyframes fall-1 {
  0%   { transform: translate(0px, 0px)   rotateX(45deg)   rotateY(30deg)  rotateZ(0deg)   scale(0.25); opacity: 0; }
  5%   { transform: translate(10px, -10px) rotateX(45deg)   rotateY(30deg)  rotateZ(0deg)   scale(1);    opacity: 1; }
  100% { transform: translate(25px, 200px) rotateX(180deg)  rotateY(270deg) rotateZ(90deg)  scale(1);    opacity: 0; }
}

@keyframes fall-2 {
  0%   { transform: translate(0px, 0px)    rotateX(-20deg) rotateY(10deg)  scale(0.25); opacity: 0; }
  10%  { transform: translate(-10px, -5px) rotateX(-20deg) rotateY(10deg)  scale(1);    opacity: 1; }
  100% { transform: translate(-10px, 160px) rotateX(-90deg) rotateY(45deg) scale(0.25); opacity: 0; }
}

@keyframes fall-3 {
  0%   { transform: translate(0px, 0px)  rotateX(0deg) rotateY(45deg)   scale(0.5); opacity: 0; }
  15%  { transform: translate(7px, 5px)  rotateX(0deg) rotateY(45deg)   scale(1);   opacity: 1; }
  100% { transform: translate(20px, 120px) rotateX(-180deg) rotateY(-90deg) scale(0.5); opacity: 0; }
}
/* ────────────────────────────────────────────────────────────────────────── */
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: succeeds with no errors, no warning about a missing `magic-cursor` import.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
refactor: remove cursor sparkle effect

First step of the portfolio redesign (see docs/superpowers/specs/2026-09-12-portfolio-redesign-design.md).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 2: New typography and color foundation

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: CSS variables `--bg`, `--bg-elevated`, `--text`, `--text-muted`, `--accent`, `--accent-dim`, `--border` (used by every component task from here on). Font CSS variables `--font-display`, `--font-sans`, `--font-mono` (from `next/font/google`, applied via `className` on `<html>`, used the same way the old `--font-poppins`/`--font-karla` were).

- [ ] **Step 1: Swap the font setup**

In `app/layout.tsx`, replace:
```tsx
import { Poppins, Karla } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-poppins",
});

// Karla = closest free alternative to Centra (the font ekremkurt.com uses)
const karla = Karla({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-karla",
});
```
with:
```tsx
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-display",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["500"],
  variable: "--font-mono",
});
```

Update the `<html>` tag's `className` from:
```tsx
<html lang="en" className={`${poppins.variable} ${karla.variable}`}>
```
to:
```tsx
<html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable}`}>
```

Update the `<body>` tag's inline `style` from:
```tsx
<body className="min-h-screen" style={{ fontFamily: "'Poppins', sans-serif" }}>
```
to:
```tsx
<body className="min-h-screen" style={{ fontFamily: "var(--font-sans), sans-serif" }}>
```

- [ ] **Step 2: Replace the color tokens in globals.css**

Replace:
```css
:root {
  --bg: #0a0a12;
  --bg2: #12121e;
  --gradient: linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%);
}
```
with:
```css
:root {
  --bg: #0a0a0d;
  --bg-elevated: #131316;
  --text: #f5f5f7;
  --text-muted: #9a9aa2;
  --accent: #7b61ff;
  --accent-dim: rgba(123, 97, 255, 0.14);
  --border: rgba(255, 255, 255, 0.08);
}
```

Update the `body` rule (it currently hardcodes Poppins and the old bg var, both already about to be wrong):
```css
body {
  background: var(--bg);
  color: #ffffff;
  font-family: 'Poppins', sans-serif;
  overflow-x: hidden;
}
```
to:
```css
body {
  background: var(--bg);
  color: var(--text);
  font-family: var(--font-sans), sans-serif;
  overflow-x: hidden;
}

h1, h2, h3, h4 {
  font-family: var(--font-display), sans-serif;
}
```

- [ ] **Step 3: Remove now-fully-dead rules tied to the old gradient/typewriter/marquee/orbit effects**

These are unused already (verified via grep across `app/` and `components/` before writing this plan) or become unused once Tasks 3–9 remove their last caller. Removing them all now is safe and keeps `globals.css` from accumulating removal debt across many tasks — delete:

```css
.gradient-text {
  background: linear-gradient(135deg, #7b2ff7 0%, #f107a3 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```
```css
@keyframes spotlight {
  0% { opacity: 0; transform: translate(-72%, -62%) scale(0.5); }
  100% { opacity: 1; transform: translate(-50%, -40%) scale(1); }
}

.animate-spotlight {
  animation: spotlight 2s ease 0.75s 1 forwards;
}
```
```css
@keyframes blink {
  0%, 49% { opacity: 1; }
  50%, 100% { opacity: 0; }
}
```
```css
@keyframes float {
  0%, 100% { transform: translateY(0px) rotate(-5deg); }
  50% { transform: translateY(-20px) rotate(-5deg); }
}
```
```css
@keyframes orbitRing {
  from { transform: rotateX(75deg) rotateZ(0deg); }
  to { transform: rotateX(75deg) rotateZ(360deg); }
}
```
```css
@keyframes pulse-glow {
  0%, 100% { opacity: 0.4; transform: scale(1); }
  50% { opacity: 0.8; transform: scale(1.05); }
}
```
```css
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```
```css
/* ekremkurt.com real keyframes */
@keyframes updown {
  0%   { transform: translateY(-20px); }
  50%  { transform: translateY(20px); }
  100% { transform: translateY(-20px); }
}
```
```css
.cursor-blink {
  animation: blink 1s step-end infinite;
}
```
```css
.astronaut {
  animation: float 4s ease-in-out infinite;
}
```

Keep `@keyframes fadeIn` and `@keyframes fadeUp` and the `.fade-up` class — Tasks 5, 8, and 9 reuse them for scroll-reveal.

Keep `.social-icon-link`/`.social-icon-bg` (Task 3/4 still use them) and `@keyframes marquee-scroll` for now — Task 6 removes it when it deletes `Skills.tsx`, the only thing using it.

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: succeeds. Grep the build output HTML for the new font variable to confirm it's wired up:

Run: `grep -o "font-display" "out/index.html" | head -1`
Expected: prints `font-display` (the CSS variable name appears in the compiled stylesheet reference).

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat: new typography and color foundation

Space Grotesk (display) + Inter (body) + JetBrains Mono (tags)
replace the Poppins/Karla pairing. New near-black background and
single violet accent token replace the old purple/pink gradient
background variables. Also removes CSS rules already fully dead
(gradient-text, spotlight, float/orbitRing/pulse-glow/spin-slow/
updown) or dead once this task's font/color change lands
(cursor-blink, astronaut).

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 3: Rebuild the Footer

**Files:**
- Modify: `components/Footer.tsx`

**Interfaces:**
- Consumes: `components/Logo.tsx` (unchanged, exports default `CloneLogo({ size }: { size?: number })`)
- Produces: no change to the component's public shape — still `export default function Footer()`, still rendered by `app/page.tsx` with no props.

- [ ] **Step 1: Replace the whole file**

```tsx
import Logo from '@/components/Logo';

const SOCIALS = [
  { href: 'https://www.linkedin.com/in/bluewave24/', label: 'LinkedIn', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6zM2 9h4v12H2z"/><circle cx="4" cy="4" r="2"/></svg> },
  { href: 'https://www.instagram.com/akyurt.ak/', label: 'Instagram', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="2" y="2" width="20" height="20" rx="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg> },
  { href: 'https://x.com/bluewave1729', label: 'X', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.744l7.73-8.835L1.254 2.25H8.08l4.259 5.631 5.905-5.631Zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg> },
  { href: 'https://medium.com/@abdulkadirakyurt.de', label: 'Medium', icon: <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M13.54 12a6.8 6.8 0 0 1-6.77 6.82A6.8 6.8 0 0 1 0 12a6.8 6.8 0 0 1 6.77-6.82A6.8 6.8 0 0 1 13.54 12zm7.42 0c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/></svg> },
];

export default function Footer() {
  return (
    <footer style={{ background: 'var(--bg)', borderTop: '1px solid var(--border)', padding: '40px 24px' }}>
      <div
        className="flex flex-col sm:flex-row items-center justify-between gap-6"
        style={{ maxWidth: 1140, margin: '0 auto' }}
      >
        <Logo size={40} />

        <p style={{ color: 'var(--text-muted)', fontSize: 13 }}>
          © {new Date().getFullYear()} Abdulkadir Akyurt
        </p>

        <div className="flex items-center gap-3">
          {SOCIALS.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex items-center justify-center transition-colors"
              style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: '1px solid var(--border)',
                color: 'var(--text-muted)',
              }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'var(--text)'; e.currentTarget.style.borderColor = 'var(--text-muted)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'var(--text-muted)'; e.currentTarget.style.borderColor = 'var(--border)'; }}
            >
              {s.icon}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 3: Commit**

```bash
git add components/Footer.tsx
git commit -m "$(cat <<'EOF'
refactor: rebuild Footer with new design tokens

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 4: Rebuild the Navbar

**Files:**
- Modify: `components/Navbar.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Consumes: `components/Logo.tsx` (unchanged)
- Produces: no change to the component's public shape — still `export default function Navbar()`, no props, still `'use client'` (keeps its own scroll/mobile-menu state).

- [ ] **Step 1: Replace the whole file**

```tsx
'use client';
import { useEffect, useState } from 'react';
import Logo from '@/components/Logo';

const LINKS = ['Expertise', 'Work', 'Writing'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-[9999] py-3"
      style={{
        background: scrolled ? 'rgba(10,10,13,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border)' : '1px solid transparent',
        transition: 'background .25s ease, border-color .25s ease',
      }}
    >
      <div className="max-w-[1140px] mx-auto px-6 flex items-center justify-between" style={{ margin: '0 auto' }}>
        <a href="#hero" className="flex-shrink-0">
          <Logo size={36} />
        </a>

        <div className="hidden md:flex items-center gap-8">
          {LINKS.map((l) => (
            <a
              key={l}
              href={`#${l.toLowerCase()}`}
              className="text-sm font-medium transition-colors"
              style={{ color: 'var(--text-muted)' }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-muted)')}
            >
              {l}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          className="hidden md:inline-block text-sm font-medium"
          style={{
            padding: '8px 18px',
            borderRadius: 8,
            background: 'var(--accent)',
            color: '#fff',
          }}
        >
          Get in touch
        </a>

        <button className="md:hidden" style={{ color: 'var(--text)' }} onClick={() => setOpen((o) => !o)} aria-label="Toggle menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2">
            {open ? (
              <><line x1="17" y1="5" x2="5" y2="17" /><line x1="5" y1="5" x2="17" y2="17" /></>
            ) : (
              <><line x1="3" y1="11" x2="19" y2="11" /><line x1="3" y1="6" x2="19" y2="6" /><line x1="3" y1="16" x2="19" y2="16" /></>
            )}
          </svg>
        </button>
      </div>

      {open && (
        <div className="md:hidden px-6 pt-4 pb-2 flex flex-col gap-4" style={{ background: 'var(--bg)' }}>
          {LINKS.map((l) => (
            <a key={l} href={`#${l.toLowerCase()}`} style={{ color: 'var(--text-muted)', fontSize: 14 }} onClick={() => setOpen(false)}>
              {l}
            </a>
          ))}
          <a href="#contact" style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 500 }} onClick={() => setOpen(false)}>
            Get in touch
          </a>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 2: Remove the now-unused `.navbar-connect-btn` rules from globals.css**

Delete (the new CTA link above uses a plain inline style, not this class):
```css
/* Navbar "Let's Connect" button – original style */
.navbar-connect-btn {
  border: 1px solid #fff;
  color: #fff;
  font-size: 18px;
  font-weight: 700;
  letter-spacing: 0.8px;
  padding: 18px 34px;
  position: relative;
  overflow: hidden;
  display: inline-block;
  text-decoration: none;
  transition: color 0.3s ease-in-out;
}
.navbar-connect-btn::before {
  content: '';
  background-color: #fff;
  position: absolute;
  top: 0; left: 0;
  width: 0; height: 100%;
  transition: width 0.3s ease-in-out;
  z-index: 0;
}
.navbar-connect-btn:hover { color: #121212 !important; }
.navbar-connect-btn:hover::before { width: 100%; }
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 4: Commit**

```bash
git add components/Navbar.tsx app/globals.css
git commit -m "$(cat <<'EOF'
refactor: rebuild Navbar with new design tokens

Simplified link set (Expertise/Work/Writing) matching the new
homepage sections; drops the bespoke fill-on-hover CSS button for a
plain accent-colored CTA.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 5: New Hero (replaces Banner + its 3D/starfield stack)

**Files:**
- Create: `components/Hero.tsx`
- Delete: `components/Banner.tsx`, `components/SolarSystem.tsx`, `components/ui/splite.tsx`, `components/ui/space-stars.tsx`, `components/ui/spotlight.tsx`
- Modify: `app/page.tsx`
- Modify: `package.json` (via `npm uninstall`)

**Interfaces:**
- Produces: `export default function Hero()` — no props, no `'use client'` needed (no interactivity/state, just a CSS gradient background and static text/links).
- Consumes (in `app/page.tsx`): replaces the `<Banner />` call with `<Hero />`.

- [ ] **Step 1: Create the new Hero component**

```tsx
export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden"
      style={{ padding: '180px 24px 120px' }}
    >
      {/* Lightweight CSS-only background: two soft radial glows, no canvas/WebGL */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(60% 50% at 15% 10%, var(--accent-dim), transparent 70%), radial-gradient(50% 40% at 90% 30%, rgba(170,54,124,0.10), transparent 70%)',
        }}
      />

      <div className="relative" style={{ maxWidth: 780, margin: '0 auto' }}>
        <p
          className="fade-up"
          style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 13, color: 'var(--accent)', letterSpacing: '0.4px', marginBottom: 20 }}
        >
          Abdulkadir Akyurt
        </p>

        <h1
          className="fade-up"
          style={{
            fontFamily: 'var(--font-display), sans-serif',
            fontSize: 'clamp(32px, 5vw, 52px)',
            fontWeight: 600,
            lineHeight: 1.15,
            color: 'var(--text)',
            marginBottom: 24,
            animationDelay: '0.05s',
            animationFillMode: 'backwards',
          }}
        >
          QA Engineer &amp; Test Automation Specialist — I build the tools that
          make quality possible, from resilient test frameworks to AI-powered
          engineering automation.
        </h1>

        <div
          className="fade-up flex flex-wrap gap-4"
          style={{ animationDelay: '0.1s', animationFillMode: 'backwards' }}
        >
          <a
            href="#work"
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              background: 'var(--accent)',
              color: '#fff',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            View my work
          </a>
          <a
            href="#contact"
            style={{
              padding: '12px 24px',
              borderRadius: 8,
              border: '1px solid var(--border)',
              color: 'var(--text)',
              fontSize: 15,
              fontWeight: 500,
            }}
          >
            Get in touch
          </a>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete the removed files**

```bash
rm "components/Banner.tsx" "components/SolarSystem.tsx" "components/ui/splite.tsx" "components/ui/space-stars.tsx" "components/ui/spotlight.tsx"
```

(`space-stars.tsx` and `spotlight.tsx` have no other callers anywhere in `app/` or `components/` — verified by grep before writing this plan — so removing them alongside `Banner.tsx` is safe.)

- [ ] **Step 3: Wire the new component into the homepage**

In `app/page.tsx`, replace:
```tsx
import Banner from '@/components/Banner';
```
with:
```tsx
import Hero from '@/components/Hero';
```
and replace the `<Banner />` line with `<Hero />`.

- [ ] **Step 4: Uninstall the now-unused Spline packages**

```bash
npm uninstall @splinetool/react-spline @splinetool/runtime
```

- [ ] **Step 5: Verify the build**

Run: `npm run build`
Expected: succeeds, and the route list no longer implicitly bundles Spline (spot-check: `du -sh node_modules/@splinetool 2>/dev/null` should print nothing / "No such file or directory").

- [ ] **Step 6: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat: replace 3D hero with lightweight CSS hero

Removes the Spline solar-system scene, the canvas starfield, and the
unused Spotlight component along with it. Uninstalls
@splinetool/react-spline and @splinetool/runtime.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 6: New Expertise (replaces Skills)

**Files:**
- Create: `components/Expertise.tsx`
- Delete: `components/Skills.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`
- Modify: `package.json` (via `npm uninstall`)

**Interfaces:**
- Produces: `export default function Expertise()` — no props, no `'use client'` needed.

- [ ] **Step 1: Create the new Expertise component**

```tsx
import { TestTube2, Bot, Wrench } from 'lucide-react';

const GROUPS = [
  {
    icon: TestTube2,
    title: 'Test Automation',
    items: ['Playwright & Cypress at scale', 'Reducing flaky-test rates in CI', 'Page Object / test-data architecture'],
  },
  {
    icon: Bot,
    title: 'AI-Assisted Engineering',
    items: ['Claude API integration', 'Agentic content & automation pipelines', 'Prompt design for reliable output'],
  },
  {
    icon: Wrench,
    title: 'Tooling & Infra',
    items: ['Next.js, TypeScript', 'Netlify deployment & DNS', 'Prisma / SQLite-backed tools'],
  },
];

export default function Expertise() {
  return (
    <section id="expertise" style={{ padding: '100px 24px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <h2
          style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 600, color: 'var(--text)', marginBottom: 48 }}
        >
          Expertise
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {GROUPS.map(({ icon: Icon, title, items }) => (
            <div key={title}>
              <Icon size={22} color="var(--accent)" style={{ marginBottom: 14 }} />
              <h3 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 18, fontWeight: 600, color: 'var(--text)', marginBottom: 12 }}>
                {title}
              </h3>
              <ul style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                {items.map((item) => (
                  <li key={item} style={{ fontSize: 14, color: 'var(--text-muted)', lineHeight: 1.5 }}>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Delete the old component**

```bash
rm "components/Skills.tsx"
```

- [ ] **Step 3: Wire the new component into the homepage**

In `app/page.tsx`, replace:
```tsx
import Skills from '@/components/Skills';
```
with:
```tsx
import Expertise from '@/components/Expertise';
```
and replace `<Skills />` with `<Expertise />`.

- [ ] **Step 4: Remove the now-unused marquee keyframes from globals.css**

Delete:
```css
@keyframes marquee-scroll {
  0%   { transform: translateX(0); }
  100% { transform: translateX(-50%); }
}
```

- [ ] **Step 5: Uninstall the unused tsparticles and framer-motion packages**

Both were installed but never imported anywhere in `app/` or `components/`
(verified by grep before writing this plan — `framer-motion` in particular
was never wired up to anything despite being in `package.json`) — this is a
good moment to remove that dead weight since we're already cleaning up
this area of the codebase.

```bash
npm uninstall @tsparticles/engine @tsparticles/react @tsparticles/slim framer-motion
```

- [ ] **Step 6: Verify the build**

Run: `npm run build`
Expected: succeeds.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat: replace Skills marquee with an Expertise section

Grouped, one-line-per-item list (Test Automation / AI-Assisted
Engineering / Tooling & Infra) instead of a scrolling logo marquee.
Also removes the @tsparticles/* and framer-motion packages, which
were installed but never actually used anywhere in the codebase.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 7: Restructure project data + rebuild the project detail page

**Files:**
- Modify: `lib/projects.ts`
- Modify: `app/projects/[slug]/page.tsx`

**Interfaces:**
- Produces: new `ProjectData` shape —
  ```ts
  export interface ProjectData {
    slug: string
    title: string
    tag: string
    img: string
    problem: string
    whatWeBuilt: string
    stack: string[]
    outcome: string
  }
  export function getAllProjects(): ProjectData[]
  export function getProjectBySlug(slug: string): ProjectData | undefined
  ```
  (Same two function names/signatures as before — only the shape of the data they return changes — so Task 8's `SelectedWork.tsx` and this task's rewritten detail page are the only consumers that need to know about the new fields.)

- [ ] **Step 1: Replace `lib/projects.ts`**

```ts
export interface ProjectData {
  slug: string
  title: string
  tag: string
  img: string
  problem: string
  whatWeBuilt: string
  stack: string[]
  outcome: string
}

const PROJECTS: ProjectData[] = [
  {
    slug: 'medium-bot',
    title: 'Medium Bot',
    tag: 'AI · Automation',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80',
    problem:
      'Writing, researching, and publishing technical articles consistently takes more time than most engineers can spare on top of their day job.',
    whatWeBuilt:
      'An AI content pipeline that researches a topic live (Anthropic web search), drafts a full article in a consistent editorial voice, and — once approved — publishes it straight to this site. Medium is an optional, separate cross-post rather than a prerequisite. Supports multiple content categories and a self-directed topic-series mode with dashboard-driven review before anything goes live.',
    stack: ['Next.js', 'TypeScript', 'Claude AI', 'Prisma', 'SQLite', 'node-cron'],
    outcome:
      'Runs as a standing pipeline behind this site\'s Writing section — every article currently on abdulkadirakyurt.com/articles was generated, reviewed, and published through it.',
  },
  {
    slug: 'x-bot',
    title: 'X Automation Bot',
    tag: 'AI · Social Media',
    img: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1200&q=80',
    problem:
      'Maintaining a consistent posting cadence on X around QA/testing topics competes directly with actual engineering time.',
    whatWeBuilt:
      'A Python bot that drafts QA-focused posts with Claude and publishes them on a schedule via the X API v2, with rate-limit-aware retry handling.',
    stack: ['Python', 'X API v2', 'Claude AI', 'Tweepy'],
    outcome:
      'Keeps a posting cadence running without manual day-to-day intervention.',
  },
]

export function getAllProjects(): ProjectData[] {
  return PROJECTS
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find((p) => p.slug === slug)
}
```

- [ ] **Step 2: Replace `app/projects/[slug]/page.tsx`**

```tsx
import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export function generateStaticParams() {
  return getAllProjects().map((p) => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <div style={{ position: 'relative', height: 280, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(10,10,13,0.4) 0%, var(--bg) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 24px 32px', maxWidth: 900, margin: '0 auto' }}>
          <Link href="/#work" style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 14 }}>
            ← Back to work
          </Link>
          <span
            style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--accent)', marginBottom: 8, display: 'block' }}
          >
            {project.tag}
          </span>
          <h1 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, color: 'var(--text)', margin: 0 }}>
            {project.title}
          </h1>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '48px 24px 96px' }}>
        <Section title="Problem">
          <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7 }}>{project.problem}</p>
        </Section>
        <Section title="What was built">
          <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7 }}>{project.whatWeBuilt}</p>
        </Section>
        <Section title="Stack">
          <div className="flex flex-wrap gap-2">
            {project.stack.map((t) => (
              <span
                key={t}
                style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--text-muted)', border: '1px solid var(--border)', borderRadius: 6, padding: '4px 10px' }}
              >
                {t}
              </span>
            ))}
          </div>
        </Section>
        <Section title="Outcome">
          <p style={{ color: 'var(--text-muted)', fontSize: 16, lineHeight: 1.7 }}>{project.outcome}</p>
        </Section>
      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 40 }}>
      <h2 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 15, fontWeight: 600, color: 'var(--text)', marginBottom: 14, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
        {title}
      </h2>
      {children}
    </div>
  )
}
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: succeeds; the route list still shows `/projects/medium-bot` and `/projects/x-bot` as prerendered.

- [ ] **Step 4: Commit**

```bash
git add lib/projects.ts "app/projects/[slug]/page.tsx"
git commit -m "$(cat <<'EOF'
refactor: restructure project data to case-study shape

Replaces the flow/architecture/modules card structure with
Problem/What was built/Stack/Outcome, matching the redesign spec.
No invented metrics — outcome text stays qualitative.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 8: New SelectedWork component

**Files:**
- Create: `components/SelectedWork.tsx`

**Interfaces:**
- Consumes: `getAllProjects()` from `lib/projects.ts` (Task 7's new shape).
- Produces: `export default function SelectedWork()` — no props, no `'use client'` needed.

- [ ] **Step 1: Create the component**

```tsx
import Link from 'next/link'
import { getAllProjects } from '@/lib/projects'

export default function SelectedWork() {
  const projects = getAllProjects()

  return (
    <section id="work" style={{ padding: '40px 24px 100px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <h2
          className="fade-up"
          style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 600, color: 'var(--text)', marginBottom: 48 }}
        >
          Selected Work
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((p) => (
            <Link key={p.slug} href={`/projects/${p.slug}`} style={{ textDecoration: 'none' }}>
              <div
                className="group"
                style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 28, background: 'var(--bg-elevated)', height: '100%' }}
              >
                <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 12, color: 'var(--accent)' }}>{p.tag}</span>
                <h3 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 20, fontWeight: 600, color: 'var(--text)', margin: '10px 0 12px' }}>
                  {p.title}
                </h3>
                <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6, marginBottom: 16 }}>{p.problem}</p>
                <span
                  className="group-hover:underline"
                  style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 500 }}
                >
                  Read the case study →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: succeeds (this component isn't wired into `app/page.tsx` until Task 11, so this step only confirms the file itself compiles — it's currently unreferenced, which `next build` does not error on).

- [ ] **Step 3: Commit**

```bash
git add components/SelectedWork.tsx
git commit -m "$(cat <<'EOF'
feat: add SelectedWork component

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 9: New WritingPreview component + `/articles` index page

**Files:**
- Create: `lib/categories.ts`
- Create: `components/WritingPreview.tsx`
- Create: `app/articles/page.tsx`

**Interfaces:**
- Consumes: `getAllArticles()` from `lib/articles.ts` (unchanged — returns `Article[]` sorted newest-first, per the existing implementation).
- Produces: `CATEGORY_LABELS: Record<string, string>` from `lib/categories.ts` (Task 10 also switches to importing this, instead of each file keeping its own copy of the same map — a duplication that already existed once between `Projects.tsx` and `app/articles/[slug]/page.tsx` before this redesign, and would have become a third copy here otherwise). Also `export default function WritingPreview({ articles }: { articles: Article[] })`.

- [ ] **Step 1: Create the shared category label map**

```ts
export const CATEGORY_LABELS: Record<string, string> = {
  'qa-automation': 'QA Automation',
  'frameworks': 'Frameworks',
  'industry-news': 'Industry News',
  'best-practices': 'Best Practices',
  'ai-testing': 'AI in Testing',
  'ai-fundamentals': 'AI Fundamentals',
}
```

Save as `lib/categories.ts`.

- [ ] **Step 2: Create the WritingPreview component**

```tsx
import Link from 'next/link'
import type { Article } from '@/lib/articles'
import { CATEGORY_LABELS } from '@/lib/categories'

export default function WritingPreview({ articles }: { articles: Article[] }) {
  const recent = articles.slice(0, 3)

  return (
    <section id="writing" style={{ padding: '40px 24px 100px', background: 'var(--bg-elevated)' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div className="flex items-end justify-between flex-wrap gap-4" style={{ marginBottom: 48 }}>
          <h2 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 600, color: 'var(--text)' }}>
            Writing
          </h2>
          <Link href="/articles" style={{ color: 'var(--accent)', fontSize: 14, fontWeight: 500 }}>
            See all articles →
          </Link>
        </div>

        {recent.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>No articles yet.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recent.map((a) => (
              <Link key={a.slug} href={a.mediumUrl || `/articles/${a.slug}`} target={a.mediumUrl ? '_blank' : undefined} style={{ textDecoration: 'none' }}>
                <div style={{ border: '1px solid var(--border)', borderRadius: 16, padding: 24, background: 'var(--bg)', height: '100%' }}>
                  <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--accent)' }}>
                    {CATEGORY_LABELS[a.category] ?? a.category}
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 16, fontWeight: 600, color: 'var(--text)', margin: '10px 0 8px' }}>
                    {a.title}
                  </h3>
                  <p style={{ color: 'var(--text-muted)', fontSize: 13, lineHeight: 1.6 }}>{a.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
```

- [ ] **Step 3: Create the `/articles` index page**

```tsx
import Link from 'next/link'
import { getAllArticles } from '@/lib/articles'
import { CATEGORY_LABELS } from '@/lib/categories'

export const metadata = {
  title: 'Writing — Abdulkadir Akyurt',
}

export default function ArticlesIndexPage() {
  const articles = getAllArticles()

  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh', padding: '140px 24px 96px' }}>
      <div style={{ maxWidth: 900, margin: '0 auto' }}>
        <Link href="/#writing" style={{ color: 'var(--text-muted)', fontSize: 13, marginBottom: 24, display: 'inline-block' }}>
          ← Back home
        </Link>
        <h1 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(28px,4vw,40px)', fontWeight: 600, color: 'var(--text)', marginBottom: 40 }}>
          Writing
        </h1>

        <div className="flex flex-col" style={{ gap: 0 }}>
          {articles.map((a) => (
            <Link
              key={a.slug}
              href={a.mediumUrl || `/articles/${a.slug}`}
              target={a.mediumUrl ? '_blank' : undefined}
              style={{ textDecoration: 'none', borderBottom: '1px solid var(--border)', padding: '20px 0', display: 'block' }}
            >
              <span style={{ fontFamily: 'var(--font-mono), monospace', fontSize: 11, color: 'var(--accent)' }}>
                {CATEGORY_LABELS[a.category] ?? a.category}
              </span>
              <h2 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 18, fontWeight: 600, color: 'var(--text)', margin: '8px 0' }}>
                {a.title}
              </h2>
              <p style={{ color: 'var(--text-muted)', fontSize: 14, lineHeight: 1.6 }}>{a.excerpt}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
```

- [ ] **Step 4: Verify the build**

Run: `npm run build`
Expected: succeeds and the route list includes `/articles` as a new static route.

- [ ] **Step 5: Commit**

```bash
git add lib/categories.ts components/WritingPreview.tsx app/articles/page.tsx
git commit -m "$(cat <<'EOF'
feat: add WritingPreview component and /articles index page

The homepage will show only the 3 most recent articles; this new
index page is where "See all articles" links to, since removing the
old full category-tabbed wall removes the only place every article
was reachable from. Category labels now live in one shared
lib/categories.ts instead of being copy-pasted per file.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 10: Restyle the article detail page

**Files:**
- Modify: `app/articles/[slug]/page.tsx`

**Interfaces:**
- Consumes: `CATEGORY_LABELS` from `lib/categories.ts` (created in Task 9).
- No other shape change — same `generateStaticParams`, `generateMetadata`, and default export signature. Only inline styles change (old `#080810`/Poppins tokens → the new CSS variables).

- [ ] **Step 1: Replace the local category label map with the shared one**

This file currently defines its own local `CATEGORY_LABELS` object. Delete
that local `const CATEGORY_LABELS: Record<string, string> = { ... }` block
and add this import at the top instead:
```tsx
import { CATEGORY_LABELS } from '@/lib/categories'
```
Everything else in the file that reads `CATEGORY_LABELS[...]` stays exactly
as it is — only where the map comes from changes.

- [ ] **Step 2: Replace the hardcoded color/font tokens**

Change the `<main>` tag's style from:
```tsx
<main style={{ background: '#080810', minHeight: '100vh', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>
```
to:
```tsx
<main style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--text)' }}>
```
(font now comes from `body`'s `font-family: var(--font-sans)` set in Task 2 — no need to repeat it here).

Change the hero gradient overlay's colors from `rgba(8,8,16,0.4)` / `rgba(8,8,16,0.95)` to `rgba(10,10,13,0.4)` / `var(--bg)` respectively, matching the new background token.

Change the category-pill background from the hardcoded `linear-gradient(90deg,#aa367c,#4a2fbd)` to `var(--accent)` (solid, matching the single-accent system).

Change the "Also on Medium ↗" link color and any other hardcoded `#aa367c` from the pink brand color to `var(--accent)`.

Update the `prose prose-invert prose-lg` article body wrapper's inline `color: '#d0d0d0'` to `color: 'var(--text-muted)'`.

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: succeeds; spot-check one article page renders with the new background:

Run: `grep -o "background:var(--bg)" out/articles/*.html 2>/dev/null | head -1` (exact string may differ slightly after Next's CSS minification — if this doesn't match, open one built HTML file and confirm visually instead)

- [ ] **Step 4: Commit**

```bash
git add "app/articles/[slug]/page.tsx"
git commit -m "$(cat <<'EOF'
refactor: restyle article detail page with new design tokens

Also switches to the shared lib/categories.ts label map instead of
its own local copy.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

### Task 11: Rebuild Contact, remove old Projects.tsx, wire the final homepage

**Files:**
- Modify: `components/Contact.tsx`
- Delete: `components/Projects.tsx`
- Modify: `app/page.tsx`
- Modify: `app/globals.css`

**Interfaces:**
- Produces: `export default function Contact()` — same public shape as before (no props), still `'use client'` (keeps its own form-submission state).
- `app/page.tsx` after this task imports and renders, in order: `Navbar`, `Hero`, `Expertise`, `SelectedWork`, `WritingPreview`, `Contact`, `Footer`.

- [ ] **Step 1: Replace `components/Contact.tsx`**

```tsx
'use client';
import { useState } from 'react';

type Status = 'idle' | 'sending' | 'success' | 'error';

export default function Contact() {
  const [status, setStatus] = useState<Status>('idle');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus('sending');
    const form = e.currentTarget;
    try {
      const res = await fetch('https://formspree.io/f/mgoqawrg', {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' },
      });
      if (res.ok) {
        setStatus('success');
        form.reset();
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  }

  return (
    <section id="contact" style={{ padding: '100px 24px' }}>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16" style={{ maxWidth: 1140, margin: '0 auto' }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display), sans-serif', fontSize: 'clamp(26px, 3vw, 34px)', fontWeight: 600, color: 'var(--text)', marginBottom: 16 }}>
            Let&apos;s work together
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: 15, lineHeight: 1.7 }}>
            Open to QA/automation engineering roles, contract work, and
            interesting collaborations. The fastest way to reach me is the
            form here, or directly at the socials in the footer.
          </p>
        </div>

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="hidden" name="form-name" value="contact" />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input name="firstName" type="text" placeholder="First name" required style={inputStyle} />
            <input name="lastName" type="text" placeholder="Last name" required style={inputStyle} />
          </div>
          <input name="email" type="email" placeholder="Email address" required style={inputStyle} />
          <textarea name="message" rows={5} placeholder="Message" required style={{ ...inputStyle, resize: 'none' }} />

          <div className="flex items-center gap-4">
            <button
              type="submit"
              disabled={status === 'sending'}
              style={{
                padding: '12px 28px',
                borderRadius: 8,
                background: 'var(--accent)',
                color: '#fff',
                fontSize: 14,
                fontWeight: 500,
                opacity: status === 'sending' ? 0.6 : 1,
              }}
            >
              {status === 'sending' ? 'Sending…' : 'Send message'}
            </button>
            {status === 'success' && <p style={{ color: 'var(--text)', fontSize: 13 }}>✓ Sent — I&apos;ll get back to you soon.</p>}
            {status === 'error' && <p style={{ color: '#f87171', fontSize: 13 }}>Something went wrong. Please try again.</p>}
          </div>
        </form>
      </div>
    </section>
  );
}

const inputStyle: React.CSSProperties = {
  background: 'var(--bg-elevated)',
  border: '1px solid var(--border)',
  borderRadius: 8,
  color: 'var(--text)',
  fontSize: 14,
  padding: '12px 16px',
  width: '100%',
};
```

- [ ] **Step 2: Delete the old Projects component**

```bash
rm "components/Projects.tsx"
```

- [ ] **Step 3: Wire the final homepage**

Replace `app/page.tsx` in full:

```tsx
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import Expertise from '@/components/Expertise';
import SelectedWork from '@/components/SelectedWork';
import WritingPreview from '@/components/WritingPreview';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import { getAllArticles } from '@/lib/articles';

export const metadata = {
  title: 'Abdulkadir Akyurt — Portfolio',
  description: 'QA Engineer & Test Automation Specialist',
};

export default function Home() {
  const articles = getAllArticles();
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <Hero />
      <Expertise />
      <SelectedWork />
      <WritingPreview articles={articles} />
      <Contact />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 4: Remove the now-unused Contact CSS classes from globals.css**

Delete (the new Contact component above uses inline styles, not these classes):
```css
/* Contact form focus states (matching original) */
.contact-input:focus {
  background: #fff !important;
  color: #121212 !important;
  outline: none;
}
.contact-input::placeholder { color: #fff; font-size: 16px; font-weight: 400; }
.contact-input:focus::placeholder { color: #121212; opacity: 0.8; }

/* Contact button hover fill-from-left */
.contact-btn::before {
  content: '';
  position: absolute;
  top: 0; left: 0;
  height: 100%; width: 0;
  background: #121212;
  transition: 0.3s ease-in-out;
  z-index: 0;
}
.contact-btn:hover { color: #fff; }
.contact-btn:hover::before { width: 100%; }
```

- [ ] **Step 5: Verify the full build**

Run: `npm run build`
Expected: succeeds, static export completes, and the homepage route (`/`) is listed as prerendered.

Run: `grep -c "Selected Work" out/index.html` and `grep -c "Let" out/index.html` (sanity check that new section text made it into the static HTML — either should print `1` or more).

- [ ] **Step 6: Manual visual check**

Run: `npm run dev`, open `http://localhost:3000` in a browser, and confirm:
- No console errors
- Hero, Expertise, Selected Work, Writing, Contact, Footer all render in the new dark/single-accent style
- Mobile width (resize to ~375px) doesn't overflow horizontally
- The two project cards link to `/projects/medium-bot` and `/projects/x-bot`, and both render correctly
- `/articles` lists all articles and each links out correctly

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "$(cat <<'EOF'
feat: rebuild Contact, remove legacy Projects component, wire final homepage

Completes the portfolio redesign: Navbar, Hero, Expertise,
SelectedWork, WritingPreview, Contact, and Footer now compose the
homepage in the new design system. Old Projects.tsx (which mixed
articles and projects into one tabbed component) is removed.

Co-Authored-By: Claude Sonnet 5 <noreply@anthropic.com>
Claude-Session: https://claude.ai/code/session_01XgDGqXq6ZcUNgh6nEvAeYM
EOF
)"
```

---

## Post-implementation note

Push every commit to `origin main` as usual. Netlify deploys are paused
until the team's credit cycle resets (~2026-09-18); commits will queue on
GitHub and deploy automatically once that lifts. Use `npm run dev` locally
to review in the meantime, and remember this repo has two local working
copies this session has kept in sync (`myWebsite-main` and
`Claude Web Clone test 1`) — after finishing here, `git pull` in whichever
one wasn't used, so a future `medium-bot` portfolio-sync push doesn't
diverge again.
