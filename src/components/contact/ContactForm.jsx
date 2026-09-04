import EnquiryForm from '../shared/EnquiryForm';
import { contactSubjects, contactDetails } from '../../data/organization';
import { submitContactMessage } from '../../lib/dashboardApi';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';

// contactSubjects values are the canonical English strings submitted to the
// backend, so keep them as the option `value` and only translate the `label`
// shown to the user.
const subjectKeys = {
  'General Inquiry': 'generalInquiry',
  Research: 'research',
  Conservation: 'conservation',
  Partnership: 'partnership',
  'Ocean Experiences': 'oceanExperiences',
  Media: 'media',
  Volunteer: 'volunteer',
  Other: 'other',
};

export default function ContactForm() {
  const { token } = useAuth();
  const { t } = useLanguage();

  const handleSubmit = (values) => submitContactMessage(values, token);

  const fields = [
    { name: 'name', label: t('contact.form.nameLabel'), type: 'text', required: true, placeholder: t('contact.form.namePlaceholder') },
    { name: 'email', label: t('contact.form.emailLabel'), type: 'email', required: true, placeholder: t('contact.form.emailPlaceholder') },
    { name: 'phone', label: t('contact.form.phoneLabel'), type: 'tel', placeholder: t('contact.form.phonePlaceholder') },
    { name: 'organization', label: t('contact.form.organizationLabel'), type: 'text', placeholder: t('contact.form.organizationPlaceholder') },
    {
      name: 'subject',
      label: t('contact.form.subjectLabel'),
      type: 'select',
      required: true,
      placeholder: t('contact.form.subjectPlaceholder'),
      options: contactSubjects.map((subject) => ({
        value: subject,
        label: t(`contact.form.subjects.${subjectKeys[subject]}`),
      })),
      fullWidth: true,
    },
    {
      name: 'message',
      label: t('contact.form.messageLabel'),
      type: 'textarea',
      required: true,
      minLength: 10,
      placeholder: t('contact.form.messagePlaceholder'),
      fullWidth: true,
      rows: 6,
    },
  ];

  return (
    <EnquiryForm
      formId="contact-form"
      fields={fields}
      submitLabel={t('contact.form.submitLabel')}
      sendingLabel={t('contact.form.sendingLabel')}
      successHeading={t('contact.form.successHeading')}
      successMessage={t('contact.form.successMessage')}
      requiredErrorText={t('contact.form.errorRequired')}
      invalidEmailErrorText={t('contact.form.errorInvalidEmail')}
      minLengthErrorText={(n) => t('contact.form.errorMinLength', n)}
      errorMessage={
        <>
          {t('contact.form.errorBannerLead')} <strong>{t('contact.form.errorBannerEmphasis')}</strong>
          {t('contact.form.errorBannerSuffix')}{' '}
          <a href={`mailto:${contactDetails.email}`}>{contactDetails.email}</a>.
        </>
      }
      onSubmit={handleSubmit}
    />
  );
}
