import { useFormik } from 'formik';
import { Mail, Instagram } from 'react-feather';
import { RxDiscordLogo } from 'react-icons/rx';

import TextInput from '@/components/UI/TextInput';
import Dropdown from '@/components/UI/Dropdown';
import TextArea from '@/components/UI/TextArea';
import Button from '@/components/UI/Button';


export default function Contact() {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      purpose: '',
      message: '',
    },
    onSubmit: (values) => {
      console.log(values);
    },
  });

  return (
    <section
      id='contact'
      className='mb-section grid gap-10 mx-container lg:grid-cols-2 lg:gap-16'
    >
      <div>
        <h2 className='text-white font-bold text-4xl md:text-8xl xl:text-8xl mb-3 lg:-mt-3'>
          Sponsor Form
        </h2>
        <p className='text-white leading-loose md:text-lg lg:text-md xl:text-lg lg:mb-12'>
          Have a question or interested in sponsoring us? Send us a message
          here!
        </p>
      </div>
      <form onSubmit={formik.handleSubmit}>
        <TextInput
          id='name'
          name='name'
          type='text'
          placeholder='Name'
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          classes='mb-6'
        />
        <TextInput
          id='email'
          name='email'
          type='email'
          placeholder='Email'
          value={formik.values.email}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          classes='mb-6'
        />
        <Dropdown
          id='purpose'
          name='purpose'
          placeholder='Purpose of Contact'
          options={['General Inquiry', 'Sponsorships', 'Other']}
          value={formik.values.purpose}
          onChange={formik.handleChange}
          classes='mb-6'
        />
        <TextArea
          id='message'
          name='message'
          placeholder='Message'
          value={formik.values.message}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          classes='mb-14'
        />
        <Button
          type='submit'
          hierarchy='primary'
          font='font-bold'
          text='lg:text-lg'
          padding='py-3 sm:px-7 sm:py-4'
          rounded='rounded-lg'
          classes='w-full sm:w-auto'
        >
          Submit
        </Button>
      </form>
    </section>
  );
}
