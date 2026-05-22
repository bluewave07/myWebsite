export interface FlowStep {
  step: string
  label: string
}

export interface ArchLayer {
  name: string
  items: string[]
  color: string
}

export interface ProjectData {
  slug: string
  title: string
  tag: string
  img: string
  summary: string
  flow: FlowStep[]
  tech: string[]
  architecture: ArchLayer[]
  modules: { name: string; desc: string }[]
  aiNote: string
}

const PROJECTS: ProjectData[] = [
  {
    slug: 'medium-bot',
    title: 'Medium Bot',
    tag: 'AI · Automation',
    img: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200&q=80',
    summary:
      'An end-to-end AI-powered content pipeline that generates, reviews, edits, and publishes QA engineering articles to Medium — then automatically syncs them to a personal portfolio.',
    flow: [
      { step: '01', label: 'Select or enter a topic' },
      { step: '02', label: 'Claude AI generates the full article' },
      { step: '03', label: 'Preview, AI-edit & copy in dashboard' },
      { step: '04', label: 'Paste into Medium & publish manually' },
      { step: '05', label: 'Save Medium URL → portfolio auto-syncs' },
    ],
    tech: ['Next.js 16', 'TypeScript', 'Claude AI', 'Prisma', 'SQLite', 'Tailwind CSS', 'node-cron', 'GitHub API'],
    architecture: [
      {
        name: 'Frontend (Next.js App Router)',
        items: ['Dashboard page', 'Article editor', 'DraftCard component', 'Category tabs'],
        color: '#4a2fbd',
      },
      {
        name: 'API Layer (Next.js Routes)',
        items: ['/api/generate', '/api/articles/[id]', '/api/articles/[id]/refine', '/api/articles/[id]/medium-url'],
        color: '#aa367c',
      },
      {
        name: 'AI Engine (Anthropic)',
        items: ['Article generation', 'AI edit / refine', 'Hashtag generation', 'Language detection'],
        color: '#7c3aed',
      },
      {
        name: 'Data Layer',
        items: ['Prisma ORM', 'SQLite database', 'Article model', 'Topic model'],
        color: '#0369a1',
      },
      {
        name: 'Portfolio Sync',
        items: ['Git commit & push', 'GitHub → Netlify webhook', 'JSON article files', 'Auto-deploy'],
        color: '#065f46',
      },
    ],
    modules: [
      { name: 'lib/claude.ts', desc: 'Communicates with the Anthropic API. Injects category images, follow-me footer, and hashtags into generated content.' },
      { name: 'lib/scheduler.ts', desc: 'node-cron based weekly scheduler. Triggers article generation for each category on a set day.' },
      { name: 'lib/portfolio-sync.ts', desc: 'Writes article JSON files and runs git add/commit/push to keep the portfolio repo up to date.' },
      { name: 'components/DraftCard.tsx', desc: 'Main card UI: preview, AI edit, hashtag display, Medium URL input, publish & delete actions.' },
      { name: 'prisma/schema.prisma', desc: 'SQLite schema with Article and Topic models. Tracks status, mediumUrl, imageUrl, topics, scheduledAt.' },
    ],
    aiNote:
      'This project was built with the assistance of Claude AI (claude-sonnet-4-6). Claude helped design the API routes, write the Prisma schema, build the portfolio sync pipeline, and implement the AI edit feature. The generation prompts and content pipeline were iteratively refined through conversation.',
  },
  {
    slug: 'x-bot',
    title: 'X Automation Bot',
    tag: 'AI · Social Media',
    img: 'https://images.unsplash.com/photo-1611605698335-8b1569810432?w=1200&q=80',
    summary:
      'A Python-based automation bot that generates QA-focused content and posts it to X (Twitter) on a schedule, using Claude AI for tweet generation and the X API v2 for publishing.',
    flow: [
      { step: '01', label: 'Topic or keyword is configured' },
      { step: '02', label: 'Claude AI drafts the tweet content' },
      { step: '03', label: 'Scheduling rules are applied' },
      { step: '04', label: 'X API v2 posts automatically' },
      { step: '05', label: 'Engagement metrics are tracked' },
    ],
    tech: ['Python 3', 'X API v2', 'Claude AI', 'Tweepy', 'Schedule', 'Config YAML'],
    architecture: [
      {
        name: 'Core Engine (Python)',
        items: ['main.py entry point', 'Config loader', 'CLI interface', 'Error handling'],
        color: '#4a2fbd',
      },
      {
        name: 'AI Layer (Anthropic)',
        items: ['Tweet generation', 'Thread composition', 'Tone & style control', 'QA topic focus'],
        color: '#aa367c',
      },
      {
        name: 'X API Integration',
        items: ['OAuth 2.0 auth', 'Tweepy client', 'Post tweet', 'Read metrics'],
        color: '#0369a1',
      },
      {
        name: 'Scheduler',
        items: ['Schedule library', 'Time-based triggers', 'Rate limit handling', 'Retry logic'],
        color: '#065f46',
      },
    ],
    modules: [
      { name: 'main.py', desc: 'Entry point. Initialises config, sets up the scheduler, and starts the posting loop.' },
      { name: 'src/generator.py', desc: 'Calls the Anthropic API to generate tweet content based on configured QA topics and style guidelines.' },
      { name: 'src/poster.py', desc: 'Authenticates with X API v2 via Tweepy and handles tweet publishing with error recovery.' },
      { name: 'src/scheduler.py', desc: 'Manages timing rules, avoids posting during off-hours, and handles rate limiting.' },
      { name: 'config/', desc: 'YAML-based configuration for API keys, posting schedule, topic list, and AI prompt templates.' },
    ],
    aiNote:
      'This project was built with the assistance of Claude AI (claude-sonnet-4-6). Claude helped architect the module structure, write the Tweepy integration, design the prompt templates for tweet generation, and implement the scheduler with rate-limit handling.',
  },
]

export function getAllProjects(): ProjectData[] {
  return PROJECTS
}

export function getProjectBySlug(slug: string): ProjectData | undefined {
  return PROJECTS.find(p => p.slug === slug)
}
