// research page-section UI strings — merged into the shared dictionary in
// ../translations.js. Not yet consumed by research's page component(s);
// add keys here as that page is wired up to useLanguage()'s t(), per
// BLUE_OCEAN_BACKLOG.md section 10.1.
//
// NOTE: the `so` (Af-Soomaali) strings below are a first-pass translation
// and need human-fluency review before being treated as final copy.
export default {
  en: {
    research: {
      hero: {
        badge: 'SCIENTIFIC RESEARCH & DISCOVERY',
        heading: 'Understanding the ocean.',
        headingAccent: 'Protecting its future.',
        subtext: "Explore Blue Ocean's research into Somalia's marine biodiversity, fisheries, ecosystems and coastal environment.",
        ctaExplore: 'Explore Research',
        ctaProjects: 'View Projects',
        pillProjects: 'Research Projects',
        pillAreas: 'Research Areas',
        pillSites: 'Field Sites',
      },
      intro: {
        eyebrow: 'Why we research',
        heading: 'Every expedition begins with a question.',
        points: {
          whatWeResearch: {
            title: 'What we research',
            text: 'Marine biodiversity, fisheries, coral reefs, sharks and rays, cetaceans, sea turtles, ocean pollution, water quality, and coastal ecosystems.',
          },
          whyItMatters: {
            title: 'Why it matters',
            text: "Somalia has one of Africa's longest and least-studied coastlines — every survey fills a real gap in what is known about it.",
          },
          whereResearchHappens: {
            title: 'Where research happens',
            text: 'From the deep pelagic upwellings off Puntland to the coral atolls and mangrove estuaries of Jubaland.',
          },
          howItDrivesConservation: {
            title: 'How it drives conservation',
            text: 'Findings feed directly into marine protected area proposals, sustainable fishing guidelines, and species protection programs.',
          },
          howItConnectsToCommunities: {
            title: 'How it connects to communities',
            text: 'Fishing cooperatives, beach guardians, and traditional maritime knowledge holders are partners in the fieldwork itself.',
          },
        },
      },
      areas: {
        eyebrow: 'RESEARCH AREAS',
        heading: 'What We Study',
        subheading: "Nine areas of active scientific inquiry across Somalia's marine and coastal environment.",
        countProject: 'Project',
        countProjects: 'Projects',
        cta: 'Explore',
      },
      featured: {
        eyebrow: 'FEATURED PROJECT',
        heading: 'Research in focus',
        cta: 'Explore project',
      },
      stats: {
        eyebrow: 'RESEARCH DATA',
        heading: 'The numbers behind the work',
        subheading: "Figures computed directly from Blue Ocean's published research records.",
        labels: {
          speciesStudied: 'Species Studied',
          researchSites: 'Research Sites',
          researchProjects: 'Research Projects',
          activeStudies: 'Active Studies',
        },
      },
      cta: {
        eyebrow: 'From Knowledge to Action',
        headingLine1: 'Research becomes protection',
        headingLine2: 'when it reaches the coast.',
        subtext: "Every finding feeds directly into Blue Ocean's conservation priorities — from marine protected area proposals to community-led protection programs.",
        ctaConservation: 'Explore Conservation',
        ctaAllProjects: 'All Research Projects',
        ctaStatistics: 'Coastal & Marine Statistics',
      },
      card: {
        viewProjectCta: 'View Project',
        viewRelatedProjectCta: 'View related project',
        projectSingular: 'Project',
        projectPlural: 'Projects',
        viewTeamCta: 'View Team',
        teamLabel: 'Team',
      },
    },
  },
  so: {
    research: {
      hero: {
        badge: 'CILMI-BAARIS & DAAHFURKA SAYNISKA',
        heading: 'Fahamka badda.',
        headingAccent: 'Ilaalinta mustaqbalkeeda.',
        subtext: 'Sahamiso cilmi-baarista Blue Ocean ee ku saabsan kala duwanaanta nolosha badda Soomaaliya, kalluumeysiga, nidaamyada deegaanka iyo deegaanka xeebaha.',
        ctaExplore: 'Sahamiso Cilmi-baarista',
        ctaProjects: 'Eeg Mashaariicda',
        pillProjects: 'Mashaariic Cilmi-baaris',
        pillAreas: 'Aagagga Cilmi-baaris',
        pillSites: 'Goobaha Duurka',
      },
      intro: {
        eyebrow: 'Sababta aan u baarno',
        heading: "Safar kasta oo cilmi-baaris ah wuxuu ku bilaabmaa su'aal.",
        points: {
          whatWeResearch: {
            title: 'Waxa aan baarno',
            text: 'Kala duwanaanta noolaha badda, kalluumeysiga, dhogorta murjaanka, sharkyada iyo raytiga, dhurwaaga iyo dheeriyaha badda, diinka badda, wasakhaynta badda, tayada biyaha, iyo nidaamyada deegaanka xeebaha.',
          },
          whyItMatters: {
            title: 'Sababta ay muhiim u tahay',
            text: 'Soomaaliya waxay leedahay mid ka mid ah xeebaha ugu dheer ee Afrika, kuwaas oo ah kuwa ugu yar ee la baaray. Sahan kastaa wuxuu buuxiyaa faraq dhab ah oo jira aqoonta laga haysto.',
          },
          whereResearchHappens: {
            title: 'Meesha cilmi-baaristu ka dhacdo',
            text: 'Laga bilaabo kacsiga qoto dheer ee badda ee xeebta Puntland, ilaa jasiiradaha murjaanka iyo webiyada canjeelka ee Jubbaland.',
          },
          howItDrivesConservation: {
            title: 'Sida ay u horumariso ilaalinta',
            text: 'Natiijooyinka waxaa si toos ah loogu isticmaalaa soo jeedinta aagagga badda ee la ilaaliyo, tilmaamaha kalluumeysiga waarta, iyo barnaamijyada ilaalinta noocyada.',
          },
          howItConnectsToCommunities: {
            title: 'Sida ay ula xiriirto bulshooyinka',
            text: 'Iskaashatooyinka kalluumeysiga, ilaaliyayaasha xeebaha, iyo dadka haysta aqoonta dhaqameed ee badda waa lammaanayaal ku jira shaqada duurjoogta ah.',
          },
        },
      },
      areas: {
        eyebrow: 'AAGAGGA CILMI-BAARISTA',
        heading: 'Waxa Aan Baarno',
        subheading: 'Sagaal aag oo cilmi-baaris firfircoon ah oo ka socda deegaanka badda iyo xeebaha Soomaaliya.',
        countProject: 'Mashruuc',
        countProjects: 'Mashaariic',
        cta: 'Sahamiso',
      },
      featured: {
        eyebrow: 'MASHRUUCA LA DOORBIDAY',
        heading: 'Cilmi-baaris Diiradda Lagu Saaray',
        cta: 'Sahamiso mashruuca',
      },
      stats: {
        eyebrow: 'XOGTA CILMI-BAARISTA',
        heading: 'Tirooyinka Ka Danbeeya Shaqada',
        subheading: 'Tirooyinka waxaa si toos ah looga xisaabiyay diiwaannada cilmi-baaris ee Blue Ocean daabacday.',
        labels: {
          speciesStudied: 'Noocyada La Baaray',
          researchSites: 'Goobaha Cilmi-baarista',
          researchProjects: 'Mashaariicda Cilmi-baarista',
          activeStudies: 'Daraasadaha Firfircoon',
        },
      },
      cta: {
        eyebrow: 'Aqoon ilaa Ficil',
        headingLine1: 'Cilmi-baaristu waxay noqotaa ilaalin',
        headingLine2: 'marka ay xeebta gaarto.',
        subtext: 'Natiijo kastaa waxay si toos ah u gashaa mudnaanaha ilaalinta Blue Ocean, laga bilaabo soo jeedinta aagagga badda ee la ilaaliyo ilaa barnaamijyada ilaalinta ee bulshadu hoggaamiso.',
        ctaConservation: 'Sahamiso Ilaalinta',
        ctaAllProjects: 'Dhammaan Mashaariicda Cilmi-baarista',
        ctaStatistics: 'Tirakoobka Xeebaha & Badda',
      },
      card: {
        viewProjectCta: 'Eeg Mashruuca',
        viewRelatedProjectCta: 'Eeg mashruuca la xiriira',
        projectSingular: 'Mashruuc',
        projectPlural: 'Mashaariic',
        viewTeamCta: 'Eeg Kooxda',
        teamLabel: 'Kooxda',
      },
    },
  },
};
