'use client'
import { useState } from 'react'
import type { Article } from '@/lib/articles'

type Tab = 'qa-automation' | 'frameworks' | 'industry-news' | 'best-practices' | 'projects'

const TABS: { value: Tab; label: string }[] = [
  { value: 'qa-automation',  label: 'QA Automation' },
  { value: 'frameworks',     label: 'Frameworks' },
  { value: 'industry-news',  label: 'Industry News' },
  { value: 'best-practices', label: 'Best Practices' },
  { value: 'projects',       label: 'Projects' },
]

const CATEGORY_FALLBACK_IMAGES: Record<string, string> = {
  'qa-automation':  'https://images.unsplash.com/photo-1516116216624-53e697fedbea?w=800&q=80',
  'frameworks':     'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&q=80',
  'industry-news':  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&q=80',
  'best-practices': 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800&q=80',
}

// Legacy Medium articles
const LEGACY: Array<{ title: string; date: string; img: string; url: string; excerpt: string; category: Tab }> = [
  {
    title: 'Selenium and PowerShell',
    date: 'Mar 9, 2022',
    img: 'https://cdn-images-1.medium.com/max/1024/1*fIY6E0Z0B7n4ptqPHtY4Vg.jpeg',
    url: 'https://medium.com/@abdulkadirakyurt.de/selenium-and-powershell-17cf6c504ff1',
    excerpt: 'Combining PowerShell and Selenium WebDriver for powerful web automation tasks.',
    category: 'qa-automation',
  },
  {
    title: 'Database Testing using Robot Framework',
    date: 'Mar 16, 2022',
    img: 'https://cdn-images-1.medium.com/max/800/1*Wfc5AFKlOUb9NkEgNw3k9g.png',
    url: 'https://medium.com/@abdulkadirakyurt.de/database-testing-using-robot-framework-a8677cba998b',
    excerpt: 'Step-by-step guide to database testing using Robot Framework with real examples.',
    category: 'qa-automation',
  },
  {
    title: 'Selenium with Robotframework — UI Test',
    date: 'Feb 24, 2022',
    img: 'https://cdn-images-1.medium.com/max/850/1*Yw4SZwrSamORail_QmBX_w.jpeg',
    url: 'https://medium.com/@abdulkadirakyurt.de/selenium-with-robotframework-ui-test-9b2cefb9d9ef',
    excerpt: 'Robot Framework + Selenium setup, Page Object Model, and automated report generation.',
    category: 'qa-automation',
  },
  {
    title: 'Overview on Database Components',
    date: 'Mar 4, 2022',
    img: 'https://cdn-images-1.medium.com/max/700/0*w0336y3gGR_Z0Rkq.png',
    url: 'https://medium.com/@abdulkadirakyurt.de/overview-on-database-components-abbc2e440a85',
    excerpt: 'DBMS, RDBMS, SQL — understanding the core components of modern databases.',
    category: 'best-practices',
  },
]

interface FlowStep {
  step: string
  label: string
}

interface ProjectItem {
  title: string
  tag: string
  img: string
  flow: FlowStep[]
  tech: string[]
}

const PROJECTS: ProjectItem[] = [
  {
    title: 'Medium Bot',
    tag: 'AI · Automation',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80',
    flow: [
      { step: '01', label: 'Topic seçilir veya girilir' },
      { step: '02', label: 'Claude AI makale üretir' },
      { step: '03', label: 'Dashboard\'da önizle & AI edit' },
      { step: '04', label: 'Medium\'a kopyala & yayınla' },
      { step: '05', label: 'Portfolio otomatik güncellenir' },
    ],
    tech: ['Next.js', 'Claude AI', 'Prisma', 'SQLite', 'Tailwind'],
  },
  {
    title: 'X Automation Bot',
    tag: 'AI · Social Media',
    img: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=800&q=80',
    flow: [
      { step: '01', label: 'Konu & içerik tipi belirlenir' },
      { step: '02', label: 'Claude AI tweet üretir' },
      { step: '03', label: 'Zamanlama ayarlanır' },
      { step: '04', label: 'X API ile otomatik paylaşım' },
      { step: '05', label: 'Etkileşim takip edilir' },
    ],
    tech: ['Python', 'X API v2', 'Claude AI', 'Scheduler'],
  },
]

function ArticleCard({ title, date, img, href, excerpt, isExternal }: {
  title: string; date: string; img: string; href: string; excerpt: string; isExternal: boolean
}) {
  return (
    <a
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noopener noreferrer' : undefined}
      className="group block"
      style={{ borderRadius: 20, overflow: 'hidden', cursor: 'pointer', textDecoration: 'none', background: '#1a1a1a' }}
    >
      <div style={{ height: 200, position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={img} alt={title} style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} className="group-hover:scale-105" />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)' }} />
        <div
          className="absolute bottom-0 left-0 right-0 group-hover:h-full transition-all duration-500"
          style={{ height: 0, background: 'linear-gradient(90.21deg, rgba(170,54,124,0.88) -5.91%, rgba(74,47,189,0.88) 111.58%)' }}
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-center px-5" style={{ transitionDelay: '0.06s' }}>
          <h4 className="text-white font-bold" style={{ fontSize: 18, lineHeight: '1.25em', marginBottom: 8 }}>{title}</h4>
          <span className="text-white/80 italic" style={{ fontSize: 12 }}>{excerpt}</span>
          <span style={{ marginTop: 14, padding: '6px 20px', border: '1px solid rgba(255,255,255,0.7)', borderRadius: 50, color: '#fff', fontSize: 12, fontWeight: 600 }}>
            {isExternal ? 'Read on Medium →' : 'Read article →'}
          </span>
        </div>
      </div>
      <div style={{ padding: '12px 16px 14px', background: '#161616' }}>
        <p className="text-white font-semibold" style={{ fontSize: 13, lineHeight: '1.3em', marginBottom: 4 }}>{title}</p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 11 }}>{date}</span>
          <span style={{ color: '#aa367c', fontSize: 11, fontWeight: 600 }}>{isExternal ? 'medium.com ↗' : 'blog ↗'}</span>
        </div>
      </div>
    </a>
  )
}

function ProjectCard({ item }: { item: ProjectItem }) {
  return (
    <div className="group" style={{ borderRadius: 20, overflow: 'hidden', background: '#111', border: '1px solid rgba(255,255,255,0.07)' }}>
      {/* Cover image */}
      <div style={{ height: 180, position: 'relative', overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={item.img}
          alt={item.title}
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }}
          className="group-hover:scale-105"
        />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.75) 0%, transparent 60%)' }} />
        {/* Tag badge */}
        <span
          style={{
            position: 'absolute', top: 12, left: 14,
            background: 'linear-gradient(90.21deg, rgba(170,54,124,0.85) -5.91%, rgba(74,47,189,0.85) 111.58%)',
            color: '#fff', fontSize: 10, fontWeight: 700, padding: '3px 10px', borderRadius: 20,
            letterSpacing: '0.5px',
          }}
        >
          {item.tag}
        </span>
      </div>

      {/* Content */}
      <div style={{ padding: '16px 18px 18px', background: '#161616' }}>
        <p className="text-white font-bold" style={{ fontSize: 15, marginBottom: 14 }}>{item.title}</p>

        {/* Flow steps */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 7, marginBottom: 14 }}>
          {item.flow.map((f) => (
            <div key={f.step} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <span style={{
                fontSize: 9, fontWeight: 700, color: '#aa367c',
                background: 'rgba(170,54,124,0.15)', borderRadius: 6,
                padding: '2px 6px', minWidth: 26, textAlign: 'center', letterSpacing: '0.3px',
              }}>
                {f.step}
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.65)', lineHeight: '1.4em' }}>{f.label}</span>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: 12 }}>
          {item.tech.map((t) => (
            <span key={t} style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', background: 'rgba(255,255,255,0.06)', borderRadius: 20, padding: '2px 8px' }}>{t}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function CloneProjects({ articles }: { articles: Article[] }) {
  const [tab, setTab] = useState<Tab>('qa-automation')

  const articleCards = tab !== 'projects'
    ? [
        ...articles
          .filter((a) => a.category === tab && a.mediumUrl)
          .map((a) => ({
            title: a.title,
            date: new Date(a.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
            img: a.imageUrl ?? CATEGORY_FALLBACK_IMAGES[a.category] ?? '',
            href: a.mediumUrl!,
            excerpt: a.excerpt,
            isExternal: true,
          })),
        ...LEGACY
          .filter((l) => l.category === tab)
          .map((l) => ({
            title: l.title,
            date: l.date,
            img: l.img,
            href: l.url,
            excerpt: l.excerpt,
            isExternal: true,
          })),
      ]
    : []

  return (
    <section id="articles" style={{ background: '#000', padding: '80px 0 60px' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>
        <h2 className="font-bold text-white text-center tracking-[0.8px]" style={{ fontSize: 45, marginBottom: 14 }}>
          Articles &amp; Projects
        </h2>
        <p className="text-center tracking-[0.8px]" style={{ color: '#b8b8b8', fontSize: 18, lineHeight: '1.5em', margin: '0 auto 36px', maxWidth: 520 }}>
          Writing about QA Engineering, Test Automation, and Software Testing.
        </p>

        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 44 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 50, overflow: 'hidden', display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
            {TABS.map(({ value, label }) => (
              <button
                key={value}
                onClick={() => setTab(value)}
                className="relative font-medium tracking-[0.8px] text-white transition-all duration-300"
                style={{ padding: '14px 28px', fontSize: 15, fontWeight: 500, border: tab === value ? '1px solid rgba(255,255,255,0.6)' : 'none', background: 'transparent', cursor: 'pointer', position: 'relative', overflow: 'hidden' }}
              >
                <span className="absolute inset-0 transition-all duration-300" style={{ background: 'linear-gradient(90.21deg, #aa367c -5.91%, #4a2fbd 111.58%)', width: tab === value ? '100%' : '0%', zIndex: 0 }} />
                <span style={{ position: 'relative', zIndex: 1 }}>{label}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {tab === 'projects'
            ? PROJECTS.map((p) => <ProjectCard key={p.title} item={p} />)
            : articleCards.length > 0
              ? articleCards.map((a) => <ArticleCard key={a.href} {...a} />)
              : <p className="text-zinc-600 col-span-3 text-center py-16">No articles yet in this category.</p>
          }
        </div>

        <div className="text-center" style={{ marginTop: 48 }}>
          <a
            href="https://medium.com/@abdulkadirakyurt.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white font-medium tracking-[0.8px] hover:opacity-90 transition-opacity"
            style={{ background: 'linear-gradient(90.21deg, #aa367c -5.91%, #4a2fbd 111.58%)', borderRadius: 50, padding: '13px 38px', fontSize: 16, textDecoration: 'none' }}
          >
            Read more on Medium →
          </a>
        </div>
      </div>
    </section>
  )
}
