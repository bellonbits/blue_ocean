// Site-wide UI string dictionary — English and Somali (Af-Soomaali).
//
// Core chrome (nav, footer, auth, common states) lives inline below.
// Per-page-section copy (Tourism, Explore Coast, Marine Life, Research,
// Conservation, Communities, News, About, Contact/Get Involved, homepage
// preview sections) lives in its own file under ./pages/ and is merged in
// at the bottom of this file — kept separate so each section's copy can be
// authored independently without every edit touching this shared file.
//
// Long-form CMS content (destination descriptions, research write-ups,
// news articles, ...) lives in the database via per-resource
// *_translations tables (see backend/app/models/destination.py for the
// first one) and goes through an editorial draft-then-human-review
// workflow, not a static bundle — see BLUE_OCEAN_BACKLOG.md section 10.2.
//
// Usage: const { t } = useLanguage(); t('nav.tourism')

import tourism from './pages/tourism';
import exploreCoast from './pages/exploreCoast';
import oceanExperiences from './pages/oceanExperiences';
import marineLife from './pages/marineLife';
import research from './pages/research';
import conservation from './pages/conservation';
import communities from './pages/communities';
import news from './pages/news';
import about from './pages/about';
import contact from './pages/contact';
import homeSections from './pages/homeSections';

export const SUPPORTED_LANGUAGES = ['en', 'so'];
export const DEFAULT_LANGUAGE = 'en';

export const LANGUAGE_LABELS = {
  en: { short: 'EN', name: 'English' },
  so: { short: 'SO', name: 'Af-Soomaali' },
};

const translations = {
  en: {
    nav: {
      home: 'Home',
      tourism: 'Tourism',
      exploreCoast: 'Explore the Coast',
      oceanExperiences: 'Ocean Experiences',
      marineLife: 'Marine Life',
      research: 'Research',
      conservation: 'Conservation',
      communities: 'Communities',
      news: 'News',
      about: 'About',
      contact: 'Contact',
      getInvolved: 'Get Involved',
    },
    footer: {
      exploreHeading: 'Explore',
      researchHeading: 'Research',
      protectHeading: 'Protect',
      orgHeading: 'Blue Ocean',
      dataReports: 'Data & Reports',
      ourResearch: 'Our Research',
      projects: 'Projects',
      expeditions: 'Expeditions',
      publications: 'Publications',
      volunteer: 'Volunteer',
      partnerWithUs: 'Partner With Us',
      aboutUs: 'About Us',
      press: 'Press',
      privacyPolicy: 'Privacy Policy',
      tagline: "Exploring, researching, and protecting Somalia's remarkable marine environments — from Puntland to Jubaland.",
      copyright: (year) => `© ${year} Blue Ocean Somalia. All rights reserved.`,
      mission: "Protecting Somalia's ocean for future generations.",
    },
    auth: {
      logIn: 'Log In',
      createAccount: 'Create Account',
      logOut: 'Log Out',
      myProfile: 'My Profile',
      dashboard: 'Dashboard',
      signIn: 'Sign In',
      profile: 'Profile',
    },
    common: {
      loading: 'Loading…',
      save: 'Save',
      saving: 'Saving…',
      cancel: 'Cancel',
      close: 'Close',
      language: 'Language',
      switchLanguage: 'Switch language',
      exploreCta: {
        eyebrow: 'Next Horizons',
        heading: 'The coast is waiting',
        headingAccent: 'to be explored.',
        subtext:
          'From the deep pelagic corridors off Bosaso to the intact coral gardens of the Bajuni Archipelago, explore our living marine library or dive into active research initiatives.',
        ctaMarineLife: 'Explore Marine Life',
        ctaResearch: 'Discover Research',
      },
      getInvolvedCta: {
        eyebrow: 'GET INVOLVED',
        heading: 'Be part of the story.',
        subtext: "The future of Somalia's ocean depends on people who are willing to explore, learn and act.",
        volunteerTitle: 'Volunteer',
        volunteerTagline: 'Give your time and skills.',
        volunteerCta: 'Become a Volunteer',
        partnerTitle: 'Partner',
        partnerTagline: 'Work with Blue Ocean to create lasting impact.',
        partnerCta: 'Partner With Us',
        supportTitle: 'Support',
        supportTagline: 'Help advance ocean research and conservation.',
        supportCta: 'Support a Project',
      },
    },
    mobileTabBar: {
      home: 'Home',
      explore: 'Explore',
      marineLife: 'Marine Life',
    },
    home: {
      heroHeadline: "Discover Somalia's",
      heroHeadlineAccent: 'Blue Ocean',
      heroSubtext: "Explore Somalia's coast, discover its marine life, support ocean research, and help protect one of Africa's remarkable marine environments.",
      heroDiscoverMarineLife: 'Discover Marine Life',
      heroJoinExpedition: 'Join a Research Expedition',
      heroLearnResearch: 'Learn About Our Research',
    },
  },
  so: {
    nav: {
      home: 'Guriga',
      tourism: 'Dalxiiska',
      exploreCoast: 'Sahamiso Xeebta',
      oceanExperiences: 'Waaya-aragnimada Badda',
      marineLife: 'Nolosha Badda',
      research: 'Cilmi-baaris',
      conservation: 'Ilaalinta',
      communities: 'Bulshooyinka',
      news: 'Wararka',
      about: 'Naga',
      contact: 'Nala Soo Xiriir',
      getInvolved: 'Ka Qeyb Qaado',
    },
    footer: {
      exploreHeading: 'Sahamin',
      researchHeading: 'Cilmi-baaris',
      protectHeading: 'Ilaali',
      orgHeading: 'Blue Ocean',
      dataReports: 'Xogta & Warbixinnada',
      ourResearch: 'Cilmi-baaristayada',
      projects: 'Mashaariicda',
      expeditions: 'Safaradaha Sahaminta',
      publications: 'Daabacaadaha',
      volunteer: 'Iskaa Wax U Qabso',
      partnerWithUs: 'Nala Shaqee',
      aboutUs: 'Nagu Saabsan',
      press: 'Warbaahinta',
      privacyPolicy: 'Siyaasadda Sirta',
      tagline: 'Sahamin, cilmi-baaris, iyo ilaalinta deegaanka badda Soomaaliya — Puntland ilaa Jubbaland.',
      copyright: (year) => `© ${year} Blue Ocean Somalia. Dhammaan xuquuqda way dhowran yihiin.`,
      mission: 'Ilaalinta badda Soomaaliya ee ajaalada soo socda.',
    },
    auth: {
      logIn: 'Gal',
      createAccount: 'Samee Akoon',
      logOut: 'Ka Bax',
      myProfile: 'Astaantayda',
      dashboard: 'Dashboard-ka',
      signIn: 'Gal',
      profile: 'Astaanta',
    },
    common: {
      loading: 'Waa la soo raraya…',
      save: 'Keydi',
      saving: 'Waa la keydinayaa…',
      cancel: 'Jooji',
      close: 'Xir',
      language: 'Luqadda',
      switchLanguage: 'Bedel luqadda',
      exploreCta: {
        eyebrow: 'Xagaasha Xiga',
        heading: 'Xeebtu waa sugaysaa',
        headingAccent: 'in la sahamiyo.',
        subtext:
          'Laga bilaabo marinnada qoto dheer ee badda ee Boosaaso ilaa beeraha murjaanka ee Bajuni ee weli nadiifka ah, sahamiso maktabaddayada nolosha badda ama ka qeyb qaado hindisayaasha cilmi-baaris ee firfircoon.',
        ctaMarineLife: 'Sahamiso Nolosha Badda',
        ctaResearch: 'Ogow Cilmi-baarista',
      },
      getInvolvedCta: {
        eyebrow: 'KA QEYB QAADO',
        heading: 'Noqo qayb ka mid ah sheekada.',
        subtext: 'Mustaqbalka badda Soomaaliya wuxuu ku xiran yahay dadka diyaar u ah inay sahamiyaan, wax bartaan oo falaan.',
        volunteerTitle: 'Iskaa Wax U Qabso',
        volunteerTagline: 'Bixi waqtigaaga iyo xirfadahaaga.',
        volunteerCta: 'Noqo Mutadawiciin',
        partnerTitle: 'Nala Shaqee',
        partnerTagline: 'La shaqee Blue Ocean si aad u abuurto saameyn waara.',
        partnerCta: 'Nala Shaqee',
        supportTitle: 'Taageer',
        supportTagline: 'Ka caawi horumarinta cilmi-baarista iyo ilaalinta badda.',
        supportCta: 'Taageer Mashruuc',
      },
    },
    mobileTabBar: {
      home: 'Guriga',
      explore: 'Sahamin',
      marineLife: 'Nolosha Badda',
    },
    home: {
      heroHeadline: 'Soo Ogow',
      heroHeadlineAccent: 'Blue Ocean Soomaaliya',
      heroSubtext: 'Sahmi xeebta Soomaaliya, ogow nolosha badeed, taageer cilmi-baarista badda, kana qeyb qaado ilaalinta mid ka mid ah deegaannada badda ee ugu qurxoon Afrika.',
      heroDiscoverMarineLife: 'Ogow Nolosha Badda',
      heroJoinExpedition: 'Ku Biir Safarka Cilmi-baarista',
      heroLearnResearch: 'Wax ka Baro Cilmi-baaristayada',
    },
  },
};

const pageDictionaries = [
  tourism, exploreCoast, oceanExperiences, marineLife, research,
  conservation, communities, news, about, contact, homeSections,
];

for (const dict of pageDictionaries) {
  for (const lang of SUPPORTED_LANGUAGES) {
    Object.assign(translations[lang], dict[lang]);
  }
}

export default translations;
