import SEO from "@/components/SEO/SEO";
import Hero from "@/components/sections/cxc/Hero";
import CxCStats from "@/components/sections/cxc/CxCStats";
import FrequentlyAskedQuestions from "@/components/sections/cxc/FrequentlyAskedQuestions";
import SponsorshipTiers from "@/components/sections/cxc/SponsorshipTiers";
import SponsorshipInterest from "@/components/sections/cxc/SponsorshipInterest";
import SponsorForm from "@/components/sections/cxc/SponsorForm";
import PastEvents from "@/components/sections/home/PastEvents"
import PastCxC from "@/components/sections/cxc/PastCxC";
import Sponsors from "@/components/sections/templates/Sponsors";
import Partners from "@/components/sections/templates/Partners";
import {CURRENT_CXC_SPONSORS, PAST_SPONSORS} from "@/constants/sponsors"
import {CURRENT_CXC_PARTNERS} from "@/constants/sponsors"

import Image from "next/image";
import { useEffect } from 'react';
import cxcbackground from "@/public/cxc/graphics/CxC Background.png"
import ufo from "@/public/cxc/graphics/UFO.png"
import cxctitle from "@/public/cxc/graphics/CxCTitle.png"
import cityskyline from "@/public/cxc/graphics/CitySkyline.png"
import sponsorsheading from "@/public/cxc/graphics/SponsorsHeading.png"
import statsheading from "@/public/cxc/graphics/StatsHeading.png"
import pastcxcheading from "@/public/cxc/graphics/PastCxCHeading.png"
import partnersheading from "@/public/cxc/graphics/PartnersHeading.png"
import airplane from "@/public/cxc/graphics/Airplane.png"

export default function CxC() {
  return (
    <>
      <SEO
        title="CxC | UWaterloo Data Science Club"
        description="Experience CxC, a hackathon that brings together students and companies to build projects that solve real-world problems."
      />
      <div className="relative mx-auto my-0 min-h-screen py-10 z-10"
        style={{
          background: "linear-gradient(to bottom, #000000, #03137c)",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",}}>
       
       {/* UFO, airplane, and CxC Title */}
        <div className="absolute left-[7%] top-[5%] w-[min(25%,200px)]">
          <Image src={ufo} alt="UFO" />
        </div>
        <div className="absolute right-[7%] top-[50%] w-[min(50%,400px)]">
          <Image src={airplane} alt="Airplane" />
        </div>
        <div className="absolute left-1/2 top-[3%] w-[75%] lg:w-[45%] -translate-x-1/2">
          <Image src={cxctitle} alt="CxC Title" />
        </div>
        
        {/* Hero Section */}
        <Hero />

        {/* CxC Stats Section */}
        <div className="absolute left-1/2 w-[45%] lg:w-[37%] -translate-x-1/2 lg:translate-x-[-20%]">
          <Image src={statsheading} alt="Stats Heading" />
        </div>
        <div className="py-[10%] lg:py-[5%]">
          <CxCStats />
        </div>

        {/* Sponsors Section */}
        <div className="absolute left-1/2 w-[75%] lg:w-[46.5%] -translate-x-1/2 lg:translate-x-[-27.5%]">
          <Image src={sponsorsheading} alt="Sponsors Heading" />
        </div>
        <div className="py-[20%] lg:py-[10%]">
          <Sponsors sectionTitle="" className="gap-x-24 gap-y-20" sponsorList={CURRENT_CXC_SPONSORS}/>
        </div>

        {/* Partners Section */}
        <div className="absolute left-1/2 w-[75%] lg:w-[46.5%] -translate-x-1/2 lg:translate-x-[-26.5%]">
          <Image src={partnersheading} alt="Partners Heading" />
        </div>
        <div className="py-[20%] lg:py-[10%]">
          <Partners sectionTitle="" className="gap-x-24 gap-y-20" partnerList={CURRENT_CXC_PARTNERS}/>
        </div>

        {/* Past CxC Section */}
        <div className="absolute left-1/2 w-[75%] lg:w-[46.5%] -translate-x-1/2 lg:translate-x-[-24%]">
          <Image src={pastcxcheading} alt="Past CxC Heading" />
        </div>
        <div className="py-[20%] lg:py-[5%]">
          <PastCxC/>
        </div>

        {/* City Skyline and Gradient Overlay */}
        <div className="absolute bottom-0 h-min w-full z-[-1]">
          <Image src={cityskyline} alt="City Skyline" />
          <div className="absolute w-full inset-0 bg-gradient-to-t from-black to-transparent" />
        </div>

        {/* <SponsorshipTiers /> */}
        {/* <SponsorshipInterest /> */}
        {/* <SponsorForm /> */}
        {/* <Sponsors sectionTitle="THIS YEAR&apos;S SPONSORS" className="" sponsorList={PAST_SPONSORS}/> */}
      </div>
    </>
  );
}