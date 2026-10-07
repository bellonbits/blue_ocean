// oceanExperiences page-section UI strings — merged into the shared dictionary in
// ../translations.js. Consumed by ExperiencesHero.jsx via useLanguage()'s t();
// add further keys here as more of the page is wired up, per
// BLUE_OCEAN_BACKLOG.md section 10.1.
//
// Somali (so) strings below are a first-pass machine-assisted translation and
// need human-fluency review before being treated as final copy.
export default {
  en: {
    oceanExperiences: {
      hero: {
        heading: 'Experience',
        headingAccent: 'the ocean.',
        subtext: "Discover the future of ocean exploration along Somalia's extraordinary coastline — boat tours, snorkeling, diving, fishing, island exploration and more, all coming to the Somali coast.",
        ctaPrimary: 'Explore Experiences',
        ctaSecondary: 'Explore the Coast',
      },
      categories: {
        eyebrow: 'ACTIVITY CATEGORIES',
        heading: 'Ocean Experiences',
        subheading: 'Boat tours, snorkeling, diving, fishing, island exploration and more — all coming to the Somali coast.',
        experienceCountSingular: 'Experience',
        experienceCountPlural: 'Experiences',
        exploreCta: 'Explore',
      },
      grid: {
        notice: "Every experience below is in active development. Blue Ocean does not currently operate live bookings — this directory previews what's coming to the Somali coast.",
        searchPlaceholder: 'Search experiences, locations, regions...',
        searchAriaLabel: 'Search ocean experiences',
        filterAriaLabel: 'Filter by category',
        allPill: 'All',
        emptyTitle: 'No experiences matched your search',
        emptyDesc: 'Try a different category or clear your search to see everything planned for the Somali coast.',
        resetFilters: 'Reset Filters',
      },
      card: {
        viewCta: 'View Experience',
      },
    },
  },
  so: {
    oceanExperiences: {
      hero: {
        heading: 'Dareenso',
        headingAccent: 'badda.',
        subtext: 'Ogow mustaqbalka sahaminta badda ee ku yaal xeebta gaarka ah ee Soomaaliya, sida safarada doonyaha, dabaasha hoosta biyaha (snorkeling), quusidda, kalluumeysiga, sahaminta jasiiradaha iyo wax badan oo kale, dhammaan oo ku socda xeebta Soomaaliya.',
        ctaPrimary: 'Sahamiso Waaya-aragnimada',
        ctaSecondary: 'Sahamiso Xeebta',
      },
      categories: {
        eyebrow: 'NOOCYADA HAWLAHA',
        heading: 'Waaya-aragnimada Badda',
        subheading: 'Safarada doonyaha, dabaasha hoosta biyaha (snorkeling), quusidda, kalluumeysiga, sahaminta jasiiradaha iyo wax badan oo kale, dhammaan waxay ku socdaan xeebta Soomaaliya.',
        experienceCountSingular: 'Waaya-aragnimo',
        experienceCountPlural: 'Waaya-aragnimooyin',
        exploreCta: 'Sahamiso',
      },
      grid: {
        notice: "Waaya-aragnimo kasta oo hoos ku taal waxay ku jirtaa horumarin firfircoon. Blue Ocean hadda ma fulinayso dalabyo tooska ah. Liiskan wuxuu ku tusinayaa waxa ku soo socda xeebta Soomaaliya.",
        searchPlaceholder: 'Raadi waaya-aragnimooyin, goobaha, gobollada...',
        searchAriaLabel: 'Raadi waaya-aragnimada badda',
        filterAriaLabel: 'Kala saar nooca',
        allPill: 'Dhammaan',
        emptyTitle: 'Waaya-aragnimo lama helin oo waafaqsan raadintaada',
        emptyDesc: 'Isku day qayb kale ama tirtir raadintaada si aad u aragto wax kasta oo loo qorsheeyay xeebta Soomaaliya.',
        resetFilters: 'Dib u deji Kala-saarayaasha',
      },
      card: {
        viewCta: 'Baro Waaya-aragnimada',
      },
    },
  },
};
