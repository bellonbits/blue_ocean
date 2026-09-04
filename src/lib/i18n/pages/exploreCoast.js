// exploreCoast page-section UI strings — merged into the shared dictionary in
// ../translations.js. Somali (so) strings are a first-pass translation and
// need human-fluency review before being treated as final copy.
// add keys here as that page is wired up to useLanguage()'s t(), per
// BLUE_OCEAN_BACKLOG.md section 10.1.
export default {
  en: {
    exploreCoast: {
      hero: {
        badge: '3,025 KM COASTLINE · HORN OF AFRICA',
        heading: "Explore Somalia's",
        headingAccent: 'Blue Frontier',
        subtext:
          "From remote islands and coral-rich waters to historic coastal towns, discover the places that define Somalia's extraordinary coastline.",
        ctaExploreDestinations: 'Explore Destinations',
        ctaViewMap: 'View Map',
      },
      regions: {
        eyebrow: 'Geographic Scope',
        heading: 'One coastline.',
        headingAccent: 'Three worlds to explore.',
        subheading:
          "Somalia's coastline encompasses three distinct marine realms — each with unique ocean currents, underwater topography, and maritime heritage.",
        destinationsCountSuffix: 'Destinations',
        exploreRegionCta: (name) => `Explore ${name}`,
      },
      destinationGrid: {
        eyebrow: 'Somalia Coastal Catalog',
        heading: 'Places worth discovering.',
        subheading:
          'Explore individual coastal settlements, historic trading ports, natural harbors, and remote barrier islands across the Horn of Africa.',
        viewCarousel: 'Carousel',
        viewCarouselTitle: 'Carousel View',
        viewGrid: 'Grid',
        viewGridTitle: 'Grid View',
        searchPlaceholder: 'Search destinations, bays, towns...',
        searchAriaLabel: 'Search destinations',
        searchClearAriaLabel: 'Clear search',
        filterAll: 'All Destinations',
        filterPuntland: 'Puntland',
        filterSomaliland: 'Somaliland',
        filterJubaland: 'Jubaland',
        filterSomalia: 'Central & Southern Coast',
        emptyTitle: 'No destinations match your filter',
        emptyDesc: 'Try adjusting your search terms or select another coastal region.',
        resetFilters: 'Reset Filters',
      },
      map: {
        eyebrow: 'Interactive Cartography',
        heading: 'Find your way along the coast.',
        subheading:
          "Explore Somalia's 3,025 km maritime frontier powered by Google Maps. Click any marker to inspect regional biodiversity and ocean research.",
        pillAll: 'All Coast (3,025 km)',
        pillPuntland: 'Puntland (North)',
        pillSomaliland: 'Somaliland (Northwest)',
        pillSomalia: 'Central & Southern',
        pillJubaland: 'Jubaland (South)',
        toggleTitle: 'Toggle Satellite Imagery',
        toggleSatellite: 'Satellite View',
        toggleDarkOcean: 'Dark Ocean View',
        loadingText: 'Loading Somali Coastal Cartography...',
        inspectorCta: 'View Destination Guide',
      },
      stats: {
        ariaLabel: 'Somalia Coastline Statistics',
        items: {
          regions: {
            label: 'Coastal Regions',
            detail: 'Puntland, Jubaland, and Central/Southern Coastline',
          },
          destinations: {
            label: 'Documented Destinations',
            detail: 'Ports, islands, bays, and marine sanctuaries',
          },
          coastline: {
            label: 'Longest National Coast',
            detail: 'Longest continuous coastline on mainland Africa',
          },
          species: {
            label: 'Documented Marine Species',
            detail: 'From coral reef biodiversity to apex pelagic hunters',
          },
        },
      },
      card: {
        featuredBadge: 'Featured',
        exploreCta: 'Explore',
        duration7: '7 Days',
        duration6: '6 Days',
        duration5: '5 Days',
        seasonFallback: 'Oct-Apr',
        copiedToast: 'Copied!',
        heritageFallback: 'Coastal Heritage',
        bioScore: 'Bio Score',
        biodiversity: 'Biodiversity',
        reefHealth: 'Reef Health',
        coastlineCountry: 'Somalia',
        coastlineLabel: 'Coastline',
        exploreDestinationCta: 'Explore Destination',
        saveAriaLabel: 'Save destination',
        shareAriaLabel: 'Share destination',
      },
    },
  },
  so: {
    exploreCoast: {
      hero: {
        badge: '3,025 KM XEEB · GEESKA AFRICA',
        heading: 'Sahamiso',
        headingAccent: 'Xuduudda Buluugga ah ee Soomaaliya',
        subtext:
          'Laga bilaabo jasiiradaha fog iyo biyaha hodanka ku ah dhurwaaga ilaa magaalooyinka xeebaha ee taariikhda leh, ogow goobaha muujiya xeebta gaarka ah ee Soomaaliya.',
        ctaExploreDestinations: 'Sahamiso Meelaha Dalxiiska',
        ctaViewMap: 'Fiiri Khariidadda',
      },
      regions: {
        eyebrow: 'Baaxadda Juqraafiga',
        heading: 'Hal xeeb.',
        headingAccent: 'Saddex adduun oo la sahamin karo.',
        subheading:
          'Xeebta Soomaaliya waxay ka kooban tahay saddex gobol oo badeed oo kala duwan, mid kasta wuxuu leeyahay socodka biyaha badda, qaab-dhismeedka hoosta biyaha, iyo dhaqan badeed gaar ah.',
        destinationsCountSuffix: 'Meelood',
        exploreRegionCta: (name) => `Sahamiso ${name}`,
      },
      destinationGrid: {
        eyebrow: 'Liiska Xeebaha Soomaaliya',
        heading: 'Meelo mudan in la sahamiyo.',
        subheading:
          'Sahamiso degaannada xeebaha gaarka ah, dekedaha ganacsiga ee taariikhiga ah, dekedaha dabiiciga ah, iyo jasiiradaha fog ee Geeska Afrika.',
        viewCarousel: 'Wareeg',
        viewCarouselTitle: 'Muuqaalka Wareega',
        viewGrid: 'Shabag',
        viewGridTitle: 'Muuqaalka Shabagga',
        searchPlaceholder: 'Raadi meelaha dalxiiska, badaha yaryar, magaalooyinka...',
        searchAriaLabel: 'Raadi meelaha dalxiiska',
        searchClearAriaLabel: 'Tirtir raadinta',
        filterAll: 'Dhammaan Meelaha',
        filterPuntland: 'Puntland',
        filterSomaliland: 'Somaliland',
        filterJubaland: 'Jubaland',
        filterSomalia: 'Xeebta Dhexe & Koonfureed',
        emptyTitle: 'Meel dalxiis ah oo la mid ah shaandhaddaada lama helin',
        emptyDesc: 'Isku day inaad bedesho ereyada raadinta ama dooro gobol xeebeed oo kale.',
        resetFilters: 'Dib u Deji Shaandhada',
      },
      map: {
        eyebrow: 'Khariidad Firfircoon',
        heading: 'Ka hel jidkaaga xeebta.',
        subheading:
          'Sahamiso xuduudda badeed ee 3,025 km ee Soomaaliya, oo ku shaqeysa Google Maps. Guji astaan kasta si aad u eegto kala duwanaanta noolaha gobolka iyo cilmi-baarista badda.',
        pillAll: 'Dhammaan Xeebta (3,025 km)',
        pillPuntland: 'Puntland (Waqooyi)',
        pillSomaliland: 'Somaliland (Waqooyi-Galbeed)',
        pillSomalia: 'Dhexe & Koonfureed',
        pillJubaland: 'Jubaland (Koonfur)',
        toggleTitle: 'Bedel Sawirka Dayax-gacmeedka',
        toggleSatellite: 'Muuqaalka Dayax-gacmeedka',
        toggleDarkOcean: 'Muuqaalka Badda Mugdiga ah',
        loadingText: 'Waa la soo rarayaa Khariidadda Xeebta Soomaaliya...',
        inspectorCta: 'Fiiri Hagaha Meesha',
      },
      stats: {
        ariaLabel: 'Tirakoobka Xeebta Soomaaliya',
        items: {
          regions: {
            label: 'Gobollada Xeebta',
            detail: 'Puntland, Jubaland, iyo Xeebta Dhexe/Koonfureed',
          },
          destinations: {
            label: 'Meelaha Dalxiiska ee La Diiwaan Geliyay',
            detail: 'Dekedaha, jasiiradaha, badaha yaryar, iyo meelaha ilaalinta badda',
          },
          coastline: {
            label: 'Xeebta Ugu Dheer Dalka',
            detail: 'Xeebta ugu dheer ee si joogto ah ugu taal Afrika dhulkeeda weyn',
          },
          species: {
            label: 'Noolaha Badda ee La Diiwaan Geliyay',
            detail: 'Laga bilaabo kala duwanaanta murjaanka ilaa ugaarsatada waaweyn ee badda',
          },
        },
      },
      card: {
        featuredBadge: 'La Doorbiday',
        exploreCta: 'Sahamiso',
        duration7: '7 Maalmood',
        duration6: '6 Maalmood',
        duration5: '5 Maalmood',
        seasonFallback: 'Okt-Abr',
        copiedToast: 'La Koobiyeeyay!',
        heritageFallback: 'Dhaxal Xeebeed',
        bioScore: 'Dhibcaha Nolosha',
        biodiversity: 'Kala Duwanaanta Nolosha',
        reefHealth: 'Caafimaadka Dhillada',
        coastlineCountry: 'Soomaaliya',
        coastlineLabel: 'Xeebta',
        exploreDestinationCta: 'Sahamiso Meesha',
        saveAriaLabel: 'Kaydso meesha',
        shareAriaLabel: 'La wadaag meesha',
      },
    },
  },
};
