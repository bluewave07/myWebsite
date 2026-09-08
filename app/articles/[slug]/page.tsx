import { getAllArticles, getArticleBySlug } from '@/lib/articles'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ReactMarkdown from 'react-markdown'

const CATEGORY_LABELS: Record<string, string> = {
  'qa-automation':  'QA Automation',
  'frameworks':     'Frameworks',
  'industry-news':  'Industry News',
  'best-practices': 'Best Practices',
  'ai-testing':     'AI in Testing',
}

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) return {}
  return { title: article.title, description: article.excerpt }
}

export default async function ArticlePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  const date = new Date(article.date).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <main style={{ background: '#080810', minHeight: '100vh', color: '#fff', fontFamily: "'Poppins', sans-serif" }}>

      {/* Hero */}
      <div style={{ position: 'relative', height: 320, overflow: 'hidden' }}>
        {article.imageUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={article.imageUrl} alt={article.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        )}
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, rgba(8,8,16,0.4) 0%, rgba(8,8,16,0.95) 100%)' }} />
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '0 40px 36px' }}>
          <Link href="/#articles" style={{ color: 'rgba(255,255,255,0.5)', fontSize: 13, textDecoration: 'none', marginBottom: 16, display: 'inline-flex', alignItems: 'center', gap: 6 }}>
            ← Back to Articles
          </Link>
          <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', background: 'linear-gradient(90deg,#aa367c,#4a2fbd)', padding: '3px 12px', borderRadius: 20, width: 'fit-content', marginBottom: 10 }}>
            {CATEGORY_LABELS[article.category] ?? article.category}
          </span>
          <h1 style={{ fontSize: 'clamp(28px,5vw,44px)', fontWeight: 800, letterSpacing: '0.5px', margin: 0, maxWidth: 800 }}>{article.title}</h1>
        </div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '40px 24px 80px' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 32 }}>
          <span style={{ fontSize: 13, color: 'rgba(255,255,255,0.45)' }}>{date}</span>
          {article.mediumUrl && (
            <a
              href={article.mediumUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ fontSize: 12, fontWeight: 600, color: '#aa367c', textDecoration: 'none' }}
            >
              Also on Medium ↗
            </a>
          )}
        </div>

        <article
          className="prose prose-invert prose-lg max-w-none"
          style={{ color: '#d0d0d0' }}
        >
          <ReactMarkdown
            components={{
              img: ({ src, alt }) => (
                // eslint-disable-next-line @next/next/no-img-element
                <img src={src} alt={alt ?? ''} style={{ borderRadius: 14, width: '100%' }} />
              ),
            }}
          >
            {article.content}
          </ReactMarkdown>
        </article>
      </div>
    </main>
  )
}
