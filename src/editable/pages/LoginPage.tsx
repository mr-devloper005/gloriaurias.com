import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowRight, Bookmark, CheckCircle2 } from 'lucide-react'
import { buildPageMetadata } from '@/lib/seo'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableLocalLoginForm } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableReveal } from '@/editable/shell/EditableReveal'

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({ path: '/login', title: 'Login', description: pagesContent.auth.login.metadataDescription })
}

export default function LoginPage() {
  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid min-h-[calc(100vh-78px)] max-w-[var(--editable-container)] gap-8 px-[30px] py-12 sm:px-[40px] lg:grid-cols-[0.85fr_1.15fr] lg:px-[60px] lg:py-16">
          <EditableReveal className="rounded-[28px] bg-[var(--slot4-dark-bg)] p-8 text-white sm:p-10 lg:flex lg:flex-col lg:justify-between">
            <div>
              <Bookmark className="h-8 w-8 text-[var(--slot4-accent)]" />
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.auth.login.badge}</p>
              <h1 className="editable-display mt-5 max-w-2xl text-5xl font-semibold leading-[0.96] sm:text-7xl">{pagesContent.auth.login.title}</h1>
            </div>
            <div className="mt-10 grid gap-4">
              {['Return to saved drafts', 'Suggest useful resources', 'Keep submissions organized'].map((item) => (
                <p key={item} className="flex items-center gap-3 text-sm font-semibold text-white/70">
                  <CheckCircle2 className="h-4 w-4 text-[var(--slot4-accent)]" />
                  {item}
                </p>
              ))}
            </div>
          </EditableReveal>

          <EditableReveal index={1} className="self-center rounded-[28px] border border-[var(--editable-border)] bg-white p-7 shadow-[0_28px_80px_rgba(6,19,35,0.08)] sm:p-9">
            <p className="text-sm leading-7 text-[var(--slot4-muted-text)]">{pagesContent.auth.login.description}</p>
            <h2 className="editable-display mt-6 text-3xl font-semibold">{pagesContent.auth.login.formTitle}</h2>
            <EditableLocalLoginForm />
            <div className="mt-7 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--editable-border)] pt-5">
              <p className="text-sm text-[var(--slot4-muted-text)]">New here?</p>
              <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-[var(--editable-border)] px-5 py-2.5 text-sm font-semibold transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]">
                {pagesContent.auth.login.createCta} <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
