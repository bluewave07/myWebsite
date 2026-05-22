import { getAllProjects, getProjectBySlug } from '@/lib/projects'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export function generateStaticParams() {
  return getAllProjects().map(p => ({ slug: p.slug }))
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const project = getProjectBySlug(slug)
  if (!project) notFound()

  return (
    <main style={{ background: '#080810', minHeight: '100vh', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={project.img} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,16,0.4) 0%, rgba(8,8,16,0.95) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 36px' }}>
          <Link href="/#articles" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            ← Back to Portfolio
          </Link>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'linear-gradient(90deg,#aa367c,#4a2fbd)', padding: '3px 12px', borderRadius: 20, width: 'fit-content', marginBottom: 10 }}>
            {project.tag}
          </span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,48px)', fontWeight: 800, letterSpacing: '0.5px', margin: 0 }}>{project.title}</h1>
        </div>
      </div>

      <div style={{ maxWidth: 900, margin: '0 auto', padding: '48px 24px 80px' }}>

        {/* Summary */}
        <p style={{ fontSize: 17, color: '#b8b8b8', lineHeight: '1.7em', marginBottom: 48 }}>{project.summary}</p>

        {/* Flow */}
        <Section title="How It Works">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {project.flow.map((f, i) => (
              <div key={f.step} style={{ display: 'flex', alignItems: 'center', gap: 16, padding: '14px 20px', background: 'rgba(255,255,255,0.04)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.07)' }}>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'linear-gradient(90deg,#aa367c,#4a2fbd)', padding: '4px 10px', borderRadius: 8, minWidth: 32, textAlign: 'center' }}>{f.step}</span>
                {i < project.flow.length - 1 && (
                  <span style={{ fontSize: 16, color: '#aa367c', marginRight: -8 }}>→</span>
                )}
                <span style={{ fontSize: 14, color: '#d0d0d0' }}>{f.label}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Architecture */}
        <Section title="Architecture">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16 }}>
            {project.architecture.map(layer => (
              <div key={layer.name} style={{ background: 'rgba(255,255,255,0.03)', border: `1px solid ${layer.color}40`, borderRadius: 14, padding: '18px 20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <span style={{ width: 10, height: 10, borderRadius: '50%', background: layer.color, flexShrink: 0 }} />
                  <span style={{ fontSize: 12, fontWeight: 700, color: layer.color, letterSpacing: '0.4px', textTransform: 'uppercase' }}>{layer.name}</span>
                </div>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: 6 }}>
                  {layer.items.map(item => (
                    <li key={item} style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', paddingLeft: 12, borderLeft: `2px solid ${layer.color}40` }}>{item}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>

        {/* Key Modules */}
        <Section title="Key Modules">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {project.modules.map(m => (
              <div key={m.name} style={{ display: 'flex', gap: 16, padding: '14px 18px', background: 'rgba(255,255,255,0.03)', borderRadius: 12, border: '1px solid rgba(255,255,255,0.06)' }}>
                <code style={{ fontSize: 11, color: '#aa367c', background: 'rgba(170,54,124,0.12)', padding: '2px 8px', borderRadius: 6, whiteSpace: 'nowrap', alignSelf: 'flex-start', marginTop: 2 }}>{m.name}</code>
                <span style={{ fontSize: 13, color: '#b0b0b0', lineHeight: '1.6em' }}>{m.desc}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* Tech Stack */}
        <Section title="Tech Stack">
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
            {project.tech.map(t => (
              <span key={t} style={{ fontSize: 13, color: '#d0d0d0', background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)', borderRadius: 20, padding: '5px 14px' }}>{t}</span>
            ))}
          </div>
        </Section>

        {/* Claude AI note */}
        <div style={{ marginTop: 48, padding: '24px 28px', background: 'linear-gradient(135deg, rgba(170,54,124,0.12), rgba(74,47,189,0.12))', border: '1px solid rgba(170,54,124,0.3)', borderRadius: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <span style={{ fontSize: 18 }}>✦</span>
            <span style={{ fontSize: 13, fontWeight: 700, color: '#aa367c', letterSpacing: '0.5px', textTransform: 'uppercase' }}>Built with Claude AI Assistance</span>
          </div>
          <p style={{ fontSize: 13, color: '#b8b8b8', lineHeight: '1.7em', margin: 0 }}>{project.aiNote}</p>
        </div>

      </div>
    </main>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 48 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: '#fff', marginBottom: 20, paddingBottom: 10, borderBottom: '1px solid rgba(255,255,255,0.08)' }}>{title}</h2>
      {children}
    </div>
  )
}
