import Image from "next/image";
import { useEffect } from 'react';
import CxcLogo from '@/public/cxc/cxc_logo.svg'


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
    <section className="mt-[7%] mx-container mb-section relative">
      <div className="relative pt-44 text-center lg:pt-56">
        <p className="mx-auto mb-10 max-w-[350px] leading-loose text-white xs:max-w-[600px] xs:text-lg lg:mb-14 2xl:max-w-[640px] 2xl:text-xl">
        Experience CxC, a datathon that brings together students and companies to build projects that solve real-world problems.
        </p>
        <div className="flex flex-col gap-5 sm:flex-row sm:justify-center sm:gap-12">
          <Button
            type="button"
            href=""
            classes="ease-in-out"
            hierarchy="primary"
            font="font-bold"
            text="sm:text-lg 2xl:text-xl"
            padding="py-3 sm:px-7 sm:py-4"
            rounded="rounded-lg"
          >
            Applications Opening Soon
          </Button>

          {/* Commented out during CXC event: */}
          
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
