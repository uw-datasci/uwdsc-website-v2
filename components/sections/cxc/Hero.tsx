import Image from "next/image";

import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";

import officeOpen from "@/public/graphics/office-open.png";

export default function Hero() {
  return (
    <section className="mx-container mb-section relative">
      <div className="absolute left-1/2 top-6 w-[min(100%,400px)] -translate-x-1/2">
        <Image src={officeOpen} alt="office open" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="relative pt-48 text-center sm:pt-56">
        <h1 className="mx-auto mb-4 text-center text-2xl font-bold text-white 3xs:text-3xl 2xs:text-5xl xs:text-7xl sm:text-8xl lg:text-10xl 3xl:text-12xl">
          Clubs x Companies
        </h1>
        <p className="mx-auto mb-10 max-w-[350px] leading-loose text-white xs:max-w-[600px] xs:text-lg lg:mb-14 2xl:max-w-[640px] 2xl:text-xl">
          Inspiring the data science leaders of the future by building an
          inclusive community to bridge the gap between academics and the
          industry.
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
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
    </section>
  );
}
