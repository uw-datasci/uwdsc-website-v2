import Banner from '@/components/layout/Banner';
import Button from '@/components/UI/Button';
import GradientBorder from '@/components/UI/GradientBorder';

export default function SponsorshipInterest() {
  return (
    <section className='mb-section'>
      <Banner>
        <div className='pt-8 pb-12 2xs:pt-10 2xs:pb-14 sm:pt-12 sm:pb-18 lg:pt-18 lg:pb-24 2xl:pt-24 2xl:pb-36'>
          <h2 className='font-bold text-center text-white text-lg 3xs:text-xl mb-4 xs:text-3xl sm:text-5xl md:text-7xl xl:text-9xl'>
            Interested in sponsoring CxC?
          </h2>
          <p className='text-white mb-8 text-center leading-loose xs:text-lg sm:mb-12 max-w-[500px] mx-auto md:text-xl md:max-w-[600px]'>
            Thank you for your interest in collaborating with us, see below for
            our sponsorship package for your reference!
          </p>
          <div className='flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12'>
            <Button
              type='link'
              href=''
              hierarchy='primary'
              font='font-bold'
              text='sm:text-lg 2xl:text-xl'
              padding='py-3 sm:px-7 sm:py-4'
              rounded='rounded-lg'
            >
              Set Up a Meeting
            </Button>
            <GradientBorder rounded='rounded-lg'>
              <Button
                type='link'
                href=''
                hierarchy='secondary'
                font='font-bold'
                text='sm:text-lg 2xl:text-xl'
                padding='py-3 sm:px-7 sm:py-4'
                rounded='rounded-[15px]'
                classes='w-full'
              >
                Download Sponsorship Package
              </Button>
            </GradientBorder>
          </div>
        </div>
      </Banner>
    </section>
  );
}
