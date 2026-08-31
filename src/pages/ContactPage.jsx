import { useEffect } from 'react';
import { useScrollReveal } from '../lib/hooks';
import ContactHero from '../components/contact/ContactHero';
import ContactDetails from '../components/contact/ContactDetails';
import ContactForm from '../components/contact/ContactForm';
import GetInvolvedCTA from '../components/shared/GetInvolvedCTA';
import './ContactPage.css';

export default function ContactPage() {
  useScrollReveal();

  useEffect(() => {
    document.title = 'Contact — Blue Ocean Somalia';
    window.scrollTo(0, 0);
  }, []);

  return (
    <main id="main-content" aria-label="Contact Blue Ocean">
      <ContactHero />

      <section className="section" aria-label="Contact Details and Form">
        <div className="container">
          <div className="contact-page__layout">
            <ContactDetails />
            <ContactForm />
          </div>
        </div>
      </section>

      <GetInvolvedCTA />
    </main>
  );
}
