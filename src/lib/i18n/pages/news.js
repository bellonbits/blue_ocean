// news page-section UI strings — merged into the shared dictionary in
// ../translations.js. Somali (so) strings below are a first-pass machine-
// assisted translation and need human-fluency review before being treated
// as final copy.
export default {
  en: {
    news: {
      hero: {
        badge: 'NEWS & DISCOVERIES',
        heading: 'Latest discoveries.',
        headingAccent: 'Stories from the coast.',
        subtext: "Follow Blue Ocean's latest research, marine discoveries, conservation work and stories from Somalia's coastal communities.",
        ctaPrimary: 'Explore Stories',
        ctaSecondary: 'All Articles',
        pillPublished: (count) => `${count} Published Stories`,
      },
      featured: {
        eyebrow: 'FEATURED STORY',
        heading: 'The story in focus',
        readMore: 'Read story',
      },
      categoryStrip: {
        eyebrow: 'BROWSE BY CATEGORY',
        heading: 'Stories by Category',
        browse: 'Browse',
        storyCount: (count) => `${count} ${count === 1 ? 'Story' : 'Stories'}`,
      },
      articleCard: {
        readMore: 'Read Story',
      },
      viewAllCta: {
        eyebrow: 'LATEST ARTICLES',
        heading: 'More from Blue Ocean',
        cta: 'View All Stories',
      },
      grid: {
        searchPlaceholder: 'Search stories, locations, species...',
        searchAriaLabel: 'Search articles',
        filterAriaLabel: 'Filter by category',
        allPill: 'All',
        loadMore: 'Load More Stories',
        emptyTitle: 'No stories matched your search',
        emptyDesc: 'Try a different category, or clear your search.',
        resetFilters: 'Reset Filters',
      },
    },
  },
  so: {
    news: {
      hero: {
        badge: 'WARARKA IYO HELITAANNADA',
        heading: 'Natiijooyinkii ugu dambeeyay.',
        headingAccent: 'Sheekooyinka xeebta.',
        subtext: 'La soco cilmi-baaristii ugu dambeysay ee Blue Ocean, natiijooyinka badda, shaqada ilaalinta, iyo sheekooyinka ka yimaada bulshooyinka xeebta Soomaaliya.',
        ctaPrimary: 'Sahamiso Sheekooyinka',
        ctaSecondary: 'Dhammaan Maqaallada',
        pillPublished: (count) => `${count} Sheeko oo la Daabacay`,
      },
      featured: {
        eyebrow: 'SHEEKADA MUUQDA',
        heading: 'Sheekada la soo bandhigay',
        readMore: 'Akhri sheekada',
      },
      categoryStrip: {
        eyebrow: 'U KALA EEG QAYBAHA',
        heading: 'Sheekooyinka Qaybaha',
        browse: 'Fiiri',
        storyCount: (count) => `${count} ${count === 1 ? 'Sheeko' : 'Sheekooyin'}`,
      },
      articleCard: {
        readMore: 'Akhri Sheekada',
      },
      viewAllCta: {
        eyebrow: 'MAQAALLADA UGU DAMBEEYAY',
        heading: 'Wax dheeraad ah oo ka yimid Blue Ocean',
        cta: 'Dhammaan Sheekooyinka Fiiri',
      },
      grid: {
        searchPlaceholder: 'Raadi sheekooyin, goobo, noocyo...',
        searchAriaLabel: 'Raadi maqaallada',
        filterAriaLabel: 'Kala saar nooca',
        allPill: 'Dhammaan',
        loadMore: 'Soo Rar Sheekooyin Dheeraad ah',
        emptyTitle: 'Sheeko lama helin oo waafaqsan raadintaada',
        emptyDesc: 'Isku day qayb kale, ama tirtir raadintaada.',
        resetFilters: 'Dib u deji Kala-saarayaasha',
      },
    },
  },
};
