import { readdirSync, readFileSync, existsSync } from 'fs'
import { join } from 'path'

const ARTICLES_DIR = join(process.cwd(), 'data', 'articles')

export interface Article {
  slug: string
  title: string
  date: string
  category: string
  mediumUrl: string
  excerpt: string
  content: string
}

export function getAllArticles(): Article[] {
  if (!existsSync(ARTICLES_DIR)) return []
  return readdirSync(ARTICLES_DIR)
    .filter((f) => f.endsWith('.json'))
    .map((f) => JSON.parse(readFileSync(join(ARTICLES_DIR, f), 'utf-8')) as Article)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

export function getArticleBySlug(slug: string): Article | null {
  const filePath = join(ARTICLES_DIR, `${slug}.json`)
  if (!existsSync(filePath)) return null
  return JSON.parse(readFileSync(filePath, 'utf-8')) as Article
}
