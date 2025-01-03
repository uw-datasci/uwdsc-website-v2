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
import smallcloud from "@/public/cxc/graphics/SmallCloud.png"
import cloudcluster from "@/public/cxc/graphics/CloudCluster.png"

import { useMediaQuery } from "react-responsive";

export default function CxC() {
  const isMobile = useMediaQuery({ query: "(max-width: 768px)" });
  const Star = ({ size = 5, top = 0, left = 0 }) => 
    (<div className="z-[-1] absolute bg-white inline-block" 
      style={{top: `${top}%`, left: `${left}%`, width: `${size}px`, height: `${size}px`,}}>
    </div>)
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
       
       {/* UFO, airplane, clouds, and CxC Title */}
       {/* UFO, airplane, and clouds only show for desktop and not mobile */}
       <div className="absolute left-1/2 top-[3%] w-[75%] lg:w-[45%] -translate-x-1/2">
            <Image src={cxctitle} alt="CxC Title" />
          </div>
       {!isMobile && 
       <div>
          <Star size={5} top={4} left={4}/>
          <Star size={10} top={3} left={8}/>
          <Star size={7} top={8} left={95}/>
          <Star size={9} top={4} left={90}/>
          <Star size={5} top={6} left={87}/>
          <Star size={8} top={17} left={20}/>
          <Star size={10} top={20} left={15}/>
          <Star size={6} top={22} left={93}/>
          <Star size={9} top={31} left={23}/>
          <Star size={5} top={33} left={25}/>
          <Star size={7} top={35} left={20}/>
          <Star size={7} top={48} left={12}/>
          <Star size={10} top={50} left={15}/>
          <Star size={8} top={53} left={11}/>
          <div className="z-[-1] absolute left-[7%] top-[5%] w-[min(25%,200px)]">
            <Image src={ufo} alt="UFO" />
          </div>
          <div className="z-[-1] absolute right-[5%] top-[30%] w-[min(50%,400px)]">
            <Image src={airplane} alt="Airplane" />
          </div> 
          <div className="z-[-1] absolute left-[5%] top-[32%] w-[min(50%,200px)]">
            <Image src={smallcloud} alt="Small Cloud" />
          </div> 
          <div className="z-[-1] absolute right-0 top-[48%] w-[min(50%,400px)]">
            <Image src={cloudcluster} alt="Cloud Cluster" />
          </div> 
        </div>}

      
        
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