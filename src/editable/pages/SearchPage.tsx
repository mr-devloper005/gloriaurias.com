import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Filter, Search } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { fetchSiteFeed } from '@/lib/site-connector'
import { getPostTaskKey } from '@/lib/task-data'
import { getMockPostsForTask } from '@/lib/mock-posts'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import type { SitePost } from '@/lib/site-connector'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { toPlainText } from '@/editable/cards/PostCards'
import { pagesContent } from '@/editable/content/pages.content'
import { isUiHiddenTask } from '@/editable/content/global.content'
import { Ads } from '@/lib/ads'

export const revalidate = 3

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/search',
    title: pagesContent.search.metadata.title,
    description: pagesContent.search.metadata.description,
  })
}

const stripHtml = (value: string) => value.replace(/<[^>]*>/g, ' ')
const compactText = (value: unknown) => typeof value === 'string' ? stripHtml(value).replace(/\s+/g, ' ').trim().toLowerCase() : ''
const getContent = (post: SitePost) => post.content && typeof post.content === 'object' ? post.content as Record<string, unknown> : {}
const compactRaw = (value: unknown) => typeof value === 'string' ? value.trim() : ''
const getImage = (post: SitePost) => {
  const content = getContent(post)
  const media = Array.isArray(post.media) ? post.media.find((item) => typeof item?.url === 'string')?.url : ''
  const images = Array.isArray(content.images) ? content.images.find((item) => typeof item === 'string') as string | undefined : ''
  return media || compactRaw(content.featuredImage) || compactRaw(content.image) || compactRaw(content.thumbnail) || images || ''
}
const summaryOf = (post: SitePost) => {
  const content = getContent(post)
  return toPlainText(
    (typeof post.summary === 'string' && post.summary) ||
      compactRaw(content.description) ||
      compactRaw(content.excerpt) ||
      compactRaw(content.body) ||
      '',
  )
}

const matches = (post: SitePost, query: string, category: string, task: string) => {
  const content = getContent(post)
  const typeText = compactText(content.type)
  if (typeText === 'comment') return false
  const derivedTask = getPostTaskKey(post) || typeText
  if (derivedTask && isUiHiddenTask(derivedTask)) return false
  if (task && derivedTask !== task) return false
  const categoryText = compactText(content.category)
  const tagsText = compactText(Array.isArray(post.tags) ? post.tags.join(' ') : '')
  if (category && !(categoryText || tagsText).includes(category)) return false
  if (!query) return true
  return [post.title, post.summary, content.description, content.body, content.excerpt, content.category, Array.isArray(post.tags) ? post.tags.join(' ') : '']
    .some((value) => compactText(value).includes(query))
}

function SearchResultCard({ post, index }: { post: SitePost; index: number }) {
  const task = getPostTaskKey(post) as TaskKey | null
  const taskConfig = SITE_CONFIG.tasks.find((item) => item.key === task)
  const href = `${taskConfig?.route || `/${task || 'sbm'}`}/${post.slug}`
  const image = getImage(post)
  const summary = summaryOf(post)
  const taskLabel = task === 'sbm' ? 'Resource' : taskConfig?.label || 'Result'
  const strong = index === 0

  return (
    <Link href={href} className={`group grid gap-5 rounded-[24px] border border-[var(--editable-border)] bg-white p-5 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)] hover:shadow-[0_26px_70px_rgba(6,19,35,0.1)] ${strong ? 'lg:grid-cols-[260px_minmax(0,1fr)] xl:col-span-2' : ''}`}>
      {image ? (
        <div className={`overflow-hidden rounded-[18px] bg-[var(--slot4-media-bg)] ${strong ? 'aspect-[4/3] lg:aspect-auto' : 'aspect-[16/9]'}`}>
          <img src={image} alt="" className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.04]" />
        </div>
      ) : null}
      <div className="min-w-0">
        <span className="inline-flex rounded-full bg-[var(--slot4-accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-[var(--slot4-page-text)]">{taskLabel}</span>
        <h2 className="editable-display mt-4 line-clamp-3 text-2xl font-semibold leading-tight tracking-[-0.02em]">{post.title}</h2>
        {summary ? <p className="mt-3 line-clamp-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{summary}</p> : null}
        <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[var(--slot4-page-text)]">Open result <ArrowRight className="h-4 w-4 transition group-hover:translate-x-1" /></span>
      </div>
    </Link>
  )
}

export default async function SearchPage({ searchParams }: { searchParams?: Promise<{ q?: string; category?: string; task?: string; master?: string }> }) {
  const resolved = (await searchParams) || {}
  const query = (resolved.q || '').trim()
  const normalized = query.toLowerCase()
  const category = (resolved.category || '').trim().toLowerCase()
  const task = (resolved.task || '').trim().toLowerCase()
  const useMaster = resolved.master !== '0'
  const feed = await fetchSiteFeed(useMaster ? 1000 : 300, useMaster ? { fresh: true, category: category || undefined, task: task || undefined } : undefined)
  const posts = feed?.posts?.length ? feed.posts : useMaster ? [] : SITE_CONFIG.tasks.filter((item) => item.enabled && !isUiHiddenTask(item.key)).flatMap((item) => getMockPostsForTask(item.key))
  const results = posts.filter((post) => matches(post, normalized, category, task)).slice(0, normalized ? 80 : 36)
  const enabledTasks = SITE_CONFIG.tasks.filter((item) => item.enabled && !isUiHiddenTask(item.key))

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] text-white">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-[30px] py-14 sm:px-[40px] lg:grid-cols-[0.9fr_1.1fr] lg:px-[60px] lg:py-20">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.search.hero.badge}</p>
              <h1 className="editable-display mt-5 max-w-3xl text-balance text-5xl font-semibold leading-[0.96] sm:text-7xl">{pagesContent.search.hero.title}</h1>
              <p className="mt-6 max-w-2xl text-base leading-8 text-white/70">{pagesContent.search.hero.description}</p>
            </div>
            <form action="/search" className="self-end rounded-[26px] border border-white/15 bg-white p-5 text-[var(--slot4-page-text)] shadow-[0_30px_90px_rgba(0,0,0,0.22)]">
              <input type="hidden" name="master" value="1" />
              <label className="flex items-center gap-3 rounded-[18px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-3">
                <Search className="h-5 w-5 text-[var(--slot4-accent)]" />
                <input name="q" defaultValue={query} placeholder={pagesContent.search.hero.placeholder} className="min-w-0 flex-1 bg-transparent text-base font-semibold outline-none placeholder:text-current/35" />
              </label>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <label className="flex items-center gap-2 rounded-[18px] border border-[var(--editable-border)] bg-white px-4 py-3">
                  <Filter className="h-4 w-4 text-[var(--slot4-accent)]" />
                  <input name="category" defaultValue={category} placeholder="Category" className="min-w-0 flex-1 bg-transparent text-sm font-semibold outline-none placeholder:text-current/35" />
                </label>
                <select name="task" defaultValue={task} className="rounded-[18px] border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-semibold outline-none">
                  <option value="">All public types</option>
                  {enabledTasks.map((item) => <option key={item.key} value={item.key}>{item.key === 'sbm' ? 'Resource' : item.label}</option>)}
                </select>
              </div>
              <button className="mt-3 inline-flex h-12 w-full items-center justify-center rounded-full bg-[var(--slot4-dark-bg)] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent)] hover:text-[var(--slot4-page-text)]" type="submit">
                Search archive
              </button>
            </form>
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-[30px] py-12 sm:px-[40px] lg:px-[60px] lg:py-16">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)]">{results.length} results</p>
              <h2 className="editable-display mt-2 text-3xl font-semibold tracking-[-0.02em]">{query ? `Results for "${query}"` : pagesContent.search.resultsTitle}</h2>
            </div>
            <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] bg-white px-5 py-3 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]">
              Browse resources <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {results.length ? (
            <div className="mt-8 grid gap-5 lg:grid-cols-2 xl:grid-cols-3">
              {results.map((post, index) => <SearchResultCard key={post.id || post.slug} post={post} index={index} />)}
            </div>
          ) : (
            <div className="mt-8 rounded-[26px] border border-dashed border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-10 text-center">
              <p className="editable-display text-3xl font-semibold tracking-[-0.02em]">No matching resources found.</p>
              <p className="mx-auto mt-3 max-w-md text-sm leading-7 text-[var(--slot4-muted-text)]">Try a different keyword, source, category, or public content type.</p>
            </div>
          )}

          <div className="mt-12">
            <Ads slot="footer" showLabel />
          </div>
        </section>
      </main>
    </EditableSiteShell>
  )
}
