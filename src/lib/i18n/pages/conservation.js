// conservation page-section UI strings — merged into the shared dictionary in
// ../translations.js. Not yet consumed by conservation's page component(s);
// add keys here as that page is wired up to useLanguage()'s t(), per
// BLUE_OCEAN_BACKLOG.md section 10.1.
//
// NOTE: the `so` (Af-Soomaali) strings below are a first-pass translation
// and need human-fluency review before being treated as final copy.
export default {
  en: {
    conservation: {
      hero: {
        badge: 'CONSERVATION',
        heading: 'Protect what lies',
        headingAccent: 'beneath the surface.',
        subtext: 'From marine wildlife and habitats to sustainable coastal communities, discover how Blue Ocean is working toward a healthier Somali coast.',
        ctaExplore: 'Explore Conservation',
        ctaGetInvolved: 'Get Involved',
        pillProjects: 'Conservation Projects',
        pillAreas: 'Focus Areas',
        pillLocations: 'Locations',
      },
      intro: {
        label: 'Our Approach',
        heading: "The ocean gives us life. Protecting it is everyone's responsibility.",
        points: [
          {
            title: 'Marine wildlife protection',
            text: 'Safeguarding endangered and vulnerable species — sea turtles, sharks, dugongs, and cetaceans — across Somali waters.',
          },
          {
            title: 'Habitat protection',
            text: 'Defending coral reefs, seagrass meadows, and mangrove nurseries against degradation and unregulated development.',
          },
          {
            title: 'Sustainable fishing',
            text: 'Working directly with artisanal fleets to protect fish stocks and nursery grounds without undermining livelihoods.',
          },
          {
            title: 'Pollution reduction',
            text: 'Mapping marine debris and water quality, then organizing the cleanup and prevention work that data points toward.',
          },
          {
            title: 'Ocean education',
            text: 'Building ocean literacy in coastal schools and communities to grow the next generation of stewards.',
          },
          {
            title: 'Community conservation',
            text: 'Partnering with coastal communities so conservation is led by the people who depend on the ocean most.',
          },
          {
            title: 'Research-driven conservation',
            text: "Every initiative here is built directly on Blue Ocean's own field research — not assumption.",
          },
        ],
      },
      focusAreas: {
        label: 'CONSERVATION AREAS',
        heading: 'Where We Focus',
        subheading: "Eight areas of active conservation work across Somalia's marine and coastal environment.",
        projectSingular: 'Project',
        projectPlural: 'Projects',
        cta: 'Explore',
      },
      approach: {
        label: 'OUR METHOD',
        heading: 'Turning knowledge into action.',
      },
      featured: {
        label: 'FEATURED PROJECT',
        heading: 'Conservation in focus',
        cta: 'Explore project',
      },
      impact: {
        label: 'OUR IMPACT',
        heading: 'The scale of the work',
        subheading: "Figures computed directly from Blue Ocean's published conservation projects — not estimates.",
        statProjects: 'Conservation Projects',
        statActive: 'Active Initiatives',
        statLocations: 'Locations',
        statSpecies: 'Species Protected',
        statCommunities: 'Communities Involved',
        statFocusAreas: 'Focus Areas',
      },
      communitiesPreview: {
        label: 'Conservation & Communities',
        headingLine1: 'Conservation works when communities',
        headingLine2: 'are part of the solution.',
        subtext:
          'Every project on this page connects back to the fishing cooperatives, beach guardians, and coastal businesses who live alongside the ocean it protects.',
        cta: 'Meet the Communities',
      },
      card: {
        exploreCta: 'Explore Project',
      },
    },
  },
  so: {
    conservation: {
      hero: {
        badge: 'ILAALINTA',
        heading: 'Ilaali waxa ku hoos jira',
        headingAccent: 'dusha badda.',
        subtext: 'Laga bilaabo duurjoogta iyo deegaannada badda ilaa bulshooyinka xeebaha ee waara, ogow sida Blue Ocean ugu shaqeynayso xeeb Soomaaliyeed oo caafimaad qabta.',
        ctaExplore: 'Sahamiso Ilaalinta',
        ctaGetInvolved: 'Ka Qeyb Qaado',
        pillProjects: 'Mashaariic Ilaalin',
        pillAreas: 'Aagagga Diirada',
        pillLocations: 'Goobo',
      },
      intro: {
        label: 'Habraacayaga',
        heading: "Badda ayaa na siisa nolosha. Ilaalinteedu waa mas'uuliyad qof kastaa.",
        points: [
          {
            title: 'Ilaalinta duurjoogta badda',
            text: 'Ilaalinta noocyada halista ku jira ama nugul, sida diinka badda, sharkaha, dugongyada, iyo cetaceans-ka, gudaha biyaha Soomaaliya.',
          },
          {
            title: 'Ilaalinta deegaanka',
            text: 'Difaaca cawska badda (coral reefs), dhirta bad-doonka (seagrass meadows), iyo beeraha caanaha (mangrove nurseries) ka hortagga sii xumaanshaha iyo horumarinta aan sharciga lahayn.',
          },
          {
            title: 'Kalluumeysiga waarta',
            text: 'Si toos ah ula shaqeynta kalluumeystayaasha yaryar si loo ilaaliyo kaydka kalluunka iyo goobaha koritaanka iyada oo aan la burinayn nolol-maalmeedka.',
          },
          {
            title: 'Yareynta wasakhda',
            text: 'Khariidadaynta qashinka badda iyo tayada biyaha, ka dibna abaabulida shaqada nadiifinta iyo ka hortagga ee xogtu tilmaamayso.',
          },
          {
            title: 'Waxbarashada badda',
            text: 'Dhisidda aqoonta badda ee dugsiyada iyo bulshooyinka xeebaha si loo koriyo jiilka soo socda ee ilaaliyayaasha.',
          },
          {
            title: 'Ilaalinta bulshada',
            text: 'La shaqeynta bulshooyinka xeebaha si ilaalintu ay u noqoto mid ay hoggaamiyaan dadka ugu badan ee ku tiirsan badda.',
          },
          {
            title: 'Ilaalinta ku salaysan cilmi-baaris',
            text: "Hindise kastaa halkan waxa uu si toos ah ugu dhisan yahay cilmi-baariska duurka ee Blue Ocean, ma aha malo.",
          },
        ],
      },
      focusAreas: {
        label: 'AAGAGGA ILAALINTA',
        heading: 'Meelaha aan Diiradda Saarno',
        subheading: 'Sideed aag oo shaqo ilaalin firfircoon ah oo ka socota deegaanka badda iyo xeebaha Soomaaliya.',
        projectSingular: 'Mashruuc',
        projectPlural: 'Mashaariic',
        cta: 'Sahamiso',
      },
      approach: {
        label: 'HABRAACAYAGA',
        heading: 'Aqoonta oo loo beddelayo ficil.',
      },
      featured: {
        label: 'MASHRUUCA MUUQDA',
        heading: 'Ilaalinta oo la xiisaynayo',
        cta: 'Sahamiso mashruuca',
      },
      impact: {
        label: 'SAAMEYNTEENNA',
        heading: 'Baaxadda shaqada',
        subheading: "Tirooyinka waxaa si toos ah looga xisaabiyay mashaariicda ilaalinta ee Blue Ocean daabacday, mana aha qiyaas.",
        statProjects: 'Mashaariic Ilaalin',
        statActive: 'Hindisayaal Firfircoon',
        statLocations: 'Goobo',
        statSpecies: 'Noocyo la Ilaaliyay',
        statCommunities: 'Bulshooyin ka Qeyb Qaatay',
        statFocusAreas: 'Aagagga Diirada',
      },
      communitiesPreview: {
        label: 'Ilaalinta & Bulshooyinka',
        headingLine1: 'Ilaalintu way shaqeysaa marka bulshooyinku',
        headingLine2: 'ay qayb ka yihiin xalka.',
        subtext:
          'Mashruuc kasta oo bogga ku yaal wuxuu ku xidhan yahay ururada kalluumeysatada, ilaaliyayaasha xeebaha, iyo ganacsiyada xeebaha ee la barbar dega badda uu ilaalinayo.',
        cta: 'La Kulan Bulshooyinka',
      },
      card: {
        exploreCta: 'Sahamiya Mashruuca',
      },
    },
  },
};
