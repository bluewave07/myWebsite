import { getAllArticles } from '@/lib/articles'
import BlogIndex from '@/components/BlogIndex'
import Navbar from '@/components/Navbar'

export default function BlogPage() {
  const articles = getAllArticles()

  return (
    <main
      style={{
        background: '#121212',
        minHeight: '100vh',
        fontFamily: "var(--font-karla), 'Karla', sans-serif",
      }}
    >
      <Navbar />
      <div className="max-w-3xl mx-auto px-6 pt-32 pb-16">
        <h1 className="text-4xl font-bold text-white mb-2">Blog</h1>
        <p className="text-zinc-500 mb-8">
          QA automation, frameworks, and software testing insights.
        </p>
        <BlogIndex articles={articles} />
      </div>
    </main>
  )
}
