import EnquiryForm from '../shared/EnquiryForm';
import { contactSubjects } from '../../data/organization';
import { submitContactMessage } from '../../lib/dashboardApi';
import { useAuth } from '../../context/AuthContext';

const fields = [
  { name: 'name', label: 'Name', type: 'text', required: true, placeholder: 'Your full name' },
  { name: 'email', label: 'Email', type: 'email', required: true, placeholder: 'you@example.com' },
  { name: 'phone', label: 'Phone', type: 'tel', placeholder: '+252 ...' },
  { name: 'organization', label: 'Organization', type: 'text', placeholder: 'Optional' },
  {
    name: 'subject',
    label: 'Subject',
    type: 'select',
    required: true,
    placeholder: 'Select a subject',
    options: contactSubjects,
    fullWidth: true,
  },
  {
    name: 'message',
    label: 'Message',
    type: 'textarea',
    required: true,
    minLength: 10,
    placeholder: 'Tell us what\'s on your mind',
    fullWidth: true,
    rows: 6,
  },
];

export default function ContactForm() {
  const { token } = useAuth();

  const handleSubmit = (values) => submitContactMessage(values, token);

  return (
    <EnquiryForm
      formId="contact-form"
      fields={fields}
      submitLabel="Send Message"
      successMessage="Thank you for contacting Blue Ocean. We'll get back to you as soon as possible."
      onSubmit={handleSubmit}
    />
  );
}
