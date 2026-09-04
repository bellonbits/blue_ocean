// `labelKey` looks up the translated label via useLanguage()'s t() —
// see src/lib/i18n/translations.js's `nav` section. `path` is the
// unprefixed, language-agnostic path; callers add the /en or /so prefix.
export const navLinks = [
  { labelKey: 'nav.home', path: '/' },
  { labelKey: 'nav.tourism', path: '/tourism' },
  { labelKey: 'nav.exploreCoast', path: '/explore-the-coast' },
  { labelKey: 'nav.oceanExperiences', path: '/experiences' },
  { labelKey: 'nav.marineLife', path: '/marine-life' },
  { labelKey: 'nav.research', path: '/research' },
  { labelKey: 'nav.conservation', path: '/conservation' },
  { labelKey: 'nav.communities', path: '/communities' },
  { labelKey: 'nav.news', path: '/news' },
  { labelKey: 'nav.about', path: '/about' },
  { labelKey: 'nav.contact', path: '/contact' },
];

// Pages whose top banner has no dark hero photo behind the header — the
// header must render its solid/legible styling on these from the start
// instead of the transparent-over-hero-image treatment.
export const noHeroPaths = [
  '/marine-life/species',
  '/research/projects',
  '/research/reports',
  '/research/team',
  '/research/expeditions',
  '/research/statistics',
  '/research/coastal-geography',
  '/conservation/projects',
  '/news/articles',
  '/get-involved/volunteer',
  '/get-involved/partner',
  '/get-involved/support',
  '/research/publications',
  '/about/team',
  '/press',
  '/privacy',
  '/profile',
  '/admin',
  '/admin/inbox',
  '/admin/settings',
  '/admin/content/coast',
  '/admin/content/experiences',
  '/admin/content/marine-life',
  '/admin/content/research',
  '/admin/content/conservation',
  '/admin/content/communities',
  '/admin/content/news',
  '/admin/team',
  '/admin/media',
  // Preview route intentionally excluded — it renders the real public
  // destination hero and should get the transparent-over-photo treatment.
  '/dashboard',
  '/dashboard/saved',
  '/dashboard/experiences',
  '/dashboard/research',
  '/dashboard/notifications',
  '/dashboard/messages',
  '/dashboard/get-involved',
  '/dashboard/profile',
];
