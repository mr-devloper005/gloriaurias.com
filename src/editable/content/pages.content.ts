import { slot4BrandConfig } from '@/editable/theme/brand.config'

export const pagesContent = {
  home: {
    metadata: {
      title: 'Curated resources and collections',
      description: 'Explore curated links, tools, references, and useful collections.',
      openGraphTitle: 'Curated resources and collections',
      openGraphDescription: 'Discover useful links, reference shelves, tools, and collections through a calm public library.',
      keywords: ['curated resources', 'bookmark collections', 'resource library', 'useful links'],
    },
    hero: {
      badge: 'Resources · Curators',
      title: ['Curated resources', 'arranged for discovery.'],
      description: 'Explore useful links, reference shelves, tools, and collections without the noise of a generic feed.',
      primaryCta: { label: 'Explore resources', href: '/sbm' },
      secondaryCta: { label: 'Search library', href: '/search' },
      searchPlaceholder: 'Search resources, domains, topics, and collections',
      focusLabel: 'Focus',
      featureCardBadge: 'latest cover rotation',
      featureCardTitle: 'Latest posts shape the visual identity of the homepage.',
      featureCardDescription: 'Recent images and stories stay at the center of the experience without changing any core platform behavior.',
    },
    intro: {
      badge: 'About the platform',
      title: 'Built for reading, browsing, and connecting different kinds of content.',
      paragraphs: [
        'This site brings together article-style reading, visual browsing, and structured discovery so visitors can move naturally between different content types.',
        'Instead of separating stories, visuals, and supporting resources into disconnected surfaces, the platform keeps them connected in one place with consistent navigation and easier exploration.',
        'Whether someone starts with a story, an image-led post, a listing, or a resource page, they can keep discovering related content without friction.',
      ],
      sideBadge: 'At a glance',
      sidePoints: [
        'Reading-first homepage with stronger emphasis on stories and imagery.',
        'Connected sections for articles, visuals, listings, and supporting resources.',
        'Cleaner browsing rhythm designed to make exploration feel easier.',
        'Lightweight interactions that keep the experience fast and readable.',
      ],
      primaryLink: { label: 'Browse articles', href: '/article' },
      secondaryLink: { label: 'See visuals', href: '/image' },
    },
    cta: {
      badge: 'Start exploring',
      title: 'Explore articles, visuals, and resources through one connected experience.',
      description: 'Move between articles, image-led posts, listings, and resources through one clearer and more connected visual system.',
      primaryCta: { label: 'Browse Articles', href: '/article' },
      secondaryCta: { label: 'Contact Sales', href: '/contact' },
    },
    taskSection: {
      heading: 'Latest {label}',
      descriptionSuffix: 'Browse the newest posts in this section.',
    },
  },
  about: {
    badge: 'Our Story',
      title: 'A calmer, clearer way to find useful resources.',
      description: `${slot4BrandConfig.siteName} is built to make curated links, reference shelves, and useful collections easier to browse.`,
    paragraphs: [
      'Instead of sending visitors into noisy feeds, the library keeps useful sources grouped, readable, and easy to revisit.',
      'Every public surface is shaped around the same purpose: helping people find links, tools, and references that are worth their time.',
    ],
    values: [
      {
        title: 'Curated first',
        description: 'Resources are organized by usefulness, context, and collection so browsing stays focused.',
      },
      {
        title: 'Collection rhythm',
        description: 'Shelves, categories, and source details make each resource easier to understand before opening it.',
      },
      {
        title: 'Simple and trustworthy',
        description: 'We focus on clean navigation and direct routes to useful sources.',
      },
    ],
  },
  contact: {
    eyebrow: `Contact ${slot4BrandConfig.siteName}`,
    title: 'Send a useful lead, question, or collection idea.',
    description: 'Tell us about a resource, source, collection, or partnership that belongs in the library.',
    formTitle: 'Send a message',
  },

  search: {
    metadata: {
      title: 'Search',
      description: 'Search resources, domains, topics, and collections across the site.',
    },
    hero: {
      badge: 'Search the library',
      title: 'Find resources by topic, domain, or collection.',
      description: 'Use keywords and categories to discover useful sources from the public library.',
      placeholder: 'Search by keyword, source, collection, or title',
    },
    resultsTitle: 'Latest searchable resources',
  },
  create: {
    metadata: {
      title: 'Create',
      description: 'Suggest and prepare new resources for the site.',
    },
    locked: {
      badge: 'Creator access',
      title: 'Login to suggest resources.',
      description: 'Use your account to open the curation workspace and submit useful links with context.',
    },
    hero: {
      badge: 'Curation workspace',
      title: 'Prepare a resource for the library.',
      description: 'Add a title, collection, source URL, summary, and notes so visitors understand why it is useful.',
    },
    formTitle: 'Resource details',
    submitLabel: 'Submit resource',
    successTitle: 'Resource submitted successfully.',
  },
  auth: {
    login: {
      metadataDescription: 'Login page for this site.',
      badge: 'Member access',
      title: 'Welcome back to your curation space.',
      description: 'Login to continue browsing, managing submissions, and suggesting useful resources.',
      formTitle: 'Login',
      submitLabel: 'Continue',
      noAccount: 'No account matched these details. Create an account first, then login.',
      success: 'Login successful. Redirecting...',
      createCta: 'Create an account',
    },
    signup: {
      metadataDescription: 'Signup page for this site.',
      badge: 'Site access',
      title: 'Create your account and start curating.',
      description: 'Create an account to access the curation workspace, save details, and submit useful resources.',
      formTitle: 'Create account',
      submitLabel: 'Create account',
      passwordShort: 'Use at least 4 characters for the password.',
      success: 'Account created successfully. Redirecting...',
      loginCta: 'Login',
    },
  },
  detailPages: {
    article: {
      relatedTitle: 'Related articles',
      fallbackTitle: 'Article details',
    },
    listing: {
      relatedTitle: 'Related listings',
      fallbackTitle: 'Listing details',
    },
    image: {
      relatedTitle: 'Related visuals',
      fallbackTitle: 'Image details',
    },
    profile: {
      relatedTitle: 'Suggested articles',
      fallbackDescription: 'Identity details will appear here once available.',
      visitButton: 'Visit Official Site',
    },
  },
} as const
