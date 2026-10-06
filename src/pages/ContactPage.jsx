import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import ContactHero from '../components/contact/ContactHero';
import ContactDetails from '../components/contact/ContactDetails';
import ContactForm from '../components/contact/ContactForm';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';
import '../styles/portalDesignSystem.css';
import './ContactPage.css';

export default function ContactPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Contact — Blue Heaven Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="portal-page">
      <main id="main-content" aria-label="Contact Blue Heaven">
        {/* 1. Inset Rounded Hero */}
        <ContactHero />

        {/* 2. Contact Details & Form Card */}
        <section className="portal-card-section" aria-label="Contact Details and Form">
          <div className="contact-page__layout">
            <ContactDetails />
            <ContactForm />
          </div>
        </section>

        {/* 3. Sunset CTA */}
        <GetInvolvedCTA />
      </main>
    </div>
  );
}

