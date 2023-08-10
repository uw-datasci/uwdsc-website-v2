import ContactForm from '@/components/sections/templates/ContactForm';

import { type ContactField } from '@/types/types';

const FIELDS: ContactField[] = [
  {
    id: 'name',
    name: 'name',
    type: 'input',
    placeholder: 'Name',
  },
  {
    id: 'company',
    name: 'company',
    type: 'input',
    placeholder: 'Company / Organization',
  },
  {
    id: 'email',
    name: 'email',
    type: 'input',
    placeholder: 'Work Email',
  },
  {
    id: 'message',
    name: 'message',
    type: 'textarea',
    placeholder: 'Message',
  },
];

export default function SponsorForm() {
  return (
    <ContactForm
      title='Sponsor Form'
      description='Have a question or interested in sponsoring us? Send us a message here and we will get back to you ASAP!'
      fields={FIELDS}
    />
  );
}
