import Image from "next/image";

import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";

import OfficeOpen from "@/public/graphics/office-open.png";

export default function CxCHero() {
  return (
    <section className="grid mb-section w-full mx-0 mt-14 lg:mt-24">
      <div className="absolute top-1/3 z-30 w-full">
        <h1 className="text-white text-center font-bold -mb-5 text-2xl 3xs:text-3xl mx-auto 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-8xl lg:text-10xl xl:text-13xl 2xl:text-18xl lg:max-w-[600px]">
          CxC III
        </h1>
        <h1 className="text-white text-center mb-5 text-2xl 3xs:text-3xl mx-auto 2xs:text-4xl xs:text-5xl sm:text-6xl md:text-6xl lg:text-6xl xl:text-8xl lg:max-w-[600px]">
          a Data Hackathon
        </h1>
        <p className="text-white leading-snug mx-auto text-center mb-6 mx-auto sm:text-lg lg:text-md lg:mb-10 xl:text-lg 2xl:text-xl lg:max-w-[700px]">
          Inspiring the data science leaders of the future by solving industry
          challenges
        </p>
        <div className="flex mx-auto mx-10 flex-col gap-5 sm:flex-row justify-center sm:gap-12">
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
      <div className="w-full mx-auto relative">
        <Image src={OfficeOpen} alt="office open" className="mx-auto max-w-[400px] xl:max-w-[500px]" />
        <div className="w-full h-full absolute bg-gradient-to-t from-[#000211e0] to-[#00000000] absolute top-0 left:0">
          <div className="flex h-full">
            <div className="w-1/2 h-full absolute bg-gradient-to-l from-[#00021150] to-[#00021100] absolute top-0 left-0"></div>
            <div className="w-1/2 h-full absolute bg-gradient-to-r from-[#00021150] to-[#00021100] absolute top-0 right-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
}
