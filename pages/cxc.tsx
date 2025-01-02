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
import {CURRENT_CXC_SPONSORS, PAST_SPONSORS} from "@/constants/sponsors"

import Image from "next/image";
import { useEffect } from 'react';
import cxcbackground from "@/public/cxc/graphics/CxC Background.png"

export default function CxC() {
  return (
    <>
      <SEO
        title="CxC | UWaterloo Data Science Club"
        description="Experience CxC, a hackathon that brings together students and companies to build projects that solve real-world problems."
      />
    <div className="relative flex flex-col min-h-screen">
      <div className="absolute top-0 left-0 w-full h-full">
        <Image src={cxcbackground}
            alt="CxC Background"
            layout="fill"
            objectFit="cover"
            priority
            />
      </div>

      <div className="relative z-10">
        <Hero />
        <CxCStats />
        <Sponsors sectionTitle="THIS YEAR&apos;S SPONSORS" className="gap-x-24 gap-y-20" sponsorList={CURRENT_CXC_SPONSORS}/>
        <PastCxC/>
        {/* <SponsorshipTiers /> */}
        {/* <SponsorshipInterest /> */}
        {/* <SponsorForm /> */}
        {/* <Sponsors sectionTitle="THIS YEAR&apos;S SPONSORS" className="" sponsorList={PAST_SPONSORS}/> */}
      </div>
    </div>
    </>
  );
}
