import Link from 'next/link'
import { ArrowRight, CheckCircle2, Library, Search, Sparkles } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'

const principles = [
  'Resources are grouped by use, not by noise.',
  'Source context appears before visitors leave the site.',
  'Public pages stay centered on links, collections, and discovery.',
]

export default function AboutPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="border-b border-[var(--editable-border)] bg-[var(--slot4-dark-bg)] text-white">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-10 px-[30px] py-16 sm:px-[40px] lg:grid-cols-[1fr_0.8fr] lg:px-[60px] lg:py-24">
            <EditableReveal>
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.about.badge}</p>
              <h1 className="editable-display mt-6 max-w-4xl text-balance text-5xl font-semibold leading-[0.96] sm:text-7xl">A library for useful links, built with restraint.</h1>
              <p className="mt-7 max-w-2xl text-lg leading-8 text-white/70">{pagesContent.about.description}</p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Link href="/sbm" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:-translate-y-0.5 hover:bg-white">
                  Browse resources <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/search" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]">
                  Search library <Search className="h-4 w-4" />
                </Link>
              </div>
            </EditableReveal>
            <EditableReveal index={1} className="grid content-end gap-4">
              {principles.map((item) => (
                <div key={item} className="rounded-[20px] border border-white/12 bg-white/5 p-5">
                  <CheckCircle2 className="h-5 w-5 text-[var(--slot4-accent)]" />
                  <p className="mt-4 text-sm font-semibold leading-7 text-white/75">{item}</p>
                </div>
              ))}
            </EditableReveal>
          </div>
        </section>

        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-[30px] py-14 sm:px-[40px] lg:grid-cols-[0.75fr_1.25fr] lg:px-[60px] lg:py-20">
          <EditableReveal>
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Operating idea</p>
            <h2 className="editable-display mt-4 text-4xl font-semibold leading-tight sm:text-5xl">Make every saved source easier to judge.</h2>
          </EditableReveal>
          <EditableReveal index={1} className="grid gap-5 text-base leading-8 text-[var(--slot4-muted-text)]">
            {pagesContent.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </EditableReveal>
        </section>

        <section className="bg-[var(--slot4-panel-bg)]">
          <div className="mx-auto grid max-w-[var(--editable-container)] gap-5 px-[30px] py-14 sm:px-[40px] lg:grid-cols-3 lg:px-[60px] lg:py-20">
            {pagesContent.about.values.map((value, index) => {
              const icons = [Library, Sparkles, Search]
              const Icon = icons[index] || Library
              return (
                <EditableReveal key={value.title} index={index} className="rounded-[22px] border border-[var(--editable-border)] bg-white p-7">
                  <Icon className="h-6 w-6 text-[var(--slot4-accent)]" />
                  <h3 className="editable-display mt-6 text-2xl font-semibold">{value.title}</h3>
                  <p className="mt-4 text-sm leading-7 text-[var(--slot4-muted-text)]">{value.description}</p>
                </EditableReveal>
              )
            })}
          </div>
        </section>

        <section className="mx-auto max-w-[var(--editable-container)] px-[30px] py-14 sm:px-[40px] lg:px-[60px] lg:py-20">
          <EditableReveal className="rounded-[26px] border border-[var(--editable-border)] bg-white p-8 text-center shadow-[0_24px_70px_rgba(6,19,35,0.08)] sm:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{SITE_CONFIG.name}</p>
            <h2 className="editable-display mx-auto mt-4 max-w-3xl text-4xl font-semibold leading-tight sm:text-5xl">A quieter archive for finding the useful thing faster.</h2>
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
