'use client'
import { useState } from 'react'
import BlogCard from './BlogCard'
import type { Article } from '@/lib/articles'

const TABS = [
  { value: '',               label: 'All' },
  { value: 'qa-automation',  label: 'QA Automation' },
  { value: 'frameworks',     label: 'Frameworks' },
  { value: 'industry-news',  label: 'Industry News' },
  { value: 'best-practices', label: 'Best Practices' },
]

export default function BlogIndex({ articles }: { articles: Article[] }) {
  const [active, setActive] = useState('')
  const filtered = active ? articles.filter((a) => a.category === active) : articles

  return (
    <>
      <div className="flex gap-2 flex-wrap mb-8">
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            onClick={() => setActive(value)}
            className={`px-4 py-1.5 text-sm rounded-full transition-colors ${
              active === value
                ? 'bg-white text-zinc-950 font-medium'
                : 'bg-zinc-800/60 text-zinc-400 hover:text-zinc-200'
            }`}
          >
            {label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <p className="text-zinc-600 py-20 text-center">No articles yet.</p>
      ) : (
        <div className="space-y-4">
          {filtered.map((a) => (
            <BlogCard key={a.slug} article={a} />
          ))}
        </div>
      )}
    </>
  )
}
