import Link from 'next/link'
import type { Article } from '@/lib/articles'

const CATEGORY_LABELS: Record<string, string> = {
  'qa-automation':  'QA Automation',
  'frameworks':     'Frameworks',
  'industry-news':  'Industry News',
  'best-practices': 'Best Practices',
}

export default function BlogCard({ article }: { article: Article }) {
  const readTime = Math.ceil(article.content.split(/\s+/).length / 200)
  return (
    <Link
      href={`/blog/${article.slug}`}
      className="block bg-zinc-900/60 border border-zinc-800 rounded-xl overflow-hidden hover:border-zinc-600 transition-colors group"
    >
      {article.imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={article.imageUrl}
          alt={article.title}
          className="w-full h-40 object-cover group-hover:scale-105 transition-transform duration-500"
        />
      )}
      <div className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-xs text-zinc-500">
            {CATEGORY_LABELS[article.category] ?? article.category}
          </span>
          <span className="text-zinc-700">·</span>
          <span className="text-xs text-zinc-500">{readTime} min read</span>
          <span className="text-zinc-700">·</span>
          <span className="text-xs text-zinc-500">
            {new Date(article.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric',
            })}
          </span>
        </div>
        <h3 className="text-zinc-100 font-semibold leading-snug group-hover:text-white transition-colors">
          {article.title}
        </h3>
        <p className="text-sm text-zinc-500 mt-1 line-clamp-2">{article.excerpt}</p>
      </div>
    </Link>
  )
}
