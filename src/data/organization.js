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

import { localize } from '../lib/i18n/localizeData.js';

export const organization = {
  name: 'Blue Ocean Somalia',
  mission: {
    statement: "To explore, study, protect, and share Somalia's marine environment with the world.",
    description:
      'Blue Ocean exists to explore Somalia\'s marine environment, study it with scientific rigor, protect it in partnership with the communities who depend on it, and share what we learn openly — because a coastline this significant deserves to be known, not just guarded.',
    translations: {
      so: {
        statement: 'In la sahamiyo, la barto, la ilaaliyo, oo aduunka lala wadaago deegaanka badda Soomaaliya.',
        description:
          'Blue Ocean waxay u taagan tahay in la sahamiyo deegaanka badda Soomaaliya, si cilmi ah loo baaro, lala ilaaliyo bulshooyinka ku tiirsan, oo si furan loola wadaago waxa la baranayo — sababtoo ah xeeb muhiimad leh sida tan way u baahan tahay in la yaqaano, ee aanay ahayn in la ilaaliyo oo keliya.',
      },
    },
  },
  vision: {
    statement: "A future where Somalia's ocean is understood, protected, and sustainably used for education, tourism, research, and economic opportunity.",
    description:
      'We work toward a Somali coast where marine research is routine rather than rare, where conservation decisions are backed by evidence, and where coastal communities share directly in the benefits of a healthy ocean — not displaced by its protection.',
    translations: {
      so: {
        statement: 'Mustaqbal ay badda Soomaaliya lagu fahmo, lagu ilaaliyo, oo si waara loogu isticmaalo waxbarasho, dalxiis, cilmi-baaris, iyo fursado dhaqaale.',
        description:
          'Waxaan u shaqaynaa xeeb Soomaaliyeed oo cilmi-baarista badda ay ku noqoto arrin caadi ah oo aan ahayn mid dhif ah, meel go\'aannada ilaalintu ku dhisan yihiin xaqiiqooyin, iyo meel bulshooyinka xeebaha degan ay si toos ah uga faa\'iidaystaan bad caafimaad qabta — halkii ay ilaalintu ka barakiciyi lahayd.',
      },
    },
  },
  story: {
    intro: 'We believe you cannot protect what you do not understand.',
    paragraphs: [
      'Blue Ocean began with a simple observation: Somalia holds the longest coastline in mainland Africa — 3,025 kilometers — and one of its least studied. Decades of instability left a scientific gap most neighboring countries closed long ago, even as the reefs, fisheries, and coastal communities along this coast kept going.',
      'We started as a small field research effort and grew into an organization spanning exploration, science, conservation, and community partnership — not because those are separate missions, but because none of them works without the others. Research without conservation is just documentation. Conservation without communities doesn\'t last. And none of it means much if nobody outside the field team ever hears about it.',
    ],
    translations: {
      so: {
        intro: 'Waxaan aaminsanahay in aan la ilaalin karin waxaad garanayn.',
        paragraphs: [
          'Blue Ocean waxay ka bilaabatay fiiro fudud: Soomaaliya waxay leedahay xeebta ugu dheer Afrika dhulka weyn — 3,025 kilomitir — waxayna ka mid tahay tan ugu yar ee cilmi-ahaan lagu baaray. Tobanaan sano oo xasilloonida la\'aan ah ayaa keenay farac cilmiyeed oo ay dalalka deriska ahi horay u xirteen, inkastoo geedaha murjaanka, kalluumaysiga, iyo bulshooyinka xeebaha ay sii wadeen.',
          'Waxaan ku bilownay dadaal yar oo cilmi-baaris duurjoog ah, waxaanan u kobacnay hay\'ad ku baaxad weyn sahaminta, sayniska, ilaalinta, iyo iskaashiga bulshada — mana aha sababtoo ah hawlgaladaasi kala duwan yihiin, ee waa sababtoo ah midkoodna kama shaqeeyo mid la\'aantiis. Cilmi-baaris aan ilaalin lahayn waa uun diiwaan-gelin. Ilaalin aan bulsho lahayn ma sii socon karto. Waxna kama tarayaan haddii aan qof ka baxsan kooxda duurjoogga ah waligiis maqal.',
        ],
      },
    },
  },
  whyOceanMatters: {
    heading: 'Why the ocean matters',
    text: 'Somalia\'s marine environment supports fisheries that feed coastal communities, biodiversity found almost nowhere else on the East African coast, and a cultural history — from dhow trade routes to generational fishing knowledge — that runs as deep as the water itself. What happens to this coast over the next decade will be decided largely by how well it is understood today.',
    translations: {
      so: {
        heading: 'Sababta badu muhiim u tahay',
        text: 'Deegaanka badda Soomaaliya wuxuu taageeraa kalluumaysiga quudiya bulshooyinka xeebaha, kala duwanaanta noolaha oo aan meel kale laga helin xeebta Bariga Afrika, iyo taariikh dhaqameed — laga bilaabo waddooyinka ganacsiga doonaha ilaa aqoonta kalluumaysiga ee dhaxalka ah — taas oo u dheer sida biyaha qudhoodu u dheer yihiin. Waxa ku dhici doona xeebtan tobankan sano ee soo socda waxaa inta badan go\'aamin doona sida maanta loo fahmo.',
      },
    },
  },
  whoWeWorkWith: {
    heading: 'Who we work with',
    text: 'Fishing cooperatives, beach guardian networks, coastal business alliances, regional research partners, and — increasingly — the export buyers and visitors who benefit from a coast that stays healthy. Nearly every project on this site names a community partner for exactly this reason.',
    translations: {
      so: {
        heading: 'Kuwa aan la shaqayno',
        text: 'Iskaashatooyinka kalluumaysiga, shabakadaha ilaaliyaha xeebaha, isbahaysiyada ganacsiga xeebaha, lammaanayaasha cilmi-baarista gobolka, iyo — sii kordhaya — dhoofinta iibsadayaasha iyo booqdayaasha ka faa\'iidaysta xeeb caafimaad qabta. Ku dhawaad mashruuc kasta oo bogga ku yaal wuxuu magacaabaa lammaane bulsho ah sababtan darteed.',
      },
    },
  },
  whatWeDo: [
    {
      step: '01',
      title: 'Explore',
      desc: "Charting Somalia's coastline — its regions, destinations, and geography — as the foundation everything else builds on.",
      path: '/explore-the-coast',
      cta: 'Explore the Coast',
      translations: {
        so: {
          title: 'Sahamin',
          desc: 'Khariidaynta xeebta Soomaaliya — gobolladeeda, meelaha dalxiiska, iyo juqraafiyadeeda — oo ah aasaaska ay wax kasta oo kale ku dhisan yihiin.',
          cta: 'Sahami Xeebta',
        },
      },
    },
    {
      step: '02',
      title: 'Research',
      desc: 'Field studies across marine biodiversity, fisheries, coral reefs, and coastal ecosystems that establish the evidence baseline for everything we protect.',
      path: '/research',
      cta: 'Our Research',
      translations: {
        so: {
          title: 'Cilmi-baaris',
          desc: 'Daraasado duurjoog ah oo ku saabsan kala duwanaanta noolaha badda, kalluumaysiga, geedaha murjaanka, iyo nidaamyada deegaanka xeebaha, kuwaas oo dhigaya aasaaska caddaynta wax kasta oo aan ilaalinno.',
          cta: 'Cilmi-baaristayada',
        },
      },
    },
    {
      step: '03',
      title: 'Conserve',
      desc: 'Turning research findings into protected corridors, sustainable fishing standards, cleanup networks, and habitat protection proposals.',
      path: '/conservation',
      cta: 'Conservation',
      translations: {
        so: {
          title: 'Ilaalin',
          desc: 'U beddelka natiijooyinka cilmi-baarista jidado la ilaaliyo, heerar kalluumaysi oo waara, shabakado nadaafad, iyo soo jeedin ilaalinta deegaanka.',
          cta: 'Ilaalinta',
        },
      },
    },
    {
      step: '04',
      title: 'Connect',
      desc: 'Partnering with the coastal communities whose livelihoods and knowledge are inseparable from the ocean we study.',
      path: '/communities',
      cta: 'Coastal Communities',
      translations: {
        so: {
          title: 'Xiriirin',
          desc: 'La shaqaynta bulshooyinka xeebaha oo nolol-maalmeedkooda iyo aqoontoodu aanay ka soocmin badda aan barano.',
          cta: 'Bulshooyinka Xeebaha',
        },
      },
    },
  ],
};

export function getOrganization(language = 'en') {
  return {
    ...organization,
    mission: localize(organization.mission, language),
    vision: localize(organization.vision, language),
    story: localize(organization.story, language),
    whyOceanMatters: localize(organization.whyOceanMatters, language),
    whoWeWorkWith: localize(organization.whoWeWorkWith, language),
    whatWeDo: organization.whatWeDo.map((item) => localize(item, language)),
  };
}

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
