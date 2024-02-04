import Image from "next/image";
import { useEffect } from 'react';

import Button from "@/components/UI/Button";
import GradientBorder from "@/components/UI/GradientBorder";

import officeArcade from "@/public/graphics/office-arcade.png";

export default function Hero() {

    // Add the Luma checkout script dynamically
    useEffect(() => {
      const script = document.createElement('script');
      script.src = 'https://embed.lu.ma/checkout-button.js';
      script.id = 'luma-checkout';
      document.body.appendChild(script);
  
      return () => {
        // Remove the script on component unmount
        document.getElementById('luma-checkout')?.remove();
      };
    }, []);

  return (
    <section className="mx-container mb-section relative">
      <div className="absolute left-1/2 top-6 w-[min(100%,560px)] -translate-x-1/2">
        <Image src={officeArcade} alt="office open" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
      </div>
      <div className="relative pt-56 text-center sm:pt-64">
        <h1 className="mx-auto mb-4 text-center text-2xl font-bold text-white 3xs:text-3xl 2xs:text-5xl xs:text-7xl sm:text-8xl lg:text-10xl 3xl:text-12xl">
          Clubs x Companies
        </h1>
        <p className="mx-auto mb-10 max-w-[350px] leading-loose text-white xs:max-w-[600px] xs:text-lg lg:mb-14 2xl:max-w-[640px] 2xl:text-xl">
          Experience CxC, a hackathon that brings together students and
          companies to build projects that solve real-world problems.
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
          <Button
            type="link"
            // href="https://lu.ma/cxc"
            href="https://lu.ma/event/evt-ChamzwlXhzTJZDS"
            classes="luma-checkout--button py-3 sm:px-7 sm:py-4 rounded-lg font-bold sm:text-lg 2xl:text-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out"
            data-luma-action="checkout"
            data-luma-event-id="evt-ChamzwlXhzTJZDS"
            hierarchy="primary"
            font="font-bold"
            text="sm:text-lg 2xl:text-xl"
            padding="py-3 sm:px-7 sm:py-4"
            rounded="rounded-lg"
          >
            Sign Up
          </Button>
          {/* <a
            href="https://lu.ma/event/evt-ChamzwlXhzTJZDS"
            className="luma-checkout--button py-3 sm:px-7 sm:py-4 rounded-lg font-bold sm:text-lg 2xl:text-xl text-white bg-blue-600 hover:bg-blue-700 transition duration-300 ease-in-out"
            data-luma-action="checkout"
            data-luma-event-id="evt-ChamzwlXhzTJZDS"
          >
            Sign Up
          </a> */}
          {/* <GradientBorder rounded="rounded-lg">
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
              Sponsor CxC
            </Button>
          </GradientBorder> */}
        </div>
      </div>
    </section>
  );
}
