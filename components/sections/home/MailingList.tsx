import { useFormik } from 'formik';

import Button from '@/components/UI/Button';
import Banner from '@/components/layout/Banner';

export default function MailingList() {
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <section className='mb-section'>
      <Banner>
        <div className='pt-8 pb-12 2xs:pt-10 2xs:pb-14 sm:pt-12 sm:pb-18 lg:pt-18 lg:pb-24 2xl:pt-24 2xl:pb-36'>
          <h2 className='font-bold text-center text-white text-xl 3xs:text-2xl max-w-[390px] mx-auto 2xs:text-3xl mb-4 xs:text-5xl xs:max-w-[400px] sm:text-6xl sm:max-w-[480px] md:mb-6 md:text-8xl md:max-w-[540px] xl:max-w-[640px] xl:text-9xl 2xl:text-10xl 2xl:mb-9'>
            Stay up to date on Data Science Club events.
          </h2>
          <p className='text-white mb-8 text-center xs:text-lg xs:mb-10 md:text-xl 2xl:text-2xl md:mb-12 2xl:mb-16'>
            Join our mailing list! No spam, we promise.
          </p>
          <form
            onSubmit={formik.handleSubmit}
            className='relative max-w-[680px] mx-auto '
          >
            <input
              type='text'
              id='email'
              name='email'
              placeholder='Enter your email'
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              className='text-white placeholder:text-grey1 bg-grey4 w-full rounded-md pl-4.5 pr-24 py-3.5 outline-none border border-grey1 transition-300 focus:border-white xl:px-6 xl:py-4.5 xl:text-lg xl:pr-32'
            />
            <Button
              type='submit'
              hierarchy='primary'
              font='font-bold'
              text='xl:text-lg'
              padding='px-4 xl:px-6'
              rounded='rounded-sm'
              classes='absolute right-1 inset-y-1 xl:right-2 xl:inset-y-2'
            >
              Submit
            </Button>
          </form>
        </div>
      </Banner>
    </section>
  );
}
