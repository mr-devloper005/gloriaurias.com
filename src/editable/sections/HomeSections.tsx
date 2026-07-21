import Link from 'next/link'
import { ArrowRight, Bookmark, CheckCircle2, ExternalLink, Globe2, Library, Search, Sparkles } from 'lucide-react'
import type { SitePost } from '@/lib/site-connector'
import type { HomeTimeSection } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { postHref, toPlainText } from '@/editable/cards/PostCards'
import { EditableReveal } from '@/editable/shell/EditableReveal'

type HomeSectionProps = {
  primaryTask: TaskKey
  primaryRoute: string
  posts: SitePost[]
  timeSections: HomeTimeSection[]
}

const container = 'mx-auto w-full max-w-[var(--editable-container)] px-[30px] sm:px-[40px] lg:px-[60px]'
function getContent(post?: SitePost | null) {
  return post?.content && typeof post.content === 'object' ? (post.content as Record<string, unknown>) : {}
}

function getField(post: SitePost, keys: string[]) {
  const content = getContent(post)
  for (const key of keys) {
    const value = content[key]
    if (typeof value === 'string' && value.trim()) return value.trim()
  }
  return ''
}

function categoryOf(post?: SitePost | null) {
  const content = getContent(post)
  return (typeof content.category === 'string' && content.category) || post?.tags?.[0] || 'Reference'
}

function summaryOf(post?: SitePost | null, limit = 150) {
  const content = getContent(post)
  const clean = toPlainText(
    (typeof content.description === 'string' && content.description) ||
      (typeof content.summary === 'string' && content.summary) ||
      (typeof post?.summary === 'string' && post.summary) ||
      (typeof content.body === 'string' && content.body) ||
      '',
  )
  return clean.length > limit ? `${clean.slice(0, limit).trim()}...` : clean
}

function domainOf(post: SitePost) {
  const website = getField(post, ['website', 'url', 'link'])
  return website.replace(/^https?:\/\//, '').replace(/^www\./, '').split('/')[0] || 'curated source'
}

function dedupePosts(posts: SitePost[]) {
  const seen = new Set<string>()
  return posts.filter((post) => {
    const key = post.slug || post.id || post.title
    if (!key || seen.has(key)) return false
    seen.add(key)
    return true
  })
}

function ResourceCard({ post, href, index }: { post: SitePost; href: string; index: number }) {
  return (
    <Link href={href} className="group flex min-h-[260px] flex-col rounded-[18px] border border-[var(--editable-border)] bg-white p-6 transition duration-500 hover:-translate-y-1.5 hover:border-[var(--slot4-accent)] hover:shadow-[0_28px_80px_rgba(6,19,35,0.12)]">
      <div className="flex items-start justify-between gap-4">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]">
          <Globe2 className="h-5 w-5" />
        </span>
        <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-soft-muted-text)]">No. {String(index + 1).padStart(2, '0')}</span>
      </div>
      <p className="mt-7 text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{categoryOf(post)}</p>
      <h3 className="editable-display mt-3 line-clamp-2 text-2xl font-semibold leading-tight">{post.title}</h3>
      <p className="mt-3 line-clamp-3 flex-1 text-sm leading-7 text-[var(--slot4-muted-text)]">{summaryOf(post, 135)}</p>
      <div className="mt-6 flex items-center justify-between gap-4 border-t border-[var(--editable-border)] pt-4">
        <span className="truncate text-sm font-semibold text-[var(--slot4-muted-text)]">{domainOf(post)}</span>
        <ArrowRight className="h-4 w-4 shrink-0 transition duration-300 group-hover:translate-x-1" />
      </div>
    </Link>
  )
}

export function EditableHomeHero({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const feature = pool[0]
  const categories = Array.from(new Set(pool.map((post) => categoryOf(post)).filter(Boolean))).slice(0, 6)

  return (
    <section className="overflow-hidden bg-[var(--slot4-dark-bg)] text-white">
      <div className={`${container} grid min-h-[calc(100vh-82px)] gap-12 py-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-center lg:py-20`}>
        <EditableReveal className="max-w-3xl">
         
          <h1 className="editable-display mt-6 text-balance text-5xl font-semibold leading-[0.98] sm:text-7xl lg:text-[6rem]">
            Curated resources with room to breathe.
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-white/72">
            Discover useful links, reference shelves, tools, and collections selected for people who want signal without the usual clutter.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Link href={primaryRoute} className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-coral)]">
              Explore resources <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]">
              Search library <Search className="h-4 w-4" />
            </Link>
          </div>
        </EditableReveal>

        <EditableReveal index={1} className="relative">
          <div className="rounded-[26px] border border-white/15 bg-white p-4 text-[var(--slot4-page-text)] shadow-[0_40px_110px_rgba(0,0,0,0.28)]">
            <div className="rounded-[20px] bg-[var(--slot4-panel-bg)] p-6 sm:p-8">
              <div className="flex items-center justify-between gap-4">
                <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em]">
                  <Library className="h-4 w-4 text-[var(--slot4-accent)]" /> Featured shelf
                </span>
                <Sparkles className="h-5 w-5 text-[var(--slot4-coral)]" />
              </div>
              <h2 className="editable-display mt-12 max-w-xl text-4xl font-semibold leading-tight sm:text-5xl">
                {feature?.title || 'A living index of helpful references'}
              </h2>
              <p className="mt-5 max-w-xl text-base leading-8 text-[var(--slot4-muted-text)]">{feature ? summaryOf(feature, 190) : 'Browse hand-picked resources arranged by collection, domain, and practical use.'}</p>
              <div className="mt-10 grid gap-3 sm:grid-cols-3">
                {['Collection', 'Domain', 'Verified'].map((item) => (
                  <div key={item} className="rounded-[16px] border border-[var(--editable-border)] bg-white p-4">
                    <CheckCircle2 className="h-5 w-5 text-[var(--slot4-accent)]" />
                    <p className="mt-3 text-sm font-semibold">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </EditableReveal>
      </div>
      {categories.length ? (
        <div className="border-y border-white/10 py-4">
          <div className={`${container} flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden`}>
            {categories.map((category) => (
              <Link key={category} href={`${primaryRoute}?category=${encodeURIComponent(category.toLowerCase())}`} className="shrink-0 rounded-full border border-white/15 px-5 py-2 text-sm font-semibold text-white/72 transition hover:border-[var(--slot4-accent)] hover:text-white">
                {category}
              </Link>
            ))}
          </div>
        </div>
      ) : null}
    </section>
  )
}

export function EditableStoryRail({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)]).slice(0, 8)
  if (!pool.length) return null
  return (
    <section className="bg-white">
      <div className={`${container} py-16 lg:py-24`}>
        <EditableReveal>
          <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Collections marquee</p>
              <h2 className="editable-display mt-4 text-4xl font-semibold sm:text-5xl">Fresh shelves to scan.</h2>
            </div>
            <Link href={primaryRoute} className="inline-flex items-center gap-2 text-sm font-semibold">
              View all <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </EditableReveal>
        <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {pool.map((post, index) => (
            <EditableReveal key={post.id || post.slug} index={index}>
              <ResourceCard post={post} href={postHref('sbm', post, primaryRoute)} index={index} />
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableMagazineSplit({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const pool = dedupePosts([...posts, ...timeSections.flatMap((section) => section.posts)])
  const featured = pool.slice(0, 3)
  return (
    <section className="bg-[var(--slot4-panel-bg)]">
      <div className={`${container} grid gap-10 py-16 lg:grid-cols-[0.8fr_1.2fr] lg:items-start lg:py-24`}>
        <EditableReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Why it works</p>
          <h2 className="editable-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">A quieter way to find the useful thing.</h2>
          <div className="mt-8 grid gap-4">
            {[
              'Collections stay browsable without sending visitors through noisy feeds.',
              'Resource cards surface collection, source domain, and short context first.',
              'Search and direct visits stay fast, practical, and public.',
            ].map((item) => (
              <p key={item} className="flex gap-3 text-base leading-7 text-[var(--slot4-muted-text)]">
                <CheckCircle2 className="mt-1 h-5 w-5 shrink-0 text-[var(--slot4-accent)]" /> {item}
              </p>
            ))}
          </div>
        </EditableReveal>
        <div className="grid gap-5">
          {featured.map((post, index) => (
            <EditableReveal key={post.id || post.slug} index={index}>
              <Link href={postHref('sbm', post, primaryRoute)} className="group grid gap-5 rounded-[22px] border border-[var(--editable-border)] bg-white p-6 transition duration-500 hover:-translate-y-1 hover:border-[var(--slot4-accent)] sm:grid-cols-[180px_minmax(0,1fr)]">
                <div className="flex min-h-[150px] items-center justify-center rounded-[18px] bg-[var(--slot4-dark-bg)] text-white">
                  <Bookmark className="h-10 w-10 text-[var(--slot4-accent)]" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">{categoryOf(post)}</p>
                  <h3 className="editable-display mt-3 text-2xl font-semibold leading-tight">{post.title}</h3>
                  <p className="mt-3 line-clamp-2 text-sm leading-7 text-[var(--slot4-muted-text)]">{summaryOf(post)}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold">Open resource <ExternalLink className="h-4 w-4" /></span>
                </div>
              </Link>
            </EditableReveal>
          ))}
        </div>
      </div>
    </section>
  )
}

export function EditableTimeCollections({ primaryRoute, posts, timeSections }: HomeSectionProps) {
  const sections = timeSections.length ? timeSections : [{ key: 'featured', href: primaryRoute, posts }]
  const visible = sections.filter((section) => section.posts.length).slice(0, 3)
  if (!visible.length) return null

  return (
    <>
      {visible.map((section, sectionIndex) => (
        <section key={section.key} className={sectionIndex % 2 === 0 ? 'bg-white' : 'bg-[var(--slot4-panel-bg)]'}>
          <div className={`${container} py-16 lg:py-24`}>
            <EditableReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{sectionIndex === 0 ? 'Featured' : sectionIndex === 1 ? 'Recently added' : 'Evergreen'}</p>
              <h2 className="editable-display mt-4 text-4xl font-semibold sm:text-5xl">{sectionIndex === 0 ? 'Useful links with a point of view.' : sectionIndex === 1 ? 'Recently organized resources.' : 'Reference shelves worth revisiting.'}</h2>
            </EditableReveal>
            <div className="mt-9 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {section.posts.slice(0, 6).map((post, index) => (
                <EditableReveal key={post.id || post.slug} index={index}>
                  <ResourceCard post={post} href={postHref('sbm', post, primaryRoute)} index={index} />
                </EditableReveal>
              ))}
            </div>
          </div>
        </section>
      ))}
    </>
  )
}

export function EditableHomeCta() {
  return (
    <section className="bg-[var(--slot4-dark-bg)] text-white">
      <div className={`${container} py-16 text-center lg:py-24`}>
        <EditableReveal>
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Contribute signal</p>
          <h2 className="editable-display mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-6xl">Know a resource that belongs on the shelf?</h2>
          <p className="mx-auto mt-6 max-w-2xl text-base leading-8 text-white/72">Send a collection idea, useful link, or reference source and help keep the library practical.</p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Link href="/create" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-coral)]">
              Suggest a resource <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-white/25 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]">
              Contact
            </Link>
          </div>
        </EditableReveal>
      </div>
    </section>
  )
}
