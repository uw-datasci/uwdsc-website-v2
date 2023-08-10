import Image from 'next/image';

import Button from '@/components/UI/Button';
import GradientBorder from '@/components/UI/GradientBorder';

import officeOpen from '@/public/graphics/office-open.png';

export default function CxCHero() {
  return (
    <section className="mx-container mb-section mx-0 mt-14 grid w-full lg:mt-24">
      <div className="absolute top-1/3 z-30 w-full">
        <h1 className="mx-auto -mb-5 text-center text-2xl font-bold text-white 3xs:text-3xl 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:max-w-[600px] lg:text-10xl xl:text-13xl 2xl:text-18xl">
          Clubs x Companies
        </h1>
        <p className="mx-auto mx-auto mb-6 text-center leading-snug text-white sm:text-lg lg:mb-10 lg:max-w-[700px] lg:text-md xl:text-lg 2xl:text-xl">
          Inspiring the data science leaders of the future by solving industry
          challenges
        </p>
        <div className="mx-10 mx-auto flex flex-col justify-center gap-5 sm:flex-row sm:gap-12">
          <Button
            type="link"
            href=""
            hierarchy="primary"
            font="font-bold"
            text="sm:text-lg 2xl:text-xl"
            padding="py-3 sm:px-7 sm:py-4"
            rounded="rounded-lg"
          >
            Sign Up
          </Button>
          <GradientBorder rounded="rounded-lg">
            <Button
              type="route"
              href="#contact"
              hierarchy="secondary"
              font="font-bold"
              text="sm:text-lg 2xl:text-xl"
              padding="py-3 sm:px-7 sm:py-4"
              rounded="rounded-[15px]"
              classes="w-full"
            >
              Sponsor Us
            </Button>
          </GradientBorder>
        </div>
      </div>
      <div className="relative mx-auto w-full">
        <Image
          src={officeOpen}
          alt="office open"
          className="mx-auto max-w-[400px] xl:max-w-[500px]"
        />
        <div className="left:0 absolute absolute top-0 h-full w-full bg-gradient-to-t from-[#000211e0] to-[#00000000]">
          <div className="flex h-full">
            <div className="absolute absolute left-0 top-0 h-full w-1/2 bg-gradient-to-l from-[#00021150] to-[#00021100]"></div>
            <div className="absolute absolute right-0 top-0 h-full w-1/2 bg-gradient-to-r from-[#00021150] to-[#00021100]"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
