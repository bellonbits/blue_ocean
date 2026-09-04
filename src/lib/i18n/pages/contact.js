// contact page-section UI strings — merged into the shared dictionary in
// ../translations.js. Somali (so) strings are a first-pass translation and
// need human-fluency review before being treated as final copy.
// add keys here as that page is wired up to useLanguage()'s t(), per
// BLUE_OCEAN_BACKLOG.md section 10.1.
export default {
  en: {
    contact: {
      hero: {
        badge: 'CONTACT',
        heading: "Let's",
        headingAccent: 'connect.',
        subtext:
          "Whether you're interested in research, conservation, partnerships, ocean experiences or simply want to learn more, we'd love to hear from you.",
      },
      details: {
        label: 'Get in Touch',
        heading: "Let's connect.",
        intro:
          "Whether you're interested in research, conservation, partnerships, ocean experiences or simply want to learn more, we'd love to hear from you.",
        emailLabel: 'Email',
        officesLabel: 'Field Offices',
        followLabel: 'Follow Blue Ocean',
      },
      form: {
        nameLabel: 'Name',
        namePlaceholder: 'Your full name',
        emailLabel: 'Email',
        emailPlaceholder: 'you@example.com',
        phoneLabel: 'Phone',
        phonePlaceholder: '+252 ...',
        organizationLabel: 'Organization',
        organizationPlaceholder: 'Optional',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'Select a subject',
        messageLabel: 'Message',
        messagePlaceholder: "Tell us what's on your mind",
        submitLabel: 'Send Message',
        sendingLabel: 'Sending...',
        successHeading: 'Message received.',
        successMessage: "Thank you for contacting Blue Ocean. We'll get back to you as soon as possible.",
        errorRequired: 'This field is required.',
        errorInvalidEmail: 'Enter a valid email address.',
        errorMinLength: (n) => `Please enter at least ${n} characters.`,
        errorBannerLead: 'Your message was',
        errorBannerEmphasis: 'not delivered',
        errorBannerSuffix: ' — please try submitting again. If it keeps failing, email us directly at',
        subjects: {
          generalInquiry: 'General Inquiry',
          research: 'Research',
          conservation: 'Conservation',
          partnership: 'Partnership',
          oceanExperiences: 'Ocean Experiences',
          media: 'Media',
          volunteer: 'Volunteer',
          other: 'Other',
        },
      },
    },
  },
  so: {
    contact: {
      hero: {
        badge: 'NALA SOO XIRIIR',
        heading: 'Aynu',
        headingAccent: 'wada xidhiidhno.',
        subtext:
          "Hadday tahay cilmi-baaris, ilaalinta deegaanka, iskaashi, waaya-aragnimo badeed, ama aad si fudud u rabto inaad wax badan baratid, waan ku faraxsanahay inaan kaa maqalno.",
      },
      details: {
        label: 'Nala Soo Xiriir',
        heading: 'Aynu wada xidhiidhno.',
        intro:
          "Hadday tahay cilmi-baaris, ilaalinta deegaanka, iskaashi, waaya-aragnimo badeed, ama aad si fudud u rabto inaad wax badan baratid, waan ku faraxsanahay inaan kaa maqalno.",
        emailLabel: 'Iimaylka',
        officesLabel: 'Xafiisyada Duleedka',
        followLabel: 'La Soco Blue Ocean',
      },
      form: {
        nameLabel: 'Magaca',
        namePlaceholder: 'Magacaaga oo dhan',
        emailLabel: 'Iimaylka',
        emailPlaceholder: 'adiga@tusaale.com',
        phoneLabel: 'Taleefanka',
        phonePlaceholder: '+252 ...',
        organizationLabel: 'Ururka',
        organizationPlaceholder: 'Ikhtiyaari',
        subjectLabel: 'Mowduuca',
        subjectPlaceholder: 'Dooro mowduuc',
        messageLabel: 'Farriinta',
        messagePlaceholder: 'Noo sheeg waxa maskaxdaada ku jira',
        submitLabel: 'Dir Farriinta',
        sendingLabel: 'Waa la diraayaa...',
        successHeading: 'Farriintu waa la heshay.',
        successMessage: 'Waad ku mahadsan tahay inaad la xiriirtay Blue Ocean. Waan kula soo xiriiri doonnaa sida ugu dhaqsaha badan ee suurtagalka ah.',
        errorRequired: 'Goobtan waa lagama maarmaan.',
        errorInvalidEmail: 'Geli cinwaan iimayl oo sax ah.',
        errorMinLength: (n) => `Fadlan geli ugu yaraan ${n} xaraf.`,
        errorBannerLead: 'Farriintaadu',
        errorBannerEmphasis: 'lama gaarsiin',
        errorBannerSuffix: ', fadlan mar kale isku day inaad dirto. Haddii ay ku sii socoto inay guuldareysato, si toos ah ugu soo iimayl',
        subjects: {
          generalInquiry: "Su'aal Guud",
          research: 'Cilmi-baaris',
          conservation: 'Ilaalinta',
          partnership: 'Iskaashi',
          oceanExperiences: 'Waaya-aragnimada Badda',
          media: 'Warbaahinta',
          volunteer: 'Mutadawicnimo',
          other: 'Kale',
        },
      },
    },
  },
};
