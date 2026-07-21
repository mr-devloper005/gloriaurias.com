'use client'

import { ArrowRight, Link2, Mail, Send, ShieldCheck } from 'lucide-react'
import { pagesContent } from '@/editable/content/pages.content'
import { EditableContactLeadForm } from '@/editable/components/EditableContactLeadForm'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { EditableReveal } from '@/editable/shell/EditableReveal'

const routes = [
  { icon: Link2, title: 'Resource lead', body: 'Share a useful source, collection, or reference that should be reviewed.' },
  { icon: ShieldCheck, title: 'Update or correction', body: 'Flag broken links, outdated source details, or missing context.' },
  { icon: Mail, title: 'Partnership note', body: 'Coordinate collection work, resource lists, or editorial reference projects.' },
]

export default function ContactPage() {
  return (
    <EditableSiteShell>
      <main className="bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto max-w-[var(--editable-container)] px-[30px] py-12 sm:px-[40px] lg:px-[60px] lg:py-20">
          <EditableReveal className="rounded-[28px] bg-[var(--slot4-dark-bg)] p-7 text-white sm:p-10 lg:p-12">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.contact.eyebrow}</p>
            <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_0.75fr] lg:items-end">
              <h1 className="editable-display max-w-4xl text-balance text-5xl font-semibold leading-[0.96] sm:text-7xl">{pagesContent.contact.title}</h1>
              <p className="text-base leading-8 text-white/70">{pagesContent.contact.description}</p>
            </div>
          </EditableReveal>
        </section>

        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-[30px] pb-16 sm:px-[40px] lg:grid-cols-[0.82fr_1.18fr] lg:px-[60px] lg:pb-24">
          <EditableReveal className="space-y-4">
            {routes.map((route, index) => (
              <div key={route.title} className="group rounded-[22px] border border-[var(--editable-border)] bg-white p-6 transition duration-300 hover:-translate-y-1 hover:border-[var(--slot4-accent)]">
                <div className="flex items-start justify-between gap-5">
                  <route.icon className="h-6 w-6 text-[var(--slot4-accent)]" />
                  <span className="text-xs font-semibold text-[var(--slot4-soft-muted-text)]">0{index + 1}</span>
                </div>
                <h2 className="editable-display mt-5 text-2xl font-semibold">{route.title}</h2>
                <p className="mt-3 text-sm leading-7 text-[var(--slot4-muted-text)]">{route.body}</p>
              </div>
            ))}
          </EditableReveal>

          <EditableReveal index={1} className="rounded-[28px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 sm:p-8">
            <div className="mb-7 flex items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--slot4-accent)]">Message intake</p>
                <h2 className="editable-display mt-2 text-3xl font-semibold">{pagesContent.contact.formTitle}</h2>
              </div>
              <Send className="h-6 w-6 text-[var(--slot4-accent)]" />
            </div>
            <EditableContactLeadForm />
            <p className="mt-6 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">
              Routed for review <ArrowRight className="h-3.5 w-3.5" />
            </p>
          </EditableReveal>
        </section>
      </main>
    </EditableSiteShell>
  )
}
