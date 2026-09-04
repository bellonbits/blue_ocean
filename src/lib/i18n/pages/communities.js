// communities page-section UI strings — merged into the shared dictionary in
// ../translations.js. Somali (so) strings below are a first-pass machine-
// assisted translation and need human-fluency review before being treated
// as final copy.
export default {
  en: {
    communities: {
      hero: {
        badge: 'COASTAL COMMUNITIES',
        heading: 'The coast belongs',
        headingAccent: 'to its people.',
        subtext: "Meet the communities whose lives, knowledge and livelihoods are connected to Somalia's coastline.",
        ctaPrimary: 'Read Their Stories',
        ctaSecondary: 'Get Involved',
        pillCommunities: (count) => `${count} Communities`,
        pillStories: (count) => `${count} Stories`,
      },
      directory: {
        label: 'WHO WE WORK WITH',
        heading: 'People of the Coast',
        subheading: "Blue Ocean is not just about the ocean — it's about the people who live by it.",
        ctaStory: 'Read Their Story',
        ctaLearnMore: 'Learn More',
      },
      storyGrid: {
        searchPlaceholder: 'Search stories, communities, locations...',
        searchAriaLabel: 'Search community stories',
        filterCategoryAriaLabel: 'Filter by category',
        allStories: 'All Stories',
        filterRegionAriaLabel: 'Filter by region',
        allRegions: 'All Regions',
        emptyTitle: 'No stories matched your search',
        emptyDesc: 'Try a different category or region, or clear your search.',
        resetFilters: 'Reset Filters',
      },
      card: {
        genericCategory: 'Community Story',
        readCta: 'Read Story',
      },
    },
  },
  so: {
    communities: {
      hero: {
        badge: 'BULSHOOYINKA XEEBTA',
        heading: 'Xeebtu waxay leedahay',
        headingAccent: 'dadkeeda.',
        subtext: 'La kulan bulshooyinka nolashooda, aqoontooda, iyo dhaqaalahooda ku xiran yihiin xeebta Soomaaliya.',
        ctaPrimary: 'Akhri Sheekooyinkooda',
        ctaSecondary: 'Ka Qeyb Qaado',
        pillCommunities: (count) => `${count} Bulsho`,
        pillStories: (count) => `${count} Sheeko`,
      },
      directory: {
        label: 'CIDDA AAN LA SHAQEYNO',
        heading: 'Dadka Xeebta',
        subheading: 'Blue Ocean ma aha oo keliya wax ku saabsan badda, waxay la xiriirtaa dadka ku nool xeebta.',
        ctaStory: 'Akhri Sheekadooda',
        ctaLearnMore: 'Wax Badan Ogow',
      },
      storyGrid: {
        searchPlaceholder: 'Raadi sheekooyin, bulshooyin, goobo...',
        searchAriaLabel: 'Raadi sheekooyinka bulshooyinka',
        filterCategoryAriaLabel: 'Ku shaandhee qaybta',
        allStories: 'Dhammaan Sheekooyinka',
        filterRegionAriaLabel: 'Ku shaandhee gobolka',
        allRegions: 'Dhammaan Gobollada',
        emptyTitle: 'Sheeko lama helin oo la mid ah raadintaada',
        emptyDesc: 'Isku day qayb ama gobol kale, ama tirtir raadintaada.',
        resetFilters: 'Dib U Deji Shaandhaynta',
      },
      card: {
        genericCategory: 'Sheeko Bulsho',
        readCta: 'Akhri Sheekada',
      },
    },
  },
};
