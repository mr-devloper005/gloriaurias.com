'use client'

import Link from 'next/link'
import { ArrowRight, ArrowUpRight, Bookmark, LogIn, Mail, PlusCircle, Search, UserPlus } from 'lucide-react'
import { CATEGORY_OPTIONS } from '@/lib/categories'
import { SITE_CONFIG } from '@/lib/site-config'
import { globalContent } from '@/editable/content/global.content'
import { useEditableLocalAuthSession } from '@/editable/components/EditableLocalAuthForms'

const mainCategoryLinks = CATEGORY_OPTIONS.slice(0, 6).map((category) => ({
  label: category.name,
  href: `/sbm?category=${category.slug}`,
}))

const discoveryLinks = [
  { label: 'All resources', href: '/sbm', icon: Bookmark },
  { label: 'Search library', href: '/search', icon: Search },
  { label: 'About', href: '/about', icon: ArrowRight },
  { label: 'Contact', href: '/contact', icon: Mail },
]

export function EditableFooter() {
  const year = new Date().getFullYear()
  const { session, logout } = useEditableLocalAuthSession()
  const accountLinks = session
    ? [{ label: 'Create resource', href: '/create', icon: PlusCircle }]
    : [
        { label: 'Login', href: '/login', icon: LogIn },
        { label: 'Sign up', href: '/signup', icon: UserPlus },
      ]

  return (
    <footer className="border-t border-white/10 bg-[var(--editable-footer-bg)] text-[var(--editable-footer-text)]">
      <div className="mx-auto max-w-[var(--editable-container)] px-[30px] py-14 sm:px-[40px] lg:px-[60px] lg:py-20">
        <div className="grid gap-10 border-b border-white/10 pb-12 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
          <div>
            <Link href="/" className="inline-flex items-center gap-3">
              <span className="flex h-12 w-12 items-center justify-center overflow-hidden rounded-full border border-white/20 bg-white">
                <img src="/favicon.png?v=20260413" alt={SITE_CONFIG.name} className="h-10 w-10 object-contain" />
              </span>
              <span>
                <span className="editable-display block text-2xl font-semibold">{SITE_CONFIG.name}</span>
                <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.24em] text-white/45">
                  Resources · Curators
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-2xl text-base leading-8 text-white/68">{globalContent.footer.description}</p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:justify-end">
            <Link href="/sbm" className="inline-flex items-center justify-center gap-2 rounded-full bg-[var(--slot4-accent)] px-6 py-3 text-sm font-semibold text-[var(--slot4-page-text)] transition duration-300 hover:-translate-y-0.5 hover:bg-[var(--slot4-coral)]">
              Browse archive <ArrowRight className="h-4 w-4" />
            </Link>
            <Link href="/search" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/20 px-6 py-3 text-sm font-semibold text-white transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)]">
              Search resources <Search className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="grid gap-10 py-12 lg:grid-cols-[1.25fr_0.85fr_0.7fr]">
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Main categories</h3>
            <div className="mt-5 grid gap-3 sm:grid-cols-2">
              {mainCategoryLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="group flex items-center justify-between gap-4 rounded-full border border-white/12 px-4 py-3 text-sm font-semibold text-white/72 transition duration-300 hover:-translate-y-0.5 hover:border-[var(--slot4-accent)] hover:text-white"
                >
                  <span>{link.label}</span>
                  <ArrowUpRight className="h-3.5 w-3.5 transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Discover</h3>
            <div className="mt-5 grid gap-3">
              {discoveryLinks.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-3 text-sm font-medium text-white/68 transition hover:text-white">
                  <link.icon className="h-4 w-4 text-[var(--slot4-accent)]" />
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold uppercase tracking-[0.24em] text-[var(--slot4-accent)]">Account</h3>
            <div className="mt-5 grid gap-3">
              {accountLinks.map((link) => (
                <Link key={link.href} href={link.href} className="inline-flex items-center gap-3 text-sm font-medium text-white/68 transition hover:text-white">
                  <link.icon className="h-4 w-4 text-[var(--slot4-accent)]" />
                  {link.label}
                </Link>
              ))}
              {session ? (
                <button type="button" onClick={logout} className="inline-flex items-center gap-3 text-left text-sm font-medium text-white/68 transition hover:text-white">
                  <LogIn className="h-4 w-4 text-[var(--slot4-accent)]" />
                  Logout
                </button>
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-white/10 pt-6 text-xs font-medium text-white/45 sm:flex-row sm:items-center sm:justify-between">
          <p>(c) {year} {SITE_CONFIG.name}. {globalContent.footer.bottomNote}</p>
          <p>Curated links, useful sources, and public resource shelves.</p>
        </div>
      </div>
    </footer>
  )
}
