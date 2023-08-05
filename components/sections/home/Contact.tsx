import { useFormik } from 'formik';

import TextInput from '@/components/UI/TextInput';
import Dropdown from '@/components/UI/Dropdown';

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
    <section className='mb-section grid gap-10 mx-container lg:grid-cols-2 lg:gap-16'>
      <div>
        <h2 className='text-white font-bold text-4xl md:text-8xl xl:text-8xl mb-3 lg:-mt-3'>
          Contact Us
        </h2>
        <p className='text-white leading-loose md:text-lg lg:text-md xl:text-lg'>
          Have a question or interested in sponsoring us? Send us a message
          here, through our social medias, or even visit our office at{' '}
          <span className='font-bold'>MC 3034</span>. We&apos;ll get back to you
          ASAP!
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
          options={['General Inquiry', 'Sponsorship', 'Other']}
          value={formik.values.purpose}
          onChange={formik.handleChange}
          classes='mb-6'
        />
      </form>
    </section>
  );
}
