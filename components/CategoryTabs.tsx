'use client'
import { useRouter, useSearchParams } from 'next/navigation'

const TABS = [
  { value: '',               label: 'All' },
  { value: 'qa-automation',  label: 'QA Automation' },
  { value: 'frameworks',     label: 'Frameworks' },
  { value: 'industry-news',  label: 'Industry News' },
  { value: 'best-practices', label: 'Best Practices' },
]

export default function CategoryTabs({ active }: { active: string }) {
  const router = useRouter()
  const searchParams = useSearchParams()

  function navigate(value: string) {
    const params = new URLSearchParams(searchParams.toString())
    if (value) params.set('category', value)
    else params.delete('category')
    router.push(`/blog?${params.toString()}`)
  }

  return (
    <div className="flex gap-2 flex-wrap">
      {TABS.map(({ value, label }) => (
        <button
          key={value}
          onClick={() => navigate(value)}
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
  )
}
