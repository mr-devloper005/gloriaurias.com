'use client'

import { FormEvent, useMemo, useState } from 'react'
import Link from 'next/link'
import { ArrowRight, CheckCircle2, FileText, ImageIcon, Link2, Lock, PlusCircle, Send, Sparkles } from 'lucide-react'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { EditableSiteShell } from '@/editable/shell/EditableSiteShell'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'
import { pagesContent } from '@/editable/content/pages.content'
import { isUiHiddenTask } from '@/editable/content/global.content'

type DraftPost = {
  id: string
  task: TaskKey
  title: string
  category: string
  summary: string
  url: string
  image: string
  body: string
  createdAt: string
}

const STORE_KEY = 'slot4:created-posts'

const taskIcon: Record<string, typeof FileText> = {
  article: FileText,
  listing: Sparkles,
  classified: PlusCircle,
  image: ImageIcon,
  pdf: FileText,
  sbm: Link2,
}

const fieldClass = 'rounded-[18px] border border-[var(--editable-border)] bg-white px-4 py-3 text-sm font-semibold text-[var(--slot4-page-text)] outline-none transition placeholder:text-current/35 focus:border-[var(--slot4-accent)]'
const publicTaskLabel = (key?: TaskKey, fallback = 'resource') => key === 'sbm' ? 'Resource' : fallback

const saveDraft = (draft: DraftPost) => {
  try {
    const existing = JSON.parse(window.localStorage.getItem(STORE_KEY) || '[]')
    const list = Array.isArray(existing) ? existing : []
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft, ...list].slice(0, 50)))
  } catch {
    window.localStorage.setItem(STORE_KEY, JSON.stringify([draft]))
  }
}

export default function CreatePage() {
  const { session } = useEditableLocalAuthSession()
  const enabledTasks = useMemo(() => SITE_CONFIG.tasks.filter((task) => task.enabled && !isUiHiddenTask(task.key)), [])
  const [task, setTask] = useState<TaskKey>((enabledTasks[0]?.key || 'sbm') as TaskKey)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState('')
  const [summary, setSummary] = useState('')
  const [url, setUrl] = useState('')
  const [image, setImage] = useState('')
  const [body, setBody] = useState('')
  const [created, setCreated] = useState<DraftPost | null>(null)

  const activeTask = enabledTasks.find((item) => item.key === task) || enabledTasks[0]

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const draft: DraftPost = {
      id: `draft-${Date.now()}`,
      task,
      title: title.trim(),
      category: category.trim() || 'uncategorized',
      summary: summary.trim(),
      url: url.trim(),
      image: image.trim(),
      body: body.trim(),
      createdAt: new Date().toISOString(),
    }
    saveDraft(draft)
    setCreated(draft)
    setTitle('')
    setCategory('')
    setSummary('')
    setUrl('')
    setImage('')
    setBody('')
  }

  if (!session) {
    return (
      <EditableSiteShell>
        <main className="min-h-screen bg-[var(--slot4-dark-bg)] px-[30px] py-16 text-white sm:px-[40px] lg:px-[60px]">
          <section className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
            <div className="rounded-[28px] border border-white/15 bg-white/5 p-8 sm:p-10">
              <Lock className="h-10 w-10 text-[var(--slot4-accent)]" />
              <p className="mt-10 text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.create.locked.badge}</p>
              <h1 className="editable-display mt-5 max-w-2xl text-5xl font-semibold leading-[0.96] sm:text-7xl">{pagesContent.create.locked.title}</h1>
            </div>
            <div>
              <p className="max-w-xl text-lg leading-8 text-white/70">{pagesContent.create.locked.description}</p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link href="/login" className="inline-flex items-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition hover:-translate-y-0.5 hover:bg-white">
                  Login <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/signup" className="inline-flex items-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]">
                  Sign up
                </Link>
              </div>
            </div>
          </section>
        </main>
      </EditableSiteShell>
    )
  }

  return (
    <EditableSiteShell>
      <main className="min-h-screen bg-[var(--slot4-page-bg)] text-[var(--slot4-page-text)]">
        <section className="mx-auto grid max-w-[var(--editable-container)] gap-8 px-[30px] py-12 sm:px-[40px] lg:grid-cols-[360px_minmax(0,1fr)] lg:px-[60px] lg:py-16">
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="rounded-[28px] bg-[var(--slot4-dark-bg)] p-7 text-white">
              <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">{pagesContent.create.hero.badge}</p>
              <h1 className="editable-display mt-5 text-4xl font-semibold leading-tight">{pagesContent.create.hero.title}</h1>
              <p className="mt-5 text-sm leading-7 text-white/68">{pagesContent.create.hero.description}</p>
            </div>

            <div className="mt-5 rounded-[24px] border border-[var(--editable-border)] bg-white p-5">
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[var(--slot4-muted-text)]">Submit as</p>
              <div className="mt-4 grid gap-3">
                {enabledTasks.map((item) => {
                  const Icon = taskIcon[item.key] || FileText
                  const active = item.key === task
                  const label = publicTaskLabel(item.key, item.label)
                  return (
                    <button key={item.key} type="button" onClick={() => setTask(item.key)} className={`flex items-center gap-3 rounded-[18px] border p-4 text-left transition ${active ? 'border-[var(--slot4-dark-bg)] bg-[var(--slot4-dark-bg)] text-white' : 'border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] hover:border-[var(--slot4-accent)]'}`}>
                      <Icon className="h-5 w-5 shrink-0" />
                      <span>
                        <span className="block text-sm font-semibold">{label}</span>
                        <span className="mt-1 block text-xs opacity-65">{item.description}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </aside>

          <form onSubmit={submit} className="rounded-[28px] border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] p-6 sm:p-8">
            <div className="grid gap-6 border-b border-[var(--editable-border)] pb-6 lg:grid-cols-[1fr_auto] lg:items-end">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Create {publicTaskLabel(activeTask?.key)}</p>
                <h2 className="editable-display mt-3 text-4xl font-semibold tracking-[-0.02em]">{pagesContent.create.formTitle}</h2>
              </div>
              <span className="w-fit rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.16em] text-[var(--slot4-muted-text)]">{session.name}</span>
            </div>

            <div className="mt-7 grid gap-4">
              <input className={fieldClass} value={title} onChange={(event) => setTitle(event.target.value)} placeholder="Resource title" required />
              <div className="grid gap-4 sm:grid-cols-2">
                <input className={fieldClass} value={category} onChange={(event) => setCategory(event.target.value)} placeholder="Collection" />
                <input className={fieldClass} value={url} onChange={(event) => setUrl(event.target.value)} placeholder="Source URL" />
              </div>
              <input className={fieldClass} value={image} onChange={(event) => setImage(event.target.value)} placeholder="Optional image URL" />
              <textarea className={`${fieldClass} min-h-28`} value={summary} onChange={(event) => setSummary(event.target.value)} placeholder="Short resource summary" required />
              <textarea className={`${fieldClass} min-h-56`} value={body} onChange={(event) => setBody(event.target.value)} placeholder="Why it is useful, who it helps, and any context visitors need" required />
            </div>

            {created ? (
              <div className="mt-5 rounded-[18px] border border-emerald-200 bg-emerald-50 p-4 text-emerald-900">
                <p className="flex items-center gap-2 text-sm font-semibold"><CheckCircle2 className="h-5 w-5" /> {pagesContent.create.successTitle}</p>
                <p className="mt-1 text-sm opacity-80">{created.title}</p>
              </div>
            ) : null}

            <button type="submit" className="mt-6 inline-flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--slot4-dark-bg)] px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:-translate-y-0.5 hover:bg-[var(--slot4-accent)] hover:text-[var(--slot4-page-text)]">
              <Send className="h-4 w-4" /> {pagesContent.create.submitLabel}
            </button>
          </form>
        </section>
      </main>
    </EditableSiteShell>
  )
}
