import Image from 'next/image';

import Button from '@/components/UI/Button';
import GradientBorder from '@/components/UI/GradientBorder';

import officeOpen from '@/public/graphics/office-open.png';

export default function Hero() {
  return (
    <section className='grid gap-16 mb-section mx-container mt-14 lg:mt-24 lg:grid-cols-[minmax(0,5fr)_minmax(0,3fr)] '>
      <div>
        <h1 className='text-white font-bold mb-5 text-2xl 3xs:text-3xl text-center mx-auto 2xs:text-4xl 2xs:max-w-[390px] xs:text-5xl xs:max-w-[450px] sm:text-6xl md:text-7xl md:max-w-[520px] lg:mx-0 lg:text-left lg:text-6xl lg:max-w-[500px] lg:mb-7 xl:text-9xl xl:max-w-[540px] 2xl:text-10xl 2xl:max-w-[580px] 3xl:text-12xl 3xl:max-w-none'>
          University of Waterloo Data Science Club
        </h1>
        <p className='text-white leading-loose text-center mb-10 max-w-[350px] mx-auto sm:max-w-[420px] sm:text-lg lg:text-md lg:text-left lg:mx-0 lg:max-w-none lg:mb-14 xl:text-lg 2xl:text-xl'>
          Inspiring the data science leaders of the future by building an
          inclusive community to bridge the gap between academics and the
          industry.
        </p>
        <div className='flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12 lg:justify-start'>
          <Button
            type='link'
            href=''
            hierarchy='primary'
            font='font-bold'
            text='sm:text-lg 2xl:text-xl'
            padding='py-3 sm:px-7 sm:py-4'
            rounded='rounded-lg'
          >
            Join Us
          </Button>
          <GradientBorder rounded='rounded-lg'>
            <Button
              type='route'
              href='#contact'
              hierarchy='secondary'
              font='font-bold'
              text='sm:text-lg 2xl:text-xl'
              padding='py-3 sm:px-7 sm:py-4'
              rounded='rounded-[15px]'
              classes='w-full'
            >
              Sponsor Us
            </Button>
          </GradientBorder>
        </div>
      </div>
      <Image
        src={officeOpen}
        alt='office open'
        className='max-w-[360px] mx-auto lg:mx-0 lg:w-full lg:max-w-none'
      />
    </section>
  );
}
