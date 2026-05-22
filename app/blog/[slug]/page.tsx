import { notFound } from 'next/navigation'
import { getArticleBySlug, getAllArticles } from '@/lib/articles'
import Navbar from '@/components/Navbar'
import ReactMarkdown from 'react-markdown'

export async function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }))
}

export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const article = getArticleBySlug(slug)
  if (!article) notFound()

  return (
    <main
      style={{
        background: '#121212',
        minHeight: '100vh',
        fontFamily: "var(--font-karla), 'Karla', sans-serif",
      }}
    >
      <Navbar />

      {article.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full object-cover"
          style={{ height: 360, marginTop: 64 }}
        />
      )}

      <div className="max-w-2xl mx-auto px-6 pt-10 pb-16">
        <div className="flex items-center gap-3 mb-4 text-sm text-zinc-500">
          <a href="/blog" className="hover:text-zinc-300 transition-colors">
            ← Blog
          </a>
          <span>·</span>
          <span>
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'long',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
          {article.mediumUrl && (
            <>
              <span>·</span>
              <a
                href={article.mediumUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                Also on Medium ↗
              </a>
            </>
          )}
        </div>

        <h1 className="text-3xl font-bold text-white mb-3 leading-tight">
          {article.title}
        </h1>
        <p className="text-zinc-400 text-lg mb-10 leading-relaxed">{article.excerpt}</p>

        <div className="prose prose-invert prose-zinc max-w-none">
          <ReactMarkdown>{article.content}</ReactMarkdown>
        </div>

        <div className="mt-16 pt-8 border-t border-zinc-800 flex items-center gap-4">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-pink-600 flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
            AA
          </div>
          <div>
            <p className="text-zinc-100 font-semibold">Abdulkadir Akyurt</p>
            <p className="text-zinc-500 text-sm">
              QA Engineer & Test Automation Specialist ·{' '}
              <a
                href="https://mywebsite279.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-zinc-300 transition-colors"
              >
                mywebsite279.netlify.app
              </a>
            </p>
          </div>
        </div>
      </div>
    </main>
  )
}
