// =========================================================
// Organization Data Model — About Blue Ocean
// Blue Ocean Somalia — Sprint 7: News, About & Contact
//
// Team profiles intentionally reuse the institutional research units
// from research.js (see getAllTeams) rather than introducing a
// separate roster of named individuals — no real staff photos or
// biographies exist yet, consistent with the convention already
// established across Research and Conservation.
// =========================================================

export const organization = {
  name: 'Blue Ocean Somalia',
  mission: {
    statement: 'Explore. Study. Protect. Share.',
    description:
      'Blue Ocean exists to explore Somalia\'s marine environment, study it with scientific rigor, protect it in partnership with the communities who depend on it, and share what we learn openly — because a coastline this significant deserves to be known, not just guarded.',
  },
  vision: {
    statement: "A future where Somalia's ocean is understood, protected and sustainably used.",
    description:
      'We work toward a Somali coast where marine research is routine rather than rare, where conservation decisions are backed by evidence, and where coastal communities share directly in the benefits of a healthy ocean — not displaced by its protection.',
  },
  story: {
    intro: 'We believe you cannot protect what you do not understand.',
    paragraphs: [
      'Blue Ocean began with a simple observation: Somalia holds the longest coastline in mainland Africa — 3,025 kilometers — and one of its least studied. Decades of instability left a scientific gap most neighboring countries closed long ago, even as the reefs, fisheries, and coastal communities along this coast kept going.',
      'We started as a small field research effort and grew into an organization spanning exploration, science, conservation, and community partnership — not because those are separate missions, but because none of them works without the others. Research without conservation is just documentation. Conservation without communities doesn\'t last. And none of it means much if nobody outside the field team ever hears about it.',
    ],
  },
  whyOceanMatters: {
    heading: 'Why the ocean matters',
    text: 'Somalia\'s marine environment supports fisheries that feed coastal communities, biodiversity found almost nowhere else on the East African coast, and a cultural history — from dhow trade routes to generational fishing knowledge — that runs as deep as the water itself. What happens to this coast over the next decade will be decided largely by how well it is understood today.',
  },
  whoWeWorkWith: {
    heading: 'Who we work with',
    text: 'Fishing cooperatives, beach guardian networks, coastal business alliances, regional research partners, and — increasingly — the export buyers and visitors who benefit from a coast that stays healthy. Nearly every project on this site names a community partner for exactly this reason.',
  },
  whatWeDo: [
    {
      step: '01',
      title: 'Explore',
      desc: "Charting Somalia's coastline — its regions, destinations, and geography — as the foundation everything else builds on.",
      path: '/explore-the-coast',
      cta: 'Explore the Coast',
    },
    {
      step: '02',
      title: 'Research',
      desc: 'Field studies across marine biodiversity, fisheries, coral reefs, and coastal ecosystems that establish the evidence baseline for everything we protect.',
      path: '/research',
      cta: 'Our Research',
    },
    {
      step: '03',
      title: 'Conserve',
      desc: 'Turning research findings into protected corridors, sustainable fishing standards, cleanup networks, and habitat protection proposals.',
      path: '/conservation',
      cta: 'Conservation',
    },
    {
      step: '04',
      title: 'Connect',
      desc: 'Partnering with the coastal communities whose livelihoods and knowledge are inseparable from the ocean we study.',
      path: '/communities',
      cta: 'Coastal Communities',
    },
  ],
};

export const socialLinks = [
  { label: 'Instagram', href: 'https://instagram.com', icon: 'Instagram' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'TikTok' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'YouTube' },
  { label: 'Facebook', href: 'https://facebook.com', icon: 'Facebook' },
  { label: 'LinkedIn', href: 'https://linkedin.com', icon: 'LinkedIn' },
  { label: 'X / Twitter', href: 'https://x.com', icon: 'Twitter' },
];

export const contactDetails = {
  email: 'info@blueoceansomalia.org',
  locations: [
    { label: 'Field Office', value: 'Bosaso, Puntland' },
    { label: 'Field Office', value: 'Kismayo, Jubaland' },
  ],
};

export const contactSubjects = [
  'General Inquiry',
  'Research',
  'Conservation',
  'Partnership',
  'Ocean Experiences',
  'Media',
  'Volunteer',
  'Other',
];
