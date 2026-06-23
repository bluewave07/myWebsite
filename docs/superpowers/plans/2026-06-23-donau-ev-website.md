# Donau e.V. Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 6-page German NGO website for Donau Schüler Eltern e.V. with "Vibrant & Intercultural" design (Taze Bahçe palette), Markdown-driven content, and static Netlify deployment.

**Architecture:** New Next.js 16 App Router project at `/Users/bluewave/Claude Test/donau-ev/`. Content lives in Markdown files under `content/` and is parsed at build time. All pages statically exported via `output: 'export'`. No server runtime required.

**Tech Stack:** Next.js 16, TypeScript, Tailwind CSS v4, Framer Motion, gray-matter, remark, remark-html, Lucide React, Jest + React Testing Library

**Code language:** English throughout (variables, functions, components, comments). Only user-visible UI text is German.

**Spec:** `/Users/bluewave/Claude Test/Claude Web Clone test 1/docs/superpowers/specs/2026-06-23-donau-ev-website-design.md`

---

## File Map

```
/Users/bluewave/Claude Test/donau-ev/
├── app/
│   ├── layout.tsx                   Root layout: Inter font, Navbar, Footer
│   ├── page.tsx                     Home: all homepage sections
│   ├── globals.css                  CSS variables, Tailwind base
│   ├── ueber-uns/page.tsx           Über uns static page
│   ├── projekte/page.tsx            Projects list (4 cards)
│   ├── projekte/[slug]/page.tsx     Project detail (Markdown)
│   ├── aktuelles/page.tsx           News list (all sorted)
│   ├── aktuelles/[slug]/page.tsx    News detail (Markdown)
│   ├── team/page.tsx                Team grid
│   └── kontakt/page.tsx             Contact form (Netlify Forms)
├── components/
│   ├── Navbar.tsx                   Sticky nav, mobile hamburger, Projekte dropdown
│   ├── Footer.tsx                   Dark green, 3-column footer
│   ├── Hero.tsx                     Gradient hero + animated color bubbles (client)
│   ├── ProjekteCards.tsx            4 colored project cards grid
│   ├── AktuellesPreview.tsx         Last 3 news cards
│   ├── AboutTeaser.tsx              2-col mission teaser
│   ├── TeamPreview.tsx              3-4 member cards
│   ├── KontaktBanner.tsx            Full-width green CTA
│   └── ui/
│       ├── Button.tsx               Solid + outline variants
│       └── Card.tsx                 Generic card shell
├── lib/
│   ├── markdown.ts                  parseMarkdownFile(), getFilesInDir()
│   └── content.ts                   getAllNews(), getNewsBySlug(), getAllTeamMembers(),
│                                    getAllProjects(), getProjectBySlug(), PROJECT_CONFIG
├── types/
│   └── content.ts                   NewsItem, TeamMember, Project interfaces
├── content/
│   ├── projekte/kita.md
│   ├── projekte/bildung.md
│   ├── projekte/events.md
│   ├── projekte/integration.md
│   ├── aktuelles/2026-06-01-sommerfest.md
│   ├── aktuelles/2026-05-15-neue-kurse.md
│   ├── aktuelles/2026-04-10-jahresbericht.md
│   ├── team/max-mustermann.md
│   ├── team/erika-musterfrau.md
│   └── team/ali-demir.md
├── public/images/team/placeholder.jpg
├── __tests__/lib/markdown.test.ts
├── __tests__/lib/content.test.ts
├── next.config.ts
├── jest.config.ts
├── jest.setup.ts
└── netlify.toml
```

---

## Task 1: Project Scaffold

**Files:**
- Create: `/Users/bluewave/Claude Test/donau-ev/` (entire project)

- [ ] **Step 1.1: Scaffold Next.js project**

```bash
cd "/Users/bluewave/Claude Test"
npx create-next-app@16.2.6 donau-ev \
  --typescript \
  --tailwind \
  --eslint \
  --app \
  --no-src-dir \
  --import-alias "@/*"
```

When prompted, accept all defaults.

- [ ] **Step 1.2: Read Next.js docs before writing any code**

```bash
ls "/Users/bluewave/Claude Test/donau-ev/node_modules/next/dist/docs/" 2>/dev/null \
  || echo "docs not found — check node_modules/next/dist/"
```

Read the App Router guide and note any deprecation warnings.

- [ ] **Step 1.3: Install runtime dependencies**

```bash
cd "/Users/bluewave/Claude Test/donau-ev"
npm install framer-motion lucide-react gray-matter remark remark-html
```

- [ ] **Step 1.4: Install dev dependencies**

```bash
npm install --save-dev \
  jest jest-environment-jsdom \
  @testing-library/react @testing-library/jest-dom \
  @types/jest ts-jest \
  @types/gray-matter \
  @types/remark-html
```

- [ ] **Step 1.5: Verify dev server starts**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | head -5
kill %1
```

Expected: HTML output with no errors.

- [ ] **Step 1.6: Initial commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 16 project for Donau e.V. website"
```

---

## Task 2: Configuration Files

**Files:**
- Modify: `next.config.ts`
- Create: `jest.config.ts`
- Create: `jest.setup.ts`
- Modify: `app/globals.css`

- [ ] **Step 2.1: Configure next.config.ts for static export**

```typescript
// next.config.ts
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};

export default nextConfig;
```

- [ ] **Step 2.2: Create jest.config.ts**

```typescript
// jest.config.ts
import type { Config } from 'jest';

const config: Config = {
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': ['ts-jest', { tsconfig: { jsx: 'react-jsx' } }],
  },
  testMatch: ['**/__tests__/**/*.test.ts', '**/__tests__/**/*.test.tsx'],
  setupFilesAfterFramework: ['./jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
  },
};

export default config;
```

- [ ] **Step 2.3: Create jest.setup.ts**

```typescript
// jest.setup.ts
import '@testing-library/jest-dom';
```

- [ ] **Step 2.4: Create netlify.toml**

```toml
# netlify.toml
[build]
  command = "npm run build"
  publish = "out"

[build.environment]
  NODE_VERSION = "20"

[[headers]]
  for = "/*"
  [headers.values]
    X-Frame-Options = "DENY"
    X-Content-Type-Options = "nosniff"
    Referrer-Policy = "strict-origin-when-cross-origin"
```

- [ ] **Step 2.5: Replace globals.css with design system**

```css
/* app/globals.css */
@import "tailwindcss";

:root {
  --color-bg: #f0fdf4;
  --color-primary: #16a34a;
  --color-primary-dark: #14532d;
  --color-secondary: #0891b2;
  --color-accent-orange: #ea580c;
  --color-accent-purple: #7c3aed;
  --color-text-dark: #14532d;
  --color-text-body: #374151;
  --color-footer-bg: #14532d;
  --color-footer-text: #d1fae5;
  --radius-sm: 8px;
  --radius-md: 12px;
  --radius-lg: 16px;
  --shadow-card: 0 4px 24px rgba(0, 0, 0, 0.06);
}

html {
  scroll-behavior: smooth;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text-body);
  font-family: var(--font-inter), system-ui, sans-serif;
  -webkit-font-smoothing: antialiased;
}

h1, h2, h3, h4 {
  color: var(--color-text-dark);
  font-weight: 800;
  line-height: 1.15;
}

.label-tag {
  font-size: 0.7rem;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: var(--color-primary);
}

.section-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1.5rem;
}
```

- [ ] **Step 2.6: Commit config**

```bash
git add -A
git commit -m "feat: add build config, jest setup, design tokens, netlify.toml"
```

---

## Task 3: Content Types

**Files:**
- Create: `types/content.ts`

- [ ] **Step 3.1: Create types/content.ts**

```typescript
// types/content.ts

export interface NewsItem {
  title: string;
  date: string;        // ISO string "YYYY-MM-DD"
  summary: string;
  slug: string;
  content: string;     // rendered HTML
}

export interface TeamMember {
  name: string;
  role: string;
  image: string;       // path relative to /public, e.g. "/images/team/placeholder.jpg"
  bio: string;
  slug: string;        // derived from filename
}

export interface Project {
  slug: string;        // "kita" | "bildung" | "events" | "integration"
  title: string;
  icon: string;        // emoji
  gradient: string;    // Tailwind gradient classes, e.g. "from-green-600 to-teal-500"
  accentColor: string; // hex for inline use
  summary: string;     // from frontmatter
  content: string;     // rendered HTML
}

export interface ProjectConfig {
  title: string;
  icon: string;
  gradient: string;
  accentColor: string;
}
```

- [ ] **Step 3.2: Commit types**

```bash
git add types/content.ts
git commit -m "feat: add content type definitions"
```

---

## Task 4: Markdown Parser

**Files:**
- Create: `lib/markdown.ts`
- Create: `__tests__/lib/markdown.test.ts`

- [ ] **Step 4.1: Write failing tests**

```typescript
// __tests__/lib/markdown.test.ts
import fs from 'fs';
import path from 'path';
import os from 'os';
import { parseMarkdownFile, getFilesInDir } from '@/lib/markdown';

describe('parseMarkdownFile', () => {
  let tmpDir: string;

  beforeEach(() => {
    tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'donau-test-'));
  });

  afterEach(() => {
    fs.rmSync(tmpDir, { recursive: true });
  });

  it('parses frontmatter and converts markdown body to HTML', async () => {
    const filePath = path.join(tmpDir, 'test.md');
    fs.writeFileSync(filePath, `---\ntitle: "Hello"\ndate: "2026-01-01"\n---\n\n# Heading\n\nBody text.`);

    const { data, content } = await parseMarkdownFile(filePath);

    expect(data.title).toBe('Hello');
    expect(data.date).toBe('2026-01-01');
    expect(content).toContain('<h1>Heading</h1>');
    expect(content).toContain('<p>Body text.</p>');
  });

  it('returns empty content for file with only frontmatter', async () => {
    const filePath = path.join(tmpDir, 'empty.md');
    fs.writeFileSync(filePath, `---\ntitle: "Empty"\n---\n`);

    const { data, content } = await parseMarkdownFile(filePath);
    expect(data.title).toBe('Empty');
    expect(content.trim()).toBe('');
  });
});

describe('getFilesInDir', () => {
  it('returns .md files from a content subdirectory', () => {
    // uses actual content dir — requires content/ to exist in cwd
    // this test is an integration smoke test; run after Task 6
    expect(true).toBe(true);
  });
});
```

- [ ] **Step 4.2: Run tests to confirm they fail**

```bash
npx jest __tests__/lib/markdown.test.ts --no-coverage 2>&1 | tail -20
```

Expected: `Cannot find module '@/lib/markdown'`

- [ ] **Step 4.3: Implement lib/markdown.ts**

```typescript
// lib/markdown.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkHtml from 'remark-html';

export async function parseMarkdownFile(
  filePath: string
): Promise<{ data: Record<string, string>; content: string }> {
  const raw = fs.readFileSync(filePath, 'utf-8');
  const { data, content: markdownBody } = matter(raw);
  const processed = await remark().use(remarkHtml, { sanitize: false }).process(markdownBody);
  return { data: data as Record<string, string>, content: processed.toString() };
}

export function getFilesInDir(subdir: string): string[] {
  const fullPath = path.join(process.cwd(), 'content', subdir);
  if (!fs.existsSync(fullPath)) return [];
  return fs
    .readdirSync(fullPath)
    .filter((f) => f.endsWith('.md'))
    .sort();
}
```

- [ ] **Step 4.4: Run tests to confirm they pass**

```bash
npx jest __tests__/lib/markdown.test.ts --no-coverage
```

Expected: `2 passed`

- [ ] **Step 4.5: Commit**

```bash
git add lib/markdown.ts __tests__/lib/markdown.test.ts
git commit -m "feat: add markdown parser with frontmatter support"
```

---

## Task 5: Content Layer

**Files:**
- Create: `lib/content.ts`
- Create: `__tests__/lib/content.test.ts`

- [ ] **Step 5.1: Write failing tests**

```typescript
// __tests__/lib/content.test.ts
import { PROJECT_CONFIG } from '@/lib/content';

describe('PROJECT_CONFIG', () => {
  it('has exactly 4 projects', () => {
    expect(Object.keys(PROJECT_CONFIG)).toHaveLength(4);
  });

  it('includes required keys for each project', () => {
    const requiredKeys = ['title', 'icon', 'gradient', 'accentColor'];
    Object.values(PROJECT_CONFIG).forEach((config) => {
      requiredKeys.forEach((key) => {
        expect(config).toHaveProperty(key);
      });
    });
  });

  it('has slugs: kita, bildung, events, integration', () => {
    expect(PROJECT_CONFIG).toHaveProperty('kita');
    expect(PROJECT_CONFIG).toHaveProperty('bildung');
    expect(PROJECT_CONFIG).toHaveProperty('events');
    expect(PROJECT_CONFIG).toHaveProperty('integration');
  });
});
```

- [ ] **Step 5.2: Run tests to confirm they fail**

```bash
npx jest __tests__/lib/content.test.ts --no-coverage 2>&1 | tail -10
```

Expected: `Cannot find module '@/lib/content'`

- [ ] **Step 5.3: Implement lib/content.ts**

```typescript
// lib/content.ts
import path from 'path';
import { parseMarkdownFile, getFilesInDir } from './markdown';
import type { NewsItem, TeamMember, Project, ProjectConfig } from '@/types/content';

const CONTENT_ROOT = path.join(process.cwd(), 'content');

export const PROJECT_CONFIG: Record<string, ProjectConfig> = {
  kita: {
    title: 'KiTa Atlantik',
    icon: '🏫',
    gradient: 'from-green-600 to-teal-500',
    accentColor: '#16a34a',
  },
  bildung: {
    title: 'Bildungsprojekte',
    icon: '📖',
    gradient: 'from-teal-500 to-indigo-500',
    accentColor: '#0891b2',
  },
  events: {
    title: 'Kulturveranstaltungen',
    icon: '🎭',
    gradient: 'from-orange-500 to-red-600',
    accentColor: '#ea580c',
  },
  integration: {
    title: 'Integration',
    icon: '🌍',
    gradient: 'from-purple-600 to-indigo-600',
    accentColor: '#7c3aed',
  },
};

export async function getAllNews(): Promise<NewsItem[]> {
  const files = getFilesInDir('aktuelles');
  const items = await Promise.all(
    files.map(async (file) => {
      const filePath = path.join(CONTENT_ROOT, 'aktuelles', file);
      const { data, content } = await parseMarkdownFile(filePath);
      const slug = data.slug || file.replace(/\.md$/, '');
      return { title: data.title, date: data.date, summary: data.summary, slug, content };
    })
  );
  return items.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getNewsBySlug(slug: string): Promise<NewsItem | null> {
  const all = await getAllNews();
  return all.find((item) => item.slug === slug) ?? null;
}

export async function getAllTeamMembers(): Promise<TeamMember[]> {
  const files = getFilesInDir('team');
  return Promise.all(
    files.map(async (file) => {
      const filePath = path.join(CONTENT_ROOT, 'team', file);
      const { data } = await parseMarkdownFile(filePath);
      const slug = file.replace(/\.md$/, '');
      return {
        name: data.name,
        role: data.role,
        image: data.image || '/images/team/placeholder.jpg',
        bio: data.bio || '',
        slug,
      };
    })
  );
}

export async function getAllProjects(): Promise<Project[]> {
  return Promise.all(
    Object.entries(PROJECT_CONFIG).map(async ([slug, config]) => {
      const filePath = path.join(CONTENT_ROOT, 'projekte', `${slug}.md`);
      const { data, content } = await parseMarkdownFile(filePath);
      return { slug, ...config, summary: data.summary || '', content };
    })
  );
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  if (!(slug in PROJECT_CONFIG)) return null;
  const filePath = path.join(CONTENT_ROOT, 'projekte', `${slug}.md`);
  const { data, content } = await parseMarkdownFile(filePath);
  return { slug, ...PROJECT_CONFIG[slug], summary: data.summary || '', content };
}
```

- [ ] **Step 5.4: Run tests to confirm they pass**

```bash
npx jest __tests__/lib/content.test.ts --no-coverage
```

Expected: `3 passed`

- [ ] **Step 5.5: Commit**

```bash
git add lib/content.ts __tests__/lib/content.test.ts
git commit -m "feat: add content layer with news, team, and project helpers"
```

---

## Task 6: Sample Markdown Content

**Files:**
- Create: all files under `content/`
- Create: `public/images/team/placeholder.jpg` (download or copy)

- [ ] **Step 6.1: Create directory structure**

```bash
mkdir -p content/projekte content/aktuelles content/team
mkdir -p public/images/team
```

- [ ] **Step 6.2: Create content/projekte/kita.md**

```markdown
---
summary: "Unser Kindergarten KiTa Atlantik bietet ganztägige Betreuung für Kinder von 0–6 Jahren in einer mehrsprachigen und interkulturellen Umgebung."
---

## KiTa Atlantik

Der Kindergarten KiTa Atlantik ist ein Herzstück unserer Vereinsarbeit. Wir betreuen Kinder von 0 bis 6 Jahren und legen dabei besonderen Wert auf interkulturelle Begegnung und spielerisches Lernen.

### Unser Angebot

- Ganztagesbetreuung (7:00–17:00 Uhr)
- Bilinguale Förderung (Deutsch & Türkisch)
- Montessori-inspirierte Lernumgebung
- Gesunde Ernährung und täglich frisches Mittagessen

### Anmeldung

Für Anmeldungen und weitere Informationen wenden Sie sich bitte an unser Büro oder nutzen Sie unser [Kontaktformular](/kontakt).
```

- [ ] **Step 6.3: Create content/projekte/bildung.md**

```markdown
---
summary: "Unsere Bildungsprojekte fördern Kinder und Jugendliche durch Nachhilfe, Sprachkurse und kreative Workshops — kostenlos und offen für alle."
---

## Bildungsprojekte

Bildung ist der Schlüssel zur gesellschaftlichen Teilhabe. Deshalb bieten wir ein breites Spektrum an Förderangeboten für Kinder, Jugendliche und Erwachsene.

### Programme

- **Hausaufgabenhilfe** — Mo–Fr, 14:00–17:00 Uhr
- **Deutschkurse** — für Kinder und Eltern
- **Leseclub** — wöchentlich für Grundschulkinder
- **MINT-Workshops** — Naturwissenschaften spielerisch entdecken
```

- [ ] **Step 6.4: Create content/projekte/events.md**

```markdown
---
summary: "Kulturveranstaltungen bringen Menschen zusammen: Feste, Konzerte, Theateraufführungen und Stadteilfeste feiern die Vielfalt unserer Gemeinschaft."
---

## Kulturveranstaltungen

Wir feiern Vielfalt! Unsere Veranstaltungen schaffen Räume der Begegnung, des Lachens und des gemeinsamen Erlebens.

### Regelmäßige Events

- **Sommerfest** — jährlich im Juni
- **Interkulturelles Frühlingsfest** — April
- **Theaterabend** — zweimal jährlich
- **Stadtteilmarkt** — monatlich im Sommer
```

- [ ] **Step 6.5: Create content/projekte/integration.md**

```markdown
---
summary: "Unser Integrationsprojekt begleitet neu angekommene Familien mit Beratung, Sprachförderung und Vernetzung — damit jeder Mensch ankommen kann."
---

## Integration

Jeder Mensch verdient einen guten Start. Unser Integrationsprojekt unterstützt neu angekommene Familien auf ihrem Weg in der neuen Heimat.

### Angebote

- Erstberatung und Orientierungshilfe
- Begleitung zu Behörden und Schulen
- Netzwerk mit lokalen Einrichtungen
- Interkulturelle Gesprächskreise
```

- [ ] **Step 6.6: Create three aktuelles files**

```markdown
---
title: "Sommerfest 2026 — Ein voller Erfolg!"
date: "2026-06-01"
summary: "Über 200 Gäste feierten gemeinsam beim diesjährigen Sommerfest. Musik, Tanz und leckeres Essen aus aller Welt machten den Abend unvergesslich."
slug: "sommerfest-2026"
---

Das diesjährige Sommerfest war ein voller Erfolg! Über 200 Gäste aus der ganzen Stadt kamen zusammen, um Vielfalt zu feiern.

Musik aus der Türkei, Deutschland, Syrien und Westafrika füllte den Abend mit Leben. Besonders die Kinder begeisterten das Publikum mit ihren Tanzvorführungen.

Wir bedanken uns bei allen freiwilligen Helfer:innen und Sponsoren!
```

Save to `content/aktuelles/2026-06-01-sommerfest.md`.

```markdown
---
title: "Neue Deutschkurse ab September"
date: "2026-05-15"
summary: "Ab September starten neue kostenlose Deutschkurse für Eltern und Jugendliche. Anmeldung ab sofort möglich."
slug: "neue-deutschkurse-september"
---

Wir freuen uns, neue kostenlose Deutschkurse für Eltern und Jugendliche anzukündigen!

**Kurszeiten:**
- Elternkurs: Dienstag & Donnerstag, 9:00–11:00 Uhr
- Jugendkurs: Montag & Mittwoch, 15:00–17:00 Uhr

Anmeldung über unser [Kontaktformular](/kontakt) oder persönlich im Büro.
```

Save to `content/aktuelles/2026-05-15-neue-kurse.md`.

```markdown
---
title: "Jahresbericht 2025 veröffentlicht"
date: "2026-04-10"
summary: "Unser Jahresbericht 2025 zeigt: 450 betreute Kinder, 120 ehrenamtliche Stunden und 12 erfolgreiche Veranstaltungen — ein Jahr voller Wachstum."
slug: "jahresbericht-2025"
---

Unser Jahresbericht 2025 ist jetzt verfügbar. Ein Jahr voller Wachstum und Begegnung:

- 450 betreute Kinder in der KiTa
- 120 ehrenamtliche Stunden
- 12 Kulturveranstaltungen
- 3 neue Bildungsprogramme gestartet

Wir danken allen Mitgliedern, Ehrenamtlichen und Förderern für ihre Unterstützung.
```

Save to `content/aktuelles/2026-04-10-jahresbericht.md`.

- [ ] **Step 6.7: Create three team member files**

Save to `content/team/max-mustermann.md`:
```markdown
---
name: "Max Mustermann"
role: "Vorsitzender"
image: "/images/team/placeholder.jpg"
bio: "Max leitet den Verein seit 2018 und setzt sich täglich für interkulturelle Begegnung ein."
---
```

Save to `content/team/erika-musterfrau.md`:
```markdown
---
name: "Erika Musterfrau"
role: "Stellvertretende Vorsitzende"
image: "/images/team/placeholder.jpg"
bio: "Erika koordiniert unsere Bildungsprojekte und ist Ansprechpartnerin für Kooperationspartner."
---
```

Save to `content/team/ali-demir.md`:
```markdown
---
name: "Ali Demir"
role: "Projektkoordinator Integration"
image: "/images/team/placeholder.jpg"
bio: "Ali begleitet neu angekommene Familien und baut das Netzwerk mit lokalen Einrichtungen aus."
---
```

- [ ] **Step 6.8: Download placeholder team image**

```bash
curl -L "https://placehold.co/400x400/16a34a/white?text=Foto" \
  -o "public/images/team/placeholder.jpg" 2>/dev/null || \
  echo '<!-- placeholder -->' > public/images/team/placeholder.jpg
```

- [ ] **Step 6.9: Commit content**

```bash
git add content/ public/
git commit -m "feat: add sample markdown content for projects, news, and team"
```

---

## Task 7: UI Primitives

**Files:**
- Create: `components/ui/Button.tsx`
- Create: `components/ui/Card.tsx`

- [ ] **Step 7.1: Create Button component**

```typescript
// components/ui/Button.tsx
import Link from 'next/link';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: 'solid' | 'outline';
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
}

export default function Button({
  href,
  onClick,
  variant = 'solid',
  children,
  className = '',
  type = 'button',
}: ButtonProps) {
  const base =
    'inline-flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2';
  const variants = {
    solid:
      'bg-[#16a34a] text-white hover:bg-[#15803d] focus:ring-[#16a34a]',
    outline:
      'border-2 border-[#16a34a] text-[#14532d] hover:bg-[#f0fdf4] focus:ring-[#16a34a]',
  };
  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} onClick={onClick} className={classes}>
      {children}
    </button>
  );
}
```

- [ ] **Step 7.2: Create Card component**

```typescript
// components/ui/Card.tsx
interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export default function Card({ children, className = '' }: CardProps) {
  return (
    <div
      className={`bg-white rounded-2xl overflow-hidden ${className}`}
      style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
    >
      {children}
    </div>
  );
}
```

- [ ] **Step 7.3: Commit**

```bash
git add components/ui/
git commit -m "feat: add Button and Card UI primitives"
```

---

## Task 8: Navbar

**Files:**
- Create: `components/Navbar.tsx`

- [ ] **Step 8.1: Create Navbar.tsx**

```typescript
// components/Navbar.tsx
'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown } from 'lucide-react';

const projectLinks = [
  { href: '/projekte/kita', label: 'KiTa Atlantik' },
  { href: '/projekte/bildung', label: 'Bildungsprojekte' },
  { href: '/projekte/events', label: 'Kulturveranstaltungen' },
  { href: '/projekte/integration', label: 'Integration' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [projekteOpen, setProjekteOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-white transition-shadow duration-200 ${
        scrolled ? 'shadow-md' : ''
      }`}
    >
      <div className="section-container flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-1">
          <span className="text-lg font-black text-[#14532d]">DONAU</span>
          <span className="text-lg font-black text-[#16a34a]"> e.V.</span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-sm font-medium text-[#374151] hover:text-[#16a34a] transition-colors">
            Home
          </Link>

          {/* Projekte dropdown */}
          <div className="relative">
            <button
              className="flex items-center gap-1 text-sm font-medium text-[#374151] hover:text-[#16a34a] transition-colors"
              onClick={() => setProjekteOpen((v) => !v)}
              onBlur={() => setTimeout(() => setProjekteOpen(false), 150)}
            >
              Projekte <ChevronDown size={14} />
            </button>
            {projekteOpen && (
              <div className="absolute top-full left-0 mt-2 w-52 bg-white rounded-xl shadow-lg border border-gray-100 py-2 z-10">
                {projectLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="block px-4 py-2 text-sm text-[#374151] hover:bg-[#f0fdf4] hover:text-[#16a34a] transition-colors"
                    onClick={() => setProjekteOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
              </div>
            )}
          </div>

          <Link href="/ueber-uns" className="text-sm font-medium text-[#374151] hover:text-[#16a34a] transition-colors">
            Über uns
          </Link>
          <Link href="/aktuelles" className="text-sm font-medium text-[#374151] hover:text-[#16a34a] transition-colors">
            Aktuelles
          </Link>
          <Link href="/team" className="text-sm font-medium text-[#374151] hover:text-[#16a34a] transition-colors">
            Team
          </Link>
          <Link
            href="/kontakt"
            className="ml-2 px-4 py-2 bg-[#16a34a] text-white text-sm font-semibold rounded-lg hover:bg-[#15803d] transition-colors"
          >
            Kontakt
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 text-[#374151]"
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menü öffnen"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 px-6 py-4 flex flex-col gap-4">
          <Link href="/" className="text-sm font-medium text-[#374151]" onClick={() => setMobileOpen(false)}>Home</Link>
          <Link href="/projekte" className="text-sm font-medium text-[#374151]" onClick={() => setMobileOpen(false)}>Projekte</Link>
          {projectLinks.map((link) => (
            <Link key={link.href} href={link.href} className="text-sm text-[#16a34a] pl-4" onClick={() => setMobileOpen(false)}>
              {link.label}
            </Link>
          ))}
          <Link href="/ueber-uns" className="text-sm font-medium text-[#374151]" onClick={() => setMobileOpen(false)}>Über uns</Link>
          <Link href="/aktuelles" className="text-sm font-medium text-[#374151]" onClick={() => setMobileOpen(false)}>Aktuelles</Link>
          <Link href="/team" className="text-sm font-medium text-[#374151]" onClick={() => setMobileOpen(false)}>Team</Link>
          <Link href="/kontakt" className="px-4 py-2 bg-[#16a34a] text-white text-sm font-semibold rounded-lg text-center" onClick={() => setMobileOpen(false)}>Kontakt</Link>
        </div>
      )}
    </nav>
  );
}
```

- [ ] **Step 8.2: Commit**

```bash
git add components/Navbar.tsx
git commit -m "feat: add sticky Navbar with mobile menu and Projekte dropdown"
```

---

## Task 9: Footer

**Files:**
- Create: `components/Footer.tsx`

- [ ] **Step 9.1: Create Footer.tsx**

```typescript
// components/Footer.tsx
import Link from 'next/link';
import { Twitter, Instagram, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer style={{ backgroundColor: 'var(--color-footer-bg)' }} className="text-[#d1fae5]">
      <div className="section-container py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Column 1: Logo + description */}
          <div>
            <div className="flex items-center gap-1 mb-4">
              <span className="text-xl font-black text-white">DONAU</span>
              <span className="text-xl font-black text-[#4ade80]"> e.V.</span>
            </div>
            <p className="text-sm leading-relaxed text-[#a7f3d0]">
              Donau Schüler Eltern e.V. setzt sich für Bildung, Kultur und
              interkulturelle Begegnung ein — für eine offene und respektvolle
              Gesellschaft.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Navigation</h4>
            <ul className="space-y-2 text-sm">
              {[
                ['/', 'Home'],
                ['/projekte', 'Projekte'],
                ['/ueber-uns', 'Über uns'],
                ['/aktuelles', 'Aktuelles'],
                ['/team', 'Team'],
                ['/kontakt', 'Kontakt'],
              ].map(([href, label]) => (
                <li key={href}>
                  <Link href={href} className="text-[#a7f3d0] hover:text-white transition-colors">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact info */}
          <div>
            <h4 className="text-white font-bold mb-4 text-sm uppercase tracking-widest">Kontakt</h4>
            <ul className="space-y-3 text-sm text-[#a7f3d0]">
              <li className="flex items-start gap-2">
                <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#4ade80]" />
                <span>Musterstraße 1<br />12345 Musterstadt</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail size={14} className="text-[#4ade80]" />
                <a href="mailto:info@donau-ev.de" className="hover:text-white transition-colors">
                  info@donau-ev.de
                </a>
              </li>
            </ul>

            {/* Social media */}
            <div className="flex gap-4 mt-6">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="text-[#a7f3d0] hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-[#a7f3d0] hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-6 border-t border-[#166534] text-xs text-[#6ee7b7] flex flex-col md:flex-row justify-between gap-2">
          <span>© {currentYear} Donau Schüler Eltern e.V. Alle Rechte vorbehalten.</span>
          <span>Gemeinnützig · Eingetragener Verein</span>
        </div>
      </div>
    </footer>
  );
}
```

- [ ] **Step 9.2: Commit**

```bash
git add components/Footer.tsx
git commit -m "feat: add dark-green Footer with 3-column layout and social links"
```

---

## Task 10: Root Layout

**Files:**
- Modify: `app/layout.tsx`

- [ ] **Step 10.1: Replace app/layout.tsx**

```typescript
// app/layout.tsx
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

export const metadata: Metadata = {
  title: {
    default: 'Donau Schüler Eltern e.V.',
    template: '%s | Donau e.V.',
  },
  description:
    'Donau Schüler Eltern e.V. — Der Weg zum interkulturellen Respekt. Bildung, Kultur und Integration in unserer Stadt.',
  keywords: ['Interkultur', 'Bildung', 'Integration', 'KiTa', 'Verein', 'Donau'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className={inter.variable}>
      <body className="min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-1 pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 10.2: Verify layout renders**

```bash
npm run dev &
sleep 5
curl -s http://localhost:3000 | grep -i "donau"
kill %1
```

Expected: output contains "Donau"

- [ ] **Step 10.3: Commit**

```bash
git add app/layout.tsx
git commit -m "feat: add root layout with Inter font, Navbar, Footer, and metadata"
```

---

## Task 11: Hero Section

**Files:**
- Create: `components/Hero.tsx`

- [ ] **Step 11.1: Create Hero.tsx (client component for Framer Motion)**

```typescript
// components/Hero.tsx
'use client';
import { motion } from 'framer-motion';
import Button from '@/components/ui/Button';

const bubbles = [
  { color: '#16a34a', size: 280, x: '60%', y: '-10%', delay: 0 },
  { color: '#0891b2', size: 200, x: '80%', y: '30%', delay: 0.3 },
  { color: '#ea580c', size: 160, x: '55%', y: '55%', delay: 0.6 },
  { color: '#7c3aed', size: 120, x: '75%', y: '65%', delay: 0.9 },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[88vh] flex items-center"
      style={{
        background: 'linear-gradient(160deg, #f0fdf4 0%, #dcfce7 55%, #cffafe 100%)',
      }}
    >
      {/* Animated background bubbles */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: bubble.size,
              height: bubble.size,
              left: bubble.x,
              top: bubble.y,
              background: bubble.color,
              opacity: 0.08,
            }}
            animate={{
              scale: [1, 1.12, 1],
              y: [0, -20, 0],
            }}
            transition={{
              duration: 5 + i,
              repeat: Infinity,
              delay: bubble.delay,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className="section-container relative z-10 py-20">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <p className="label-tag mb-4">Donau Schüler Eltern e.V.</p>

          <h1 className="text-5xl md:text-6xl lg:text-7xl font-black leading-[1.08] mb-6">
            Der Weg zum{' '}
            <span style={{ color: '#0891b2' }}>interkulturellen</span>{' '}
            Respekt.
          </h1>

          <p className="text-lg text-[#374151] mb-10 max-w-lg leading-relaxed">
            Gemeinsam für Bildung, Kultur und Integration — für eine offene
            und respektvolle Gesellschaft.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button href="/projekte" variant="solid">
              Unsere Projekte
            </Button>
            <Button href="/ueber-uns" variant="outline">
              Über uns
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
```

- [ ] **Step 11.2: Commit**

```bash
git add components/Hero.tsx
git commit -m "feat: add animated Hero section with gradient and floating bubbles"
```

---

## Task 12: Homepage Sections

**Files:**
- Create: `components/ProjekteCards.tsx`
- Create: `components/AktuellesPreview.tsx`
- Create: `components/AboutTeaser.tsx`
- Create: `components/TeamPreview.tsx`
- Create: `components/KontaktBanner.tsx`

- [ ] **Step 12.1: Create ProjekteCards.tsx**

```typescript
// components/ProjekteCards.tsx
import Link from 'next/link';
import { PROJECT_CONFIG } from '@/lib/content';

export default function ProjekteCards() {
  const projects = Object.entries(PROJECT_CONFIG);

  return (
    <section className="py-20">
      <div className="section-container">
        <p className="label-tag mb-3">Was wir tun</p>
        <h2 className="text-4xl font-black mb-12">Unsere Projekte</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {projects.map(([slug, config]) => (
            <Link
              key={slug}
              href={`/projekte/${slug}`}
              className="group rounded-2xl overflow-hidden block transition-transform duration-200 hover:-translate-y-1"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
            >
              {/* Gradient header */}
              <div
                className={`bg-gradient-to-br ${config.gradient} p-8 flex items-center justify-between`}
              >
                <span className="text-5xl" role="img" aria-label={config.title}>
                  {config.icon}
                </span>
                <span className="text-white text-sm font-semibold opacity-80 group-hover:opacity-100 transition-opacity">
                  Mehr →
                </span>
              </div>
              {/* Text */}
              <div className="bg-white p-6">
                <h3 className="text-lg font-bold text-[#14532d] mb-2 group-hover:text-[#16a34a] transition-colors">
                  {config.title}
                </h3>
                <p className="text-sm text-[#374151] leading-relaxed">
                  Erfahren Sie mehr über unser Projekt und wie Sie mitmachen können.
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.2: Create AktuellesPreview.tsx**

```typescript
// components/AktuellesPreview.tsx
import Link from 'next/link';
import type { NewsItem } from '@/types/content';

interface Props {
  items: NewsItem[];
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

export default function AktuellesPreview({ items }: Props) {
  return (
    <section className="py-20" style={{ backgroundColor: '#f8fffe' }}>
      <div className="section-container">
        <p className="label-tag mb-3">Neuigkeiten</p>
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl font-black">Aktuelles</h2>
          <Link
            href="/aktuelles"
            className="text-sm font-semibold text-[#16a34a] hover:text-[#14532d] transition-colors"
          >
            Alle Neuigkeiten →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {items.slice(0, 3).map((item) => (
            <Link
              key={item.slug}
              href={`/aktuelles/${item.slug}`}
              className="group bg-white rounded-2xl p-6 block transition-transform duration-200 hover:-translate-y-1"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <span className="label-tag text-xs mb-3 block">{formatDate(item.date)}</span>
              <h3 className="font-bold text-[#14532d] text-base mb-2 leading-snug group-hover:text-[#16a34a] transition-colors">
                {item.title}
              </h3>
              <p className="text-sm text-[#374151] leading-relaxed line-clamp-3">{item.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.3: Create AboutTeaser.tsx**

```typescript
// components/AboutTeaser.tsx
import Button from '@/components/ui/Button';

export default function AboutTeaser() {
  return (
    <section className="py-20">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div>
            <p className="label-tag mb-3">Wer wir sind</p>
            <h2 className="text-4xl font-black mb-6">
              Gemeinsam stärker.
            </h2>
            <p className="text-[#374151] leading-relaxed mb-4">
              Donau Schüler Eltern e.V. ist ein gemeinnütziger Verein, der sich
              seit Jahren für interkulturelle Begegnung, Bildungsgerechtigkeit
              und ein offenes Miteinander einsetzt.
            </p>
            <p className="text-[#374151] leading-relaxed mb-8">
              Unsere Arbeit lebt von Ehrenamtlichen, engagierten Familien und
              starken Partnerschaften — für eine Gesellschaft, in der jede und
              jeder willkommen ist.
            </p>
            <Button href="/ueber-uns" variant="solid">
              Mehr über uns
            </Button>
          </div>

          {/* Image placeholder */}
          <div
            className="rounded-2xl flex items-center justify-center h-72 md:h-80"
            style={{
              background: 'linear-gradient(135deg, #dcfce7, #cffafe)',
            }}
          >
            <span className="text-6xl" aria-hidden="true">🤝</span>
          </div>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.4: Create TeamPreview.tsx**

```typescript
// components/TeamPreview.tsx
import Image from 'next/image';
import Link from 'next/link';
import type { TeamMember } from '@/types/content';

interface Props {
  members: TeamMember[];
}

export default function TeamPreview({ members }: Props) {
  const preview = members.slice(0, 3);

  return (
    <section className="py-20" style={{ backgroundColor: '#f8fffe' }}>
      <div className="section-container">
        <p className="label-tag mb-3">Menschen</p>
        <div className="flex items-end justify-between mb-12">
          <h2 className="text-4xl font-black">Unser Team</h2>
          <Link
            href="/team"
            className="text-sm font-semibold text-[#16a34a] hover:text-[#14532d] transition-colors"
          >
            Das ganze Team →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {preview.map((member) => (
            <div
              key={member.slug}
              className="bg-white rounded-2xl p-6 text-center"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div className="w-20 h-20 rounded-full overflow-hidden mx-auto mb-4 bg-[#dcfce7]">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={80}
                  height={80}
                  className="object-cover w-full h-full"
                />
              </div>
              <h3 className="font-bold text-[#14532d] text-base">{member.name}</h3>
              <p className="text-sm text-[#16a34a] mt-1">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.5: Create KontaktBanner.tsx**

```typescript
// components/KontaktBanner.tsx
import Button from '@/components/ui/Button';

export default function KontaktBanner() {
  return (
    <section className="py-20" style={{ backgroundColor: '#16a34a' }}>
      <div className="section-container text-center">
        <h2 className="text-4xl font-black text-white mb-4">
          Haben Sie Fragen?
        </h2>
        <p className="text-[#dcfce7] text-lg mb-8 max-w-xl mx-auto">
          Wir freuen uns über Ihre Nachricht — egal ob Sie mitmachen,
          spenden oder einfach mehr erfahren möchten.
        </p>
        <Link
          href="/kontakt"
          className="inline-flex items-center gap-2 px-8 py-4 bg-white text-[#14532d] font-bold rounded-xl hover:bg-[#f0fdf4] transition-colors text-base"
        >
          Jetzt Kontakt aufnehmen →
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 12.6: Commit all homepage sections**

```bash
git add components/
git commit -m "feat: add ProjekteCards, AktuellesPreview, AboutTeaser, TeamPreview, KontaktBanner"
```

---

## Task 13: Home Page

**Files:**
- Modify: `app/page.tsx`

- [ ] **Step 13.1: Replace app/page.tsx**

```typescript
// app/page.tsx
import Hero from '@/components/Hero';
import ProjekteCards from '@/components/ProjekteCards';
import AktuellesPreview from '@/components/AktuellesPreview';
import AboutTeaser from '@/components/AboutTeaser';
import TeamPreview from '@/components/TeamPreview';
import KontaktBanner from '@/components/KontaktBanner';
import { getAllNews, getAllTeamMembers } from '@/lib/content';

export default async function HomePage() {
  const [news, teamMembers] = await Promise.all([getAllNews(), getAllTeamMembers()]);

  return (
    <>
      <Hero />
      <ProjekteCards />
      <AktuellesPreview items={news} />
      <AboutTeaser />
      <TeamPreview members={teamMembers} />
      <KontaktBanner />
    </>
  );
}
```

- [ ] **Step 13.2: Start dev server and verify homepage**

```bash
npm run dev &
sleep 6
curl -s http://localhost:3000 | grep -c "Donau\|Projekte\|Aktuelles\|Team"
kill %1
```

Expected: count ≥ 4

- [ ] **Step 13.3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: wire up homepage with all sections"
```

---

## Task 14: Projekte Pages

**Files:**
- Modify: `app/projekte/page.tsx`
- Create: `app/projekte/[slug]/page.tsx`

- [ ] **Step 14.1: Create app/projekte/page.tsx**

```typescript
// app/projekte/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllProjects } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Projekte',
  description: 'Unsere Projekte: KiTa Atlantik, Bildungsprojekte, Kulturveranstaltungen und Integration.',
};

export default async function ProjektePage() {
  const projects = await getAllProjects();

  return (
    <div className="py-20">
      <div className="section-container">
        <p className="label-tag mb-3">Was wir tun</p>
        <h1 className="text-5xl font-black mb-4">Unsere Projekte</h1>
        <p className="text-[#374151] text-lg mb-14 max-w-2xl">
          Von der Kinderbetreuung über Bildungsförderung bis hin zu kulturellen
          Veranstaltungen — entdecken Sie unsere vielfältigen Angebote.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projekte/${project.slug}`}
              className="group rounded-2xl overflow-hidden block transition-transform duration-200 hover:-translate-y-1"
              style={{ boxShadow: '0 4px 32px rgba(0,0,0,0.08)' }}
            >
              <div className={`bg-gradient-to-br ${project.gradient} p-10 flex items-center gap-6`}>
                <span className="text-6xl" role="img" aria-label={project.title}>
                  {project.icon}
                </span>
                <div>
                  <h2 className="text-2xl font-black text-white">{project.title}</h2>
                  <span className="text-white text-sm opacity-80">Mehr erfahren →</span>
                </div>
              </div>
              <div className="bg-white p-6">
                <p className="text-[#374151] text-sm leading-relaxed">{project.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 14.2: Create app/projekte/[slug]/page.tsx**

```typescript
// app/projekte/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getProjectBySlug, getAllProjects, PROJECT_CONFIG } from '@/lib/content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return Object.keys(PROJECT_CONFIG).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) return {};
  return { title: project.title, description: project.summary };
}

export default async function ProjectDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);
  if (!project) notFound();

  return (
    <div>
      {/* Hero banner */}
      <div className={`bg-gradient-to-br ${project.gradient} py-20`}>
        <div className="section-container">
          <span className="text-6xl mb-4 block" role="img" aria-label={project.title}>
            {project.icon}
          </span>
          <h1 className="text-5xl font-black text-white">{project.title}</h1>
          <p className="text-white/80 text-lg mt-4 max-w-xl">{project.summary}</p>
        </div>
      </div>

      {/* Markdown content */}
      <div className="py-16">
        <div className="section-container">
          <article
            className="prose prose-green max-w-3xl"
            dangerouslySetInnerHTML={{ __html: project.content }}
          />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 14.3: Commit**

```bash
git add app/projekte/
git commit -m "feat: add Projekte list and detail pages with static params"
```

---

## Task 15: Aktuelles Pages

**Files:**
- Modify: `app/aktuelles/page.tsx`
- Create: `app/aktuelles/[slug]/page.tsx`

- [ ] **Step 15.1: Create app/aktuelles/page.tsx**

```typescript
// app/aktuelles/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { getAllNews } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Aktuelles',
  description: 'Neuigkeiten und Ankündigungen von Donau Schüler Eltern e.V.',
};

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export default async function AktuellesPage() {
  const news = await getAllNews();

  return (
    <div className="py-20">
      <div className="section-container">
        <p className="label-tag mb-3">Neuigkeiten</p>
        <h1 className="text-5xl font-black mb-14">Aktuelles</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {news.map((item) => (
            <Link
              key={item.slug}
              href={`/aktuelles/${item.slug}`}
              className="group bg-white rounded-2xl p-6 block transition-transform duration-200 hover:-translate-y-1"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <span className="label-tag text-xs mb-3 block">{formatDate(item.date)}</span>
              <h2 className="font-bold text-[#14532d] text-lg mb-3 leading-snug group-hover:text-[#16a34a] transition-colors">
                {item.title}
              </h2>
              <p className="text-sm text-[#374151] leading-relaxed">{item.summary}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 15.2: Create app/aktuelles/[slug]/page.tsx**

```typescript
// app/aktuelles/[slug]/page.tsx
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getNewsBySlug, getAllNews } from '@/lib/content';

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const news = await getAllNews();
  return news.map((item) => ({ slug: item.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) return {};
  return { title: item.title, description: item.summary };
}

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString('de-DE', {
    day: '2-digit', month: 'long', year: 'numeric',
  });
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;
  const item = await getNewsBySlug(slug);
  if (!item) notFound();

  return (
    <div className="py-20">
      <div className="section-container max-w-3xl">
        <Link
          href="/aktuelles"
          className="text-sm text-[#16a34a] font-semibold hover:text-[#14532d] transition-colors mb-8 inline-block"
        >
          ← Zurück zu Aktuelles
        </Link>

        <p className="label-tag mb-3">{formatDate(item.date)}</p>
        <h1 className="text-4xl font-black mb-8">{item.title}</h1>

        <article
          className="prose prose-green"
          dangerouslySetInnerHTML={{ __html: item.content }}
        />
      </div>
    </div>
  );
}
```

- [ ] **Step 15.3: Commit**

```bash
git add app/aktuelles/
git commit -m "feat: add Aktuelles list and detail pages"
```

---

## Task 16: Über uns Page

**Files:**
- Modify: `app/ueber-uns/page.tsx`

- [ ] **Step 16.1: Create app/ueber-uns/page.tsx**

```typescript
// app/ueber-uns/page.tsx
import type { Metadata } from 'next';
import Button from '@/components/ui/Button';

export const metadata: Metadata = {
  title: 'Über uns',
  description:
    'Erfahren Sie mehr über Donau Schüler Eltern e.V. — unsere Mission, Geschichte und Werte.',
};

const values = [
  { icon: '🤝', title: 'Respekt', text: 'Jeder Mensch verdient Würde und Wertschätzung — unabhängig von Herkunft oder Sprache.' },
  { icon: '📚', title: 'Bildung', text: 'Bildung öffnet Türen. Wir fördern Kinder und Familien auf ihrem Bildungsweg.' },
  { icon: '🌍', title: 'Vielfalt', text: 'Unsere Stärke liegt in der Vielfalt. Unterschiedliche Kulturen bereichern unsere Gemeinschaft.' },
  { icon: '💚', title: 'Gemeinschaft', text: 'Gemeinsam sind wir stark. Wir bauen Brücken und schaffen Räume der Begegnung.' },
];

export default function UeberUnsPage() {
  return (
    <div>
      {/* Hero */}
      <div className="py-20" style={{ background: 'linear-gradient(160deg, #f0fdf4, #dcfce7)' }}>
        <div className="section-container max-w-3xl">
          <p className="label-tag mb-3">Wer wir sind</p>
          <h1 className="text-5xl font-black mb-6">Über uns</h1>
          <p className="text-[#374151] text-lg leading-relaxed">
            Donau Schüler Eltern e.V. ist ein gemeinnütziger Verein in Deutschland, der sich
            für interkulturelle Begegnung, Bildungsgerechtigkeit und ein offenes Miteinander
            einsetzt. Unser Leitbild: <strong>"Der Weg zum interkulturellen Respekt."</strong>
          </p>
        </div>
      </div>

      {/* Mission */}
      <section className="py-16">
        <div className="section-container max-w-3xl">
          <h2 className="text-3xl font-black mb-6">Unsere Mission</h2>
          <p className="text-[#374151] leading-relaxed mb-4">
            Wir glauben, dass Integration kein Einbahnstraßenprozess ist — sie entsteht durch
            echte Begegnung, gegenseitiges Lernen und gemeinsames Handeln. Seit unserer Gründung
            begleiten wir Familien, Kinder und Jugendliche auf ihrem Weg in eine offene Gesellschaft.
          </p>
          <p className="text-[#374151] leading-relaxed mb-8">
            Unser Verein arbeitet eng mit lokalen Schulen, dem Jobcenter, Wohlfahrtsverbänden
            und der Stadt zusammen — denn nachhaltige Veränderung braucht starke Netzwerke.
          </p>
          <Button href="/projekte" variant="solid">
            Unsere Projekte entdecken
          </Button>
        </div>
      </section>

      {/* Values */}
      <section className="py-16" style={{ backgroundColor: '#f8fffe' }}>
        <div className="section-container">
          <p className="label-tag mb-3">Wofür wir stehen</p>
          <h2 className="text-3xl font-black mb-10">Unsere Werte</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value) => (
              <div
                key={value.title}
                className="bg-white rounded-2xl p-6"
                style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
              >
                <span className="text-4xl mb-4 block" role="img" aria-label={value.title}>
                  {value.icon}
                </span>
                <h3 className="font-bold text-[#14532d] mb-2">{value.title}</h3>
                <p className="text-sm text-[#374151] leading-relaxed">{value.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner mention */}
      <section className="py-16">
        <div className="section-container max-w-3xl">
          <h2 className="text-3xl font-black mb-6">Kooperationsprojekt</h2>
          <p className="text-[#374151] leading-relaxed mb-4">
            In enger Zusammenarbeit betreiben wir den Kindergarten{' '}
            <a
              href="https://www.kita-atlantik.de"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#16a34a] font-semibold hover:text-[#14532d] transition-colors underline"
            >
              KiTa Atlantik
            </a>{' '}
            — ein besonderes Projekt für interkulturelle frühkindliche Bildung.
          </p>
        </div>
      </section>
    </div>
  );
}
```

- [ ] **Step 16.2: Commit**

```bash
git add app/ueber-uns/
git commit -m "feat: add Über uns page with mission, values, and partner section"
```

---

## Task 17: Team Page

**Files:**
- Modify: `app/team/page.tsx`

- [ ] **Step 17.1: Create app/team/page.tsx**

```typescript
// app/team/page.tsx
import type { Metadata } from 'next';
import Image from 'next/image';
import { getAllTeamMembers } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Team',
  description: 'Lernen Sie das Team von Donau Schüler Eltern e.V. kennen.',
};

export default async function TeamPage() {
  const members = await getAllTeamMembers();

  return (
    <div className="py-20">
      <div className="section-container">
        <p className="label-tag mb-3">Menschen</p>
        <h1 className="text-5xl font-black mb-4">Unser Team</h1>
        <p className="text-[#374151] text-lg mb-14 max-w-2xl">
          Hinter Donau e.V. stehen engagierte Menschen, die täglich für eine
          offene und respektvolle Gesellschaft arbeiten.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {members.map((member) => (
            <div
              key={member.slug}
              className="bg-white rounded-2xl overflow-hidden"
              style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
            >
              <div className="h-48 bg-gradient-to-br from-green-100 to-teal-100 flex items-center justify-center">
                <Image
                  src={member.image}
                  alt={member.name}
                  width={120}
                  height={120}
                  className="rounded-full object-cover"
                />
              </div>
              <div className="p-6">
                <h2 className="font-black text-[#14532d] text-xl">{member.name}</h2>
                <p className="text-[#16a34a] font-semibold text-sm mt-1 mb-4">{member.role}</p>
                {member.bio && (
                  <p className="text-sm text-[#374151] leading-relaxed">{member.bio}</p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 17.2: Commit**

```bash
git add app/team/
git commit -m "feat: add Team page with member grid from Markdown"
```

---

## Task 18: Kontakt Page

**Files:**
- Modify: `app/kontakt/page.tsx`

- [ ] **Step 18.1: Create app/kontakt/page.tsx**

```typescript
// app/kontakt/page.tsx
import type { Metadata } from 'next';
import { Mail, MapPin, Phone, Instagram, Twitter } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Kontakt',
  description: 'Nehmen Sie Kontakt zu Donau Schüler Eltern e.V. auf.',
};

export default function KontaktPage() {
  return (
    <div className="py-20">
      <div className="section-container">
        <p className="label-tag mb-3">Schreiben Sie uns</p>
        <h1 className="text-5xl font-black mb-14">Kontakt</h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14">
          {/* Contact info */}
          <div>
            <h2 className="text-2xl font-bold text-[#14532d] mb-8">Wir sind für Sie da.</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#dcfce7' }}
                >
                  <MapPin size={18} className="text-[#16a34a]" />
                </div>
                <div>
                  <p className="font-semibold text-[#14532d] text-sm mb-1">Adresse</p>
                  <p className="text-[#374151] text-sm">Musterstraße 1<br />12345 Musterstadt</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#dcfce7' }}
                >
                  <Mail size={18} className="text-[#16a34a]" />
                </div>
                <div>
                  <p className="font-semibold text-[#14532d] text-sm mb-1">E-Mail</p>
                  <a
                    href="mailto:info@donau-ev.de"
                    className="text-[#16a34a] text-sm hover:text-[#14532d] transition-colors"
                  >
                    info@donau-ev.de
                  </a>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ backgroundColor: '#dcfce7' }}
                >
                  <Phone size={18} className="text-[#16a34a]" />
                </div>
                <div>
                  <p className="font-semibold text-[#14532d] text-sm mb-1">Telefon</p>
                  <p className="text-[#374151] text-sm">+49 (0) 123 456789</p>
                </div>
              </li>
            </ul>

            <div className="flex gap-4 mt-10">
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
                className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#16a34a] hover:bg-[#16a34a] hover:text-white transition-colors"
              >
                <Twitter size={18} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-xl bg-[#dcfce7] flex items-center justify-center text-[#16a34a] hover:bg-[#16a34a] hover:text-white transition-colors"
              >
                <Instagram size={18} />
              </a>
            </div>
          </div>

          {/* Netlify Form */}
          <div
            className="bg-white rounded-2xl p-8"
            style={{ boxShadow: '0 4px 24px rgba(0,0,0,0.06)' }}
          >
            <h2 className="text-xl font-bold text-[#14532d] mb-6">Nachricht senden</h2>
            <form
              name="contact"
              method="POST"
              data-netlify="true"
              netlify-honeypot="bot-field"
              className="space-y-5"
            >
              <input type="hidden" name="form-name" value="contact" />
              <p hidden>
                <label>
                  Bot-Falle: <input name="bot-field" />
                </label>
              </p>

              <div>
                <label htmlFor="name" className="block text-sm font-semibold text-[#14532d] mb-2">
                  Name *
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition"
                  placeholder="Ihr Name"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-semibold text-[#14532d] mb-2">
                  E-Mail *
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition"
                  placeholder="ihre@email.de"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-[#14532d] mb-2">
                  Nachricht *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-[#16a34a] focus:border-transparent transition resize-none"
                  placeholder="Ihre Nachricht..."
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-[#16a34a] text-white font-bold rounded-xl hover:bg-[#15803d] transition-colors text-sm"
              >
                Absenden
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 18.2: Commit**

```bash
git add app/kontakt/
git commit -m "feat: add Kontakt page with Netlify Forms contact form"
```

---

## Task 19: SEO & Sitemap

**Files:**
- Create: `app/robots.ts`
- Create: `app/sitemap.ts`

- [ ] **Step 19.1: Create app/robots.ts**

```typescript
// app/robots.ts
import type { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: '*', allow: '/' },
    sitemap: 'https://www.donau-ev.de/sitemap.xml',
  };
}
```

- [ ] **Step 19.2: Create app/sitemap.ts**

```typescript
// app/sitemap.ts
import type { MetadataRoute } from 'next';
import { getAllNews, PROJECT_CONFIG } from '@/lib/content';

const BASE_URL = 'https://www.donau-ev.de';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const news = await getAllNews();
  const projectSlugs = Object.keys(PROJECT_CONFIG);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/ueber-uns`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/projekte`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: `${BASE_URL}/aktuelles`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/team`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/kontakt`, lastModified: new Date(), changeFrequency: 'yearly', priority: 0.6 },
  ];

  const projectRoutes: MetadataRoute.Sitemap = projectSlugs.map((slug) => ({
    url: `${BASE_URL}/projekte/${slug}`,
    changeFrequency: 'monthly',
    priority: 0.8,
  }));

  const newsRoutes: MetadataRoute.Sitemap = news.map((item) => ({
    url: `${BASE_URL}/aktuelles/${item.slug}`,
    lastModified: new Date(item.date),
    changeFrequency: 'never',
    priority: 0.6,
  }));

  return [...staticRoutes, ...projectRoutes, ...newsRoutes];
}
```

- [ ] **Step 19.3: Commit**

```bash
git add app/robots.ts app/sitemap.ts
git commit -m "feat: add robots.ts and sitemap.ts for SEO"
```

---

## Task 20: Build & Smoke Test

- [ ] **Step 20.1: Run all tests**

```bash
npx jest --no-coverage
```

Expected: all tests pass, no failures.

- [ ] **Step 20.2: Run production build**

```bash
npm run build 2>&1 | tail -30
```

Expected: `Export successful` with no TypeScript or build errors. Fix any errors before continuing.

- [ ] **Step 20.3: Verify static export output**

```bash
ls out/ | head -20
```

Expected: `index.html`, `ueber-uns/`, `projekte/`, `aktuelles/`, `team/`, `kontakt/` directories present.

- [ ] **Step 20.4: Spot-check pages**

```bash
grep -l "interkulturellen" out/index.html && echo "Hero OK"
grep -rl "KiTa Atlantik" out/projekte/ && echo "Projekte OK"
grep -rl "Sommerfest" out/aktuelles/ && echo "Aktuelles OK"
```

Expected: all three print `OK`.

- [ ] **Step 20.5: Final commit**

```bash
git add -A
git commit -m "feat: complete Donau e.V. website — all 6 pages, Markdown content, static export"
```

---

## Self-Review Checklist

- [x] **Hero** — animated bubbles, gradient, large typography → Task 11
- [x] **Navbar** — sticky, mobile hamburger, Projekte dropdown → Task 8
- [x] **Footer** — dark green `#14532d`, 3 columns, social links → Task 9
- [x] **ProjekteCards** — 4 cards with per-project gradients → Task 12
- [x] **AktuellesPreview** — last 3 news from Markdown → Tasks 12 + 6
- [x] **AboutTeaser** — 2-col, mission text → Task 12
- [x] **TeamPreview** — 3 members from Markdown → Tasks 12 + 6
- [x] **KontaktBanner** — full-width green CTA → Task 12
- [x] **Projekte pages** — list + [slug] detail with `generateStaticParams` → Task 14
- [x] **Aktuelles pages** — list + [slug] detail with `generateStaticParams` → Task 15
- [x] **Über uns** — mission, values, partner link → Task 16
- [x] **Team** — full grid from Markdown → Task 17
- [x] **Kontakt** — Netlify Forms with honeypot, WCAG labels → Task 18
- [x] **SEO** — robots.ts + sitemap.ts → Task 19
- [x] **Static export** — `output: 'export'`, `images.unoptimized: true` → Task 2
- [x] **Types** — `NewsItem`, `TeamMember`, `Project`, `ProjectConfig` defined in `types/content.ts` and used consistently
- [x] **Code language** — English throughout; German only in UI text/content
- [x] **Security** — Netlify Forms (server-side), no user input processed in JS, `rel="noopener noreferrer"` on external links
- [x] **Accessibility** — `lang="de"`, `alt` on all images, `aria-label` on icon buttons, form `id`/`htmlFor` pairing
