import { Fragment } from 'react';

import ContactForm from '@/components/sections/templates/ContactForm';

import { ContactField } from '@/types/types';

const FIELDS: ContactField[] = [
  {
    id: 'name',
    name: 'name',
    type: 'input',
    placeholder: 'Name',
  },
  {
    id: 'email',
    name: 'email',
    type: 'input',
    placeholder: 'Email',
  },
  {
    id: 'purpose',
    name: 'purpose',
    type: 'dropdown',
    placeholder: 'Purpose of Contact',
    options: ['Sponsorship', 'General Inquiry', 'Other'],
  },
  {
    id: 'message',
    name: 'message',
    type: 'textarea',
    placeholder: 'Message',
  },
];

export default function ContactUs() {
  return (
    <ContactForm
      title='Contact Us'
      description={
        <Fragment>
          Have a question or interested in sponsoring us? Send us a message
          here, through our social medias, or even visit our office at{' '}
          <span className='font-bold'>MC 3034</span>. We&apos;ll get back to you
          ASAP!
        </Fragment>
      }
      fields={FIELDS}
    />
  );
}
