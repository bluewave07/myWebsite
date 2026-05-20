'use client';
import { useState } from 'react';

type Tab = 'Articles' | 'Blockchain' | 'Projects';

interface Item {
  title: string;
  tag: string;
  date?: string;
  img?: string;
  url?: string;
  desc: string;
  bg?: string;
}

const ARTICLES: Item[] = [
  {
    title: 'Selenium and PowerShell',
    tag: 'Automation',
    date: 'Mar 9, 2022',
    img: 'https://cdn-images-1.medium.com/max/1024/1*fIY6E0Z0B7n4ptqPHtY4Vg.jpeg',
    url: 'https://medium.com/@abdulkadirakyurt.de/selenium-and-powershell-17cf6c504ff1',
    desc: 'Combining PowerShell and Selenium WebDriver for powerful web automation tasks.',
  },
  {
    title: 'Blokzincir Ekosistemi Üzerine-1',
    tag: 'Blockchain',
    date: 'Dec 20, 2022',
    img: 'https://cdn-images-1.medium.com/max/647/1*FWO86sx3plrMg2SZxxIrjw.png',
    url: 'https://medium.com/@abdulkadirakyurt.de/blokzincir-ekosistemi-%C3%BCzerine-1-264935a0846',
    desc: 'Neden Blokzincir ekosistemine geçiş yapılmalıdır?',
  },
  {
    title: 'What is Blockchain Technology?',
    tag: 'Blockchain',
    date: 'Nov 6, 2022',
    img: 'https://cdn-images-1.medium.com/max/1024/1*VJT5H36-h0OAtkiPDuqz6A.png',
    url: 'https://medium.com/@abdulkadirakyurt.de/what-is-blockchain-technology-caf9a62b3890',
    desc: 'A foundational overview of blockchain: distributed ledgers, encryption, and transparency.',
  },
  {
    title: 'Database Testing using Robot Framework',
    tag: 'QA Testing',
    date: 'Mar 16, 2022',
    img: 'https://cdn-images-1.medium.com/max/800/1*Wfc5AFKlOUb9NkEgNw3k9g.png',
    url: 'https://medium.com/@abdulkadirakyurt.de/database-testing-using-robot-framework-a8677cba998b',
    desc: 'Step-by-step guide to database testing using Robot Framework with real examples.',
  },
  {
    title: 'Overview on Database Components',
    tag: 'Database',
    date: 'Mar 4, 2022',
    img: 'https://cdn-images-1.medium.com/max/700/0*w0336y3gGR_Z0Rkq.png',
    url: 'https://medium.com/@abdulkadirakyurt.de/overview-on-database-components-abbc2e440a85',
    desc: 'DBMS, RDBMS, SQL — understanding the core components of modern databases.',
  },
  {
    title: 'Selenium with Robotframework — UI Test',
    tag: 'QA Testing',
    date: 'Feb 24, 2022',
    img: 'https://cdn-images-1.medium.com/max/850/1*Yw4SZwrSamORail_QmBX_w.jpeg',
    url: 'https://medium.com/@abdulkadirakyurt.de/selenium-with-robotframework-ui-test-9b2cefb9d9ef',
    desc: 'Robot Framework + Selenium setup, Page Object Model, and automated report generation.',
  },
];

const BLOCKCHAIN: Item[] = ARTICLES.filter(a => a.tag === 'Blockchain');

const PROJECTS: Item[] = [
  { title: 'Test Automation Framework', tag: 'QA', desc: 'End-to-end test automation suite', bg: 'linear-gradient(135deg,#0a1a0a,#1a4a1a)' },
  { title: 'QA Dashboard App',          tag: 'Full Stack', desc: 'Real-time QA metrics dashboard', bg: 'linear-gradient(135deg,#1a0a0a,#4a1a2a)' },
  { title: 'Blockchain Voting System',  tag: 'Blockchain', desc: 'Decentralized on-chain voting', bg: 'linear-gradient(135deg,#0a0a1a,#2a1a5a)' },
  { title: 'API Testing Suite',         tag: 'API', desc: 'Postman + Newman CI pipeline', bg: 'linear-gradient(135deg,#1a1a0a,#3a3a0a)' },
  { title: 'Performance Monitor Tool',  tag: 'Monitoring', desc: 'Load testing & metrics collector', bg: 'linear-gradient(135deg,#0a1a1a,#0a3a3a)' },
  { title: 'CI/CD Pipeline Builder',    tag: 'DevOps', desc: 'GitHub Actions + Docker deploy', bg: 'linear-gradient(135deg,#1a0a1a,#3a0a3a)' },
];

const TAG_COLOR: Record<string, string> = {
  Automation:  '#2a6aaa',
  Blockchain:  '#aa367c',
  'QA Testing':'#1a7a4a',
  Database:    '#7a5a1a',
  QA:          '#1a7a4a',
  'Full Stack':'#6a2aaa',
  API:         '#2a4a8a',
  Monitoring:  '#3a6a2a',
  DevOps:      '#7a2a2a',
};

const DATA: Record<Tab, Item[]> = {
  Articles:   ARTICLES,
  Blockchain: BLOCKCHAIN,
  Projects:   PROJECTS,
};

function ArticleCard({ item }: { item: Item }) {
  const isLink = !!item.url;
  const Wrapper = isLink ? 'a' : 'div';
  const wrapperProps = isLink
    ? { href: item.url, target: '_blank', rel: 'noopener noreferrer' }
    : {};

  return (
    <Wrapper
      {...wrapperProps}
      className="group"
      style={{ display: 'block', borderRadius: 20, overflow: 'hidden', cursor: 'pointer', textDecoration: 'none', background: '#1a1a1a' }}
    >
      {/* Image / Gradient area */}
      <div style={{ height: 220, position: 'relative', overflow: 'hidden', background: item.bg ?? '#1e1e2a' }}>
        {item.img && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={item.img}
            alt={item.title}
            style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', transition: 'transform 0.5s ease' }}
            className="group-hover:scale-105"
          />
        )}

        {/* Always-on dark vignette at bottom */}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 55%)', zIndex: 1 }} />

        {/* Hover gradient overlay */}
        <div
          className="absolute bottom-0 left-0 right-0 group-hover:h-full transition-all duration-500"
          style={{ height: 0, background: 'linear-gradient(90.21deg, rgba(170,54,124,0.88) -5.91%, rgba(74,47,189,0.88) 111.58%)', zIndex: 2 }}
        />

        {/* Tag badge (top-left) */}
        <span
          style={{
            position: 'absolute', top: 14, left: 14,
            background: TAG_COLOR[item.tag] ?? '#444',
            color: '#fff', fontSize: 11, fontWeight: 600,
            letterSpacing: '0.6px', padding: '4px 10px',
            borderRadius: 50, zIndex: 3,
          }}
        >
          {item.tag}
        </span>

        {/* Hover content (center) */}
        <div
          className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-400 text-center px-5"
          style={{ transitionDelay: '0.08s', zIndex: 4 }}
        >
          <h4 className="text-white font-bold tracking-[0.8px]" style={{ fontSize: 20, lineHeight: '1.25em', marginBottom: 10 }}>
            {item.title}
          </h4>
          <span className="text-white/80 italic" style={{ fontSize: 13, letterSpacing: '0.4px' }}>
            {item.desc}
          </span>
          {item.url && (
            <span
              style={{
                marginTop: 18, padding: '7px 22px',
                border: '1px solid rgba(255,255,255,0.7)',
                borderRadius: 50, color: '#fff', fontSize: 13,
                fontWeight: 600, letterSpacing: '0.6px',
              }}
            >
              Read on Medium →
            </span>
          )}
        </div>
      </div>

      {/* Card footer */}
      <div style={{ padding: '14px 18px 16px', background: '#161616' }}>
        <p className="text-white font-semibold" style={{ fontSize: 14, lineHeight: '1.3em', marginBottom: 6, letterSpacing: '0.3px' }}>
          {item.title}
        </p>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <span style={{ color: 'rgba(255,255,255,0.35)', fontSize: 12 }}>{item.date ?? item.tag}</span>
          {item.url && (
            <span style={{ color: '#aa367c', fontSize: 12, fontWeight: 600 }}>medium.com ↗</span>
          )}
        </div>
      </div>
    </Wrapper>
  );
}

export default function CloneProjects() {
  const [tab, setTab] = useState<Tab>('Articles');

  return (
    <section id="articles" style={{ background: '#000', padding: '80px 0 60px', position: 'relative' }}>
      <div style={{ maxWidth: 1140, margin: '0 auto', padding: '0 24px' }}>

        <h2 className="font-bold text-white text-center tracking-[0.8px]" style={{ fontSize: 45, marginBottom: 14 }}>
          Articles &amp; Projects
        </h2>
        <p className="text-center tracking-[0.8px]" style={{ color: '#b8b8b8', fontSize: 18, lineHeight: '1.5em', margin: '0 auto 36px', maxWidth: 520 }}>
          Writing about QA Engineering, Test Automation, and Blockchain Technology.
        </p>

        {/* Pill tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 44 }}>
          <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 50, overflow: 'hidden', display: 'flex' }}>
            {(['Articles', 'Blockchain', 'Projects'] as Tab[]).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className="relative font-medium tracking-[0.8px] text-white transition-all duration-300"
                style={{
                  padding: '14px 36px',
                  fontSize: 16,
                  fontWeight: 500,
                  border: tab === t ? '1px solid rgba(255,255,255,0.6)' : 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                <span
                  className="absolute inset-0 transition-all duration-300"
                  style={{
                    background: 'linear-gradient(90.21deg, #aa367c -5.91%, #4a2fbd 111.58%)',
                    width: tab === t ? '100%' : '0%',
                    zIndex: 0,
                  }}
                />
                <span style={{ position: 'relative', zIndex: 1 }}>{t}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {DATA[tab].map(item => (
            <ArticleCard key={item.title} item={item} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center" style={{ marginTop: 48 }}>
          <a
            href="https://medium.com/@abdulkadirakyurt.de"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block text-white font-medium tracking-[0.8px] hover:opacity-90 transition-opacity"
            style={{
              background: 'linear-gradient(90.21deg, #aa367c -5.91%, #4a2fbd 111.58%)',
              borderRadius: 50,
              padding: '13px 38px',
              fontSize: 16,
              textDecoration: 'none',
            }}
          >
            Read more on Medium →
          </a>
        </div>
      </div>
    </section>
  );
}
