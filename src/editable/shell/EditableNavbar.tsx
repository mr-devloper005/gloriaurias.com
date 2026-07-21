'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Bookmark, LogIn, Menu, PlusCircle, Search, UserPlus, X } from 'lucide-react'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const navItems = [
  { label: 'About', href: '/about' },
  { label: 'Contact', href: '/contact' },
]

export function EditableNavbar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { session, logout } = useEditableLocalAuthSession()
  const accountLinks = session
    ? [{ label: 'Create', href: '/create', icon: PlusCircle, primary: true }]
    : [
        { label: 'Login', href: '/login', icon: LogIn },
        { label: 'Sign up', href: '/signup', icon: UserPlus, primary: true },
      ]

  return (
    <header className="sticky top-0 z-50 border-b border-[var(--editable-border)] bg-white/90 text-[var(--slot4-page-text)] backdrop-blur-2xl">
      <nav className="mx-auto flex min-h-[78px] w-full max-w-[var(--editable-container)] items-center gap-4 px-[30px] sm:px-[40px] lg:px-[60px]">
        <Link href="/" className="group flex min-w-0 shrink-0 items-center gap-3">
          <span className="grid h-11 w-11 place-items-center overflow-hidden rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] transition duration-300 group-hover:-translate-y-0.5 group-hover:border-[var(--slot4-accent)]">
            <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
          </span>
          <span className="min-w-0">
            <span className="editable-display block max-w-[220px] truncate text-lg font-semibold leading-none">{SITE_CONFIG.name}</span>
            <span className="mt-1 hidden max-w-[260px] truncate text-[10px] font-semibold uppercase tracking-[0.24em] text-[var(--slot4-muted-text)] sm:block">
              {globalContent.nav.tagline}
            </span>
          </span>
        </Link>

        <Link href="/sbm" className="ml-4 hidden items-center gap-2 rounded-full border border-[var(--editable-border)] bg-[var(--slot4-panel-bg)] px-4 py-2 text-xs font-semibold text-[var(--slot4-muted-text)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-page-text)] lg:inline-flex">
          <Bookmark className="h-3.5 w-3.5 text-[var(--slot4-accent)]" />
          Resource archive
        </Link>

        <div className="ml-auto hidden items-center gap-2 lg:flex">
          {navItems.map((item) => {
            const active = pathname === item.href
            return (
              <Link key={item.href} href={item.href} className={`rounded-full px-4 py-2 text-sm font-semibold transition duration-300 ${active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]' : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)] hover:text-[var(--slot4-page-text)]'}`}>
                {item.label}
              </Link>
            )
          })}
          <Link href="/search" aria-label="Search library" className="grid h-11 w-11 place-items-center rounded-full border border-[var(--editable-border)] transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]">
            <Search className="h-4 w-4" />
          </Link>
        </div>

        <div className="hidden shrink-0 items-center gap-2 sm:flex">
          {accountLinks.map((item) => (
            <Link key={item.href} href={item.href} className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold transition duration-300 hover:-translate-y-0.5 ${item.primary ? 'bg-[var(--slot4-dark-bg)] text-white hover:bg-[var(--slot4-accent)] hover:text-[var(--slot4-page-text)]' : 'border border-[var(--editable-border)] text-[var(--slot4-muted-text)] hover:border-[var(--slot4-accent)] hover:text-[var(--slot4-page-text)]'}`}>
              <item.icon className="h-3.5 w-3.5" /> {item.label}
            </Link>
          ))}
          {session ? (
            <button type="button" onClick={logout} className="px-3 py-2 text-xs font-semibold text-[var(--slot4-muted-text)] transition hover:text-[var(--slot4-page-text)]">
              Logout
            </button>
          ) : null}
        </div>

        <button type="button" onClick={() => setOpen((value) => !value)} className="ml-auto grid h-11 w-11 place-items-center rounded-full border border-[var(--editable-border)] bg-white lg:hidden" aria-label="Toggle menu">
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open ? (
        <div className="border-t border-[var(--editable-border)] bg-white px-[30px] py-5 lg:hidden">
          <div className="grid gap-2">
            {[{ label: 'Home', href: '/' }, { label: 'Resource archive', href: '/sbm' }, ...navItems, { label: 'Search', href: '/search' }, ...accountLinks].map((item) => {
              const active = pathname === item.href
              return (
                <Link key={item.href} href={item.href} onClick={() => setOpen(false)} className={`rounded-full px-4 py-3 text-sm font-semibold ${active ? 'bg-[var(--slot4-accent-soft)] text-[var(--slot4-page-text)]' : 'text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)]'}`}>
                  {item.label}
                </Link>
              )
            })}
            {session ? (
              <button type="button" onClick={logout} className="rounded-full px-4 py-3 text-left text-sm font-semibold text-[var(--slot4-muted-text)] hover:bg-[var(--slot4-panel-bg)]">
                Logout
              </button>
            ) : null}
          </div>
        </div>
      ) : null}
    </header>
  )
}
