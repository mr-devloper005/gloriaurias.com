import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const uiHiddenTaskKeys = ['profile'] as const
export const isUiHiddenTask = (key: string) => (uiHiddenTaskKeys as readonly string[]).includes(key)

export const globalContent = {
  site: {
    name: slot4BrandConfig.siteName,
    tagline: slot4BrandConfig.tagline || 'Independent reading platform',
    domain: slot4BrandConfig.domain,
    baseUrl: slot4BrandConfig.baseUrl,
  },
  nav: {
    tagline: 'Curated resources and collections',
    primaryLinks: [
      { label: 'About', href: '/about' },
      { label: 'Contact', href: '/contact' },
    ],
    actions: {
      primary: { label: 'Explore resources', href: '/sbm' },
      secondary: { label: 'Suggest a resource', href: '/contact' },
    },
  },
  footer: {
    tagline: 'Curated resources and collections',
    description: 'A public library for useful links, collections, references, and resource discovery.',
    columns: [
      {
        title: 'Collections',
        links: [
          { label: 'Business', href: '/sbm?category=business' },
          { label: 'Health', href: '/sbm?category=health' },
          { label: 'Technology', href: '/sbm?category=technology' },
          { label: 'Real Estate', href: '/sbm?category=real-estate' },
          { label: 'Home Improvement', href: '/sbm?category=home-improvement' },
          { label: 'Automotive', href: '/sbm?category=automotive' },
        ],
      },
      {
        title: 'Site',
        links: [
          { label: 'About', href: '/about' },
          { label: 'Contact', href: '/contact' },
        ],
      },
    ],
    bottomNote: 'Built for clean resource discovery.',
  },
  commonLabels: {
    readMore: 'Read more',
    viewAll: 'View all',
    explore: 'Explore',
    latest: 'Latest',
    related: 'Related',
    published: 'Published',
  },
} as const
